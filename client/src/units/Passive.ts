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

// Walking Ward - Sigilbearer's passive
export const WalkingWard: Passive = {
    id: 'walking-ward',
    name: 'Walking Ward',
    description: 'When moving, leave behind a Mist Tile which blocks vision and provides concealment.',
    emoji: '🌫️'
};

// Beatbox - Hypeman's passive
export const Beatbox: Passive = {
    id: 'beatbox',
    name: 'Beatbox',
    description: 'At the end of this unit\'s turn, give 1 stack of a random modifier to all adjacent units (cardinally and diagonally adjacent).',
    emoji: '🎵'
};

// Rally Cry - Bannerman's passive
export const RallyCry: Passive = {
    id: 'rally-cry',
    name: 'Rally Cry',
    description: 'At the end of this unit\'s turn, all allied units gain 1 Energy.',
    emoji: '📢'
};

// Resolute - Shieldbearer's passive
export const Resolute: Passive = {
    id: 'resolute',
    name: 'Resolute',
    description: 'When this unit is the target of a Basic Attack, gain 1 Sturdy.',
    emoji: '🛡️'
};

// Death of a Salesman - Salesman's passive
export const DeathOfASalesman: Passive = {
    id: 'death-of-a-salesman',
    name: 'Death of a Salesman',
    description: 'When this unit dies, start the next Shop Phase with 1 additional Resource.',
    emoji: '💰'
};

// Rabbit Riding - Rabbit Rider's passive
export const RabbitRiding: Passive = {
    id: 'rabbit-riding',
    name: 'Rabbit Riding',
    description: "When this unit dies, it becomes a Rabbit with the same stats, skills, and passives (excluding Rabbit Riding). If the Rabbit survives to the end of the round, it reverts back.",
    emoji: '🐇'
};

// Lucky Rabbit Foot - survive first lethal damage per battle at 1 Health
export const LuckyRabbitFoot: Passive = {
    id: 'lucky-rabbit-foot',
    name: 'Lucky Rabbit Foot',
    description: 'The first time this unit would take lethal damage each battle, it instead survives at 1 Health.',
    emoji: '🐾'
};

// Sentry - Turret passive
export const Sentry: Passive = {
    id: 'sentry',
    name: 'Sentry',
    description: 'Deal 1 damage to any Unit entering, starting, or ending its Turn within Range = 2.',
    emoji: '🎯'
};

// Flag Fervor - Flag structure passive
export const FlagFervor: Passive = {
    id: 'flag-fervor',
    name: 'Flag Fervor',
    description: 'Allied units that start their turn within Range = 2 gain 5 Energy.',
    emoji: '🏴'
};

// Passive registry for easy lookup
export const PASSIVE_REGISTRY: Record<string, Passive> = {
    'stoic': Stoic,
    'blessing-box': BlessingBox,
    'toxic-presence': ToxicPresence,
    'overwatch': Overwatch,
    'mastery': Mastery,
    'walking-ward': WalkingWard,
    'beatbox': Beatbox,
    'rally-cry': RallyCry,
    'resolute': Resolute,
    'death-of-a-salesman': DeathOfASalesman,
    'rabbit-riding': RabbitRiding,
    'lucky-rabbit-foot': LuckyRabbitFoot,
    'sentry': Sentry,
    'flag-fervor': FlagFervor,
};

// Builder - My Baby!
export const MyBaby: Passive = {
    id: 'my-baby',
    name: 'My Baby!',
    description: 'After anything Created by this Unit is Killed, apply 1 Strength and 1 Focus to this Unit.',
    emoji: '🧱'
};

// Extend registry
PASSIVE_REGISTRY['my-baby'] = MyBaby;

// Soulbound - sub-unit dies when its creator dies
export const Soulbound: Passive = {
    id: 'soulbound',
    name: 'Soulbound',
    description: 'This unit dies if the Unit that created it dies.',
    emoji: '🧬'
};

PASSIVE_REGISTRY['soulbound'] = Soulbound;