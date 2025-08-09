import { Unit } from '../units/Unit';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { ModifierService } from './ModifierService';

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
        
        this.registerEffect({
            id: 'toxic-tile',
            name: 'Toxic Tile',
            description: 'Applies 1 Toxic to any unit that steps on it. Tile remains active.',
            icon: '☢️',
            visualColor: '#800080', // Purple color
            persistent: true, // Tile stays after use
            triggerOn: 'enter',
            effect: (unit: Unit, position: { x: number; y: number }) => {
                // Apply 1 stack of Toxicity to the unit
                ModifierService.applyModifier(unit, 'TOXICITY', 1, 'toxic-tile');
                console.log(`☢️ ${unit.name} stepped on a toxic tile at (${position.x}, ${position.y}) and gained 1 Toxicity!`);
            }
        });
        
        this.registerEffect({
            id: 'spotlight',
            name: 'Spotlight',
            description: 'When an enemy unit enters this tile, the creator will perform a basic attack on them if in range',
            icon: '🔍',
            visualColor: '#FFD700',
            persistent: true, // Changed to persistent so it doesn't auto-remove
            triggerOn: 'enter',
            effect: (unit: Unit, position: { x: number; y: number }) => {
                // Get the tile effect instance to find who created it
                const effects = this.getEffectsAtPosition(position);
                const spotlightEffect = effects.find(e => e.effectId === 'spotlight');
                
                if (!spotlightEffect || !spotlightEffect.appliedBy) {
                    console.log(`🔍 Spotlight triggered but no creator found at (${position.x}, ${position.y})`);
                    return;
                }
                
                // Find the creator unit
                const creatorUnit = this.findCreatorUnit(spotlightEffect.appliedBy);
                if (!creatorUnit) {
                    console.log(`🔍 Spotlight creator unit not found: ${spotlightEffect.appliedBy}`);
                    return;
                }
                
                // Check if the unit entering is an enemy of the creator
                if (unit.team === creatorUnit.team) {
                    console.log(`🔍 ${unit.name} is not an enemy of ${creatorUnit.name}, spotlight not triggered`);
                    return; // Don't remove the tile, just don't trigger
                }
                
                // Check if creator is in range to attack
                const creatorPosition = this.getUnitPosition(creatorUnit);
                if (!creatorPosition) {
                    console.log(`🔍 Creator ${creatorUnit.name} position not found`);
                    return;
                }
                
                const distance = Math.abs(creatorPosition.x - position.x) + Math.abs(creatorPosition.y - position.y);
                if (distance > creatorUnit.range) {
                    console.log(`🔍 ${creatorUnit.name} is out of range to attack ${unit.name} (distance: ${distance}, range: ${creatorUnit.range})`);
                    return;
                }
                
                // Perform basic attack
                console.log(`🔍 Spotlight activated! ${creatorUnit.name} attacks ${unit.name} at (${position.x}, ${position.y})`);
                this.performBasicAttack(creatorUnit, unit);
                
                // Remove the spotlight effect after it triggers successfully
                this.removeEffect(spotlightEffect.id);
                console.log(`🔍 Spotlight tile at (${position.x}, ${position.y}) consumed after triggering`);
                
                // Update the visual tile effect renderer
                setTimeout(() => {
                    const globalTileEffectRenderer = (window as any).globalTileEffectRenderer;
                    if (globalTileEffectRenderer) {
                        console.log(`🔍 Updating tile effect renderer after spotlight consumption`);
                        globalTileEffectRenderer.updateTileEffects(this);
                    }
                }, 200);
            }
        });
        
        this.registerEffect({
            id: 'glass-tile',
            name: 'Glass Tile',
            description: 'Applies 1 Mirror to any Unit entering, starting or ending its Turn on this tile',
            icon: '🪟',
            visualColor: '#87CEEB', // Sky blue, translucent glass-like color
            persistent: true,
            triggerOn: 'both', // Triggers on both enter and exit for turn start/end coverage
            effect: (unit: Unit, position: { x: number; y: number }) => {
                // Apply 1 stack of Mirror modifier to the unit
                ModifierService.applyModifier(unit, 'MIRROR', 1, 'glass-tile');
                console.log(`🪟 ${unit.name} stepped on a glass tile at (${position.x}, ${position.y}) and gained 1 Mirror!`);
                
                // Update visual modifier indicators
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                    console.log(`🏷️ Updated visual modifiers for ${unit.name} after Glass Tile effect`);
                }
            }
        });
        
        this.registerEffect({
            id: 'mist-tile',
            name: 'Mist Tile',
            description: 'Mystical mist that provides protective Ward to units on this tile',
            icon: '🌫️',
            visualColor: '#B0C4DE', // Light steel blue, misty color
            persistent: true,
            triggerOn: 'both', // Triggers on both enter and exit for turn start/end coverage
            effect: (unit: Unit, position: { x: number; y: number }) => {
                // Apply 1 stack of Ward modifier to the unit
                ModifierService.applyModifier(unit, 'WARD', 1, 'mist-tile');
                console.log(`🌫️ ${unit.name} entered mist at (${position.x}, ${position.y}) and gained 1 Ward!`);
                
                // Update visual modifier indicators
                const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                    console.log(`🏷️ Updated visual modifiers for ${unit.name} after Mist Tile effect`);
                }
            }
        });

        // Smoke Tile - visual texture; end-of-turn application handled in PassiveService
        this.registerEffect({
            id: 'smoke-tile',
            name: 'Smoke Tile',
            description: 'A dense smoke cloud. At end of turn, units on this tile gain +3 Sturdy and +3 Ward.',
            icon: '💨',
            visualColor: '#000000', // Black – used only for fallback rendering
            persistent: true,
            triggerOn: 'enter', // Visual presence; actual buff applied at end of turn
            effect: (_unit: Unit, position: { x: number; y: number }) => {
                console.log(`💨 Smoke tile present at (${position.x}, ${position.y})`);
            }
        });

        // Spring Tile - directional launcher triggered at end of turn (handled via PassiveService)
        this.registerEffect({
            id: 'spring-tile',
            name: 'Spring Tile',
            description: 'Launches a unit up to 3 tiles in its set direction at end of turn',
            icon: '🌀',
            visualColor: '#32CD32', // Lime green
            persistent: true,
            triggerOn: 'enter', // Visual only; actual launch handled on end-turn
            effect: (_unit: Unit, position: { x: number; y: number }) => {
                console.log(`🌀 Spring tile present at (${position.x}, ${position.y})`);
            }
        });
    }
    
    public registerEffect(definition: TileEffectDefinition): void {
        this.effectDefinitions.set(definition.id, definition);
        console.log(`📝 Registered tile effect: ${definition.name}`);
    }
    
    public addEffect(
        effectId: string,
        position: { x: number; y: number },
        duration: number = -1,
        appliedBy?: string,
        customData?: any
    ): string | null {
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
            appliedBy,
            customData
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
                console.log(`🗑️ Removed ${definition?.name || 'unknown'} effect (ID: ${instanceId}) from (${removed.position.x}, ${removed.position.y})`);
                console.log(`🗑️ Remaining effects at position: ${effects.length}`);
                
                if (effects.length === 0) {
                    this.activeEffects.delete(positionKey);
                    console.log(`🗑️ Cleared position (${removed.position.x}, ${removed.position.y}) from active effects map`);
                }
                return true;
            }
        }
        console.warn(`🗑️ Failed to find effect with ID: ${instanceId}`);
        return false;
    }
    
    public getEffectsAtPosition(position: { x: number; y: number }): TileEffectInstance[] {
        const positionKey = `${position.x},${position.y}`;
        return this.activeEffects.get(positionKey) || [];
    }
    
    public triggerEffects(unit: Unit, position: { x: number; y: number }, triggerType: 'enter' | 'exit'): void {
        const effects = this.getEffectsAtPosition(position);
        let removedNonPersistentEffect = false;
        
        for (const effectInstance of effects) {
            const definition = this.effectDefinitions.get(effectInstance.effectId);
            if (!definition) continue;
            
            if (definition.triggerOn === triggerType || definition.triggerOn === 'both') {
                // Trigger the effect
                definition.effect(unit, position);
                
                // Remove the effect if it's not persistent
                if (!definition.persistent) {
                    this.removeEffect(effectInstance.id);
                    removedNonPersistentEffect = true;
                }
            }
        }
        
        // Update the visual tile effect renderer if any non-persistent effects were removed
        if (removedNonPersistentEffect) {
            setTimeout(() => {
                const globalTileEffectRenderer = (window as any).globalTileEffectRenderer;
                if (globalTileEffectRenderer) {
                    console.log(`🔍 Updating tile effect renderer to remove non-persistent effects`);
                    globalTileEffectRenderer.updateTileEffects(this);
                } else {
                    console.warn(`🔍 globalTileEffectRenderer not found in window object`);
                }
            }, 200); // Longer delay to ensure all animations and effects are completed
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
    
    /**
     * Helper method to find a unit by ID across all registries
     */
    private findCreatorUnit(unitId: string): Unit | null {
        // Check player units
        for (const unit of globalUnitRegistry.playerParty) {
            if (unit.id === unitId) return unit;
        }
        
        // Check enemy units
        for (const unit of globalUnitRegistry.enemyUnits) {
            if (unit.id === unitId) return unit;
        }
        
        return null;
    }
    
    /**
     * Helper method to get unit position
     */
    private getUnitPosition(unit: Unit): { x: number; y: number } | null {
        // Access the global game scene instance
        const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
        if (gameSceneInstance) {
            return gameSceneInstance.getUnitPosition(unit) || null;
        }
        return null;
    }
    
    /**
     * Helper method to perform basic attack with animations and death checks
     */
    private performBasicAttack(attacker: Unit, defender: Unit): void {
        // Calculate basic attack damage with attacker modifiers
        const baseDamage = attacker.basicDamage;
        const attackResult = ModifierService.processBasicAttackDamageModifiers(attacker, baseDamage);
        
        // Process defender modifiers
        const defenseResult = ModifierService.processBasicAttackDefenseModifiers(defender, attackResult.finalDamage, attacker);
        const finalDamage = defenseResult.finalDamage;
        
        // Apply damage
        const oldHealth = defender.currentHealth;
        defender.currentHealth = Math.max(0, defender.currentHealth - finalDamage);
        
        console.log(`🔍 Spotlight attack: ${attacker.name} deals ${finalDamage} damage to ${defender.name} (${oldHealth} → ${defender.currentHealth})`);
        
        // Handle energy changes for kinetic units
        if (attacker.energyType.toLowerCase() === 'kinetic') {
            attacker.currentEnergy = Math.min(attacker.maxEnergy, attacker.currentEnergy + 1);
        }
        
        if (defender.energyType.toLowerCase() === 'kinetic') {
            defender.currentEnergy = Math.min(defender.maxEnergy, defender.currentEnergy + 1);
        }
        
        // Trigger animations and death checks via the game scene
        const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
        if (gameSceneInstance) {
            // Show damage animation
            gameSceneInstance.showDamageAnimation(defender, finalDamage, '🔍');
            
            // Update unit health bars
            gameSceneInstance.updateUnitBars(defender);
            gameSceneInstance.updateUnitBars(attacker);
            
            // Check if defender died
            if (defender.currentHealth <= 0) {
                console.log(`💀 ${defender.name} was killed by spotlight attack from ${attacker.name}`);
                gameSceneInstance.handleUnitDeath(defender);
            }
            
            // Note: The tile effect renderer update is handled by triggerEffects method
            // No need to duplicate the renderer update here
        }
    }

    /**
     * Clear all active tile effects - used for cleanup between games
     */
    public clearAllEffects(): void {
        console.log(`🧹 Clearing ${this.activeEffects.size} positions with tile effects`);
        
        // Clear the active effects map
        this.activeEffects.clear();
        
        // Clear visual representations through the renderer
        const globalTileEffectRenderer = (window as any).globalTileEffectRenderer;
        if (globalTileEffectRenderer) {
            globalTileEffectRenderer.updateTileEffects(this);
            console.log(`🧹 Updated tile effect renderer to clear all visual effects`);
        }
        
        console.log(`✅ All tile effects cleared`);
    }
}

// Global instance
export const globalTileEffectManager = new TileEffectManager(); 