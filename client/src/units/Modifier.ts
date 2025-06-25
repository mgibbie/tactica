export enum ModifierTriggerType {
    // Basic Attack Related
    ON_PERFORM_BASIC_ATTACK = "ON_PERFORM_BASIC_ATTACK", // e.g., Strength, Weak, Burn
    ON_RECEIVE_BASIC_ATTACK = "ON_RECEIVE_BASIC_ATTACK", // e.g., Exposed, Sturdy, Leech, Counter

    // Skill (Damage) Related
    ON_PERFORM_SKILL_DAMAGE = "ON_PERFORM_SKILL_DAMAGE", // e.g., Focus, Confusion
    ON_RECEIVE_SKILL_DAMAGE = "ON_RECEIVE_SKILL_DAMAGE", // e.g., Ward, Wet, Sap, Mirror

    // Movement Related
    ON_PERFORM_MOVEMENT = "ON_PERFORM_MOVEMENT", // e.g., Haste, Slow, Bleed, Tired

    // General Skill / Action Related
    ON_PERFORM_ANY_SKILL = "ON_PERFORM_ANY_SKILL", // e.g., Headache
    ON_PERFORM_ACTION_EXCEPT_MOVEMENT = "ON_PERFORM_ACTION_EXCEPT_MOVEMENT", // e.g., Shocked

    // Healing Related
    ON_PERFORM_SKILL_HEAL = "ON_PERFORM_SKILL_HEAL", // e.g., Faith, Doubt
    ON_RECEIVE_SKILL_HEAL = "ON_RECEIVE_SKILL_HEAL", // e.g., Blessed, Cursed

    // Round End Related
    ON_ROUND_END = "ON_ROUND_END", // e.g., Toxicity, Leak, Glitched, Wish, Charge

    // Special / Other
    ON_DEAL_DAMAGE_TO_NON_APPLIER = "ON_DEAL_DAMAGE_TO_NON_APPLIER", // e.g., Anger
}

export interface ModifierDefinition {
    key: string; // Unique key, e.g., "STRENGTH_MOD"
    name: string; // User-friendly name, e.g., "Strength"
    description: string; // "Effect for each stack"
    triggerType: ModifierTriggerType;
    triggerDescription: string; // "Trigger to consume all stacks"
    // Later, we might add specific effect logic or parameters here
}

export interface ActiveModifier {
    modifierKey: string; // Links to ModifierDefinition in a ModifierDex (e.g., "STRENGTH_MOD")
    stacks: number;
    sourceUnitId: string; // ID of the unit that applied this modifier
    // Optional: turnDuration, etc. if not all modifiers are consumed on first trigger
} 