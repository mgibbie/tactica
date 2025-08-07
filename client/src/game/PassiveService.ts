import { Unit } from '../units/Unit';
import { ModifierService } from './ModifierService';
import { globalUnitRegistry } from '../units/UnitRegistry';

export class PassiveService {
    
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
                // Add other passives here as they are implemented
                default:
                    console.warn(`⚠️ Unknown passive: ${passive.id}`);
                    break;
            }
        }
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
     * Show heal animation at a specific grid position (for empty squares)
     */
    private static showPositionBasedHealAnimation(gameSceneInstance: any, gridX: number, gridY: number, healAmount: number): void {
        // Check if we can access the scene and tile dimensions
        if (!gameSceneInstance.gameRenderer?.TILE_WIDTH) {
            console.warn('❌ Cannot access tile dimensions for position-based heal animation');
            return;
        }
        
        const TILE_WIDTH = gameSceneInstance.gameRenderer.TILE_WIDTH;
        const TILE_HEIGHT = gameSceneInstance.gameRenderer.TILE_HEIGHT;
        
        // Convert grid position to world position
        const worldX = gridX * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -gridY * TILE_HEIGHT - TILE_HEIGHT / 2;
        
        // Create a simple heal animation similar to AnimationManager's approach
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        if (!context) return;
        
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
        const texture = new (window as any).THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        const geometry = new (window as any).THREE.PlaneGeometry(TILE_WIDTH * 1.2, TILE_WIDTH * 0.6);
        const material = new (window as any).THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1.0,
            alphaTest: 0.1,
            depthTest: false,
            depthWrite: false
        });
        
        const textMesh = new (window as any).THREE.Mesh(geometry, material);
        textMesh.position.set(worldX, worldY - TILE_HEIGHT * 0.7, 3.0);
        
        // Add to scene
        const scene = gameSceneInstance.gameRenderer?.scene;
        if (scene) {
            scene.add(textMesh);
            
            // Animate the text popup (move up and fade out)
            let startTime = Date.now();
            const animationDuration = 2000; // 2 seconds
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / animationDuration;
                
                if (progress >= 1.0) {
                    // Animation complete, remove text
                    scene.remove(textMesh);
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
    }
    

}
