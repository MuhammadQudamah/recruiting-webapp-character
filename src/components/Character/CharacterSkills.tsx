import { SKILL_LIST } from '../../consts';
import type { Attributes } from '../../types';

interface CharacterSkillsProps {
  skills: Record<string, number>;
  attributes: Attributes;
  skillPoints: number;
  onUpdateSkill: (skillName: string, value: number) => void;
  calculateModifier: (value: number) => number;
}

export const CharacterSkills = ({
  skills = {},
  attributes = {} as Attributes,
  skillPoints = 0,
  onUpdateSkill,
  calculateModifier
}: CharacterSkillsProps) => {
  const pointsLeft = skillPoints - Object.values(skills).reduce((a, b) => a + b, 0);

  return (
    <section className="skills-section">
      <h2>Skills (Points left: {pointsLeft})</h2>
      <div className="skills-grid">
        {SKILL_LIST.map(skill => {
          const modifier = calculateModifier(attributes[skill.attributeModifier as keyof Attributes] || 0);
          const total = (skills[skill.name] || 0) + modifier;
          
          return (
            <div key={skill.name} className="skill-row">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-points">Points: {skills[skill.name] || 0}</span>
              <div className="skill-buttons">
                <button onClick={() => onUpdateSkill(skill.name, (skills[skill.name] || 0) + 1)}>+</button>
                <button onClick={() => onUpdateSkill(skill.name, (skills[skill.name] || 0) - 1)}>-</button>
              </div>
              <span className="skill-modifier">Modifier ({skill.attributeModifier}): {modifier}</span>
              <span className="skill-total">Total: {total}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};