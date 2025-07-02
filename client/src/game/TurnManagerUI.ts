import { TurnManager } from './TurnManager';
import { isDebugModeEnabled } from './DebugMode';
import { globalUnitRegistry } from '../units/UnitRegistry';

/**
 * Creates a turn manager that automatically updates UI displays when state changes
 */
export function createUIAwareTurnManager(): TurnManager {
    const turnManager = new TurnManager();
    
    // Set up automatic UI updates
    const originalAdvancePhase = turnManager.advancePhase.bind(turnManager);
    const originalEndTurn = turnManager.endTurn.bind(turnManager);
    const originalStartGame = turnManager.startGame.bind(turnManager);
    
    // Override methods to include UI updates
    turnManager.advancePhase = function() {
        originalAdvancePhase();
        updateTurnDisplay(turnManager);
        handlePhaseTransition(turnManager);
    };
    
    turnManager.endTurn = function() {
        originalEndTurn();
        updateTurnDisplay(turnManager);
        updateUnitSelectionIndicators();
    };
    
    turnManager.startGame = function() {
        originalStartGame();
        updateTurnDisplay(turnManager);
    };
    
    return turnManager;
}

/**
 * Creates a standard game turn manager without UI integration
 */
export function createGameTurnManager(): TurnManager {
    const turnManager = new TurnManager();
    
    // Log initial state
    if (isDebugModeEnabled()) {
        console.log('🎯 TurnManager created');
        console.log('Initial state:', turnManager.getGameState());
    }
    
    return turnManager;
}

/**
 * Gets formatted turn status display string
 */
export function getTurnStatusDisplay(turnManager: TurnManager): string {
    const state = turnManager.getGameState();
    return `Turn ${state.turnCount} - ${state.currentPlayerName}`;
}

/**
 * Gets formatted phase status display string
 */
export function getPhaseStatusDisplay(turnManager: TurnManager): string {
    const state = turnManager.getGameState();
    return `Phase: ${state.currentPhaseName}`;
}

/**
 * Gets formatted round status display string
 */
export function getRoundStatusDisplay(turnManager: TurnManager): string {
    const state = turnManager.getGameState();
    return `Round ${state.roundNumber}`;
}

/**
 * Gets formatted actionable unit limit display string
 */
export function getActionableUnitLimitDisplay(turnManager: TurnManager): string {
    const state = turnManager.getGameState();
    return `Actionable Unit Limit: ${state.actionableUnitLimit}`;
}

/**
 * Updates all turn-related UI displays
 */
export function updateTurnDisplay(turnManager: TurnManager): void {
    // Update Turn Display
    const turnDisplay = document.getElementById('turn-display-game-scene');
    if (turnDisplay) {
        turnDisplay.textContent = getTurnStatusDisplay(turnManager);
    }
    
    // Update Phase Display
    const phaseDisplay = document.getElementById('phase-display-game-scene');
    if (phaseDisplay) {
        phaseDisplay.textContent = getPhaseStatusDisplay(turnManager);
    }
    
    // Update Round Display
    const roundDisplay = document.getElementById('round-display-game-scene');
    if (roundDisplay) {
        roundDisplay.textContent = getRoundStatusDisplay(turnManager);
    }
    
    // Update Actionable Unit Limit Display (debug mode only)
    if (isDebugModeEnabled()) {
        const actionableUnitLimitDisplay = document.getElementById('actionable-unit-limit-display-game-scene');
        if (actionableUnitLimitDisplay) {
            actionableUnitLimitDisplay.textContent = getActionableUnitLimitDisplay(turnManager);
        }
    }
    
    // Log state change in debug mode
    if (isDebugModeEnabled()) {
        const state = turnManager.getGameState();
        console.log(`🔄 UI Updated - ${state.currentPlayerName} | ${state.currentPhaseName} | Round ${state.roundNumber}`);
    }
}

/**
 * Handles phase transition logic and UI updates
 */
function handlePhaseTransition(turnManager: TurnManager): void {
    const state = turnManager.getGameState();
    
    // Log phase transition in debug mode
    if (isDebugModeEnabled()) {
        console.log(`🎯 Phase transition: ${state.currentPhaseName}`);
        console.log(`Can select: ${state.canSelect}, Can move: ${state.canMove}, Can act: ${state.canAct}`);
    }
    
    // Get the game scene instance
    const gameScene = (window as any).GAME_SCENE_INSTANCE;
    
    // Handle any phase-specific UI updates here
    switch (state.currentPhase) {
        case 'SELECT':
            updateUnitSelectionIndicators();
            break;
        case 'MOVE':
            // Clear selection indicators when entering MOVE phase
            updateUnitSelectionIndicators();
            
            // Enter movement phase with the selected unit
            if (gameScene) {
                const selectedUnit = gameScene.getSelectedUnit();
                if (selectedUnit) {
                    console.log(`🚶 Entering MOVE phase with unit: ${selectedUnit.name}`);
                    gameScene.enterMovePhase(selectedUnit);
                } else {
                    console.warn('❌ No unit selected for MOVE phase');
                }
            } else {
                console.warn('❌ GameScene not available for MOVE phase');
            }
            break;
        case 'ACTION':
            // Clear selection indicators when entering ACTION phase
            updateUnitSelectionIndicators();
            
            // Enter action phase with the selected unit
            if (gameScene) {
                const selectedUnit = gameScene.getSelectedUnit();
                if (selectedUnit) {
                    console.log(`⚔️ Entering ACTION phase with unit: ${selectedUnit.name}`);
                    gameScene.enterActionPhase(selectedUnit);
                } else {
                    console.warn('❌ No unit selected for ACTION phase');
                }
            } else {
                console.warn('❌ GameScene not available for ACTION phase');
            }
            break;
    }
}

/**
 * Updates unit selection indicators (requires GameScene integration)
 */
function updateUnitSelectionIndicators(): void {
    // Get the game scene instance
    const gameScene = (window as any).GAME_SCENE_INSTANCE;
    
    if (gameScene) {
        gameScene.updateUnitSelectionIndicators();
    } else if (isDebugModeEnabled()) {
        console.log('🎯 GameScene not available for updating unit selection indicators');
    }
} 