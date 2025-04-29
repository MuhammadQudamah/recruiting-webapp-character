interface CharacterData {
    attributes: {
      Strength: number;
      Dexterity: number;
      Constitution: number;
      Intelligence: number;
      Wisdom: number;
      Charisma: number;
    };
    skills: Record<string, number>;
    skillPoints: number;
  }
  
  export const saveCharacter = async (character: CharacterData, username: string) => {
    const response = await fetch(
      `https://recruiting.verylongdomaintotestwith.ca/api/${username}/character`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(character),
      }
    );
    return await response.json();
  };
  
  export const loadCharacter = async (username: string) => {
    const response = await fetch(
      `https://recruiting.verylongdomaintotestwith.ca/api/${username}/character`
    );
    return await response.json();
  };