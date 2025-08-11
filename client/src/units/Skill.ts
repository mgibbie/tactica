export type TargetingType = 'non-rotational' | 'unit-rotational' | 'target-rotational' | 'dual-rotational' | 'adjacent-attack';

export type Direction = 'north' | 'east' | 'south' | 'west';

export interface SkillTarget {
    x: number;
    y: number;
    isPrimary?: boolean; // For target-rotational skills
}

export interface Skill {
    id: string;
    name: string;
    description: string;
    energyCost: number;
    bonusDamage: number; // Added to unit's skillDamage stat
    targetingType: TargetingType;
    emoji: string; // For visual effects
    
    // Returns the affected tiles relative to the target position
    // For unit-rotational: target is the caster, direction matters
    // For target-rotational: target is the primary target, rotation matters
    // For non-rotational: target is the primary target, no rotation
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number) => SkillTarget[];
}

// Blazing Knuckle - hits 4 cardinal directions around the target
export const BlazingKnuckle: Skill = {
    id: 'blazing-knuckle',
    name: 'Blazing Knuckle',
    description: 'Unleashes fiery strikes in all cardinal directions around the target',
    energyCost: 3,
    bonusDamage: 3,
    targetingType: 'non-rotational',
    emoji: '🔥',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [
            { x: targetX, y: targetY - 1, isPrimary: false }, // North
            { x: targetX + 1, y: targetY, isPrimary: false }, // East  
            { x: targetX, y: targetY + 1, isPrimary: false }, // South
            { x: targetX - 1, y: targetY, isPrimary: false }, // West
        ];
    }
};

// Tera Fire - primary target + rotatable diagonal secondary target
export const TeraFire: Skill = {
    id: 'tera-fire',
    name: 'Tera Fire',
    description: 'Strikes primary target and a diagonal secondary target. Secondary target can be rotated.',
    energyCost: 3,
    bonusDamage: 3,
    targetingType: 'dual-rotational',
    emoji: '🔥',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // rotation determines diagonal position: 0=NE, 1=SE, 2=SW, 3=NW
        const rotationStep = rotation || 0;
        
        // Calculate diagonal offset based on rotation
        let diagX = 1, diagY = -1; // Default: Northeast
        
        switch (rotationStep % 4) {
            case 0: diagX = 1; diagY = -1; break;  // Northeast
            case 1: diagX = 1; diagY = 1; break;   // Southeast  
            case 2: diagX = -1; diagY = 1; break;  // Southwest
            case 3: diagX = -1; diagY = -1; break; // Northwest
        }
        
        return [
            { x: targetX, y: targetY, isPrimary: true },                    // Primary target
            { x: targetX + diagX, y: targetY + diagY, isPrimary: false },   // Secondary diagonal target
        ];
    }
};

// Universal Whisper - healing version of Tera Fire for Healer
export const UniversalWhisper: Skill = {
    id: 'universal-whisper',
    name: 'Universal Whisper',
    description: 'Heals primary target and a diagonal secondary target. Secondary target can be rotated.',
    energyCost: 4,
    bonusDamage: 1, // Used as bonus healing instead
    targetingType: 'dual-rotational',
    emoji: '🪐',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Same pattern as Tera Fire: rotation determines diagonal position: 0=NE, 1=SE, 2=SW, 3=NW
        const rotationStep = rotation || 0;
        
        // Calculate diagonal offsets based on rotation
        const diagonalOffsets = [
            { x: 1, y: -1 },  // 0: Northeast
            { x: 1, y: 1 },   // 1: Southeast  
            { x: -1, y: 1 },  // 2: Southwest
            { x: -1, y: -1 }  // 3: Northwest
        ];
        
        const diagonalOffset = diagonalOffsets[rotationStep % 4];
        
        return [
            { x: targetX, y: targetY }, // Primary target
            { x: targetX + diagonalOffset.x, y: targetY + diagonalOffset.y } // Secondary diagonal target
        ];
    }
};

// Healing Circle - healing version of Blazing Knuckle for Healer
export const HealingCircle: Skill = {
    id: 'healing-circle',
    name: 'Healing Circle',
    description: 'Creates a circle of healing energy that affects all cardinal directions around the target.',
    energyCost: 6,
    bonusDamage: 3, // Used as bonus healing instead
    targetingType: 'non-rotational',
    emoji: '⭐',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [
            { x: targetX, y: targetY - 1, isPrimary: false }, // North
            { x: targetX + 1, y: targetY, isPrimary: false }, // East  
            { x: targetX, y: targetY + 1, isPrimary: false }, // South
            { x: targetX - 1, y: targetY, isPrimary: false }, // West
        ];
    }
};

// Finger of God - powerful single-target heal at range 1 (adjacent)
export const FingerOfGod: Skill = {
    id: 'finger-of-god',
    name: 'Finger of God',
    description: 'Heal a target exactly 1 tile away in a cardinal direction for (Skill Damage + 5). Costs 8 energy.',
    energyCost: 8,
    bonusDamage: 5, // Used as bonus healing instead
    targetingType: 'adjacent-attack',
    emoji: '👆',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Single adjacent target
        return [
            { x: targetX, y: targetY }
        ];
    }
};

// Beam - damaging ranged attack for Healer
export const Beam: Skill = {
    id: 'beam',
    name: 'Beam',
    description: 'Focus energy into a concentrated beam that can target enemies 2 squares away in cardinal directions.',
    energyCost: 2,
    bonusDamage: 2,
    targetingType: 'adjacent-attack',
    emoji: '✨',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // For adjacent-attack, we just return the single target position
        // The targeting system will handle showing the valid beam targets
        return [
            { x: targetX, y: targetY }
        ];
    }
};

// Light's On - creates spotlight tiles in a row
export const LightsOn: Skill = {
    id: 'lights-on',
    name: "Light's On",
    description: 'Target 3 squares away in any cardinal direction to create a row of 3 spotlight tiles centered on that position. Spotlights trigger when enemies step on them, causing the caster to attack if in range.',
    energyCost: 4,
    bonusDamage: 0, // No direct damage, this is a tile placement skill
    targetingType: 'adjacent-attack',
    emoji: '🔍',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // For adjacent-attack, targetX/Y is the selected target position (3 squares away from caster)
        // We need to create a row of 3 tiles centered on this position
        
        // The row orientation depends on the relative position from caster
        // This will be determined in the skill handler based on caster and target positions
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Star Song - heal all allies on the map for a flat amount (does not heal self)
export const StarSong: Skill = {
    id: 'star-song',
    name: 'Star Song',
    description: 'Heal all allied units on the map (except self) for 3. Costs 7 energy.',
    energyCost: 7,
    bonusDamage: 0, // Not used; handled specially in SkillHandler
    targetingType: 'non-rotational',
    emoji: '🎵',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Pattern not used; auto-executes
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Symphony - heal allies within range 2 and debuff enemies within range 2
export const Symphony: Skill = {
    id: 'symphony',
    name: 'Symphony',
    description: 'Restore (Skill Damage) Health to all Allied Units within Range = 2. Apply 3 Headache to all Enemy Units within Range = 2. Costs 10 energy.',
    energyCost: 10,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🎼',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        const targets: SkillTarget[] = [];
        for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
                const dist = Math.abs(dx) + Math.abs(dy);
                if (dist > 0 && dist <= 2) {
                    targets.push({ x: targetX + dx, y: targetY + dy, isPrimary: false });
                }
            }
        }
        return targets;
    }
};

// Hurricane Slash - melee attack skill for Hater
export const HurricaneSlash: Skill = {
    id: 'hurricane-slash',
    name: 'Hurricane Slash',
    description: 'A powerful melee attack that can target any adjacent enemy within 1 range.',
    energyCost: 3,
    bonusDamage: 3,
    targetingType: 'adjacent-attack',
    emoji: '🌩️',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // For adjacent-attack, we just return the single target position
        // The targeting system will handle showing the 4 adjacent squares as valid targets
        return [
            { x: targetX, y: targetY }
        ];
    }
};

// Bandage - self-healing skill
export const Bandage: Skill = {
    id: 'bandage',
    name: 'Bandage',
    description: 'Heals the user for (Skill Damage + 1) Health. Targets self only.',
    energyCost: 2,
    bonusDamage: 1, // Used as bonus healing (Skill Damage + 1)
    targetingType: 'non-rotational',
    emoji: '🩹',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Self-targeting skill - only affects the caster's position
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Teleport - teleportation skill for Swordsman
export const Teleport: Skill = {
    id: 'teleport',
    name: 'Teleport',
    description: 'Teleports the user 3 squares in any cardinal direction without triggering tile effects along the path.',
    energyCost: 1,
    bonusDamage: 0, // No damage, this is a movement skill
    targetingType: 'non-rotational',
    emoji: '⚡',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Teleport skill - only affects the destination position
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Prepare - applies Strength and Sturdy modifiers to self
export const Prepare: Skill = {
    id: 'prepare',
    name: 'Prepare',
    description: 'Grants 1 stack of Strength (+1 Basic Attack damage) and 1 stack of Sturdy (-1 Basic Attack damage taken). Targets self only.',
    energyCost: 1,
    bonusDamage: 0, // No damage, this is a buff skill
    targetingType: 'non-rotational',
    emoji: '🛡️',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Self-targeting skill - only affects the caster's position
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Zero In - applies Focus and Strength to self
export const ZeroIn: Skill = {
    id: 'zero-in',
    name: 'Zero In',
    description: 'Apply 1 Focus (+1 Skill damage) and 1 Strength (+1 Basic Attack damage) to yourself. Targets self only.',
    energyCost: 1,
    bonusDamage: 0, // No damage, this is a buff skill
    targetingType: 'non-rotational',
    emoji: '🎯',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Self-targeting skill - only affects the caster's position
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Divination - wizard self-buff: Focus + Charge
export const Divination: Skill = {
    id: 'divination',
    name: 'Divination',
    description: 'Apply 1 Focus and 5 Charge to yourself. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0, // No damage, self-buff
    targetingType: 'non-rotational',
    emoji: '🔮',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Longshot - long-range precision attack for Marksman
export const Longshot: Skill = {
    id: 'longshot',
    name: 'Longshot',
    description: 'A precision shot that can hit targets 5 squares away in any cardinal direction. Costs 5 energy, deals (Skill Damage - 1) damage.',
    energyCost: 5,
    bonusDamage: -1, // Deals skill damage - 1
    targetingType: 'adjacent-attack',
    emoji: '🎯',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // For adjacent-attack, we just return the single target position
        // The targeting system will handle showing the valid longshot targets at range 5
        return [
            { x: targetX, y: targetY }
        ];
    }
};

// Toxic Cloud - creates toxic tiles in a rotatable line for Hater
export const ToxicCloud: Skill = {
    id: 'toxic-cloud',
    name: 'Toxic Cloud',
    description: 'Target 1 square away in any cardinal direction to create a line of 3 toxic tiles centered on that position. Toxic tiles apply 1 Toxic to units that enter them, then disappear.',
    energyCost: 4,
    bonusDamage: 0, // No direct damage, this is a tile placement skill
    targetingType: 'adjacent-attack',
    emoji: '☢️',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // For adjacent-attack, targetX/Y is the selected target position (1 square away from caster)
        // We need to create a line of 3 tiles centered on this position
        
        // The line orientation depends on the relative position from caster
        // This will be determined in the skill handler based on caster and target positions
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Exhaust - applies debuff modifiers to enemy units for Hater
export const Exhaust: Skill = {
    id: 'exhaust',
    name: 'Exhaust',
    description: 'Apply 1 Weak, 1 Slow, and 1 Tired to target enemy unit within range 4. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0, // No direct damage, this is a debuff skill
    targetingType: 'dual-rotational', // Allows targeting any tile within range (no rotation needed)
    emoji: '😴',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Single target skill - just target the selected position
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Jeer - applies Exposed and Weak modifiers to enemy units for Hater
export const Jeer: Skill = {
    id: 'jeer',
    name: 'Jeer',
    description: 'Apply 3 Exposed and 3 Weak to target enemy unit within range 3. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0, // No direct damage, this is a debuff skill
    targetingType: 'dual-rotational', // Allows targeting any tile within range (no rotation needed)
    emoji: '😈',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Single target skill - just target the selected position
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Poison Dart - Hater ranged poison attack
export const PoisonDart: Skill = {
    id: 'poison-dart',
    name: 'Poison Dart',
    description: 'Deal (Skill Damage + 2) to an enemy exactly 3 squares away in a cardinal direction and apply 2 Toxicity. Costs 5 energy.',
    energyCost: 5,
    bonusDamage: 2, // Deals skill damage + 2
    targetingType: 'adjacent-attack',
    emoji: '🧪',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // For adjacent-attack, we just return the single target position at exact range
        return [
            { x: targetX, y: targetY }
        ];
    }
};

// Distraction - Hater debuff skill
export const Distraction: Skill = {
    id: 'distraction',
    name: 'Distraction',
    description: 'Apply 2 Exposed and 2 Confusion to an enemy within Range = 3. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0, // No direct damage
    targetingType: 'dual-rotational', // choose any tile within range
    emoji: '🌀',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Back Off - Hater shove + debuff skill
export const BackOff: Skill = {
    id: 'back-off',
    name: 'Back Off',
    description: 'Push an adjacent enemy 2 tiles directly away and apply 1 Slow. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0, // No damage
    targetingType: 'adjacent-attack',
    emoji: '📢',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};
// Flare Shot - long-range precision attack for Wizard that applies Burn
export const FlareShot: Skill = {
    id: 'flare-shot',
    name: 'Flare Shot',
    description: 'Launch a flaming projectile that can hit targets exactly 3 squares away in any cardinal direction. Deals (Skill Damage) damage and inflicts 3 stacks of Burn. Costs 5 energy.',
    energyCost: 5,
    bonusDamage: 0, // Deals normal skill damage
    targetingType: 'adjacent-attack',
    emoji: '🔥',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // For adjacent-attack, we just return the single target position
        // The targeting system will handle showing the valid flare shot targets at exactly range 3
        return [
            { x: targetX, y: targetY }
        ];
    }
};

// Flare Up - Wizard debuff skill: apply Burn within range 4
export const FlareUp: Skill = {
    id: 'flare-up',
    name: 'Flare Up',
    description: 'Apply 3 Burn to an enemy unit within Range = 4. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0, // No direct damage
    targetingType: 'dual-rotational',
    emoji: '🔥',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Drain Punch - Hater melee lifedrain skill
export const DrainPunch: Skill = {
    id: 'drain-punch',
    name: 'Drain Punch',
    description: 'Deal (Skill Damage - 1) to an adjacent enemy, then apply 3 Leech and 3 Sap. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: -1,
    targetingType: 'adjacent-attack',
    emoji: '🥊',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Toxic King - Hater ultimate toxic field placement
export const ToxicKing: Skill = {
    id: 'toxic-king',
    name: 'Toxic King',
    description: 'Select an enemy anywhere. Create Toxic Tiles on all adjacent tiles around them (including under them) and on all adjacent tiles around yourself (not under you). Costs 9 energy.',
    energyCost: 9,
    bonusDamage: 0,
    targetingType: 'dual-rotational', // pick any tile on map
    emoji: '☣️',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Psyche Break - Hater debuff skill
export const PsycheBreak: Skill = {
    id: 'psyche-break',
    name: 'Psyche Break',
    description: 'Apply 4 Headache, 4 Confusion, and 4 Doubt to an enemy within Range = 2. Costs 9 energy.',
    energyCost: 9,
    bonusDamage: 0,
    targetingType: 'dual-rotational',
    emoji: '🧠',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};
// Splash - water projectile attack for Wizard that applies Wet
export const Splash: Skill = {
    id: 'splash',
    name: 'Splash',
    description: 'Launch a water projectile that can hit targets exactly 3 squares away in any cardinal direction. Deals (Skill Damage) damage and inflicts 2 stacks of Wet. Costs 6 energy.',
    energyCost: 6,
    bonusDamage: 0, // Deals normal skill damage
    targetingType: 'adjacent-attack',
    emoji: '💧',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // For adjacent-attack, we just return the single target position
        // The targeting system will handle showing the valid splash targets at exactly range 3
        return [
            { x: targetX, y: targetY }
        ];
    }
};

// Spark Lance - electrical projectile attack for Wizard that applies Shocked
export const SparkLance: Skill = {
    id: 'spark-lance',
    name: 'Spark Lance',
    description: 'Conjure a piercing lance of electrical energy that can hit targets exactly 4 squares away in any cardinal direction. Deals (Skill Damage - 2) damage and inflicts 2 stacks of Shocked. Costs 5 energy.',
    energyCost: 5,
    bonusDamage: -2, // Deals skill damage - 2
    targetingType: 'adjacent-attack',
    emoji: '⚡',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // For adjacent-attack, we just return the single target position
        // The targeting system will handle showing the valid spark lance targets at exactly range 4
        return [
            { x: targetX, y: targetY }
        ];
    }
};

// Solar Ray - simple ranged damage within range 3 for Wizard
export const SolarRay: Skill = {
    id: 'solar-ray',
    name: 'Solar Ray',
    description: 'Deal (Skill Damage) to an Enemy Unit within Range = 3. Costs 7 energy.',
    energyCost: 7,
    bonusDamage: 0, // Deals normal skill damage
    targetingType: 'non-rotational',
    emoji: '☀️',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Single target within range handled by targeting service
        return [ { x: targetX, y: targetY, isPrimary: true } ];
    }
};

// Aim Low - marksman shot that slows the target
export const AimLow: Skill = {
    id: 'aim-low',
    name: 'Aim Low',
    description: 'Deal (Skill Damage + 2) to a target Enemy Unit exactly 3 squares away in any cardinal direction and apply 2 Slow. Costs 5 energy.',
    energyCost: 5,
    bonusDamage: 2,
    targetingType: 'adjacent-attack',
    emoji: '🦵',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Single target at exact range 3
        return [ { x: targetX, y: targetY } ];
    }
};

// Aim High - marksman ranged shot applying Headache
export const AimHigh: Skill = {
    id: 'aim-high',
    name: 'Aim High',
    description: 'Deal (Skill Damage + 2) to a target Enemy Unit 4 squares away in any cardinal direction and apply 2 Headache. Costs 5 energy.',
    energyCost: 5,
    bonusDamage: 2,
    targetingType: 'adjacent-attack',
    emoji: '🎯',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [ { x: targetX, y: targetY } ];
    }
};

// Lifeblade - melee strike that applies Leech
export const Lifeblade: Skill = {
    id: 'lifeblade',
    name: 'Lifeblade',
    description: 'Strike an adjacent enemy for (Skill Damage + 3) and apply 8 Leech to them. Costs 8 energy.',
    energyCost: 8,
    bonusDamage: 3,
    targetingType: 'adjacent-attack',
    emoji: '❤️',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [ { x: targetX, y: targetY } ];
    }
};

// Teleport Slash - teleport up to 3, then deal AoE damage to all 8 adjacent units
export const TeleportSlash: Skill = {
    id: 'teleport-slash',
    name: 'Teleport Slash',
    description: 'Teleport up to 3 tiles, then deal (Skill Damage + 2) to all adjacent units (8-way) where you land. Costs 7 energy.',
    energyCost: 7,
    bonusDamage: 2,
    targetingType: 'non-rotational',
    emoji: '🌟',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Target pattern not used; handled specially in GameScene
        return [ { x: targetX, y: targetY, isPrimary: true } ];
    }
};

// Dizzy Slam - leap 3, then damage and confuse adjacent enemies
export const DizzySlam: Skill = {
    id: 'dizzy-slam',
    name: 'Dizzy Slam',
    description: 'Leap 3, then deal (Skill Damage) damage to adjacent Enemy Units and apply 2 stacks of Confusion to them. Costs 8 energy.',
    energyCost: 8,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '💫',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Target pattern not used; handled specially in GameScene after leap
        return [ { x: targetX, y: targetY, isPrimary: true } ];
    }
};

// Tidal Lock - AoE damage and debuff within range 2 (self-centered)
export const TidalLock: Skill = {
    id: 'tidal-lock',
    name: 'Tidal Lock',
    description: 'Deal (Skill Damage - 2) damage to all Units within Range = 2. Apply 2 Wet and 2 Slow to all affected targets. Costs 11 energy.',
    energyCost: 11,
    bonusDamage: -2,
    targetingType: 'non-rotational',
    emoji: '🌊',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Gaia's Rage - AoE enemy-only damage and create flame tiles within range 2 (self-centered)
export const GaiasRage: Skill = {
    id: "gaias-rage",
    name: "Gaia's Rage",
    description: "Deal (Skill Damage - 1) damage to all Enemy Units within Range = 2 of this Unit. Change all Tiles in range to Flame Tiles. Costs 11 energy.",
    energyCost: 11,
    bonusDamage: -1,
    targetingType: 'non-rotational',
    emoji: '🌋',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Plasma Tempest - buff ally 3 away (cardinal) and AoE around that ally
export const PlasmaTempest: Skill = {
    id: 'plasma-tempest',
    name: 'Plasma Tempest',
    description: 'Apply 3 Charge to the Allied Unit 3 away in any cardinal direction and deal (Skill Damage - 1) damage to all Units within Range = 2 of it. Costs 10 energy.',
    energyCost: 10,
    bonusDamage: -1,
    targetingType: 'adjacent-attack',
    emoji: '🌪️',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY }]
};

// Star's Blessing - apply Blessed and Faith to an ally within range 2 (can target self)
export const StarsBlessing: Skill = {
    id: 'stars-blessing',
    name: "Star's Blessing",
    description: 'Apply 5 Blessed and 5 Faith to an allied unit within range 2 (can target self). Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0,
    targetingType: 'dual-rotational',
    emoji: '⭐',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Aether's Grace - heal an ally in range 4 and grant them Faith; bless yourself
export const AethersGrace: Skill = {
    id: 'aethers-grace',
    name: "Aether's Grace",
    description: "Restore (Skill Damage + 4) to an allied unit within range 4 and apply 4 Faith to it. Apply 4 Blessed to yourself. Costs 10 energy.",
    energyCost: 10,
    bonusDamage: 4, // used only for animation fallback; handled specially in SkillHandler
    targetingType: 'dual-rotational',
    emoji: '🕊️',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Purifying Hand - cleanse all modifiers from a target within range 1
export const PurifyingHand: Skill = {
    id: 'purifying-hand',
    name: 'Purifying Hand',
    description: 'Remove all modifiers from a target within range 1. Costs 6 energy.',
    energyCost: 6,
    bonusDamage: 0,
    targetingType: 'adjacent-attack',
    emoji: '🧼',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [ { x: targetX, y: targetY } ]
};

// Cauterize - heal an allied unit in range 2 for (Skill Damage)
export const Cauterize: Skill = {
    id: 'cauterize',
    name: 'Cauterize',
    description: 'Heal (Skill Damage) Health to an Allied Unit within Range = 2. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 0, // healing equals skillDamage
    targetingType: 'dual-rotational',
    emoji: '🩹',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Smoke Grenade - places a smoke tile at targeted position (range handled by targeting service)
export const SmokeGrenade: Skill = {
    id: 'smoke-grenade',
    name: 'Smoke Grenade',
    description: 'Throw a smoke grenade up to range 3, creating a Smoke Tile there. Units ending their turn on it gain +3 Sturdy and +3 Ward.',
    energyCost: 2,
    bonusDamage: 0,
    targetingType: 'dual-rotational',
    emoji: '💨',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [ { x: targetX, y: targetY, isPrimary: true } ];
    }
};

// Lead The Charge - Bannerman's signature skill that buffs allies and leaps
export const LeadTheCharge: Skill = {
    id: 'lead-the-charge',
    name: 'Lead The Charge',
    description: 'Apply 4 Charge to all adjacent Allied Units, then Leap 3 squares in any cardinal direction. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0, // No damage, this is a buff and movement skill
    targetingType: 'non-rotational',
    emoji: '🏃',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Leap movement skill - only affects the destination position
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Backflip - leap 2 in a cardinal direction
export const Backflip: Skill = {
    id: 'backflip',
    name: 'Backflip',
    description: 'Leap 3 in any cardinal direction. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🤸',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Movement-only; pattern not used directly
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Rally - Bannerman's energy restoration skill for allies
export const Rally: Skill = {
    id: 'rally',
    name: 'Rally',
    description: 'Restores 3 energy to all cardinally and diagonally adjacent ally units. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0, // No damage, this is an energy restoration skill
    targetingType: 'non-rotational',
    emoji: '📢',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Self-targeting skill - only affects the caster's position
        // The skill handler will find adjacent allies automatically
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Pierce - Bannerman's directional attack skill
export const Pierce: Skill = {
    id: 'pierce',
    name: 'Pierce',
    description: 'Piercing attack that hits enemies 1 and 2 squares away in the target direction. Can be rotated to face different directions. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 0, // Deals normal skill damage
    targetingType: 'unit-rotational',
    emoji: '🗡️',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // For unit-rotational skills, targetX/Y is the caster position
        // rotation determines which way the skill is facing: 0=North, 1=East, 2=South, 3=West
        const rotationStep = rotation || 0;
        
        let dx1 = 0, dy1 = 0; // First target (1 square away)
        let dx2 = 0, dy2 = 0; // Second target (2 squares away)
        
        switch (rotationStep % 4) {
            case 0: // North
                dx1 = 0; dy1 = -1; // 1 square north
                dx2 = 0; dy2 = -2; // 2 squares north
                break;
            case 1: // East
                dx1 = 1; dy1 = 0; // 1 square east
                dx2 = 2; dy2 = 0; // 2 squares east
                break;
            case 2: // South
                dx1 = 0; dy1 = 1; // 1 square south
                dx2 = 0; dy2 = 2; // 2 squares south
                break;
            case 3: // West
                dx1 = -1; dy1 = 0; // 1 square west
                dx2 = -2; dy2 = 0; // 2 squares west
                break;
        }
        
        return [
            { x: targetX + dx1, y: targetY + dy1, isPrimary: true },   // First target
            { x: targetX + dx2, y: targetY + dy2, isPrimary: false },  // Second target
        ];
    }
};

// Overpierce - like Pierce but hits 3 squares (1, 2, and 3 forward)
export const Overpierce: Skill = {
    id: 'overpierce',
    name: 'Overpierce',
    description: 'Piercing attack that hits enemies 1, 2, and 3 squares away in the target direction. Can be rotated. Costs 7 energy and deals (Skill Damage + 3).',
    energyCost: 7,
    bonusDamage: 3,
    targetingType: 'unit-rotational',
    emoji: '🗡️',
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        const rotationStep = rotation || 0;
        let deltas: { dx: number; dy: number }[] = [];
        switch (rotationStep % 4) {
            case 0: deltas = [{ dx: 0, dy: -1 }, { dx: 0, dy: -2 }, { dx: 0, dy: -3 }]; break; // North
            case 1: deltas = [{ dx: 1, dy: 0 }, { dx: 2, dy: 0 }, { dx: 3, dy: 0 }]; break;   // East
            case 2: deltas = [{ dx: 0, dy: 1 }, { dx: 0, dy: 2 }, { dx: 0, dy: 3 }]; break;    // South
            case 3: deltas = [{ dx: -1, dy: 0 }, { dx: -2, dy: 0 }, { dx: -3, dy: 0 }]; break; // West
        }
        return deltas.map((d, idx) => ({ x: targetX + d.dx, y: targetY + d.dy, isPrimary: idx === 0 }));
    }
};

// Comet Tail - wizard skill: slow at 1 and 2, damage at 3 (rotatable line)
export const CometTail: Skill = {
    id: 'comet-tail',
    name: 'Comet Tail',
    description: 'Apply 1 Slow to units 1 and 2 tiles forward; deal (Skill Damage - 1) to the unit 3 tiles forward. Rotatable. Costs 7 energy.',
    energyCost: 7,
    bonusDamage: -1, // Damage only applies to the third tile
    targetingType: 'unit-rotational',
    emoji: '☄️',
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        const rotationStep = rotation || 0;
        let deltas: { dx: number; dy: number }[] = [];
        switch (rotationStep % 4) {
            case 0: deltas = [{ dx: 0, dy: -1 }, { dx: 0, dy: -2 }, { dx: 0, dy: -3 }]; break; // North
            case 1: deltas = [{ dx: 1, dy: 0 }, { dx: 2, dy: 0 }, { dx: 3, dy: 0 }]; break;   // East
            case 2: deltas = [{ dx: 0, dy: 1 }, { dx: 0, dy: 2 }, { dx: 0, dy: 3 }]; break;    // South
            case 3: deltas = [{ dx: -1, dy: 0 }, { dx: -2, dy: 0 }, { dx: -3, dy: 0 }]; break; // West
        }
        return deltas.map((d, idx) => ({ x: targetX + d.dx, y: targetY + d.dy, isPrimary: idx === 2 }));
    }
};

// Cosmic Impact - wizard adjacent strike, range 1, damage +2
export const CosmicImpact: Skill = {
    id: 'cosmic-impact',
    name: 'Cosmic Impact',
    description: 'Deal (Skill Damage + 2) to an enemy unit within Range = 1. Costs 7 energy.',
    energyCost: 7,
    bonusDamage: 2,
    targetingType: 'adjacent-attack',
    emoji: '🌌',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [ { x: targetX, y: targetY } ];
    }
};

// Sigilbearer Skills

// Glass Floor - creates glass tiles that apply Mirror modifier
export const GlassFloor: Skill = {
    id: 'glass-floor',
    name: 'Glass Floor',
    description: 'Create a Glass Tile at "Forward 1", "Forward 2", and "Forward 3". Glass Tiles apply 1 Mirror to any Unit entering, starting or ending its Turn on them. Costs 7 energy.',
    energyCost: 7,
    bonusDamage: 0,
    targetingType: 'unit-rotational',
    emoji: '🪟',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Use rotation parameter to determine direction (0=north, 1=east, 2=south, 3=west)
        const rotationStep = rotation || 0;
        const targets: SkillTarget[] = [];
        
        switch (rotationStep % 4) {
            case 0: // North
                targets.push(
                    { x: targetX, y: targetY - 1, isPrimary: true },        // Forward 1
                    { x: targetX, y: targetY - 2, isPrimary: false },       // Forward 2
                    { x: targetX, y: targetY - 3, isPrimary: false }        // Forward 3
                );
                break;
            case 1: // East
                targets.push(
                    { x: targetX + 1, y: targetY, isPrimary: true },        // Forward 1
                    { x: targetX + 2, y: targetY, isPrimary: false },       // Forward 2
                    { x: targetX + 3, y: targetY, isPrimary: false }        // Forward 3
                );
                break;
            case 2: // South
                targets.push(
                    { x: targetX, y: targetY + 1, isPrimary: true },        // Forward 1
                    { x: targetX, y: targetY + 2, isPrimary: false },       // Forward 2
                    { x: targetX, y: targetY + 3, isPrimary: false }        // Forward 3
                );
                break;
            case 3: // West
                targets.push(
                    { x: targetX - 1, y: targetY, isPrimary: true },        // Forward 1
                    { x: targetX - 2, y: targetY, isPrimary: false },       // Forward 2
                    { x: targetX - 3, y: targetY, isPrimary: false }        // Forward 3
                );
                break;
        }
        
        return targets;
    }
};

// Tracking Dart - apply debuff to first enemy in forward line of 3, rotatable
export const TrackingDart: Skill = {
    id: 'tracking-dart',
    name: 'Tracking Dart',
    description: 'Apply 4 Tired to the first enemy in a straight line of 3 tiles in a cardinal direction. Start facing North; use rotate to change.',
    energyCost: 3,
    bonusDamage: 0,
    targetingType: 'unit-rotational',
    emoji: '🏹',
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        const rotationStep = rotation || 0; // 0=N,1=E,2=S,3=W
        const targets: SkillTarget[] = [];
        switch (rotationStep % 4) {
            case 0: // North
                targets.push(
                    { x: targetX, y: targetY - 1, isPrimary: true },
                    { x: targetX, y: targetY - 2, isPrimary: false },
                    { x: targetX, y: targetY - 3, isPrimary: false }
                );
                break;
            case 1: // East
                targets.push(
                    { x: targetX + 1, y: targetY, isPrimary: true },
                    { x: targetX + 2, y: targetY, isPrimary: false },
                    { x: targetX + 3, y: targetY, isPrimary: false }
                );
                break;
            case 2: // South
                targets.push(
                    { x: targetX, y: targetY + 1, isPrimary: true },
                    { x: targetX, y: targetY + 2, isPrimary: false },
                    { x: targetX, y: targetY + 3, isPrimary: false }
                );
                break;
            case 3: // West
                targets.push(
                    { x: targetX - 1, y: targetY, isPrimary: true },
                    { x: targetX - 2, y: targetY, isPrimary: false },
                    { x: targetX - 3, y: targetY, isPrimary: false }
                );
                break;
        }
        return targets;
    }
};

// Flashbang - apply AoE debuffs in a 3x3 centered 3 tiles forward, rotatable
export const Flashbang: Skill = {
    id: 'flashbang',
    name: 'Flashbang',
    description: 'Apply 2 Exposed and 2 Confusion to all enemies within a 3x3 square centered 3 tiles away in a cardinal direction. Start facing North; use rotate to change.',
    energyCost: 6,
    bonusDamage: 0,
    targetingType: 'unit-rotational',
    emoji: '⚡',
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        const rotationStep = rotation || 0; // 0=N,1=E,2=S,3=W
        let centerX = targetX;
        let centerY = targetY;
        switch (rotationStep % 4) {
            case 0: // North
                centerY = targetY - 3; break;
            case 1: // East
                centerX = targetX + 3; break;
            case 2: // South
                centerY = targetY + 3; break;
            case 3: // West
                centerX = targetX - 3; break;
        }
        const pattern: SkillTarget[] = [];
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                pattern.push({ x: centerX + dx, y: centerY + dy, isPrimary: dx === 0 && dy === 0 });
            }
        }
        return pattern;
    }
};

// Perimeter - create a ring of spotlight tiles at range 4 from the caster
export const Perimeter: Skill = {
    id: 'perimeter',
    name: 'Perimeter',
    description: 'Create a ring of Spotlight Tiles at Range 4 from this Unit. Costs 10 energy.',
    energyCost: 10,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🛡️',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Self-centered skill; pattern not used for placement here
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Hunker Down - apply defensive and sustain buffs to self
export const HunkerDown: Skill = {
    id: 'hunker-down',
    name: 'Hunker Down',
    description: 'Apply 2 Sturdy, 6 Wish, and 6 Charge to yourself. Costs 9 energy.',
    energyCost: 9,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🏠',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Self-targeting skill - only affects the caster's position
        return [ { x: targetX, y: targetY, isPrimary: true } ];
    }
};

// Mist Spray - creates random mist tiles
export const MistSpray: Skill = {
    id: 'mist-spray',
    name: 'Mist Spray',
    description: 'Create 6 Mist Tiles on random tiles on the map. Mist Tiles apply 1 Ward to any Unit entering, starting or ending its Turn on them. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🌫️',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Single target for activation, actual mist placement is handled in SkillHandler
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Reflect - defensive skill that redirects attacks
export const Reflect: Skill = {
    id: 'reflect',
    name: 'Reflect',
    description: 'Apply Reflection buff for 3 turns. When attacked, reflect 50% damage back to attacker. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🪞',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Self-targeting skill
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Primal Mark - mark enemies for enhanced damage
export const PrimalMark: Skill = {
    id: 'primal-mark',
    name: 'Primal Mark',
    description: 'Mark an enemy with primal energy. Marked enemies take +3 damage from all sources for 4 turns. Costs 1 energy.',
    energyCost: 1,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🎯',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Rescue - teleports an ally to safety
export const Rescue: Skill = {
    id: 'rescue',
    name: 'Rescue',
    description: 'Teleport an ally to 1 space south of you. Targets ally units within range 3 (excluding the tile 1 south of you). Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0,
    targetingType: 'non-rotational', // Single target, no rotation needed
    emoji: '🚑',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Get Sturdy - applies Sturdy modifiers to self and optionally an ally
export const GetSturdy: Skill = {
    id: 'get-sturdy',
    name: 'Get Sturdy',
    description: 'Brace yourself and a nearby ally for impact. Grants 2 stacks of Sturdy to yourself and an ally within range 1. If no allies in range, affects only yourself. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0, // No damage, this is a buff skill
    targetingType: 'non-rotational',
    emoji: '🛡️',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Taunt - provokes enemies to focus their attacks
export const Taunt: Skill = {
    id: 'taunt',
    name: 'Taunt',
    description: 'Provoke enemy units within range 3, forcing them to focus their attacks on you. Apply 5 stacks of Anger to target enemy unit. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 0, // No direct damage, this is a debuff skill
    targetingType: 'non-rotational', // Single target, no rotation needed
    emoji: '😡',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Mistwalk - teleportation through mist
export const Mistwalk: Skill = {
    id: 'mistwalk',
    name: 'Mistwalk',
    description: 'Dissolve into mist and teleport up to 4 squares away in any direction. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '👻',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Last Breath - powerful attack when low health
export const LastBreath: Skill = {
    id: 'last-breath',
    name: 'Last Breath',
    description: 'Channel remaining life force into a devastating attack. Damage increases as health decreases. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 4, // Base damage, scales with missing health
    targetingType: 'non-rotational',
    emoji: '💨',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Flatten - area attack from salesman tree, but implementing it here
export const Flatten: Skill = {
    id: 'flatten',
    name: 'Flatten',
    description: 'Crush enemies in a line with overwhelming force. Hits all enemies 1, 2, and 3 squares away in target direction. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 2,
    targetingType: 'unit-rotational',
    emoji: '🔨',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        const rotationStep = rotation || 0;
        const targets: SkillTarget[] = [];
        
        switch (rotationStep % 4) {
            case 0: // North
                targets.push(
                    { x: targetX, y: targetY - 1, isPrimary: true },
                    { x: targetX, y: targetY - 2, isPrimary: false },
                    { x: targetX, y: targetY - 3, isPrimary: false }
                );
                break;
            case 1: // East
                targets.push(
                    { x: targetX + 1, y: targetY, isPrimary: true },
                    { x: targetX + 2, y: targetY, isPrimary: false },
                    { x: targetX + 3, y: targetY, isPrimary: false }
                );
                break;
            case 2: // South
                targets.push(
                    { x: targetX, y: targetY + 1, isPrimary: true },
                    { x: targetX, y: targetY + 2, isPrimary: false },
                    { x: targetX, y: targetY + 3, isPrimary: false }
                );
                break;
            case 3: // West
                targets.push(
                    { x: targetX - 1, y: targetY, isPrimary: true },
                    { x: targetX - 2, y: targetY, isPrimary: false },
                    { x: targetX - 3, y: targetY, isPrimary: false }
                );
                break;
        }
        
        return targets;
    }
};

// Mysticism - mystical enhancement buff
export const Mysticism: Skill = {
    id: 'mysticism',
    name: 'Mysticism',
    description: 'Enhance mystical powers, increasing skill damage by 2 and energy regeneration by 1 per turn for 5 turns. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🔮',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Mirrormancy - create illusion copies
export const Mirrormancy: Skill = {
    id: 'mirrormancy',
    name: 'Mirrormancy',
    description: 'Create 2 mirror images that copy your next attack. Each image deals 50% damage. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🪩',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Void Ray - dark energy beam
export const VoidRay: Skill = {
    id: 'void-ray',
    name: 'Void Ray',
    description: 'Channel void energy into a piercing ray that hits all enemies in a line up to 5 squares away. Costs 5 energy.',
    energyCost: 5,
    bonusDamage: 3,
    targetingType: 'unit-rotational',
    emoji: '🌌',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        const rotationStep = rotation || 0;
        const targets: SkillTarget[] = [];
        
        // Ray extends up to 5 squares
        for (let i = 1; i <= 5; i++) {
            switch (rotationStep % 4) {
                case 0: // North
                    targets.push({ x: targetX, y: targetY - i, isPrimary: i === 1 });
                    break;
                case 1: // East
                    targets.push({ x: targetX + i, y: targetY, isPrimary: i === 1 });
                    break;
                case 2: // South
                    targets.push({ x: targetX, y: targetY + i, isPrimary: i === 1 });
                    break;
                case 3: // West
                    targets.push({ x: targetX - i, y: targetY, isPrimary: i === 1 });
                    break;
            }
        }
        
        return targets;
    }
};

// Forceful Strike - melee attack that pushes target back 1 and applies Exposed
export const ForcefulStrike: Skill = {
    id: 'forceful-strike',
    name: 'Forceful Strike',
    description: 'Deal (Skill Damage + 1) to an adjacent enemy, push the target back 1 tile, and apply 1 Exposed. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 1,
    targetingType: 'adjacent-attack',
    emoji: '💥',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Disarming Slash - melee attack that applies Weakness
export const DisarmingSlash: Skill = {
    id: 'disarming-slash',
    name: 'Disarming Slash',
    description: 'Deal (Skill Damage + 2) damage to an adjacent enemy, then apply 2 Weak.',
    energyCost: 4,
    bonusDamage: 2,
    targetingType: 'adjacent-attack',
    emoji: '🗡️',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Inspiring Slash - melee attack that buffs adjacent allies
export const InspiringSlash: Skill = {
    id: 'inspiring-slash',
    name: 'Inspiring Slash',
    description: 'Deal (Skill Damage + 3) damage to an adjacent enemy, then grant 2 Strength to all adjacent allied units (8-way). Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 3,
    targetingType: 'adjacent-attack',
    emoji: '⚔️',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Spring Slash - leap then ranged strike
export const SpringSlash: Skill = {
    id: 'spring-slash',
    name: 'Spring Slash',
    description: 'Leap 2, then strike an enemy exactly 3 squares away in a cardinal direction for (Skill Damage + 2). Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 2,
    targetingType: 'non-rotational',
    emoji: '🌸',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Target selection is handled in two phases; pattern is not used directly
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Revenge - apply Counter to self
export const Revenge: Skill = {
    id: 'revenge',
    name: 'Revenge',
    description: 'Apply 4 Counter to yourself. Costs 1 energy.',
    energyCost: 1,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '💢',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Builder Skills

// Box Drop - creates destructible box obstacles
export const BoxDrop: Skill = {
    id: 'box-drop',
    name: 'Box Drop',
    description: 'Create a Box Structure (Health 4, all other stats 1) on an unoccupied tile within Range = 4. Costs 1 energy.',
    energyCost: 1,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '📦',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Deployable Spring - creates bounce trap
export const DeployableSpring: Skill = {
    id: 'deployable-spring',
    name: 'Deployable Spring',
    description: 'Create a Spring Tile at a Tile within Range = 2. Spring Tiles cause a Unit ending its Turn on them to Leap up to 3 tiles in the set direction. Costs 6 energy.',
    energyCost: 6,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🌀',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Create Turret - builds an automated turret
export const CreateTurret: Skill = {
    id: 'create-turret',
    name: 'Create Turret',
    description: 'Create a Turret Structure (Health 5) with Sentry: Deal 1 damage to any Unit entering, starting, or ending its Turn within Range = 2. Costs 7 energy.',
    energyCost: 7,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🔫',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Breaker - destroys obstacles and structures
export const Breaker: Skill = {
    id: 'breaker',
    name: 'Breaker',
    description: 'Demolish walls, boxes, and other destructible terrain in a 2x2 area. Also damages enemies caught in the area. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 3,
    targetingType: 'non-rotational',
    emoji: '🔨',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // 2x2 demolition area
        return [
            { x: targetX, y: targetY, isPrimary: true },
            { x: targetX + 1, y: targetY, isPrimary: false },
            { x: targetX, y: targetY + 1, isPrimary: false },
            { x: targetX + 1, y: targetY + 1, isPrimary: false }
        ];
    }
};

// Substitution - swap places with deployed object
export const Substitution: Skill = {
    id: 'substitution',
    name: 'Substitution',
    description: 'Instantly swap positions with any deployed box, turret, or trap you have placed. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🔄',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Bomb Drop - explosive area attack
export const BombDrop: Skill = {
    id: 'bomb-drop',
    name: 'Bomb Drop',
    description: 'Deploy an explosive device that detonates after 1 turn, dealing damage in a 3x3 area. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 4,
    targetingType: 'non-rotational',
    emoji: '💣',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // 3x3 explosion area (will activate next turn)
        const targets: SkillTarget[] = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                targets.push({
                    x: targetX + dx,
                    y: targetY + dy,
                    isPrimary: dx === 0 && dy === 0
                });
            }
        }
        return targets;
    }
};

// Chaos Creation - random deployable generator
export const ChaosCreation: Skill = {
    id: 'chaos-creation',
    name: 'Chaos Creation',
    description: 'Rapidly deploy 3 random objects (boxes, springs, or mini-turrets) in nearby squares. Costs 5 energy.',
    energyCost: 5,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🎲',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Self-targeting, will deploy randomly around caster
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Drone Clone - creates a mobile duplicate
export const DroneClone: Skill = {
    id: 'drone-clone',
    name: 'Drone Clone',
    description: 'Create a mechanical drone copy that can move and use basic attacks. Drone has 50% of your stats. Costs 6 energy.',
    energyCost: 6,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🤖',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Boxed In - creates wall enclosure
export const BoxedIn: Skill = {
    id: 'boxed-in',
    name: 'Boxed In',
    description: 'Trap an enemy by surrounding them with indestructible walls for 3 turns. Walls form a 3x3 box around target. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🗄️',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // 3x3 area with walls around the perimeter (not center)
        const targets: SkillTarget[] = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                // Only the perimeter squares, not the center
                if (dx === 0 && dy === 0) continue;
                targets.push({
                    x: targetX + dx,
                    y: targetY + dy,
                    isPrimary: false
                });
            }
        }
        // Target square (where enemy will be trapped)
        targets.push({ x: targetX, y: targetY, isPrimary: true });
        return targets;
    }
};

// Sacrifice - destroy deployables for power
export const Sacrifice: Skill = {
    id: 'sacrifice',
    name: 'Sacrifice',
    description: 'Destroy all your deployed objects to restore energy and gain temporary damage boost. Costs 1 energy.',
    energyCost: 1,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '⚡',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Self-targeting
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Jirret Line - rapid deployment line
export const JirretLine: Skill = {
    id: 'jirret-line',
    name: 'Jirret Line',
    description: 'Create a production line of 5 boxes in a straight line, each with different properties. Ultimate construction ability. Costs 7 energy.',
    energyCost: 7,
    bonusDamage: 0,
    targetingType: 'unit-rotational',
    emoji: '🏭',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        const rotationStep = rotation || 0;
        const targets: SkillTarget[] = [];
        
        // Create 5 squares in a line
        for (let i = 1; i <= 5; i++) {
            switch (rotationStep % 4) {
                case 0: // North
                    targets.push({ x: targetX, y: targetY - i, isPrimary: i === 1 });
                    break;
                case 1: // East
                    targets.push({ x: targetX + i, y: targetY, isPrimary: i === 1 });
                    break;
                case 2: // South
                    targets.push({ x: targetX, y: targetY + i, isPrimary: i === 1 });
                    break;
                case 3: // West
                    targets.push({ x: targetX - i, y: targetY, isPrimary: i === 1 });
                    break;
            }
        }
        
        return targets;
    }
};

// Rabbit Rider Skills

// Glitch Strike - melee strike that glitches both units
export const GlitchStrike: Skill = {
    id: 'glitch-strike',
    name: 'Glitch Strike',
    description: 'Deal (Skill Damage + 1) damage to an Enemy Unit within range 1. Apply 1 Glitched to the Enemy and 1 Glitched to yourself. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 1,
    targetingType: 'adjacent-attack',
    emoji: '⚡',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Bounce - hop attack that can chain between enemies
export const Bounce: Skill = {
    id: 'bounce',
    name: 'Bounce',
    description: 'Leap 2 in a cardinal direction, deal Skill Damage to all adjacent (8-way) enemy units at the landing spot, then leap 2 again in a cardinal direction. Costs 5 energy.',
    energyCost: 5,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🏀',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Initial target - the skill handler will determine bounce targets
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Gust of Wind - Apply 1 Haste to all Allied Units within Range = 2
export const GustOfWind: Skill = {
    id: 'gust-of-wind',
    name: 'Gust of Wind',
    description: 'Apply 1 Haste to all Allied Units within Range = 2. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🌪️',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Self-cast, effects are handled in SkillHandler based on range
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Wishing Star - supportive skill that grants buffs
export const WishingStar: Skill = {
    id: 'wishing-star',
    name: 'Wishing Star',
    description: 'Call upon a wishing star to restore energy and grant Speed buff to self and nearby allies. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '⭐',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Self-targeting, affects nearby allies
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Air Cannon - powerful ranged wind attack
export const AirCannon: Skill = {
    id: 'air-cannon',
    name: 'Air Cannon',
    description: 'Fire a concentrated blast of air that pierces through enemies in a straight line. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 2,
    targetingType: 'unit-rotational',
    emoji: '💨',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        const rotationStep = rotation || 0;
        const targets: SkillTarget[] = [];
        
        // Air cannon extends up to 4 squares
        for (let i = 1; i <= 4; i++) {
            switch (rotationStep % 4) {
                case 0: // North
                    targets.push({ x: targetX, y: targetY - i, isPrimary: i === 1 });
                    break;
                case 1: // East
                    targets.push({ x: targetX + i, y: targetY, isPrimary: i === 1 });
                    break;
                case 2: // South
                    targets.push({ x: targetX, y: targetY + i, isPrimary: i === 1 });
                    break;
                case 3: // West
                    targets.push({ x: targetX - i, y: targetY, isPrimary: i === 1 });
                    break;
            }
        }
        
        return targets;
    }
};

// Retreating Strike - attack while moving backward
export const RetreatingStrike: Skill = {
    id: 'retreating-strike',
    name: 'Retreating Strike',
    description: 'Attack an enemy then immediately hop backward 2 squares. Great for hit-and-run tactics. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 2,
    targetingType: 'non-rotational',
    emoji: '🦘',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Tailwind - movement enhancement skill
export const Tailwind: Skill = {
    id: 'tailwind',
    name: 'Tailwind',
    description: 'Create a favorable wind that increases movement by 2 and grants Evasion for 4 turns. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🍃',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // Self-targeting
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Terraform - terrain manipulation
export const Terraform: Skill = {
    id: 'terraform',
    name: 'Terraform',
    description: 'Reshape the battlefield by creating impassable terrain walls or removing obstacles. Affects a 2x2 area. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🏔️',
    
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // 2x2 area
        return [
            { x: targetX, y: targetY, isPrimary: true },
            { x: targetX + 1, y: targetY, isPrimary: false },
            { x: targetX, y: targetY + 1, isPrimary: false },
            { x: targetX + 1, y: targetY + 1, isPrimary: false }
        ];
    }
};

// Hype Up - Hype Man's signature buff skill for allies
export const HypeUp: Skill = {
    id: 'hype-up',
    name: 'Hype Up',
    description: 'Apply 1 Haste, 1 Strength, and 1 Focus to an Allied Unit within Range 4. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0, // No damage, this is a buff skill
    targetingType: 'dual-rotational', // Allows targeting any tile within range 4
    emoji: '🔥',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Single target skill - just target the selected position
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Inspire Violence - Hype Man single-target Strength buff within range 2
export const InspireViolence: Skill = {
    id: 'inspire-violence',
    name: 'Inspire Violence',
    description: 'Apply 4 Strength to an Allied Unit within Range = 2. Costs 8 energy.',
    energyCost: 8,
    bonusDamage: 0,
    targetingType: 'dual-rotational',
    emoji: '⚔️',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        return [{ x: targetX, y: targetY, isPrimary: true }];
    }
};

// Mirror Aegis - Hype Man single-target Mirror buff within range 1
export const MirrorAegis: Skill = {
    id: 'mirror-aegis',
    name: 'Mirror Aegis',
    description: 'Apply 7 Mirror to an Allied Unit within Range = 1. Costs 8 energy.',
    energyCost: 8,
    bonusDamage: 0,
    targetingType: 'dual-rotational',
    emoji: '🪞',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Peace Sign - Hype Man allied buff within range 4: Wish + Charge
export const PeaceSign: Skill = {
    id: 'peace-sign',
    name: 'Peace Sign',
    description: 'Apply 3 Wish and 3 Charge to an Allied Unit within Range = 4. Costs 3 energy.',
    energyCost: 3,
    bonusDamage: 0,
    targetingType: 'dual-rotational',
    emoji: '✌️',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Idolize - select ally anywhere; buff ally and debuff adjacent enemies
export const Idolize: Skill = {
    id: 'idolize',
    name: 'Idolize',
    description: 'Select an Allied Unit anywhere. Apply 3 Focus to it. Apply 4 Doubt to all enemies adjacent to the target. Costs 12 energy.',
    energyCost: 12,
    bonusDamage: 0,
    targetingType: 'dual-rotational',
    emoji: '⭐',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Slip Counter - Hype Man allied defensive buff within range 2: Sturdy + Counter
export const SlipCounter: Skill = {
    id: 'slip-counter',
    name: 'Slip Counter',
    description: 'Apply 5 Sturdy and 5 Counter to an Allied Unit within Range = 2. Costs 7 energy.',
    energyCost: 7,
    bonusDamage: 0,
    targetingType: 'dual-rotational',
    emoji: '🤸',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Whirlwind - Hype Man area skill centered on self: damage enemies, haste allies
export const Whirlwind: Skill = {
    id: 'whirlwind',
    name: 'Whirlwind',
    description: 'Deal (Skill Damage) damage to all adjacent Enemy Units and apply 1 Haste to adjacent Allied Units (8-way). Costs 6 energy.',
    energyCost: 6,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '🌪️',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => [{ x: targetX, y: targetY, isPrimary: true }]
};

// Steady Beat - Hype Man's defensive buff skill for allies
export const SteadyBeat: Skill = {
    id: 'steady-beat',
    name: 'Steady Beat',
    description: 'Apply 1 Sturdy, 1 Ward, 1 Counter, and 1 Mirror to an Allied Unit within Range 4. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0, // No damage, this is a buff skill
    targetingType: 'dual-rotational', // Allows targeting any tile within range 4
    emoji: '🥁',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Single target skill - just target the selected position
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Outburst - Hype Man's area damage and knockback skill
export const Outburst: Skill = {
    id: 'outburst',
    name: 'Outburst',
    description: 'Deal (Skill Damage - 1) damage to all adjacent Units and move them back 2 Tiles. Costs 4 energy.',
    energyCost: 4,
    bonusDamage: -1, // Deals skill damage - 1
    targetingType: 'non-rotational', // Self-targeting skill like Prepare
    emoji: '💥',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Target all 8 adjacent tiles (cardinal and diagonal) around the caster
        return [
            // Clockwise starting from north as specified
            { x: targetX, y: targetY - 1, isPrimary: false },     // North
            { x: targetX + 1, y: targetY - 1, isPrimary: false }, // Northeast
            { x: targetX + 1, y: targetY, isPrimary: false },     // East
            { x: targetX + 1, y: targetY + 1, isPrimary: false }, // Southeast
            { x: targetX, y: targetY + 1, isPrimary: false },     // South
            { x: targetX - 1, y: targetY + 1, isPrimary: false }, // Southwest
            { x: targetX - 1, y: targetY, isPrimary: false },     // West
            { x: targetX - 1, y: targetY - 1, isPrimary: false }, // Northwest
        ];
    }
};

// Flash of Sun - apply 3 Blessed to adjacent allies (8-way), 4 Burn to adjacent enemies (8-way)
export const FlashOfSun: Skill = {
    id: 'flash-of-sun',
    name: 'Flash of Sun',
    description: 'Apply 3 Blessed to all adjacent allied units and 4 Burn to all adjacent enemy units (8-way). Costs 4 energy.',
    energyCost: 4,
    bonusDamage: 0,
    targetingType: 'non-rotational',
    emoji: '☀️',
    getTargetPattern: (targetX: number, targetY: number): SkillTarget[] => {
        // 8-way adjacency pattern around the caster/center
        return [
            { x: targetX, y: targetY - 1, isPrimary: false },     // North
            { x: targetX + 1, y: targetY - 1, isPrimary: false }, // Northeast
            { x: targetX + 1, y: targetY, isPrimary: false },     // East
            { x: targetX + 1, y: targetY + 1, isPrimary: false }, // Southeast
            { x: targetX, y: targetY + 1, isPrimary: false },     // South
            { x: targetX - 1, y: targetY + 1, isPrimary: false }, // Southwest
            { x: targetX - 1, y: targetY, isPrimary: false },     // West
            { x: targetX - 1, y: targetY - 1, isPrimary: false }, // Northwest
        ];
    }
};

// Switcheroo - Salesman's item swapping skill
export const Switcheroo: Skill = {
    id: 'switcheroo',
    name: 'Switcheroo',
    description: 'Swap equipped items with target unit (ally or enemy) within range 3. Costs 8 energy.',
    energyCost: 8,
    bonusDamage: 0, // No damage, this is a utility skill
    targetingType: 'dual-rotational', // Allows targeting any unit within range
    emoji: '🔄',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // Single target skill - target the selected position
        return [
            { x: targetX, y: targetY, isPrimary: true }
        ];
    }
};

// Bash - Salesman's basic damage skill
export const Bash: Skill = {
    id: 'bash',
    name: 'Bash',
    description: 'Strike with your briefcase, dealing Skill Damage to adjacent target. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 0, // Deals normal skill damage
    targetingType: 'adjacent-attack', // Can target adjacent enemies
    emoji: '💼',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // For adjacent-attack, we just return the single target position
        // The targeting system will handle showing the adjacent squares as valid targets
        return [
            { x: targetX, y: targetY }
        ];
    }
};

// Coin Toss - Salesman's high-risk high-reward skill
export const CoinToss: Skill = {
    id: 'coin-toss',
    name: 'Coin Toss',
    description: 'Deal (Skill Damage + 4) damage to unit exactly 3 squares away in any cardinal direction. Start next Shop Phase with 1 less Resource. Costs 2 energy.',
    energyCost: 2,
    bonusDamage: 4, // +4 damage bonus
    targetingType: 'adjacent-attack', // Can target units at exactly range 3
    emoji: '🪙',
    
    getTargetPattern: (targetX: number, targetY: number, direction?: Direction, rotation?: number): SkillTarget[] => {
        // For adjacent-attack, we just return the single target position
        // The targeting system will handle showing the valid targets at exactly range 3
        return [
            { x: targetX, y: targetY }
        ];
    }
};

// Skill registry for easy lookup
export const SKILL_REGISTRY: Record<string, Skill> = {
    'blazing-knuckle': BlazingKnuckle,
    'tera-fire': TeraFire,
    'universal-whisper': UniversalWhisper,
    'healing-circle': HealingCircle,
    'star-song': StarSong,
    'symphony': Symphony,
    'finger-of-god': FingerOfGod,
    'beam': Beam,
    'lights-on': LightsOn,
    'hurricane-slash': HurricaneSlash,
    'bandage': Bandage,
    'teleport': Teleport,
    'rescue': Rescue,
    'get-sturdy': GetSturdy,
    'taunt': Taunt,
    'prepare': Prepare,
    'zero-in': ZeroIn,
    'longshot': Longshot,
    'toxic-cloud': ToxicCloud,
    'exhaust': Exhaust,
    'jeer': Jeer,
    'poison-dart': PoisonDart,
    'distraction': Distraction,
    'back-off': BackOff,
    'drain-punch': DrainPunch,
    'toxic-king': ToxicKing,
    'psyche-break': PsycheBreak,
    'flare-shot': FlareShot,
    'flare-up': FlareUp,
    'splash': Splash,
    'spark-lance': SparkLance,
    'solar-ray': SolarRay,
    'aim-high': AimHigh,
    'aim-low': AimLow,
    'lead-the-charge': LeadTheCharge,
    'backflip': Backflip,
    'rally': Rally,
    'pierce': Pierce,
    'forceful-strike': ForcefulStrike,
    'disarming-slash': DisarmingSlash,
    'inspiring-slash': InspiringSlash,
    'overpierce': Overpierce,
    'comet-tail': CometTail,
    'cosmic-impact': CosmicImpact,
    'teleport-slash': TeleportSlash,
    'purifying-hand': PurifyingHand,
    'cauterize': Cauterize,
    'stars-blessing': StarsBlessing,
    'aethers-grace': AethersGrace,
    'divination': Divination,
    'gaias-rage': GaiasRage,
    'plasma-tempest': PlasmaTempest,
    'tidal-lock': TidalLock,
    // Hype Man skills
    'hype-up': HypeUp,
    'inspire-violence': InspireViolence,
    'mirror-aegis': MirrorAegis,
    'peace-sign': PeaceSign,
    'idolize': Idolize,
    'slip-counter': SlipCounter,
    'whirlwind': Whirlwind,
    'steady-beat': SteadyBeat,
    'outburst': Outburst,
    'flash-of-sun': FlashOfSun,
    // Sigilbearer skills
    'glass-floor': GlassFloor,
    'tracking-dart': TrackingDart,
    'flashbang': Flashbang,
    'perimeter': Perimeter,
    'hunker-down': HunkerDown,
    'mist-spray': MistSpray,
    'reflect': Reflect,
    'primal-mark': PrimalMark,
    'mistwalk': Mistwalk,
    'last-breath': LastBreath,
    'flatten': Flatten,
    'mysticism': Mysticism,
    'mirrormancy': Mirrormancy,
    'void-ray': VoidRay,
    'terraform': Terraform,
    // Builder skills
    'box-drop': BoxDrop,
    'deployable-spring': DeployableSpring,
    'create-turret': CreateTurret,
    'breaker': Breaker,
    'substitution': Substitution,
    'bomb-drop': BombDrop,
    'chaos-creation': ChaosCreation,
    'drone-clone': DroneClone,
    'boxed-in': BoxedIn,
    'sacrifice': Sacrifice,
    'jirret-line': JirretLine,
    // Rabbit Rider skills
    'glitch-strike': GlitchStrike,
    'bounce': Bounce,
    'gust-of-wind': GustOfWind,
    'wishing-star': WishingStar,
    'air-cannon': AirCannon,
    'retreating-strike': RetreatingStrike,
    'tailwind': Tailwind,
    // Salesman skills
    'switcheroo': Switcheroo,
    'bash': Bash,
    'coin-toss': CoinToss,
    'spring-slash': SpringSlash,
    'revenge': Revenge,
    'smoke-grenade': SmokeGrenade,
    'lifeblade': Lifeblade,
    'dizzy-slam': DizzySlam,
};

// Helper functions for rotational skills
export function rotateDirection(direction: Direction, clockwiseSteps: number): Direction {
    const directions: Direction[] = ['north', 'east', 'south', 'west'];
    const currentIndex = directions.indexOf(direction);
    const newIndex = (currentIndex + clockwiseSteps) % directions.length;
    return directions[newIndex];
}

export function rotatePattern(pattern: SkillTarget[], centerX: number, centerY: number, clockwiseSteps: number): SkillTarget[] {
    // Rotate pattern around center point (for target-rotational skills)
    const steps = clockwiseSteps % 4;
    
    return pattern.map(target => {
        const relativeX = target.x - centerX;
        const relativeY = target.y - centerY;
        
        let newRelativeX = relativeX;
        let newRelativeY = relativeY;
        
        // Apply rotation steps (90 degrees clockwise each step)
        for (let i = 0; i < steps; i++) {
            const tempX = newRelativeX;
            newRelativeX = -newRelativeY;
            newRelativeY = tempX;
        }
        
        return {
            ...target,
            x: centerX + newRelativeX,
            y: centerY + newRelativeY
        };
    });
} 