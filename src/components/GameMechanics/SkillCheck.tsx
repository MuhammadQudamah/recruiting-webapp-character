import { SKILL_LIST } from '../../consts';
import type { Attributes } from '../../types';

interface SkillCheckProps {
  skillCheck: {
    skill: string;
    dc: number;
    result: { roll: number; success: boolean } | null;
  };
  attributes: Attributes;
  skills: Record<string, number>;
  onSkillCheck: (skill: string, dc: number) => void;
  calculateModifier: (value: number) => number;
}

export const SkillCheck = ({
  skillCheck,
  attributes,
  skills,
  onSkillCheck,
  calculateModifier
}: SkillCheckProps) => {
  const handleRoll = () => {
    onSkillCheck(skillCheck.skill, skillCheck.dc);
  };

  return (
    <section className="skill-check-section">
      <h2>Skill Check</h2>
      <div className="skill-check-controls">
        <select
          value={skillCheck.skill}
          onChange={e => onSkillCheck(e.target.value, skillCheck.dc)}
        >
          {SKILL_LIST.map(skill => (
            <option key={skill.name} value={skill.name}>{skill.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={skillCheck.dc}
          onChange={e => onSkillCheck(skillCheck.skill, parseInt(e.target.value) || 0)}
          min="1"
          placeholder="DC"
        />
        <button onClick={handleRoll}>Roll</button>
      </div>
      
      {skillCheck.result && (
        <div className={`skill-check-result ${skillCheck.result.success ? 'success' : 'failure'}`}>
          <p>Rolled: {skillCheck.result.roll} + modifier = {skillCheck.result.roll + 
            calculateModifier(
              attributes[
                SKILL_LIST.find(s => s.name === skillCheck.skill)!.attributeModifier as keyof Attributes
              ]
            )
          } vs DC {skillCheck.dc}</p>
          <p>Result: {skillCheck.result.success ? 'Success!' : 'Failure!'}</p>
        </div>
      )}
    </section>
  );
};