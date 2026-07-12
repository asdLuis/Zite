import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Quest from '../ui/Quest.jsx';
import { quests } from '../../data/profile.js';
import '../../styles/sections/QuestLogSection.css';

gsap.registerPlugin(ScrollTrigger);

const CARD_STAGGER = 200;
const CARD_SETTLE = 600;
const STAGE_TAIL = 600;

///************************************************************************///
/// Function: QuestLogSection
/// Description: Renders an interactive, scroll-triggered log of project quests.
/// Parameters: { handleUnlock } - Function to trigger achievement unlocks.
/// Returns: JSX.Element
///************************************************************************///
const QuestLogSection = ({ handleUnlock }) => {
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  ///************************************************************************///
  /// Function: registerCard
  /// Description: Attaches a DOM element to the cardRefs array for GSAP animation.
  /// Parameters: el - The DOM element of the quest card.
  /// Returns: void
  ///************************************************************************///
  const registerCard = (el) => {
    if (el) cardRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scroller = document.querySelector('.app-env');
    const cards = cardRefs.current;

    const ctx = gsap.context(() => {
      if (reduceMotion || !stageRef.current || cards.length === 0) {
        gsap.set(cards, { clearProps: 'all' });
        handleUnlock('completionist', 'ACHIEVEMENT UNLOCKED', 'Completionist — Explored every quest log');
        return;
      }

      if (cards.length <= 1) {
        gsap.set(cards, { clearProps: 'all' });
        handleUnlock('completionist', 'ACHIEVEMENT UNLOCKED', 'Completionist — Explored every quest log');
        return;
      }

      const [firstCard, peekCard, ...restCards] = cards;
      const queuedCards = [peekCard, ...restCards];

      gsap.set(firstCard, { clearProps: 'all' });

      gsap.set(peekCard, {
        opacity: 0.4,
        y: -16,
        scaleY: 0.35,
        rotateX: -46,
        transformOrigin: '50% 0%',
      });

      gsap.set(restCards, {
        opacity: 0,
        y: -36,
        scaleY: 0.08,
        rotateX: -78,
        transformOrigin: '50% 0%',
      });

      const totalDuration = queuedCards.length * CARD_STAGGER + CARD_SETTLE;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          scroller,
          start: 'top top+=96',
          end: `+=${totalDuration + STAGE_TAIL}`,
          scrub: 0.6,
          onLeave: () => {
            handleUnlock('completionist', 'ACHIEVEMENT UNLOCKED', 'Completionist — Explored every quest log');
          },
        },
      });

      queuedCards.forEach((card, i) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            rotateX: 0,
            duration: CARD_SETTLE,
            ease: 'power2.out',
          },
          i * CARD_STAGGER
        );
      });
    }, stageRef);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, [handleUnlock]);

  const animatedCount = Math.max(quests.length - 1, 0);
  const stageMinHeight = `calc(100vh + ${animatedCount * CARD_STAGGER + STAGE_TAIL}px)`;

  return (
    <section className="quest-log-section" id="quests">
      <div className="quest-log-eyebrow">03 / QUEST LOG</div>
      <p className="quest-log-subtitle">
        Every project is a quest with a real problem, a real fight, and a real outcome.
        Scroll to unroll the log.
      </p>

      <div className="quest-log-unroll-stage" ref={stageRef} style={{ minHeight: stageMinHeight }}>
        <div className="quest-log-unroll-track">
          {quests.map((q) => (
            <div className="quest-log-unroll-card" key={q.id} ref={registerCard}>
              <Quest quest={q} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestLogSection;