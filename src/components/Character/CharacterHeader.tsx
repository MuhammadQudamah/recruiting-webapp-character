import { CharacterTabs } from '../UI/CharacterTabs';

interface CharacterHeaderProps {
  title: string;
  characterCount: number;
  activeIndex: number;
  onAddCharacter: () => void;
  onSelectCharacter: (index: number) => void;
}

export const CharacterHeader = ({
  title,
  characterCount,
  activeIndex,
  onAddCharacter,
  onSelectCharacter
}: CharacterHeaderProps) => (
  <header className="App-header">
    <h1>{title}</h1>
    <CharacterTabs
      count={characterCount}
      activeIndex={activeIndex}
      onAdd={onAddCharacter}
      onSelect={onSelectCharacter}
    />
  </header>
);