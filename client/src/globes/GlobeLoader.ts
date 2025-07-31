import { Globe } from './Globe';
import { Unit } from '../units/Unit';
import { GameScene } from '../game/GameScene';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { globalUnitFactory } from '../units/UnitFactory';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { UNIT_DEX } from '../units/UnitDex';

// Create a reverse mapping from className to unit type key
const CLASS_NAME_TO_UNIT_TYPE: Record<string, string> = {};
for (const [unitType, unitStats] of Object.entries(UNIT_DEX)) {
    CLASS_NAME_TO_UNIT_TYPE[unitStats.name] = unitType;
}
console.log('🔄 GlobeLoader: Created className to unitType mapping:', CLASS_NAME_TO_UNIT_TYPE);

interface SpawnPoint {
    x: number;
    y: number;
}

export class GlobeLoader {
    private static readonly PLAYER_SPAWN_POINTS: SpawnPoint[] = [
        { x: 3, y: 6 },
        { x: 4, y: 6 },
        { x: 3, y: 7 },
        { x: 4, y: 7 },
        { x: 5, y: 7 }
    ];

    private static readonly ENEMY_SPAWN_POINTS: SpawnPoint[] = [
        { x: 4, y: 1 },
        { x: 3, y: 1 },
        { x: 4, y: 0 },
        { x: 3, y: 0 },
        { x: 2, y: 0 }
    ];

    public static async loadGlobe(gameScene: GameScene, globe: Globe): Promise<void> {
        console.log('🌍 Loading globe:', globe.name);
        console.log('📋 Globe enemies (templates):', globe.enemies);
        console.log(`📊 Globe has ${globe.enemies.length} enemy templates`);

        // Clear existing units from scene and registry
        console.log('🧹 Clearing all existing units and tile effects before loading new globe');
        
        // Clear units from the game scene renderer
        gameScene.clearAllUnits();
        
        // Clear tile effects
        const { globalTileEffectManager } = await import('../game/TileEffect');
        if (globalTileEffectManager) {
            globalTileEffectManager.clearAllEffects();
        }
        
        // Clear unit registries (but preserve player party as it should persist between battles)
        globalUnitRegistry.enemyUnits = [];
        console.log('🧹 Cleared enemy units and tile effects (preserved player party)');
        
        // Create fresh enemy units based on the globe's enemy templates
        console.log('🏭 Creating fresh enemy units from templates...');
        console.log(`📊 globalUnitFactory available:`, !!globalUnitFactory);
        console.log(`📊 globalUnitFactory.createUnit:`, typeof globalUnitFactory.createUnit);
        
        globe.enemies.forEach((enemyTemplate, index) => {
            if (!enemyTemplate) {
                console.error(`❌ Enemy unit template at index ${index} is null or undefined`);
                return;
            }

            console.log(`🔨 Creating fresh enemy unit from template:`, enemyTemplate);
            console.log(`📋 Template details: ${enemyTemplate.name} (${enemyTemplate.className}) - Health: ${enemyTemplate.currentHealth}/${enemyTemplate.health}`);
            
            // Create a fresh unit using the correct unit type key (not className)
            const unitType = CLASS_NAME_TO_UNIT_TYPE[enemyTemplate.className];
            console.log(`🔄 Mapping className '${enemyTemplate.className}' to unitType '${unitType}'`);
            
            if (!unitType) {
                console.error(`❌ No unit type found for className: ${enemyTemplate.className}`);
                return;
            }
            
            console.log(`🏭 Calling globalUnitFactory.createUnit('${unitType}', 'enemy')`);
            const freshEnemyUnit = globalUnitFactory.createUnit(unitType, 'enemy');
            
            if (!freshEnemyUnit) {
                console.error(`❌ Failed to create fresh enemy unit of type: ${unitType} (className: ${enemyTemplate.className})`);
                console.error(`❌ globalUnitFactory:`, globalUnitFactory);
                console.error(`❌ Available methods:`, Object.getOwnPropertyNames(globalUnitFactory));
                return;
            }
            
            console.log(`✅ Created fresh enemy unit: ${freshEnemyUnit.name} (${freshEnemyUnit.className}) with ${freshEnemyUnit.currentHealth}/${freshEnemyUnit.health} health`);
            console.log(`✅ Unit ID: ${freshEnemyUnit.id}, Team: ${freshEnemyUnit.team}`);
            
            globalUnitRegistry.addUnitToEnemies(freshEnemyUnit);
            console.log(`✅ Added to registry. Current enemy count: ${globalUnitRegistry.enemyUnits.length}`);
        });

        console.log(`📊 Enemy units in registry after creation: ${globalUnitRegistry.enemyUnits.length}`);
        console.log('📋 Enemy units:', globalUnitRegistry.enemyUnits.map(u => `${u.name} (${u.className})`));

        // Place player units from registry
        console.log('👥 Placing player units...');
        this.placePlayerUnits(gameScene);

        // Place enemy units from registry
        console.log('👹 Placing enemy units...');
        this.placeEnemyUnits(gameScene);

        // Apply battle condition effects
        globe.battleCondition.effect(
            globalUnitRegistry.playerParty,
            globalUnitRegistry.enemyUnits
        );

        // Start the turn manager automatically when globe loads
        if (GAME_TURN_MANAGER && !GAME_TURN_MANAGER.isGameStarted()) {
            console.log('🎮 Starting turn manager automatically after globe load');
            GAME_TURN_MANAGER.startGame();
            
            // Update UI displays to reflect the started game state
            const { updateTurnDisplay } = await import('../game/TurnManagerUI');
            updateTurnDisplay(GAME_TURN_MANAGER);
            
            // Initialize unit selection indicators with a small delay to ensure textures are loaded
            setTimeout(() => {
                console.log('🎯 Initializing unit selection indicators after delay');
                gameScene.updateUnitSelectionIndicators();
            }, 200);
        }
    }

    private static placePlayerUnits(gameScene: GameScene): void {
        // Get player's units from the registry
        const playerUnits = globalUnitRegistry.playerParty;
        console.log(`👥 Placing ${playerUnits.length} player units:`, playerUnits.map(u => `${u.name} (${u.className})`));

        // Place each unit at a spawn point
        playerUnits.forEach((unit: Unit, index: number) => {
            if (index < this.PLAYER_SPAWN_POINTS.length) {
                const spawnPoint = this.PLAYER_SPAWN_POINTS[index];
                console.log(`👤 Placing ${unit.name} at (${spawnPoint.x}, ${spawnPoint.y})`);
                gameScene.placeUnit(unit, spawnPoint.x, spawnPoint.y);
            } else {
                console.warn(`⚠️ No spawn point available for player unit ${unit.name} (index ${index})`);
            }
        });
    }

    private static placeEnemyUnits(gameScene: GameScene): void {
        // Get enemy units from the registry
        const enemyUnits = globalUnitRegistry.enemyUnits;
        console.log(`👹 Placing ${enemyUnits.length} enemy units:`, enemyUnits.map(u => `${u.name} (${u.className})`));

        // Place each enemy unit at a spawn point
        enemyUnits.forEach((unit: Unit, index: number) => {
            if (index < this.ENEMY_SPAWN_POINTS.length) {
                const spawnPoint = this.ENEMY_SPAWN_POINTS[index];
                console.log(`👺 Placing ${unit.name} at (${spawnPoint.x}, ${spawnPoint.y})`);
                gameScene.placeUnit(unit, spawnPoint.x, spawnPoint.y);
            } else {
                console.warn(`⚠️ No spawn point available for enemy unit ${unit.name} (index ${index})`);
            }
        });
    }
} 