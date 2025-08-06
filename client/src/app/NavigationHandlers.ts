import { startGame, cleanupGame } from '../game';
import { showShopScene, markShopForNextVisitRefresh } from '../shop/ShopScene';
import { showSquadScene } from '../squad/SquadScene';
import { showSplashScreen } from '../splash';
import { showEncounterScene } from '../encounter/EncounterScene';
import { mainPlayer } from '../game/Player';
import { getSelectedGlobe, clearSelectedGlobe } from '../globes/GlobalState';
import { GameScene } from '../game/GameScene';
import { initializeGameInfoPanel, cleanupGameInfoPanel } from '../game/GameInfoPanel';
import { isDebugModeEnabled, getDebugModeStatus } from '../game/DebugMode';
import { createGameTurnManager, getTurnStatusDisplay, createUIAwareTurnManager } from '../game/TurnManagerUI';
import { TurnManager } from '../game/TurnManager';
import { initializeGameInputHandler, cleanupGameInputHandler, showGameControls } from '../game/GameInputHandler';

export let GAME_COORDS_DISPLAY_ELEMENT_MAIN: HTMLDivElement | null = null; // Exported for game.ts
export let GAME_TURN_MANAGER: TurnManager | null = null; // Global turn manager reference

// Global navigation handlers for access from other modules
export let GLOBAL_NAVIGATION_HANDLERS: {
    proceedToGameScene: () => void;
    handleDisplayShop: () => void;
    handleDisplaySquadInventory: () => void;
    handleDisplayEncounter: () => void;
    showSplash: () => void;
} | null = null;

export function createNavigationHandlers(
    appContainer: HTMLElement,
    gameSpecificContainer: HTMLElement
) {
    const clearAppContainer = async () => {
        // Before clearing, specifically cleanup game if it was running
        const gameCanvas = gameSpecificContainer.querySelector('canvas');
        if (gameSpecificContainer.contains(gameCanvas)) {
            await cleanupGame(); // Call cleanup if game was active
        }
        
        // Clear game area content but preserve the layout structure
        const gameArea = appContainer.querySelector('#game-area');
        if (gameArea) {
            // Remove all game UI elements from game area
            const gameResourceUI = gameArea.querySelector('#player-resource-display-game-scene');
            if (gameResourceUI) gameArea.removeChild(gameResourceUI);
            const gameCoordsUI = gameArea.querySelector('#tile-coords-display-game-scene');
            if (gameCoordsUI) gameArea.removeChild(gameCoordsUI);
            const debugUI = gameArea.querySelector('#debug-mode-display-game-scene');
            if (debugUI) gameArea.removeChild(debugUI);
            const turnUI = gameArea.querySelector('#turn-display-game-scene');
            if (turnUI) gameArea.removeChild(turnUI);
            const phaseUI = gameArea.querySelector('#phase-display-game-scene');
            if (phaseUI) gameArea.removeChild(phaseUI);
            const roundUI = gameArea.querySelector('#round-display-game-scene');
            if (roundUI) gameArea.removeChild(roundUI);
            const actionableUnitLimitUI = gameArea.querySelector('#actionable-unit-limit-display-game-scene');
            if (actionableUnitLimitUI) gameArea.removeChild(actionableUnitLimitUI);
            
            // Clear game content wrapper
            while (gameSpecificContainer.firstChild) {
                gameSpecificContainer.removeChild(gameSpecificContainer.firstChild);
            }
        }
        
        // Clear info panel area
        const infoPanelArea = appContainer.querySelector('#info-panel-area');
        if (infoPanelArea) {
            const gameInfoUI = infoPanelArea.querySelector('#game-info-panel');
            if (gameInfoUI) infoPanelArea.removeChild(gameInfoUI);
        }
        
        // Reset global references
        if (GAME_COORDS_DISPLAY_ELEMENT_MAIN) GAME_COORDS_DISPLAY_ELEMENT_MAIN = null;
        if (GAME_TURN_MANAGER) GAME_TURN_MANAGER = null;
        cleanupGameInfoPanel();
        cleanupGameInputHandler();

        // If we're not in game mode, remove the layout and restore old behavior
        if (!gameArea || !infoPanelArea) {
            while (appContainer.firstChild) {
                appContainer.removeChild(appContainer.firstChild);
            }
            // Restore old flex centering for non-game scenes
            appContainer.style.display = 'flex';
            appContainer.style.justifyContent = 'center';
            appContainer.style.alignItems = 'center';
            appContainer.style.flexDirection = 'row';
        }
    };

    const proceedToGameScene = () => {
        console.log('Proceeding to game scene...');
        markShopForNextVisitRefresh();
        clearAppContainer();
        
        // Ensure layout exists, if not create it
        let gameArea = appContainer.querySelector('#game-area') as HTMLElement;
        let infoPanelArea = appContainer.querySelector('#info-panel-area') as HTMLElement;
        
        if (!gameArea || !infoPanelArea) {
            // Create the layout structure
            appContainer.style.display = 'flex';
            appContainer.style.flexDirection = 'row';
            appContainer.style.overflow = 'hidden';
            
            // Create main game area (left side)
            gameArea = document.createElement('div');
            gameArea.id = 'game-area';
            gameArea.style.flex = '1';
            gameArea.style.display = 'flex';
            gameArea.style.justifyContent = 'center';
            gameArea.style.alignItems = 'center';
            gameArea.style.position = 'relative';
            appContainer.appendChild(gameArea);

            // Create info panel area (right side)
            infoPanelArea = document.createElement('div');
            infoPanelArea.id = 'info-panel-area';
            infoPanelArea.style.width = '350px';
            infoPanelArea.style.height = '100vh';
            infoPanelArea.style.position = 'relative';
            infoPanelArea.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            appContainer.appendChild(infoPanelArea);
        }
        
        // Add gameSpecificContainer to game area
        gameArea.appendChild(gameSpecificContainer);
        
        startGame(gameSpecificContainer).then(() => {
            // Find the game area container
            const gameArea = document.getElementById('game-area');
            if (gameArea) {
                // Add game-specific UI to the game area
                const resourceDisplayGameScene = document.createElement('div');
                resourceDisplayGameScene.id = 'player-resource-display-game-scene'; // Unique ID
                resourceDisplayGameScene.textContent = `Resource: ${mainPlayer.resource}`;
                resourceDisplayGameScene.style.position = 'absolute';
                resourceDisplayGameScene.style.bottom = '60px'; // Moved higher for mobile
                resourceDisplayGameScene.style.left = '50px'; // Moved closer to center
                resourceDisplayGameScene.style.padding = '10px 15px';
                resourceDisplayGameScene.style.backgroundColor = '#1a1a1a';
                resourceDisplayGameScene.style.color = '#f1c40f';
                resourceDisplayGameScene.style.borderRadius = '5px';
                resourceDisplayGameScene.style.fontSize = '1em';
                resourceDisplayGameScene.style.fontWeight = 'bold';
                resourceDisplayGameScene.style.fontFamily = 'sans-serif';
                resourceDisplayGameScene.style.zIndex = '100'; // Ensure it's above game canvas
                gameArea.appendChild(resourceDisplayGameScene);

                // Add Tile Coords Display to game area
                GAME_COORDS_DISPLAY_ELEMENT_MAIN = document.createElement('div');
                GAME_COORDS_DISPLAY_ELEMENT_MAIN.id = 'tile-coords-display-game-scene';
                GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.position = 'absolute';
                GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.top = '30px'; // Moved down from edge
                GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.left = '30px'; // Moved right from edge  
                GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.color = 'white';
                GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.fontFamily = 'sans-serif';
                GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.backgroundColor = 'rgba(0,0,0,0.5)';
                GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.padding = '5px';
                GAME_COORDS_DISPLAY_ELEMENT_MAIN.innerText = 'Coords: N/A';
                GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.zIndex = '100';
                gameArea.appendChild(GAME_COORDS_DISPLAY_ELEMENT_MAIN);

                // Add Debug Mode Display if debug mode is enabled
                if (isDebugModeEnabled()) {
                    const debugDisplayGameScene = document.createElement('div');
                    debugDisplayGameScene.id = 'debug-mode-display-game-scene';
                    debugDisplayGameScene.textContent = `DEBUG MODE: ${getDebugModeStatus()}`;
                    debugDisplayGameScene.style.position = 'absolute';
                    debugDisplayGameScene.style.top = '30px'; // Moved down from edge
                    debugDisplayGameScene.style.right = '30px'; // Moved left from edge
                    debugDisplayGameScene.style.padding = '8px 12px';
                    debugDisplayGameScene.style.backgroundColor = '#e74c3c'; // Red background for debug
                    debugDisplayGameScene.style.color = 'white';
                    debugDisplayGameScene.style.borderRadius = '5px';
                    debugDisplayGameScene.style.fontSize = '0.9em';
                    debugDisplayGameScene.style.fontWeight = 'bold';
                    debugDisplayGameScene.style.fontFamily = 'sans-serif';
                    debugDisplayGameScene.style.zIndex = '100';
                    debugDisplayGameScene.style.border = '2px solid #c0392b';
                    debugDisplayGameScene.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
                    gameArea.appendChild(debugDisplayGameScene);
                }
            }

            // Initialize the game info panel in the dedicated info panel area
            const infoPanelArea = document.getElementById('info-panel-area');
            if (infoPanelArea) {
                initializeGameInfoPanel(infoPanelArea);
            }

            // Initialize Turn Manager (but don't start yet - wait for globe to load)
            GAME_TURN_MANAGER = createUIAwareTurnManager();
            
            // Find the game area for all remaining UI elements
            const gameAreaForUI = document.getElementById('game-area');
            if (gameAreaForUI) {
                // Add Turn Display to game area
                const turnDisplayGameScene = document.createElement('div');
                turnDisplayGameScene.id = 'turn-display-game-scene';
                turnDisplayGameScene.textContent = getTurnStatusDisplay(GAME_TURN_MANAGER);
                turnDisplayGameScene.style.position = 'absolute';
                turnDisplayGameScene.style.top = '50px';
                turnDisplayGameScene.style.left = '10px';
                turnDisplayGameScene.style.padding = '8px 12px';
                turnDisplayGameScene.style.backgroundColor = 'rgba(52, 152, 219, 0.9)'; // Blue background
                turnDisplayGameScene.style.color = 'white';
                turnDisplayGameScene.style.borderRadius = '5px';
                turnDisplayGameScene.style.fontSize = '0.9em';
                turnDisplayGameScene.style.fontWeight = 'bold';
                turnDisplayGameScene.style.fontFamily = 'sans-serif';
                turnDisplayGameScene.style.zIndex = '100';
                turnDisplayGameScene.style.border = '2px solid #2980b9';
                turnDisplayGameScene.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
                gameAreaForUI.appendChild(turnDisplayGameScene);

                // Add Phase Display to game area
                const phaseDisplayGameScene = document.createElement('div');
                phaseDisplayGameScene.id = 'phase-display-game-scene';
                phaseDisplayGameScene.textContent = 'Phase: Select';
                phaseDisplayGameScene.style.position = 'absolute';
                phaseDisplayGameScene.style.top = '90px';
                phaseDisplayGameScene.style.left = '10px';
                phaseDisplayGameScene.style.padding = '8px 12px';
                phaseDisplayGameScene.style.backgroundColor = 'rgba(46, 204, 113, 0.9)'; // Green background
                phaseDisplayGameScene.style.color = 'white';
                phaseDisplayGameScene.style.borderRadius = '5px';
                phaseDisplayGameScene.style.fontSize = '0.9em';
                phaseDisplayGameScene.style.fontWeight = 'bold';
                phaseDisplayGameScene.style.fontFamily = 'sans-serif';
                phaseDisplayGameScene.style.zIndex = '100';
                phaseDisplayGameScene.style.border = '2px solid #27ae60';
                phaseDisplayGameScene.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
                gameAreaForUI.appendChild(phaseDisplayGameScene);

                // Add Round Display to game area
                const roundDisplayGameScene = document.createElement('div');
                roundDisplayGameScene.id = 'round-display-game-scene';
                roundDisplayGameScene.textContent = 'Round 1';
                roundDisplayGameScene.style.position = 'absolute';
                roundDisplayGameScene.style.top = '130px';
                roundDisplayGameScene.style.left = '10px';
                roundDisplayGameScene.style.padding = '8px 12px';
                roundDisplayGameScene.style.backgroundColor = 'rgba(155, 89, 182, 0.9)'; // Purple background
                roundDisplayGameScene.style.color = 'white';
                roundDisplayGameScene.style.borderRadius = '5px';
                roundDisplayGameScene.style.fontSize = '0.9em';
                roundDisplayGameScene.style.fontWeight = 'bold';
                roundDisplayGameScene.style.fontFamily = 'sans-serif';
                roundDisplayGameScene.style.zIndex = '100';
                roundDisplayGameScene.style.border = '2px solid #8e44ad';
                roundDisplayGameScene.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
                gameAreaForUI.appendChild(roundDisplayGameScene);

                // Add Actionable Unit Limit Display to game area (debug mode only)
                if (isDebugModeEnabled()) {
                    const actionableUnitLimitDisplayGameScene = document.createElement('div');
                    actionableUnitLimitDisplayGameScene.id = 'actionable-unit-limit-display-game-scene';
                    actionableUnitLimitDisplayGameScene.textContent = 'Actionable Unit Limit: 0';
                    actionableUnitLimitDisplayGameScene.style.position = 'absolute';
                    actionableUnitLimitDisplayGameScene.style.top = '170px';
                    actionableUnitLimitDisplayGameScene.style.left = '10px';
                    actionableUnitLimitDisplayGameScene.style.padding = '8px 12px';
                    actionableUnitLimitDisplayGameScene.style.backgroundColor = 'rgba(230, 126, 34, 0.9)'; // Orange background
                    actionableUnitLimitDisplayGameScene.style.color = 'white';
                    actionableUnitLimitDisplayGameScene.style.borderRadius = '5px';
                    actionableUnitLimitDisplayGameScene.style.fontSize = '0.9em';
                    actionableUnitLimitDisplayGameScene.style.fontWeight = 'bold';
                    actionableUnitLimitDisplayGameScene.style.fontFamily = 'sans-serif';
                    actionableUnitLimitDisplayGameScene.style.zIndex = '100';
                    actionableUnitLimitDisplayGameScene.style.border = '2px solid #d35400';
                    actionableUnitLimitDisplayGameScene.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
                    gameAreaForUI.appendChild(actionableUnitLimitDisplayGameScene);
                }
            }

            // Initialize input handler for turn management
            initializeGameInputHandler();
            
            // Show controls in debug mode
            if (isDebugModeEnabled()) {
                showGameControls();
            }

            // Check if a globe was selected and load it
            const selectedGlobe = getSelectedGlobe();
            if (selectedGlobe) {
                console.log('Loading selected globe into game scene:', selectedGlobe);
                const gameScene = new GameScene();
                // Set the app container for victory/defeat screens
                gameScene.setAppContainer(appContainer);
                // Set the global reference so MouseHandler can access it
                (window as any).GAME_SCENE_INSTANCE = gameScene;
                
                // Import and set global tile effect renderer
                import('../game/TileEffectRenderer').then(({ globalTileEffectRenderer }) => {
                    (window as any).globalTileEffectRenderer = globalTileEffectRenderer;
                });
                
                // Load the globe asynchronously
                gameScene.setSelectedGlobe(selectedGlobe).then(() => {
                    console.log('✅ Globe loaded successfully');
                }).catch(error => {
                    console.error('❌ Failed to load globe:', error);
                });
                
                clearSelectedGlobe(); // Clear the globe after loading
            }

        }).catch(error => {
            console.error("Failed to start game:", error);
            gameSpecificContainer.innerHTML = 
                '<p style="color: red; text-align: center; font-family: sans-serif; padding: 20px;">' +
                'Error: Could not load the game. Please check the console for more details.' +
                '</p>';
        });
    };

    const handleDisplayEncounter = async () => {
        console.log('Transitioning to encounter scene...');
        await clearAppContainer();
        showEncounterScene(appContainer, proceedToGameScene);
    };

    const handleDisplayShop = async () => {
        console.log('Transitioning to shop scene...');
        await clearAppContainer();
        showShopScene(appContainer, handleDisplayEncounter);
    };

    const handleDisplaySquadInventory = async () => {
        console.log('Transitioning to Squad/Inventory scene...');
        await clearAppContainer();
        showSquadScene(appContainer, handleDisplayEncounter, handleDisplayShop);
    };

    const showSplash = () => {
        console.log('Showing splash screen...');
        showSplashScreen(appContainer, handleDisplayShop);
    };

    GLOBAL_NAVIGATION_HANDLERS = {
        proceedToGameScene,
        handleDisplayShop,
        handleDisplaySquadInventory,
        handleDisplayEncounter,
        showSplash
    };

    return {
        proceedToGameScene,
        handleDisplayShop,
        handleDisplaySquadInventory,
        handleDisplayEncounter,
        showSplash
    };
} 