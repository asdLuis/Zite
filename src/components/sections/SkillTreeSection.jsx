import { useEffect } from 'react';
import Branch from '../ui/Branch.jsx';
import { skillTree } from '../../data/profile.js';
import '../../styles/sections/SkillTreeSection.css';

///************************************************************************///
/// Function: SkillTreeSection
/// Description: Renders the skill tree overview and triggers a time-based achievement.
/// Parameters: { handleUnlock } - Function to trigger achievement unlocks.
/// Returns: JSX.Element
///************************************************************************///
const SkillTreeSection = ({ handleUnlock }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleUnlock('fullstack', 'ACHIEVEMENT UNLOCKED', 'Fullstack Journeyman — Analyzed the skill trees');
    }, 60000);
    
    return () => clearTimeout(timer);
  }, [handleUnlock]);

  return (
    <section className="skill-tree-section" id="skills">
      <div className="skill-tree-eyebrow">02 / SKILL TREE</div>
      <p className="skill-tree-subtitle">
        Knowledge unlocked by branch. Solid nodes are learned; hollow nodes are next on the list.
      </p>

      <div className="skill-tree-treewrap">
        {skillTree.map((b) => (
          <Branch key={b.code} code={b.code} name={b.name} nodes={b.nodes} />
        ))}
      </div>
    </section>
  );
};

export default SkillTreeSection;