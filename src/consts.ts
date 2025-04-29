export const ATTRIBUTE_LIST = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma',
] as const;

export const CLASS_LIST = {
  'Barbarian': {
    'Strength': 14,
    'Dexterity': 9,
    'Constitution': 9,
    'Intelligence': 9,
    'Wisdom': 9,
    'Charisma': 9,
  },
  'Wizard': {
    'Strength': 9,
    'Dexterity': 9,
    'Constitution': 9,
    'Intelligence': 14,
    'Wisdom': 9,
    'Charisma': 9,
  },
  'Bard': {
    'Strength': 9,
    'Dexterity': 9,
    'Constitution': 9,
    'Intelligence': 9,
    'Wisdom': 9,
    'Charisma': 14,
  }
} as const;