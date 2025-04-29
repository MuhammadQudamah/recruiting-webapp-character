import { ATTRIBUTE_LIST } from '../../consts';
import type { Attributes } from '../../types';

interface CharacterAttributesProps {
  attributes: Attributes;
  onUpdate: (attribute: keyof Attributes, value: number) => void;
  calculateModifier: (value: number) => number;
}

export const CharacterAttributes = ({
  attributes = {} as Attributes,
  onUpdate,
  calculateModifier
}: CharacterAttributesProps) => (
  <section className="attributes-section">
    <h2>Attributes</h2>
    <div className="attributes-grid">
      {(ATTRIBUTE_LIST as Array<keyof Attributes>).map((attr) => (
        <div key={attr} className="attribute-row">
          <span className="attribute-name">{attr}:</span>
          <span className="attribute-value">{attributes[attr]}</span>
          <div className="attribute-buttons">
            <button onClick={() => onUpdate(attr, attributes[attr] + 1)}>+</button>
            <button onClick={() => onUpdate(attr, attributes[attr] - 1)}>-</button>
          </div>
          <span className="attribute-modifier">
            Modifier: {calculateModifier(attributes[attr])}
          </span>
        </div>
      ))}
    </div>
  </section>
);