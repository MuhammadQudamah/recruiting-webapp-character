import type { Attributes, Class } from '../types';
import { CLASS_LIST } from '../consts';

interface CharacterClassesProps {
  attributes: Attributes;
}

export const CharacterClasses = ({ attributes }: CharacterClassesProps) => {
  const meetsRequirements = (className: Class) => {
    const requirements = CLASS_LIST[className];
    return Object.entries(requirements).every(
      ([attr, value]) => attributes[attr as keyof Attributes] >= value
    );
  };

  return (
    <section className="classes-section">
      <h2>Classes</h2>
      <div className="classes-grid">
        {(Object.keys(CLASS_LIST) as Class[]).map(className => (
          <div 
            key={className}
            className={`class-item ${meetsRequirements(className) ? 'meets-requirements' : ''}`}
            onClick={() => alert(`Requirements:\n${JSON.stringify(CLASS_LIST[className], null, 2)}`)}
          >
            {className}
          </div>
        ))}
      </div>
    </section>
  );
};