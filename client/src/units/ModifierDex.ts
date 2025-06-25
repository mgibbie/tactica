import { ModifierDefinition, ModifierTriggerType } from './Modifier';

export const MODIFIER_DEX: Record<string, ModifierDefinition> = {
    // Basic Attack Modifiers
    STRENGTH: {
        key: "STRENGTH",
        name: "Strength",
        description: "Basic Attack does +1 damage per stack.",
        triggerType: ModifierTriggerType.ON_PERFORM_BASIC_ATTACK,
        triggerDescription: "Perform a Basic Attack",
    },
    WEAK: {
        key: "WEAK",
        name: "Weak",
        description: "Basic Attack does -1 damage per stack.",
        triggerType: ModifierTriggerType.ON_PERFORM_BASIC_ATTACK,
        triggerDescription: "Perform a Basic Attack",
    },
    EXPOSED: {
        key: "EXPOSED",
        name: "Exposed",
        description: "Take 1 more damage per stack from Basic Attacks that target you.",
        triggerType: ModifierTriggerType.ON_RECEIVE_BASIC_ATTACK,
        triggerDescription: "Be the target of a Basic Attack",
    },
    STURDY: {
        key: "STURDY",
        name: "Sturdy",
        description: "Take 1 less damage per stack from Basic Attacks that target you.",
        triggerType: ModifierTriggerType.ON_RECEIVE_BASIC_ATTACK,
        triggerDescription: "Be the target of a Basic Attack",
    },
    LEECH: {
        key: "LEECH",
        name: "Leech",
        description: "Give 1 Health per stack to the Unit that applied this Modifier to you.",
        triggerType: ModifierTriggerType.ON_RECEIVE_BASIC_ATTACK,
        triggerDescription: "Be the target of a Basic Attack",
    },
    COUNTER: {
        key: "COUNTER",
        name: "Counter",
        description: "Deal 1 damage per stack to the Unit that targets you with a Basic Attack.",
        triggerType: ModifierTriggerType.ON_RECEIVE_BASIC_ATTACK,
        triggerDescription: "Be the target of a Basic Attack",
    },
    BURN: { // Also triggered by performing a basic attack
        key: "BURN",
        name: "Burn",
        description: "Take 1 damage per stack.",
        triggerType: ModifierTriggerType.ON_PERFORM_BASIC_ATTACK,
        triggerDescription: "Perform a Basic Attack",
    },

    // Skill (Damage) Modifiers
    FOCUS: {
        key: "FOCUS",
        name: "Focus",
        description: "Skills do +1 damage per stack.",
        triggerType: ModifierTriggerType.ON_PERFORM_SKILL_DAMAGE,
        triggerDescription: "Perform a Skill which deals Damage",
    },
    CONFUSION: {
        key: "CONFUSION",
        name: "Confusion",
        description: "Skills do -1 damage per stack.",
        triggerType: ModifierTriggerType.ON_PERFORM_SKILL_DAMAGE,
        triggerDescription: "Perform a Skill which deals Damage",
    },
    WARD: {
        key: "WARD",
        name: "Ward",
        description: "Take 1 less damage per stack from Skills that target you.",
        triggerType: ModifierTriggerType.ON_RECEIVE_SKILL_DAMAGE,
        triggerDescription: "Be the target of a Skill which deals Damage to you",
    },
    WET: {
        key: "WET",
        name: "Wet",
        description: "Take 1 more damage per stack from Skills that target you.",
        triggerType: ModifierTriggerType.ON_RECEIVE_SKILL_DAMAGE,
        triggerDescription: "Be the target of a Skill which deals Damage to you",
    },
    SAP: {
        key: "SAP",
        name: "Sap",
        description: "Give 1 Energy per stack to the Unit that applied this Modifier to you.",
        triggerType: ModifierTriggerType.ON_RECEIVE_SKILL_DAMAGE,
        triggerDescription: "Be the target of a Skill which deals Damage to you",
    },
    MIRROR: {
        key: "MIRROR",
        name: "Mirror",
        description: "Deal 1 damage per stack to the Unit that targets you with a Skill.",
        triggerType: ModifierTriggerType.ON_RECEIVE_SKILL_DAMAGE,
        triggerDescription: "Be the target of a Skill which deals Damage to you",
    },

    // Movement Modifiers
    HASTE: {
        key: "HASTE",
        name: "Haste",
        description: "Movement range is increased by 1 per stack.",
        triggerType: ModifierTriggerType.ON_PERFORM_MOVEMENT,
        triggerDescription: "Perform any movement",
    },
    SLOW: {
        key: "SLOW",
        name: "Slow",
        description: "Movement range is decreased by 1 per stack.",
        triggerType: ModifierTriggerType.ON_PERFORM_MOVEMENT,
        triggerDescription: "Perform any movement",
    },
    BLEED: {
        key: "BLEED",
        name: "Bleed",
        description: "Take 1 damage per stack per Tile moved.",
        triggerType: ModifierTriggerType.ON_PERFORM_MOVEMENT,
        triggerDescription: "Perform any movement",
    },
    TIRED: {
        key: "TIRED",
        name: "Tired",
        description: "Lose 1 energy per stack per Tile moved.",
        triggerType: ModifierTriggerType.ON_PERFORM_MOVEMENT,
        triggerDescription: "Perform any movement",
    },

    // General Skill / Action Modifiers
    HEADACHE: {
        key: "HEADACHE",
        name: "Headache",
        description: "Take 1 damage per stack.",
        triggerType: ModifierTriggerType.ON_PERFORM_ANY_SKILL,
        triggerDescription: "Perform any Skill",
    },
    SHOCKED: {
        key: "SHOCKED",
        name: "Shocked",
        description: "Lose 1 Energy per stack.",
        triggerType: ModifierTriggerType.ON_PERFORM_ACTION_EXCEPT_MOVEMENT,
        triggerDescription: "Perform an action besides movement",
    },

    // Healing Modifiers
    BLESSED: {
        key: "BLESSED",
        name: "Blessed",
        description: "Restore +1 Health per stack.",
        triggerType: ModifierTriggerType.ON_RECEIVE_SKILL_HEAL,
        triggerDescription: "Be the target of a Skill that restores Health",
    },
    CURSED: {
        key: "CURSED",
        name: "Cursed",
        description: "Restore -1 Health per stack.",
        triggerType: ModifierTriggerType.ON_RECEIVE_SKILL_HEAL,
        triggerDescription: "Be the target of a Skill that restores Health",
    },
    FAITH: {
        key: "FAITH",
        name: "Faith",
        description: "Restore 1 more Health per stack with a Skill that restores Health.",
        triggerType: ModifierTriggerType.ON_PERFORM_SKILL_HEAL,
        triggerDescription: "Perform a Skill that restores Health",
    },
    DOUBT: {
        key: "DOUBT",
        name: "Doubt",
        description: "Restore 1 less Health per stack with a Skill that restores Health.",
        triggerType: ModifierTriggerType.ON_PERFORM_SKILL_HEAL,
        triggerDescription: "Perform a Skill that restores Health",
    },

    // Round End Modifiers
    TOXICITY: {
        key: "TOXICITY",
        name: "Toxicity",
        description: "Take 1 damage per stack.",
        triggerType: ModifierTriggerType.ON_ROUND_END,
        triggerDescription: "The Round ends",
    },
    LEAK: {
        key: "LEAK",
        name: "Leak",
        description: "Lose 1 Energy per stack.",
        triggerType: ModifierTriggerType.ON_ROUND_END,
        triggerDescription: "The Round ends",
    },
    GLITCHED: {
        key: "GLITCHED",
        name: "Glitched",
        description: "Teleport to 1 random Tile on the map (effect happens once regardless of stacks, then consumes).",
        triggerType: ModifierTriggerType.ON_ROUND_END,
        triggerDescription: "The Round ends",
    },
    WISH: {
        key: "WISH",
        name: "Wish",
        description: "Gain 1 Health per stack.",
        triggerType: ModifierTriggerType.ON_ROUND_END,
        triggerDescription: "The Round ends",
    },
    CHARGE: {
        key: "CHARGE",
        name: "Charge",
        description: "Gain 1 Energy per stack.",
        triggerType: ModifierTriggerType.ON_ROUND_END,
        triggerDescription: "The Round ends",
    },

    // Special/Other
    ANGER: {
        key: "ANGER",
        name: "Anger",
        description: "Take 1 damage per stack.",
        triggerType: ModifierTriggerType.ON_DEAL_DAMAGE_TO_NON_APPLIER,
        triggerDescription: "Deal damage to any target besides the one which applied this Modifier to you",
    },
}; 