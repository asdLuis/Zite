import { useLayoutEffect, useRef } from 'react';
import Quest from '../ui/Quest.jsx';
import { quests } from '../../data/profile.js';
import '../../styles/sections/QuestLogSection.css';

const FOCUS_RANGE_RATIO = 0.62;
const MAX_SCALE_DROP = 0.24;
const MAX_OPACITY_DROP = 0.8;
const MAX_BLUR = 4;
const MIN_OPACITY = 0.14;
const FOCUS_THRESHOLD = 0.12;
const UNLOCK_PROGRESS_THRESHOLD = 0.98;
const MIN_FILL_PERCENT = 6;

///************************************************************************///
/// Function: clamp
/// Description: Restricts a numeric value to the inclusive [min, max] range.
/// Parameters: value, min, max - The number to clamp and its bounds.
/// Returns: number
///************************************************************************///
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

///************************************************************************///
/// Function: QuestLogSection
/// Description: Renders the project quest log. Above the carousel breakpoint
///              (and when motion isn't reduced), it's a self-contained
///              vertical carousel: the stage scrolls natively within its own
///              fixed-height box, and a live distance-from-center
///              calculation drives scale, opacity, and blur for an Apple-style
///              focus effect plus a scroll-progress rail. Below the breakpoint,
///              or with reduced motion, the carousel is fully disabled and cards
///              render in plain document flow with a simple CSS stagger-in animation.
/// Parameters: { handleUnlock } - Function to trigger achievement unlocks.
/// Returns: JSX.Element
///************************************************************************///
const QuestLogSection = ({ handleUnlock }) => {
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const railFillRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);
  const unlockedRef = useRef(false);

  cardRefs.current = [];
  dotRefs.current = [];

  ///************************************************************************///
  /// Function: registerCard
  /// Description: Attaches a DOM element to the cardRefs array for carousel focus.
  /// Parameters: el - The DOM element of the quest card wrapper.
  /// Returns: void
  ///************************************************************************///
  const registerCard = (el) => {
    if (el) cardRefs.current.push(el);
  };

  ///************************************************************************///
  /// Function: registerDot
  /// Description: Attaches a DOM element to the dotRefs array for rail progress.
  /// Parameters: el - The DOM element of the rail dot.
  /// Returns: void
  ///************************************************************************///
  const registerDot = (el) => {
    if (el) dotRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stage = stageRef.current;
    const track = trackRef.current;
    const cards = cardRefs.current;
    const dots = dotRefs.current;

    if (!stage || !track || cards.length === 0) return undefined;

    const carouselMql = window.matchMedia('(min-width: 721px)');
    let rafId = null;
    let scrollBound = false;

    ///************************************************************************///
    /// Function: updateTrackPadding
    /// Description: Sets the track's top and bottom padding to the exact amount
    ///              needed for the first and last card's centers to reach the
    ///              stage's center — no more, no less — so the min and max
    ///              scroll positions land exactly on the first/last card's snap
    ///              points with no leftover scrollable space before or past
    ///              them. Only meaningful in carousel mode.
    /// Parameters: none
    /// Returns: void
    ///************************************************************************///
    const updateTrackPadding = () => {
      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];
      const stageHeight = stage.clientHeight;
      const topPad = Math.max(stageHeight / 2 - firstCard.offsetHeight / 2, 0);
      const bottomPad = Math.max(stageHeight / 2 - lastCard.offsetHeight / 2, 0);
      track.style.paddingTop = `${topPad}px`;
      track.style.paddingBottom = `${bottomPad}px`;
    };

    ///************************************************************************///
    /// Function: applyFocusStyles
    /// Description: Evaluates card distances from center using offset geometry
    ///              and applies scaling, fading, and blurring proportional to
    ///              that distance. It strictly avoids altering translateY to
    ///              maintain stable native scroll-snapping. Also updates the
    ///              rail fill/active dot and fires the unlock callback once
    ///              the carousel has been scrolled to the end.
    /// Parameters: none
    /// Returns: void
    ///************************************************************************///
    const applyFocusStyles = () => {
      const stageHeight = stage.clientHeight;
      const centerFromTop = stage.scrollTop + stageHeight / 2;
      const focusRange = stageHeight * FOCUS_RANGE_RATIO;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, i) => {
        const cardCenter = card.offsetTop + card.offsetHeight / 2;
        const distance = cardCenter - centerFromTop;
        const absDistance = Math.abs(distance);

        if (absDistance < closestDistance) {
          closestDistance = absDistance;
          closestIndex = i;
        }

        if (!reduceMotion) {
          const normalized = clamp(distance / focusRange, -1, 1);
          const absNormalized = Math.abs(normalized);

          card.style.transform = `scale(${1 - absNormalized * MAX_SCALE_DROP})`;
          card.style.opacity = String(Math.max(1 - absNormalized * MAX_OPACITY_DROP, MIN_OPACITY));
          card.style.filter = `blur(${absNormalized * MAX_BLUR}px)`;
          card.classList.toggle('is-focused', absNormalized < FOCUS_THRESHOLD);
        }
      });

      // Illuminate all dots up to and including the current progress point
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i <= closestIndex));

      const maxScroll = stage.scrollHeight - stage.clientHeight;
      const progress = maxScroll > 0 ? clamp(stage.scrollTop / maxScroll, 0, 1) : 1;

      if (railFillRef.current) {
        railFillRef.current.style.height = `${Math.max(progress * 100, MIN_FILL_PERCENT)}%`;
      }

      if (!unlockedRef.current && progress > UNLOCK_PROGRESS_THRESHOLD) {
        unlockedRef.current = true;
        handleUnlock('completionist', 'ACHIEVEMENT UNLOCKED', 'Completionist — Explored every quest log');
      }
    };

    ///************************************************************************///
    /// Function: resetForStackedLayout
    /// Description: Clears every inline style the carousel applies, so cards
    ///              fall back to plain document flow and the CSS stagger-in
    ///              animation can take over. Used below the carousel breakpoint
    ///              and whenever reduced motion is requested.
    /// Parameters: none
    /// Returns: void
    ///************************************************************************///
    const resetForStackedLayout = () => {
      cards.forEach((card) => {
        card.style.transform = '';
        card.style.opacity = '';
        card.style.filter = '';
        card.classList.remove('is-focused');
      });
      dots.forEach((dot) => dot.classList.remove('is-active'));
      if (railFillRef.current) railFillRef.current.style.height = '';
      track.style.paddingBottom = '';

      if (!unlockedRef.current) {
        unlockedRef.current = true;
        handleUnlock('completionist', 'ACHIEVEMENT UNLOCKED', 'Completionist — Explored every quest log');
      }
    };

    ///************************************************************************///
    /// Function: onScroll
    /// Description: rAF-throttled scroll handler for the stage container, so
    ///              focus-style recalculation runs at most once per frame.
    /// Parameters: none
    /// Returns: void
    ///************************************************************************///
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        applyFocusStyles();
        rafId = null;
      });
    };

    ///************************************************************************///
    /// Function: bindScroll
    /// Description: Attaches the stage's scroll listener, guarded so it is
    ///              never attached twice.
    /// Parameters: none
    /// Returns: void
    ///************************************************************************///
    const bindScroll = () => {
      if (scrollBound) return;
      stage.addEventListener('scroll', onScroll, { passive: true });
      scrollBound = true;
    };

    ///************************************************************************///
    /// Function: unbindScroll
    /// Description: Removes the stage's scroll listener, guarded so it is
    ///              never removed when it was never attached.
    /// Parameters: none
    /// Returns: void
    ///************************************************************************///
    const unbindScroll = () => {
      if (!scrollBound) return;
      stage.removeEventListener('scroll', onScroll);
      scrollBound = false;
    };

    ///************************************************************************///
    /// Function: syncMode
    /// Description: Switches the section between carousel mode (desktop,
    ///              scroll-driven focus) and stacked mode (mobile or reduced
    ///              motion, plain flow with a CSS stagger-in). Re-run on
    ///              mount, on stage resize, and whenever the breakpoint is crossed.
    /// Parameters: none
    /// Returns: void
    ///************************************************************************///
    const syncMode = () => {
      if (reduceMotion || !carouselMql.matches) {
        unbindScroll();
        resetForStackedLayout();
      } else {
        bindScroll();
        updateTrackPadding();
        applyFocusStyles();
      }
    };

    syncMode();

    const resizeObserver = new ResizeObserver(() => syncMode());
    resizeObserver.observe(stage);
    carouselMql.addEventListener('change', syncMode);

    return () => {
      unbindScroll();
      resizeObserver.disconnect();
      carouselMql.removeEventListener('change', syncMode);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [handleUnlock]);

  return (
    <section className="quest-log-section" id="quests">
      <div className="quest-log-eyebrow">03 / QUEST LOG</div>
      <p className="quest-log-subtitle">
        Every project is a quest with a real problem, a real fight, and a real outcome.
        Scroll to unroll the log.
      </p>

      <div className="quest-log-carousel-body">
        <div className="quest-log-rail" aria-hidden="true">
          <div className="quest-log-rail-track">
            <div className="quest-log-rail-fill" ref={railFillRef} />
          </div>
          <div className="quest-log-rail-dots">
            {quests.map((q) => (
              <span className="quest-log-rail-dot" key={q.id} ref={registerDot} />
            ))}
          </div>
        </div>

        <div className="quest-log-carousel-stage" ref={stageRef}>
          <div className="quest-log-carousel-track" ref={trackRef}>
            {quests.map((q, i) => (
              <div
                className="quest-log-carousel-card"
                key={q.id}
                ref={registerCard}
                style={{ animationDelay: `${Math.min(i * 70, 350)}ms` }}
              >
                <Quest quest={q} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestLogSection;