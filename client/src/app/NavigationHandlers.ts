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

export function createNavigationHandlers(
    appContainer: HTMLElement,
    gameSpecificContainer: HTMLElement
) {
    const clearAppContainer = () => {
        // Before clearing, specifically cleanup game if it was running
        const gameCanvas = gameSpecificContainer.querySelector('canvas');
        if (gameSpecificContainer.contains(gameCanvas)) {
            cleanupGame(); // Call cleanup if game was active
        }
        // Remove game specific UI if any was added directly to appContainer
        const gameResourceUI = appContainer.querySelector('#player-resource-display-game-scene');
        if (gameResourceUI) appContainer.removeChild(gameResourceUI);
        const gameCoordsUI = appContainer.querySelector('#tile-coords-display-game-scene'); // Remove Coords UI
        if (gameCoordsUI) appContainer.removeChild(gameCoordsUI);
        const gameInfoUI = appContainer.querySelector('#game-info-panel'); // Remove Game Info Panel
        if (gameInfoUI) appContainer.removeChild(gameInfoUI);
        const debugUI = appContainer.querySelector('#debug-mode-display-game-scene'); // Remove Debug Display
        if (debugUI) appContainer.removeChild(debugUI);
        const turnUI = appContainer.querySelector('#turn-display-game-scene'); // Remove Turn Display
        if (turnUI) appContainer.removeChild(turnUI);
        const phaseUI = appContainer.querySelector('#phase-display-game-scene'); // Remove Phase Display
        if (phaseUI) appContainer.removeChild(phaseUI);
        const roundUI = appContainer.querySelector('#round-display-game-scene'); // Remove Round Display
        if (roundUI) appContainer.removeChild(roundUI);
        const actionableUnitLimitUI = appContainer.querySelector('#actionable-unit-limit-display-game-scene'); // Remove Actionable Unit Limit Display
        if (actionableUnitLimitUI) appContainer.removeChild(actionableUnitLimitUI);
        if (GAME_COORDS_DISPLAY_ELEMENT_MAIN) GAME_COORDS_DISPLAY_ELEMENT_MAIN = null; // Reset exported ref
        if (GAME_TURN_MANAGER) GAME_TURN_MANAGER = null; // Reset turn manager ref
        cleanupGameInfoPanel(); // Cleanup info panel
        cleanupGameInputHandler(); // Cleanup input handler

        while (appContainer.firstChild) {
            appContainer.removeChild(appContainer.firstChild);
        }
        // Ensure appContainer is ready for new content (flex centering)
        appContainer.style.display = 'flex';
        appContainer.style.justifyContent = 'center';
        appContainer.style.alignItems = 'center';
    };

    const proceedToGameScene = () => {
        console.log('Proceeding to game scene...');
        markShopForNextVisitRefresh();
        clearAppContainer();
        appContainer.appendChild(gameSpecificContainer);
        startGame(gameSpecificContainer).then(() => {
            // Add game-specific UI directly to appContainer after game starts
            const resourceDisplayGameScene = document.createElement('div');
            resourceDisplayGameScene.id = 'player-resource-display-game-scene'; // Unique ID
            resourceDisplayGameScene.textContent = `Resource: ${mainPlayer.resource}`;
            resourceDisplayGameScene.style.position = 'absolute';
            resourceDisplayGameScene.style.bottom = '20px';
            resourceDisplayGameScene.style.left = '20px';
            resourceDisplayGameScene.style.padding = '10px 15px';
            resourceDisplayGameScene.style.backgroundColor = '#1a1a1a';
            resourceDisplayGameScene.style.color = '#f1c40f';
            resourceDisplayGameScene.style.borderRadius = '5px';
            resourceDisplayGameScene.style.fontSize = '1em';
            resourceDisplayGameScene.style.fontWeight = 'bold';
            resourceDisplayGameScene.style.fontFamily = 'sans-serif';
            resourceDisplayGameScene.style.zIndex = '100'; // Ensure it's above game canvas
            appContainer.appendChild(resourceDisplayGameScene);

            // Add Tile Coords Display to appContainer
            GAME_COORDS_DISPLAY_ELEMENT_MAIN = document.createElement('div');
            GAME_COORDS_DISPLAY_ELEMENT_MAIN.id = 'tile-coords-display-game-scene';
            GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.position = 'absolute';
            GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.top = '10px';
            GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.left = '10px';
            GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.color = 'white';
            GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.fontFamily = 'sans-serif';
            GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.backgroundColor = 'rgba(0,0,0,0.5)';
            GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.padding = '5px';
            GAME_COORDS_DISPLAY_ELEMENT_MAIN.innerText = 'Coords: N/A';
            GAME_COORDS_DISPLAY_ELEMENT_MAIN.style.zIndex = '100';
            appContainer.appendChild(GAME_COORDS_DISPLAY_ELEMENT_MAIN);

            // Add Debug Mode Display if debug mode is enabled
            if (isDebugModeEnabled()) {
                const debugDisplayGameScene = document.createElement('div');
                debugDisplayGameScene.id = 'debug-mode-display-game-scene';
                debugDisplayGameScene.textContent = `DEBUG MODE: ${getDebugModeStatus()}`;
                debugDisplayGameScene.style.position = 'absolute';
                debugDisplayGameScene.style.top = '10px';
                debugDisplayGameScene.style.right = '10px';
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
                appContainer.appendChild(debugDisplayGameScene);
            }

            // Initialize the game info panel
            initializeGameInfoPanel(appContainer);

            // Initialize Turn Manager (but don't start yet - wait for globe to load)
            GAME_TURN_MANAGER = createUIAwareTurnManager();
            
            // Add Turn Display to appContainer
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
            appContainer.appendChild(turnDisplayGameScene);

            // Add Phase Display to appContainer
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
            appContainer.appendChild(phaseDisplayGameScene);

            // Add Round Display to appContainer
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
            appContainer.appendChild(roundDisplayGameScene);

            // Add Actionable Unit Limit Display to appContainer (debug mode only)
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
                appContainer.appendChild(actionableUnitLimitDisplayGameScene);
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
                // Set the global reference so MouseHandler can access it
                (window as any).GAME_SCENE_INSTANCE = gameScene;
                
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

    const handleDisplayEncounter = () => {
        console.log('Transitioning to encounter scene...');
        clearAppContainer();
        showEncounterScene(appContainer, proceedToGameScene);
    };

    const handleDisplayShop = () => {
        console.log('Transitioning to shop scene...');
        clearAppContainer();
        showShopScene(appContainer, handleDisplayEncounter);
    };

    const handleDisplaySquadInventory = () => {
        console.log('Transitioning to Squad/Inventory scene...');
        clearAppContainer();
        showSquadScene(appContainer, handleDisplayEncounter, handleDisplayShop);
    };

    const showSplash = () => {
        console.log('Showing splash screen...');
        showSplashScreen(appContainer, handleDisplayShop);
    };

    return {
        proceedToGameScene,
        handleDisplayShop,
        handleDisplaySquadInventory,
        handleDisplayEncounter,
        showSplash
    };
} 