interface CharacterTabsProps {
    count: number;
    activeIndex: number;
    onAdd: () => void;
    onSelect: (index: number) => void;
  }
  
  export const CharacterTabs = ({ count, activeIndex, onAdd, onSelect }: CharacterTabsProps) => (
    <div className="character-selector">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`character-tab ${activeIndex === index ? 'active' : ''}`}
          onClick={() => onSelect(index)}
        >
          Character {index + 1}
        </button>
      ))}
      <button className="add-character" onClick={onAdd}>+ Add Character</button>
    </div>
  );