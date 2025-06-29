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
    energyCost: 3,
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

// Skill registry for easy lookup
export const SKILL_REGISTRY: Record<string, Skill> = {
    'blazing-knuckle': BlazingKnuckle,
    'tera-fire': TeraFire,
    'universal-whisper': UniversalWhisper,
    'hurricane-slash': HurricaneSlash,
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