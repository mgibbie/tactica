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

// Passive registry for easy lookup
export const PASSIVE_REGISTRY: Record<string, Passive> = {
    'stoic': Stoic,
};
