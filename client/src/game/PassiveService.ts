import { Unit } from '../units/Unit';
import { ModifierService } from './ModifierService';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { globalTileEffectManager, globalTileEffectRenderer, SCENE_GLOBAL } from '../game';
import rabbitImage from '../assets/Images/rabbit.png';
import * as THREE from 'three';

// Tile dimensions - will be set by GameScene
let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForPassives(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class PassiveService {
    // Track units that transformed into Rabbit this round for reversion at round end
    private static rabbitTransformState: Map<string, {
        originalName: string;
        originalClassName: string;
        originalImageUrl: string;
        originalPassives: any[];
    }> = new Map();

    // Units that requested death removal prevention (e.g., Rabbit Riding)
    private static preventRemovalUnitIds: Set<string> = new Set();

    public static shouldPreventRemoval(unitId: string): boolean {
        return PassiveService.preventRemovalUnitIds.has(unitId);
    }

    public static consumePreventRemoval(unitId: string): boolean {
        if (PassiveService.preventRemovalUnitIds.has(unitId)) {
            PassiveService.preventRemovalUnitIds.delete(unitId);
            return true;
        }
        return false;
    }

    /**
     * Returns true if the unit is currently in Rabbit form (pending battle-end reversion)
     */
    public static isRabbitForm(unitId: string): boolean {
        return PassiveService.rabbitTransformState.has(unitId);
    }
    
    /**
     * Process skip action passives for a unit
     * This should be called when a unit skips their action phase
     */
    public static processSkipActionPassives(unit: Unit): void {
        if (!unit.passives || unit.passives.length === 0) {
            return;
        }
        
        console.log(`⏭️ Processing skip action passives for ${unit.name}...`);
        
        for (const passive of unit.passives) {
            switch (passive.id) {
                case 'stoic':
                    this.processStoicPassive(unit);
                    break;
                case 'overwatch':
                    this.processOverwatchPassive(unit);
                    break;
                // Add other skip-action passives here as they are implemented
                default:
                    // Not all passives trigger on skip action, so don't warn
                    break;
            }
        }
    }
    
    /**
     * Process movement passives for a unit
     * This should be called when a unit completes movement
     */
    public static processMovementPassives(unit: Unit, fromPosition: { x: number; y: number }, toPosition: { x: number; y: number }): void {
        console.log(`🚶 Processing movement passives for ${unit.name}...`);
        
        if (unit.passives && unit.passives.length > 0) {
            for (const passive of unit.passives) {
                switch (passive.id) {
                    case 'toxic-presence':
                        this.processToxicPresencePassive(unit, fromPosition);
                        break;
                    case 'walking-ward':
                        this.processWalkingWardPassive(unit, fromPosition);
                        break;
                    // Add other movement passives here as they are implemented
                    default:
                        // Not all passives trigger on movement, so don't warn
                        break;
                }
            }
        }
        // Sentry triggers on any unit entering tiles within range of a sentry owner
        this.triggerNearbySentries(unit, toPosition, 'enter');
    }
    
    /**
     * Process end-of-turn passives for a specific unit
     * This should be called when a unit's turn ends
     */
    public static processEndTurnPassives(unit: Unit): void {
        console.log(`🎵 Processing end-of-turn passives for ${unit.name}...`);
        
        if (unit.passives && unit.passives.length > 0) {
            for (const passive of unit.passives) {
                switch (passive.id) {
                    case 'beatbox':
                        this.processBeatboxPassive(unit);
                        break;
                    case 'rally-cry':
                        this.processRallyCryPassive(unit);
                        break;
                    // Add other end-of-turn passives here as they are implemented
                    default:
                        // Not all passives trigger at turn end, so don't warn
                        break;
                }
            }
        }
        // Sentry triggers against the unit that just ended their turn
        this.triggerNearbySentries(unit, this.findUnitPosition(unit), 'end');
    }

    /**
     * Sentry helper: deal 1 damage to any opposing unit within range 2 of the provided origin position.
     * Trigger types: 'enter' (moved unit entering area), 'start' (turn start), 'end' (turn end)
     */
    public static triggerNearbySentries(subjectUnit: Unit, origin: { x: number; y: number } | null, trigger: 'enter' | 'start' | 'end'): void {
        if (!origin) return;
        const allUnits: Unit[] = [
            ...globalUnitRegistry.playerParty,
            ...globalUnitRegistry.enemyUnits
        ];
        // Find sentry owners (structures with 'sentry' passive)
        const sentryOwners = allUnits.filter(u => u.passives?.some(p => p.id === 'sentry'));
        if (sentryOwners.length === 0) return;

        // For each sentry owner, if subjectUnit is in range 2 and on opposing team, deal 1 damage
        sentryOwners.forEach(owner => {
            if (owner.team === subjectUnit.team) return; // Only affect opponents
            const ownerPos = this.findUnitPosition(owner);
            if (!ownerPos) return;
            const distance = Math.abs(ownerPos.x - origin.x) + Math.abs(ownerPos.y - origin.y);
            if (distance <= 2) {
                const oldHp = subjectUnit.currentHealth;
                subjectUnit.currentHealth = Math.max(0, subjectUnit.currentHealth - 1);
                console.log(`🎯 Sentry (${trigger}) from ${owner.name} hits ${subjectUnit.name} for 1: ${oldHp} → ${subjectUnit.currentHealth}/${subjectUnit.health}`);
                // If lethal, route through GameScene to handle death
                if (subjectUnit.currentHealth <= 0) {
                    const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                    if (gameSceneInstance) {
                        gameSceneInstance.handleUnitDeath(subjectUnit);
                    }
                }
            }
        });
    }

    private static findUnitPosition(unit: Unit): { x: number; y: number } | null {
        try {
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const pos = gameSceneInstance?.unitRenderer?.getUnitPosition(unit);
            return pos || null;
        } catch {
            return null;
        }
    }

    /**
     * Call at the start of a unit's turn to trigger Sentry on units within range of sentry owners.
     */
    public static processStartTurnSentry(unit: Unit): void {
        this.triggerNearbySentries(unit, this.findUnitPosition(unit), 'start');
    }
    
    /**
     * Process round-end passives for all units
     * This should be called at the end of each round
     */
    public static processRoundEndPassives(): void {
        console.log('🔚 Processing round-end passives for all units...');
        
        const allUnits: Unit[] = [
            ...globalUnitRegistry.playerParty,
            ...globalUnitRegistry.enemyUnits
        ];
        
        allUnits.forEach(unit => {
            if (unit.currentHealth <= 0) return; // Skip dead units
            
            if (!unit.passives || unit.passives.length === 0) {
                return;
            }
            
            for (const passive of unit.passives) {
                switch (passive.id) {
                    case 'blessing-box':
                        this.processBlessingBoxPassive(unit);
                        break;
                    // Add other round-end passives here
                    default:
                        // Not all passives trigger at round end, so don't warn
                        break;
                }
            }
        });
        
        console.log('✅ Finished processing round-end passives');
    }

    /**
     * Revert all Rabbit Riding transformations at battle end (before returning to shop/squad view)
     */
    public static revertRabbitRidersAtBattleEnd(): void {
        if (PassiveService.rabbitTransformState.size === 0) return;
        console.log('🐇 Reverting Rabbit Riding transformations at battle end');

        try {
            const entries = Array.from(PassiveService.rabbitTransformState.entries());
            entries.forEach(([unitId, saved]) => {
                // Try to find the unit in the global registry
                const unit = globalUnitRegistry.findUnitById(unitId);
                if (unit) {
                    unit.name = saved.originalName;
                    unit.className = saved.originalClassName;
                    unit.imageUrl = saved.originalImageUrl;
                    unit.passives = saved.originalPassives;
                    console.log(`🐇 Reverted ${unit.name} back to Rabbit Rider (battle end)`);
                }
                // Clear saved state regardless
                PassiveService.rabbitTransformState.delete(unitId);
            });
        } catch (e) {
            console.warn('⚠️ Error while reverting Rabbit transformations at battle end:', e);
        }
    }
    
    /**
     * Process unit death passives for a unit
     * This should be called when a unit dies
     */
    public static processUnitDeathPassives(unit: Unit): void {
        if (!unit.passives || unit.passives.length === 0) {
            return;
        }
        
        console.log(`💀 Processing unit death passives for ${unit.name}...`);
        
        for (const passive of unit.passives) {
            switch (passive.id) {
                case 'rabbit-riding':
                    this.processRabbitRidingPassive(unit);
                    break;
                case 'death-of-a-salesman':
                    this.processDeathOfASalesmanPassive(unit);
                    break;
                // Add other unit death passives here as they are implemented
                default:
                    // Not all passives trigger on unit death, so don't warn
                    break;
            }
        }
    }
    
    /**
     * Process receive-basic-attack passives for a unit
     * This should be called when a unit is targeted by a basic attack
     */
    public static processReceiveBasicAttackPassives(unit: Unit): void {
        if (!unit.passives || unit.passives.length === 0) {
            return;
        }
        
        console.log(`🛡️ Processing receive-basic-attack passives for ${unit.name}...`);
        
        for (const passive of unit.passives) {
            switch (passive.id) {
                case 'resolute':
                    this.processResolutePassive(unit);
                    break;
                case 'lucky-rabbit-foot':
                    // This passive is handled on lethal damage in the attack/skill damage flow, not on target selection
                    break;
                // Add other receive-basic-attack passives here as they are implemented
                default:
                    // Not all passives trigger on receiving basic attacks, so don't warn
                    break;
            }
        }
    }

    /**
     * Handle lethal damage shield for Lucky Rabbit Foot.
     * Returns true if lethal damage was prevented (unit set to 1 HP and passive marked used).
     */
    public static tryPreventLethalWithLuckyFoot(unit: Unit): boolean {
        if (!unit.passives) return false;
        const hasPassive = unit.passives.some(p => p.id === 'lucky-rabbit-foot');
        if (!hasPassive) return false;

        // Use a battle-scoped flag on the unit to track usage
        const anyUnit: any = unit as any;
        if (anyUnit._luckyRabbitFootUsed === true) return false;

        // Prevent lethal once: set health to 1 and mark used
        if (unit.currentHealth <= 0) {
            unit.currentHealth = 1;
            anyUnit._luckyRabbitFootUsed = true;
            console.log(`🐾 Lucky Rabbit Foot saved ${unit.name}! Health set to 1.`);
            
            // Small heal flash or indicator could be added here
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                gameSceneInstance.unitRenderer.updateUnitBars(unit);
            }
            return true;
        }
        return false;
    }

    /**
     * Reset per-battle lucky foot usage for a unit (used when transforming to Rabbit)
     */
    public static resetLuckyFootUsage(unit: Unit): void {
        const anyUnit: any = unit as any;
        if (anyUnit._luckyRabbitFootUsed) {
            delete anyUnit._luckyRabbitFootUsed;
            console.log(`🐾 Reset Lucky Rabbit Foot usage for ${unit.name}`);
        }
    }
    
    /**
     * Process post-skill passives for a unit
     * This should be called after a unit performs a skill
     */
    public static processPostSkillPassives(unit: Unit, skill: any, affectedUnits: Unit[]): void {
        if (!unit.passives || unit.passives.length === 0) {
            return;
        }
        
        console.log(`🎯 Processing post-skill passives for ${unit.name} after using ${skill.name}...`);
        
        // Check if this was a damage-dealing skill
        const isDamageDealing = this.isSkillDamageDealing(skill, affectedUnits);
        
        for (const passive of unit.passives) {
            switch (passive.id) {
                case 'mastery':
                    if (isDamageDealing) {
                        this.processMasteryPassive(unit, skill);
                    }
                    break;
                // Add other post-skill passives here as they are implemented
                default:
                    // Not all passives trigger after skills, so don't warn
                    break;
            }
        }
    }
    
    /**
     * Determine if a skill was damage-dealing based on the skill and affected units
     */
    private static isSkillDamageDealing(skill: any, affectedUnits: Unit[]): boolean {
        // Healing skills are not damage-dealing
        if (skill.id === 'universal-whisper' || skill.id === 'healing-circle' || skill.id === 'bandage') {
            return false;
        }
        
        // Utility/buff skills are not damage-dealing
        if (skill.id === 'hype-up' || skill.id === 'prepare' || skill.id === 'jeer' || 
            skill.id === 'steady-beat' || skill.id === 'rescue' || skill.id === 'get-sturdy' || 
            skill.id === 'taunt' || skill.id === 'switcheroo' || skill.id === 'exhaust') {
            return false;
        }
        
        // Skills that affect enemies (non-healing, non-utility) are damage-dealing
        return affectedUnits.length > 0;
    }
    
    /**
     * Process the Stoic passive: Gain 2 Counter when skipping action phase
     */
    private static processStoicPassive(unit: Unit): void {
        console.log(`🛡️ ${unit.name} triggers Stoic passive - gaining 2 Counter for skipping action`);
        
        // Apply 2 Counter modifier
        const success = ModifierService.applyModifier(unit, 'COUNTER', 2, unit.id);
        
        if (success) {
            console.log(`✅ ${unit.name} gained 2 Counter from Stoic passive`);
            
            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                console.log(`🔍 Updating visual modifiers for ${unit.name} after Stoic passive`);
                gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                console.log(`🏷️ Updated visual modifiers for ${unit.name} after Stoic passive`);
                
                // Force a render update with a small delay to ensure it takes effect
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                    console.log(`🔄 Delayed visual modifier update for ${unit.name} after Stoic`);
                }, 100);
            }
        } else {
            console.error(`❌ Failed to apply Counter modifier to ${unit.name} from Stoic passive`);
        }
    }
    
    /**
     * Process the Blessing Box passive: Restore 2 Health to all adjacent Allies and this Unit at round end
     */
    private static processBlessingBoxPassive(unit: Unit): void {
        console.log(`💚 ${unit.name} triggers Blessing Box passive - healing adjacent allies`);
        
        // Get the game scene instance to access unit positions and animations
        const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
        if (!gameSceneInstance || !gameSceneInstance.unitRenderer) {
            console.error('❌ Cannot access game scene for Blessing Box passive');
            return;
        }
        
        // Get the healer's position
        const healerPosition = gameSceneInstance.unitRenderer.getUnitPosition(unit);
        if (!healerPosition) {
            console.error(`❌ Cannot find position for ${unit.name}`);
            return;
        }
        
        console.log(`🏥 Healer ${unit.name} at position (${healerPosition.x}, ${healerPosition.y})`);
        
        // Define all 8 adjacent positions (cardinal + diagonal)
        const adjacentOffsets = [
            { x: -1, y: -1 }, // Northwest
            { x: 0, y: -1 },  // North
            { x: 1, y: -1 },  // Northeast
            { x: -1, y: 0 },  // West
            { x: 1, y: 0 },   // East
            { x: -1, y: 1 },  // Southwest
            { x: 0, y: 1 },   // South
            { x: 1, y: 1 }    // Southeast
        ];
        
        // First, heal the healer itself
        const healerOldHealth = unit.currentHealth;
        unit.currentHealth = Math.min(unit.health, unit.currentHealth + 2);
        const healerHealAmount = unit.currentHealth - healerOldHealth;
        
        if (healerHealAmount > 0) {
            console.log(`💚 ${unit.name} heals self for ${healerHealAmount} health (${healerOldHealth} → ${unit.currentHealth})`);
            
            // Show heal animation on healer using AnimationManager
            if (gameSceneInstance.animationManager && gameSceneInstance.animationManager.showHealingAnimation) {
                gameSceneInstance.animationManager.showHealingAnimation(
                    unit,
                    healerHealAmount,
                    '💚',
                    (unit: Unit) => gameSceneInstance.unitRenderer.getUnitPosition(unit),
                    (unit: Unit) => gameSceneInstance.unitRenderer.getUnitMesh(unit)
                );
            }
        }
        
        // Now process all adjacent positions
        adjacentOffsets.forEach(offset => {
            const adjacentX = healerPosition.x + offset.x;
            const adjacentY = healerPosition.y + offset.y;
            
            // Get unit at this position (if any)
            const adjacentUnit = gameSceneInstance.unitRenderer.getUnitAtPosition ? 
                gameSceneInstance.unitRenderer.getUnitAtPosition(adjacentX, adjacentY) : null;
            
            if (adjacentUnit) {
                // There's a unit at this position
                if (adjacentUnit.team === unit.team) {
                    // Allied unit - heal them
                    const oldHealth = adjacentUnit.currentHealth;
                    adjacentUnit.currentHealth = Math.min(adjacentUnit.health, adjacentUnit.currentHealth + 2);
                    const healAmount = adjacentUnit.currentHealth - oldHealth;
                    
                    if (healAmount > 0) {
                        console.log(`💚 ${adjacentUnit.name} healed for ${healAmount} health (${oldHealth} → ${adjacentUnit.currentHealth})`);
                        
                        // Show heal animation using AnimationManager
                        if (gameSceneInstance.animationManager && gameSceneInstance.animationManager.showHealingAnimation) {
                            gameSceneInstance.animationManager.showHealingAnimation(
                                adjacentUnit,
                                healAmount,
                                '💚',
                                (unit: Unit) => gameSceneInstance.unitRenderer.getUnitPosition(unit),
                                (unit: Unit) => gameSceneInstance.unitRenderer.getUnitMesh(unit)
                            );
                        }
                    }
                } else {
                    // Enemy unit - don't heal, don't show animation
                    console.log(`👹 Enemy ${adjacentUnit.name} at (${adjacentX}, ${adjacentY}) - no heal animation`);
                }
            } else {
                // Empty square - show heal animation anyway
                console.log(`✨ Empty square at (${adjacentX}, ${adjacentY}) - showing heal animation`);
                if (gameSceneInstance.animationManager) {
                    this.showPositionBasedHealAnimation(gameSceneInstance, adjacentX, adjacentY, 2);
                }
            }
        });
        
        console.log(`✅ ${unit.name} Blessing Box passive completed`);
    }
    
    /**
     * Process the Toxic Presence passive: Leave behind a toxic tile when moving
     */
    private static processToxicPresencePassive(unit: Unit, fromPosition: { x: number; y: number }): void {
        console.log(`☣️ ${unit.name} triggers Toxic Presence passive - leaving toxic tile at origin`);
        
        // Create a toxic tile at the unit's starting position
        if (globalTileEffectManager) {
            globalTileEffectManager.addEffect('toxic-tile', fromPosition, -1, unit.id);
            console.log(`☣️ ${unit.name} left a toxic tile at (${fromPosition.x}, ${fromPosition.y})`);
            
            // Update the visual tile effect renderer
            if (globalTileEffectRenderer) {
                globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
                console.log(`🎨 Updated tile effect visuals for toxic tile`);
            }
        } else {
            console.error('❌ globalTileEffectManager not available for Toxic Presence passive');
        }
        
        console.log(`✅ ${unit.name} Toxic Presence passive completed`);
    }
    
    /**
     * Process the Walking Ward passive: Create a mist tile at the unit's starting position when moving
     */
    private static processWalkingWardPassive(unit: Unit, fromPosition: { x: number; y: number }): void {
        console.log(`🌫️ ${unit.name} triggers Walking Ward passive - leaving mist tile at origin`);
        
        // Create a mist tile at the unit's starting position
        if (globalTileEffectManager) {
            globalTileEffectManager.addEffect('mist-tile', fromPosition, -1, unit.id);
            console.log(`🌫️ ${unit.name} left a mist tile at (${fromPosition.x}, ${fromPosition.y})`);
            
            // Update the visual tile effect renderer
            if (globalTileEffectRenderer) {
                globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
                console.log(`🎨 Updated tile effect visuals for mist tile`);
            }
        } else {
            console.error('❌ globalTileEffectManager not available for Walking Ward passive');
        }
        
        console.log(`✅ ${unit.name} Walking Ward passive completed`);
    }
    
    /**
     * Process the Overwatch passive: Create a spotlight tile in a random unoccupied space when skipping action
     */
    private static processOverwatchPassive(unit: Unit): void {
        console.log(`🔍 ${unit.name} triggers Overwatch passive - creating spotlight tile in random location`);
        
        // Find a random unoccupied space on the map
        const randomPosition = this.findRandomUnoccupiedSpace();
        
        if (!randomPosition) {
            console.warn(`⚠️ No unoccupied spaces found for ${unit.name}'s Overwatch passive`);
            return;
        }
        
        // Create a spotlight tile at the random position
        if (globalTileEffectManager) {
            globalTileEffectManager.addEffect('spotlight', randomPosition, -1, unit.id);
            console.log(`🔍 ${unit.name} placed a spotlight tile at (${randomPosition.x}, ${randomPosition.y})`);
            
            // Update the visual tile effect renderer
            if (globalTileEffectRenderer) {
                globalTileEffectRenderer.updateTileEffects(globalTileEffectManager);
                console.log(`🎨 Updated tile effect visuals for spotlight tile`);
            }
        } else {
            console.error('❌ globalTileEffectManager not available for Overwatch passive');
        }
        
        console.log(`✅ ${unit.name} Overwatch passive completed`);
    }
    
    /**
     * Process the Mastery passive: Apply 1 Focus when performing a damage-dealing skill
     */
    private static processMasteryPassive(unit: Unit, skill: any): void {
        console.log(`🎯 ${unit.name} triggers Mastery passive - gaining 1 Focus for using damage skill ${skill.name}`);
        
        // Apply 1 Focus modifier
        const success = ModifierService.applyModifier(unit, 'FOCUS', 1, unit.id);
        
        if (success) {
            console.log(`✅ ${unit.name} gained 1 Focus from Mastery passive`);
            
            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                console.log(`🔍 Updating visual modifiers for ${unit.name} after Mastery passive`);
                gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                console.log(`🏷️ Updated visual modifiers for ${unit.name} after Mastery passive`);
                
                // Force a render update with a small delay to ensure it takes effect
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                    console.log(`🔄 Delayed visual modifier update for ${unit.name} after Mastery`);
                }, 100);
            }
        } else {
            console.error(`❌ Failed to apply Focus modifier to ${unit.name} from Mastery passive`);
        }
        
        console.log(`✅ ${unit.name} Mastery passive completed`);
    }
    
    /**
     * Process the Beatbox passive: Give 1 stack of a random modifier to all adjacent units at end of turn
     */
    private static processBeatboxPassive(unit: Unit): void {
        console.log(`🎵 ${unit.name} triggers Beatbox passive - applying random modifiers to adjacent units`);
        
        // Get the game scene instance to access unit positions
        const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
        if (!gameSceneInstance || !gameSceneInstance.unitRenderer) {
            console.error('❌ Cannot access game scene for Beatbox passive');
            return;
        }
        
        // Get the unit's current position
        const unitPosition = gameSceneInstance.unitRenderer.getUnitPosition(unit);
        if (!unitPosition) {
            console.error(`❌ Cannot find position for ${unit.name}`);
            return;
        }
        
        console.log(`🎵 Beatbox ${unit.name} at position (${unitPosition.x}, ${unitPosition.y})`);
        
        // Define all 8 adjacent positions (cardinal + diagonal)
        const adjacentOffsets = [
            { x: -1, y: -1 }, // Northwest
            { x: 0, y: -1 },  // North
            { x: 1, y: -1 },  // Northeast
            { x: -1, y: 0 },  // West
            { x: 1, y: 0 },   // East
            { x: -1, y: 1 },  // Southwest
            { x: 0, y: 1 },   // South
            { x: 1, y: 1 }    // Southeast
        ];
        
        // Get all available modifier keys (excluding special ones that shouldn't be applied randomly)
        const availableModifiers = [
            'STRENGTH', 'WEAK', 'EXPOSED', 'STURDY', 'COUNTER', 'BURN',
            'FOCUS', 'CONFUSION', 'WARD', 'WET', 'MIRROR',
            'HASTE', 'SLOW', 'BLEED', 'TIRED',
            'HEADACHE', 'SHOCKED',
            'BLESSED', 'CURSED', 'FAITH', 'DOUBT',
            'TOXICITY', 'LEAK', 'WISH', 'CHARGE',
            'ANGER'
        ];
        
        // Process all adjacent positions
        adjacentOffsets.forEach(offset => {
            const adjacentX = unitPosition.x + offset.x;
            const adjacentY = unitPosition.y + offset.y;
            
            // Check if position is within map bounds
            if (adjacentX >= 0 && adjacentX < 8 && adjacentY >= 0 && adjacentY < 8) {
                // Get unit at this position (if any)
                const adjacentUnit = gameSceneInstance.unitRenderer.getUnitAtPosition ? 
                    gameSceneInstance.unitRenderer.getUnitAtPosition(adjacentX, adjacentY) : null;
                
                if (adjacentUnit) {
                    // There's a unit at this position - apply random modifier
                    const randomModifier = availableModifiers[Math.floor(Math.random() * availableModifiers.length)];
                    
                    console.log(`🎵 Applying ${randomModifier} to ${adjacentUnit.name} (${adjacentUnit.team}) at (${adjacentX}, ${adjacentY})`);
                    
                    const success = ModifierService.applyModifier(adjacentUnit, randomModifier, 1, unit.id);
                    
                    if (success) {
                        console.log(`✅ ${adjacentUnit.name} received 1 ${randomModifier} from ${unit.name}'s Beatbox`);
                        
                        // Update visual modifier indicators
                        if (gameSceneInstance.unitRenderer) {
                            gameSceneInstance.unitRenderer.updateUnitModifiers(adjacentUnit);
                            
                            // Force a render update with a small delay to ensure it takes effect
                            setTimeout(() => {
                                gameSceneInstance.unitRenderer.updateUnitModifiers(adjacentUnit);
                                console.log(`🔄 Updated visual modifiers for ${adjacentUnit.name} after Beatbox`);
                            }, 100);
                        }
                    } else {
                        console.error(`❌ Failed to apply ${randomModifier} to ${adjacentUnit.name} from Beatbox passive`);
                    }
                }
            }
        });
        
        console.log(`✅ ${unit.name} Beatbox passive completed`);
    }
    
    /**
     * Process the Rally Cry passive: Give 1 Energy to all allied units at end of turn
     */
    private static processRallyCryPassive(unit: Unit): void {
        console.log(`📢 ${unit.name} triggers Rally Cry passive - giving 1 Energy to all allied units`);
        
        // Get all allied units from the global registry
        const alliedUnits = unit.team === 'player' ? 
            globalUnitRegistry.playerParty : 
            globalUnitRegistry.enemyUnits;
        
        let energyGiven = 0;
        
        // Give 1 Energy to all allied units (excluding the Bannerman themselves)
        alliedUnits.forEach(ally => {
            if (ally.id !== unit.id && ally.currentHealth > 0) {
                const oldEnergy = ally.currentEnergy;
                ally.currentEnergy = Math.min(ally.maxEnergy, ally.currentEnergy + 1);
                const energyGained = ally.currentEnergy - oldEnergy;
                
                if (energyGained > 0) {
                    energyGiven++;
                    console.log(`⚡ ${ally.name} gained ${energyGained} Energy from ${unit.name}'s Rally Cry (${oldEnergy} → ${ally.currentEnergy}/${ally.maxEnergy})`);
                    
                    // Update visual energy bars
                    const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
                    if (gameSceneInstance && gameSceneInstance.updateUnitBars) {
                        gameSceneInstance.updateUnitBars(ally);
                    }
                }
            }
        });
        
        console.log(`📢 ${unit.name} Rally Cry gave energy to ${energyGiven} allied units`);
        console.log(`✅ ${unit.name} Rally Cry passive completed`);
    }
    
    /**
     * Process the Resolute passive: Gain 1 Sturdy when targeted by a Basic Attack
     */
    private static processResolutePassive(unit: Unit): void {
        console.log(`🛡️ ${unit.name} triggers Resolute passive - gaining 1 Sturdy for being targeted by Basic Attack`);
        
        // Apply 1 Sturdy modifier
        const success = ModifierService.applyModifier(unit, 'STURDY', 1, unit.id);
        
        if (success) {
            console.log(`✅ ${unit.name} gained 1 Sturdy from Resolute passive`);
            
            // Update visual modifier indicators
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                console.log(`🔍 Updating visual modifiers for ${unit.name} after Resolute passive`);
                gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                console.log(`🏷️ Updated visual modifiers for ${unit.name} after Resolute passive`);
                
                // Force a render update with a small delay to ensure it takes effect
                setTimeout(() => {
                    gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                    console.log(`🔄 Delayed visual modifier update for ${unit.name} after Resolute`);
                }, 100);
            }
        } else {
            console.error(`❌ Failed to apply Sturdy modifier to ${unit.name} from Resolute passive`);
        }
        
        console.log(`✅ ${unit.name} Resolute passive completed`);
    }
    
    /**
     * Process the Death of a Salesman passive: Add 1 resource bonus for next shop phase when unit dies
     */
    private static processDeathOfASalesmanPassive(unit: Unit): void {
        console.log(`💰 ${unit.name} triggers Death of a Salesman passive - adding resource bonus for next shop phase`);
        
        // Import the main player and add the bonus
        import('../game/Player').then(({ mainPlayer }) => {
            mainPlayer.addDeathOfASalesmanBonus();
            console.log(`💰 ${unit.name} death will provide 1 additional resource at next shop phase`);
        });
        
        console.log(`✅ ${unit.name} Death of a Salesman passive completed`);
    }

    /**
     * Process Rabbit Riding: on death, transform into a Rabbit with same stats/skills/passives (excluding Rabbit Riding)
     * Prevent actual removal, revive at 1 HP, update visuals, and mark for reversion at round end.
     */
    private static processRabbitRidingPassive(unit: Unit): void {
        try {
            console.log(`🐇 ${unit.name} triggers Rabbit Riding - transforming into Rabbit`);

            // Prevent removal by death handler
            PassiveService.preventRemovalUnitIds.add(unit.id);

            // Store original state for reversion
            if (!PassiveService.rabbitTransformState.has(unit.id)) {
                PassiveService.rabbitTransformState.set(unit.id, {
                    originalName: unit.name,
                    originalClassName: unit.className,
                    originalImageUrl: unit.imageUrl,
                    originalPassives: [...(unit.passives || [])],
                });
            }

            // Update unit fields to Rabbit form
            const originalName = unit.name;
            unit.name = `${originalName}'s Rabbit`;
            unit.className = 'Rabbit';
            
            // Replace image with rabbit asset
            unit.imageUrl = rabbitImage as unknown as string;

            // Remove Rabbit Riding passive while in rabbit form
            unit.passives = (unit.passives || []).filter(p => p.id !== 'rabbit-riding');

            // Reset Lucky Rabbit Foot usage when transforming
            PassiveService.resetLuckyFootUsage(unit);

            // Restore to full health for the rabbit form
            const oldHealth = unit.currentHealth;
            unit.currentHealth = unit.health;
            console.log(`🐇 Revived ${unit.name} as Rabbit at full health: ${oldHealth} → ${unit.currentHealth}`);

            // Update visuals by re-placing the unit with new sprite
            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            if (gameSceneInstance && gameSceneInstance.unitRenderer) {
                const pos = gameSceneInstance.unitRenderer.getUnitPosition(unit);
                if (pos) {
                    gameSceneInstance.unitRenderer.removeUnit(unit);
                    // Ensure bars reflect new HP
                    setTimeout(() => {
                        gameSceneInstance.unitRenderer.placeUnit(unit, pos.x, pos.y).then(() => {
                            gameSceneInstance.unitRenderer.updateUnitBars(unit);
                            gameSceneInstance.unitRenderer.updateUnitModifiers(unit);
                        });
                    }, 0);
                }
            }

            console.log(`✅ ${unit.name} transformed into Rabbit and will revert at round end if alive`);
        } catch (err) {
            console.error('❌ Error processing Rabbit Riding passive:', err);
        }
    }
    
    /**
     * Find a random unoccupied space on the 8x8 map
     * Made public to allow reuse by other systems (e.g., Glitched modifier teleport)
     */
    public static findRandomUnoccupiedSpace(): { x: number; y: number } | null {
        const mapSize = 8; // 8x8 map
        const maxAttempts = 64; // Try all positions if needed
        
        // Get the game scene instance to check for unit positions
        const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
        if (!gameSceneInstance || !gameSceneInstance.unitRenderer) {
            console.error('❌ Cannot access game scene for position checking');
            return null;
        }
        
        // Create a list of all possible positions
        const allPositions: { x: number; y: number }[] = [];
        for (let x = 0; x < mapSize; x++) {
            for (let y = 0; y < mapSize; y++) {
                allPositions.push({ x, y });
            }
        }
        
        // Shuffle the positions to get random order
        for (let i = allPositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
        }
        
        // Find the first unoccupied position
        for (const position of allPositions) {
            const unitAtPosition = gameSceneInstance.unitRenderer.getUnitAtPosition(position.x, position.y);
            if (!unitAtPosition) {
                console.log(`🎯 Found unoccupied space at (${position.x}, ${position.y})`);
                return position;
            }
        }
        
        console.warn('⚠️ No unoccupied spaces found on the map');
        return null;
    }
    
    /**
     * Show heal animation at a specific grid position (for empty squares)
     */
    private static showPositionBasedHealAnimation(gameSceneInstance: any, gridX: number, gridY: number, healAmount: number): void {
        // Use the local tile dimensions (set by GameScene)
        if (TILE_WIDTH === 0 || TILE_HEIGHT === 0) {
            console.warn('❌ Tile dimensions not initialized for position-based heal animation');
            return;
        }
        
        // Check if scene is available
        if (!SCENE_GLOBAL) {
            console.warn('❌ SCENE_GLOBAL not available for position-based heal animation');
            return;
        }
        
        // Convert grid position to world position
        const worldX = gridX * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -gridY * TILE_HEIGHT - TILE_HEIGHT / 2;
        
        // Create a simple heal animation similar to AnimationManager's approach
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 64;
            const context = canvas.getContext('2d');
            
            if (!context) {
                console.warn('❌ Failed to get canvas context for heal animation');
                return;
            }
            
            // Clear canvas
            context.clearRect(0, 0, 128, 64);
            
            // Create heal text
            const healText = `💚 +${healAmount}`;
            
            // Draw text
            context.font = 'bold 24px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.strokeStyle = 'black';
            context.lineWidth = 3;
            context.fillStyle = '#2ecc71'; // Green color for healing
            
            // Draw text with outline
            context.strokeText(healText, 64, 32);
            context.fillText(healText, 64, 32);
            
            // Create texture and mesh
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            
            const geometry = new THREE.PlaneGeometry(TILE_WIDTH * 1.2, TILE_WIDTH * 0.6);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 1.0,
                alphaTest: 0.1,
                depthTest: false,
                depthWrite: false
            });
            
            const textMesh = new THREE.Mesh(geometry, material);
            textMesh.position.set(worldX, worldY - TILE_HEIGHT * 0.7, 3.0);
            
            // Add to scene
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.add(textMesh);
                
                // Animate the text popup (move up and fade out)
                let startTime = Date.now();
                const animationDuration = 2000; // 2 seconds
                
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / animationDuration;
                    
                    if (progress >= 1.0) {
                        // Animation complete, remove text
                        if (SCENE_GLOBAL) {
                            SCENE_GLOBAL.remove(textMesh);
                        }
                        return;
                    }
                    
                    // Move up and fade out
                    const startY = worldY - TILE_HEIGHT * 0.7;
                    const endY = worldY - TILE_HEIGHT * 1.5;
                    textMesh.position.y = startY + (endY - startY) * progress;
                    
                    // Fade out
                    material.opacity = 1.0 - progress;
                    
                    requestAnimationFrame(animate);
                };
                
                animate();
            }
        } catch (error) {
            console.error('❌ Error creating position-based heal animation:', error);
        }
    }
    

}
