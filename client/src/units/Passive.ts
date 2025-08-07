export interface Passive {
    id: string;
    name: string;
    description: string;
    emoji: string; // For visual representation
}

// Stoic - Swordsman's passive
export const Stoic: Passive = {
    id: 'stoic',
    name: 'Stoic',
    description: 'Gain 2 Counter when ending your turn without taking any action.',
    emoji: '🛡️'
};

// Blessing Box - Healer's passive
export const BlessingBox: Passive = {
    id: 'blessing-box',
    name: 'Blessing Box',
    description: 'At the end of each Round, restore 2 Health to all adjacent Allies and this Unit.',
    emoji: '💚'
};

// Toxic Presence - Hater's passive
export const ToxicPresence: Passive = {
    id: 'toxic-presence',
    name: 'Toxic Presence',
    description: 'When moving, leave behind a Toxic Tile which applies 1 Toxicity to a Unit that enters it.',
    emoji: '☣️'
};

// Overwatch - Marksman's passive
export const Overwatch: Passive = {
    id: 'overwatch',
    name: 'Overwatch',
    description: 'If the Marksman skips action phase then creates a spotlight tile in a random unoccupied space.',
    emoji: '🔍'
};

// Mastery - Wizard's passive
export const Mastery: Passive = {
    id: 'mastery',
    name: 'Mastery',
    description: 'When this Unit performs a damage dealing Skill, apply 1 Focus to it.',
    emoji: '🎯'
};

// Passive registry for easy lookup
export const PASSIVE_REGISTRY: Record<string, Passive> = {
    'stoic': Stoic,
    'blessing-box': BlessingBox,
    'toxic-presence': ToxicPresence,
    'overwatch': Overwatch,
    'mastery': Mastery,
};
