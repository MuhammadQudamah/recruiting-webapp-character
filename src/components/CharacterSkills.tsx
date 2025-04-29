import { SKILL_LIST } from '../consts';
import type { Attributes } from '../types';

interface CharacterSkillsProps {
  skills: Record<string, number>;
  attributes: Attributes;
  skillPoints: number;
  onUpdateSkill: (skillName: string, value: number) => void;
  calculateModifier: (value: number) => number;
}

export const CharacterSkills = ({
  skills,
  attributes,
  skillPoints,
  onUpdateSkill,
  calculateModifier
}: CharacterSkillsProps) => {
  return (
    <section className="skills-section">
      <h2>Skills (Points left: {skillPoints})</h2>
      <div className="skills-grid">
        {SKILL_LIST.map(skill => {
          const modifier = calculateModifier(attributes[skill.attributeModifier]);
          return (
            <div key={skill.name} className="skill-row">
              <span>{skill.name}</span>
              <span>Points: {skills[skill.name] || 0}</span>
              <button onClick={() => onUpdateSkill(skill.name, (skills[skill.name] || 0) + 1)}>+</button>
              <button onClick={() => onUpdateSkill(skill.name, (skills[skill.name] || 0) - 1)}>-</button>
              <span>Mod: {modifier}</span>
              <span>Total: {(skills[skill.name] || 0) + modifier}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};