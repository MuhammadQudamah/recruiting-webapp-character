export type Attributes = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
  };
  
  export type Class = "Barbarian" | "Wizard" | "Bard";
  
  export type Character = {
    attributes: Attributes;
    skills: Record<string, number>;
    skillPoints: number;
  };
  
  export type SkillCheckResult = {
    roll: number;
    success: boolean;
  };