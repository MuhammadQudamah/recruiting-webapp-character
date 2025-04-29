import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST } from './consts';
import type { Attributes } from './types';
import { CharacterClasses } from './components/CharacterClasses';

type Character = {
  attributes: Attributes;
};

function App() {
  const [characters, setCharacters] = useState<Character[]>([{
    attributes: {
      Strength: 10,
      Dexterity: 10,
      Constitution: 10,
      Intelligence: 10,
      Wisdom: 10,
      Charisma: 10,
    }
  }]);

  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);

  const calculateModifier = (value: number) => Math.floor((value - 10) / 2);

  const updateAttribute = (attribute: keyof Attributes, value: number) => {
    const newCharacters = [...characters];
    newCharacters[activeCharacterIndex].attributes[attribute] = value;
    setCharacters(newCharacters);
  };

  return (
    <div className="App">
      <header>
        <h1>RPG Character Sheet</h1>
        <div className="character-tabs">
          <button onClick={() => setActiveCharacterIndex(0)}>Character 1</button>
        </div>
      </header>

      <div className="main-content">
        <section className="attributes">
          <h2>Attributes</h2>
          {ATTRIBUTE_LIST.map((attr) => (
            <div key={attr} className="attribute-row">
              <span>{attr}: {characters[activeCharacterIndex].attributes[attr]}</span>
              <button onClick={() => updateAttribute(attr, characters[activeCharacterIndex].attributes[attr] + 1)}>+</button>
              <button onClick={() => updateAttribute(attr, characters[activeCharacterIndex].attributes[attr] - 1)}>-</button>
              <span>Modifier: {calculateModifier(characters[activeCharacterIndex].attributes[attr])}</span>
            </div>
          ))}
        </section>
        <CharacterClasses attributes={characters[activeCharacterIndex].attributes} />
      </div>
    </div>
  );
}

export default App;