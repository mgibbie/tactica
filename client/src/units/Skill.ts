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

// Skill registry for easy lookup
export const SKILL_REGISTRY: Record<string, Skill> = {
    'blazing-knuckle': BlazingKnuckle,
    'tera-fire': TeraFire,
    'universal-whisper': UniversalWhisper,
    'healing-circle': HealingCircle,
    'beam': Beam,
    'lights-on': LightsOn,
    'hurricane-slash': HurricaneSlash,
    'bandage': Bandage,
    'teleport': Teleport,
    'prepare': Prepare,
    'longshot': Longshot,
    'toxic-cloud': ToxicCloud,
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