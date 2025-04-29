import { useState } from 'react';
import './App.css';
import { CharacterHeader } from './components/Character/CharacterHeader';
import { CharacterAttributes } from './components/Character/CharacterAttributes';
import { CharacterClasses } from './components/Character/CharacterClasses';
import { CharacterSkills } from './components/Character/CharacterSkills';
import { SkillCheck } from './components/GameMechanics/SkillCheck';
import { ActionButtons } from './components/UI/ActionButtons';
import { AlertModal } from './components/UI/AlertModal';
import { saveCharacter, loadCharacter } from './services/api';
import { SKILL_LIST } from './consts';
import type { Attributes, Class } from './types';
import { debug } from 'console';

type Character = {
  attributes: Attributes;
  skills: Record<string, number>;
  skillPoints: number;
};

type SkillCheckState = {
  skill: string;
  dc: number;
  result: { roll: number; success: boolean } | null;
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
    },
    skills: SKILL_LIST.reduce((acc, skill) => ({ ...acc, [skill.name]: 0 }), {}),
    skillPoints: 10,
  }]);

  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const [skillCheck, setSkillCheck] = useState<SkillCheckState>({
    skill: SKILL_LIST[0].name,
    dc: 10,
    result: null,
  });
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [showAttributeLimitAlert, setShowAttributeLimitAlert] = useState(false);

  const activeCharacter = characters[activeCharacterIndex];

  const calculateModifier = (value: number) => Math.floor((value - 10) / 2);

  const updateAttribute = (attribute: keyof Attributes, value: number) => {
    const newValue = Math.max(0, Math.min(70, value));
    const totalAttributes = Object.values(activeCharacter.attributes).reduce((a, b) => a + b, 0) - 
      activeCharacter.attributes[attribute] + newValue;

    if (totalAttributes > 70) {
      setShowAttributeLimitAlert(true);
      setTimeout(() => setShowAttributeLimitAlert(false), 3000);
      return;
    }

    const newCharacters = [...characters];
    newCharacters[activeCharacterIndex].attributes[attribute] = newValue;
    
    if (attribute === 'Intelligence') {
      const intMod = calculateModifier(newValue);
      newCharacters[activeCharacterIndex].skillPoints = 10 + (4 * intMod);
    }
    
    setCharacters(newCharacters);
  };

  const updateSkill = (skillName: string, value: number) => {
    const newValue = Math.max(0, value);
    const currentSpent = Object.values(activeCharacter.skills).reduce((a, b) => a + b, 0);
    const remainingPoints = activeCharacter.skillPoints - currentSpent + activeCharacter.skills[skillName];
    
    if (newValue <= activeCharacter.skills[skillName] || remainingPoints >= newValue - activeCharacter.skills[skillName]) {
      const newCharacters = [...characters];
      newCharacters[activeCharacterIndex].skills[skillName] = newValue;
      setCharacters(newCharacters);
    }
  };

  const addCharacter = () => {
    setCharacters([...characters, {
      attributes: {
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10,
      },
      skills: SKILL_LIST.reduce((acc, skill) => ({ ...acc, [skill.name]: 0 }), {}),
      skillPoints: 10,
    }]);
    setActiveCharacterIndex(characters.length);
  };

  const resetAllCharacters = () => {
    if (window.confirm('Are you sure you want to reset all characters? This cannot be undone.')) {
      setCharacters([{
        attributes: {
          Strength: 10,
          Dexterity: 10,
          Constitution: 10,
          Intelligence: 10,
          Wisdom: 10,
          Charisma: 10,
        },
        skills: SKILL_LIST.reduce((acc, skill) => ({ ...acc, [skill.name]: 0 }), {}),
        skillPoints: 10,
      }]);
      setActiveCharacterIndex(0);
      setSelectedClass(null);
    }
  };

  const handleSkillCheck = (skill: string, dc: number) => {
    const skillObj = SKILL_LIST.find(s => s.name === skill);
    if (!skillObj) return;
    
    const modifier = calculateModifier(
      activeCharacter.attributes[skillObj.attributeModifier as keyof Attributes]
    );
    const skillTotal = activeCharacter.skills[skill] + modifier;
    const roll = Math.floor(Math.random() * 20) + 1;
    
    setSkillCheck({
      skill,
      dc,
      result: {
        roll,
        success: roll + skillTotal >= dc
      }
    });
  };

  return (
    <div className="App">
      <AlertModal 
        message="Total attributes cannot exceed 70 points!" 
        show={showAttributeLimitAlert} 
      />
      
      <CharacterHeader
        title="RPG Character Sheet"
        characterCount={characters.length}
        activeIndex={activeCharacterIndex}
        onAddCharacter={addCharacter}
        onSelectCharacter={setActiveCharacterIndex}
      />

      <main className="character-main">
        <SkillCheck
          skillCheck={skillCheck}
          attributes={activeCharacter.attributes}
          skills={activeCharacter.skills}
          onSkillCheck={handleSkillCheck}
          calculateModifier={calculateModifier}
        />

        <div className="attributes-classes-container">
          <CharacterAttributes
            attributes={activeCharacter.attributes}
            onUpdate={updateAttribute}
            calculateModifier={calculateModifier}
          />
          <CharacterClasses
            attributes={activeCharacter.attributes}
            selectedClass={selectedClass}
            onSelectClass={setSelectedClass}
          />
        </div>

        <CharacterSkills
          skills={activeCharacter.skills}
          attributes={activeCharacter.attributes}
          skillPoints={activeCharacter.skillPoints}
          onUpdateSkill={updateSkill}
          calculateModifier={calculateModifier}
        />

        <ActionButtons
          onSave={() => saveCharacter(activeCharacter, '{MuhammadQudamah}')}
          onLoad={async () => {
            const data = await loadCharacter('{MuhammadQudamah}');
            if (data) {
              debugger
              const newCharacters = [...characters];
              newCharacters[activeCharacterIndex] = data.body;
              setCharacters(newCharacters);
            }
          }}
          onReset={resetAllCharacters}
        />
      </main>
    </div>
  );
}

export default App;