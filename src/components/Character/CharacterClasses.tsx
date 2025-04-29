import { ClassRequirementsModal } from '../GameMechanics/ClassRequirementsModal';
import { CLASS_LIST } from '../../consts';
import type { Attributes, Class } from '../../types';

interface CharacterClassesProps {
  attributes: Attributes;
  selectedClass: Class | null;
  onSelectClass: (className: Class | null) => void;
}

export const CharacterClasses = ({
  attributes = {} as Attributes,
  selectedClass,
  onSelectClass
}: CharacterClassesProps) => {
  const meetsRequirements = (className: Class) => {
    const requirements = CLASS_LIST[className];
    return (Object.entries(requirements) as [keyof Attributes, number][]).every(
      ([attr, value]) => (attributes[attr] || 0) >= value
    );
  };

  return (
    <section className="classes-section">
      <h2>Classes</h2>
      <div className="classes-grid">
        {(Object.keys(CLASS_LIST) as Class[]).map(className => (
          <div key={className} className="class-container">
            <div
              className={`class-item ${meetsRequirements(className) ? 'meets-requirements' : ''}`}
              onClick={() => onSelectClass(className)}
            >
              {className}
            </div>
            {selectedClass === className && (
              <ClassRequirementsModal
                className={className}
                attributes={attributes}
                requirements={CLASS_LIST[className]}
                onClose={() => onSelectClass(null)}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};