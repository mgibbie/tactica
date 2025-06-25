import { Globe } from './Globe';
import { Unit } from '../units/Unit';
import { GameScene } from '../game/GameScene';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';

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
        console.log('Loading globe:', globe);
        console.log('Globe enemies:', globe.enemies);

        // Clear existing units from registry
        globalUnitRegistry.enemyUnits = [];
        
        // Add enemy units to registry
        globe.enemies.forEach((unit, index) => {
            if (!unit) {
                console.error(`Enemy unit at index ${index} is null or undefined`);
                return;
            }

            console.log(`Processing enemy unit:`, unit);
            
            // Set team to enemy if not already set
            if (unit.team !== 'enemy') {
                unit.team = 'enemy';
            }
            globalUnitRegistry.addUnitToEnemies(unit);
        });

        // Place player units from registry
        this.placePlayerUnits(gameScene);

        // Place enemy units from registry
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
        console.log('Placing player units:', playerUnits);

        // Place each unit at a spawn point
        playerUnits.forEach((unit: Unit, index: number) => {
            if (index < this.PLAYER_SPAWN_POINTS.length) {
                const spawnPoint = this.PLAYER_SPAWN_POINTS[index];
                gameScene.placeUnit(unit, spawnPoint.x, spawnPoint.y);
            }
        });
    }

    private static placeEnemyUnits(gameScene: GameScene): void {
        // Get enemy units from the registry
        const enemyUnits = globalUnitRegistry.enemyUnits;
        console.log('Placing enemy units:', enemyUnits);

        // Place each enemy unit at a spawn point
        enemyUnits.forEach((unit: Unit, index: number) => {
            if (index < this.ENEMY_SPAWN_POINTS.length) {
                const spawnPoint = this.ENEMY_SPAWN_POINTS[index];
                gameScene.placeUnit(unit, spawnPoint.x, spawnPoint.y);
            }
        });
    }
} 