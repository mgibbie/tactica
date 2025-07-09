import { Unit } from '../units/Unit';

export interface TileEffectDefinition {
    id: string;
    name: string;
    description: string;
    icon: string;
    visualColor: string; // Hex color for visual representation
    persistent: boolean; // Whether the effect stays on the tile after triggering
    triggerOn: 'enter' | 'exit' | 'both'; // When the effect triggers
    
    // The actual effect function that gets called when triggered
    effect: (unit: Unit, position: { x: number; y: number }) => void;
}

export interface TileEffectInstance {
    id: string; // Unique instance ID
    effectId: string; // References TileEffectDefinition.id
    position: { x: number; y: number };
    duration: number; // -1 for permanent, 0+ for temporary (in turns)
    appliedBy?: string; // Unit ID that applied this effect (optional)
    customData?: any; // Additional data for complex effects
}

export class TileEffectManager {
    private activeEffects: Map<string, TileEffectInstance[]> = new Map(); // Key: "x,y"
    private effectDefinitions: Map<string, TileEffectDefinition> = new Map();
    
    constructor() {
        this.initializeDefaultEffects();
    }
    
    private initializeDefaultEffects(): void {
        // Example tile effects - you can expand this later
        this.registerEffect({
            id: 'spike-trap',
            name: 'Spike Trap',
            description: 'Deals 2 damage to any unit that steps on it',
            icon: '🗡️',
            visualColor: '#8B0000',
            persistent: true,
            triggerOn: 'enter',
            effect: (unit: Unit, position: { x: number; y: number }) => {
                const damage = 2;
                unit.currentHealth = Math.max(0, unit.currentHealth - damage);
                console.log(`💥 ${unit.name} stepped on a spike trap at (${position.x}, ${position.y}) and took ${damage} damage! Health: ${unit.currentHealth}/${unit.health}`);
            }
        });
        
        this.registerEffect({
            id: 'healing-spring',
            name: 'Healing Spring',
            description: 'Restores 3 health to any unit that steps on it',
            icon: '💧',
            visualColor: '#00FF00',
            persistent: true,
            triggerOn: 'enter',
            effect: (unit: Unit, position: { x: number; y: number }) => {
                const healing = 3;
                unit.currentHealth = Math.min(unit.health, unit.currentHealth + healing);
                console.log(`💚 ${unit.name} stepped on a healing spring at (${position.x}, ${position.y}) and recovered ${healing} health! Health: ${unit.currentHealth}/${unit.health}`);
            }
        });
        
        this.registerEffect({
            id: 'energy-well',
            name: 'Energy Well',
            description: 'Restores 2 energy to any unit that steps on it',
            icon: '⚡',
            visualColor: '#0080FF',
            persistent: true,
            triggerOn: 'enter',
            effect: (unit: Unit, position: { x: number; y: number }) => {
                const energyRestore = 2;
                unit.currentEnergy = Math.min(unit.maxEnergy, unit.currentEnergy + energyRestore);
                console.log(`⚡ ${unit.name} stepped on an energy well at (${position.x}, ${position.y}) and recovered ${energyRestore} energy! Energy: ${unit.currentEnergy}/${unit.maxEnergy}`);
            }
        });
    }
    
    public registerEffect(definition: TileEffectDefinition): void {
        this.effectDefinitions.set(definition.id, definition);
        console.log(`📝 Registered tile effect: ${definition.name}`);
    }
    
    public addEffect(effectId: string, position: { x: number; y: number }, duration: number = -1, appliedBy?: string): string | null {
        const definition = this.effectDefinitions.get(effectId);
        if (!definition) {
            console.error(`❌ Unknown tile effect: ${effectId}`);
            return null;
        }
        
        const instanceId = `${effectId}-${Date.now()}-${Math.random()}`;
        const instance: TileEffectInstance = {
            id: instanceId,
            effectId,
            position,
            duration,
            appliedBy
        };
        
        const positionKey = `${position.x},${position.y}`;
        const existingEffects = this.activeEffects.get(positionKey) || [];
        existingEffects.push(instance);
        this.activeEffects.set(positionKey, existingEffects);
        
        console.log(`✨ Added ${definition.name} effect at (${position.x}, ${position.y})`);
        return instanceId;
    }
    
    public removeEffect(instanceId: string): boolean {
        for (const [positionKey, effects] of this.activeEffects.entries()) {
            const index = effects.findIndex(effect => effect.id === instanceId);
            if (index !== -1) {
                const removed = effects.splice(index, 1)[0];
                const definition = this.effectDefinitions.get(removed.effectId);
                console.log(`🗑️ Removed ${definition?.name || 'unknown'} effect from (${removed.position.x}, ${removed.position.y})`);
                
                if (effects.length === 0) {
                    this.activeEffects.delete(positionKey);
                }
                return true;
            }
        }
        return false;
    }
    
    public getEffectsAtPosition(position: { x: number; y: number }): TileEffectInstance[] {
        const positionKey = `${position.x},${position.y}`;
        return this.activeEffects.get(positionKey) || [];
    }
    
    public triggerEffects(unit: Unit, position: { x: number; y: number }, triggerType: 'enter' | 'exit'): void {
        const effects = this.getEffectsAtPosition(position);
        
        for (const effectInstance of effects) {
            const definition = this.effectDefinitions.get(effectInstance.effectId);
            if (!definition) continue;
            
            if (definition.triggerOn === triggerType || definition.triggerOn === 'both') {
                // Trigger the effect
                definition.effect(unit, position);
                
                // Remove the effect if it's not persistent
                if (!definition.persistent) {
                    this.removeEffect(effectInstance.id);
                }
            }
        }
    }
    
    public updateEffects(): void {
        // Called each turn to update temporary effects
        for (const [positionKey, effects] of this.activeEffects.entries()) {
            const effectsToRemove: string[] = [];
            
            for (const effect of effects) {
                if (effect.duration > 0) {
                    effect.duration--;
                    if (effect.duration === 0) {
                        effectsToRemove.push(effect.id);
                    }
                }
            }
            
            effectsToRemove.forEach(id => this.removeEffect(id));
        }
    }
    
    public getAllActiveEffects(): Map<string, TileEffectInstance[]> {
        return new Map(this.activeEffects);
    }
    
    public getEffectDefinition(effectId: string): TileEffectDefinition | undefined {
        return this.effectDefinitions.get(effectId);
    }
}

// Global instance
export const globalTileEffectManager = new TileEffectManager(); 