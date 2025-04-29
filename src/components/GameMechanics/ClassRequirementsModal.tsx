import type { Attributes, Class } from '../../types';

interface ClassRequirementsModalProps {
  className: Class;
  attributes: Attributes;
  requirements: Attributes;
  onClose: () => void;
}

export const ClassRequirementsModal = ({
  className,
  attributes,
  requirements,
  onClose
}: ClassRequirementsModalProps) => (
  <div className="class-requirements">
    <h3>{className} Requirements</h3>
    <button 
      className="close-requirements"
      onClick={onClose}
    >
      ×
    </button>
    <ul>
      {Object.entries(requirements).map(([attr, value]) => (
        <li key={attr}>
          {attr}: {value} (Current: {attributes[attr as keyof Attributes]})
          <span className={attributes[attr as keyof Attributes] >= value ? 'requirement-met' : 'requirement-not-met'}>
            {attributes[attr as keyof Attributes] >= value ? '✓' : '✗'}
          </span>
        </li>
      ))}
    </ul>
  </div>
);