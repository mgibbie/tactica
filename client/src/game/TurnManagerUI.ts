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
        // Handle phase transition asynchronously to support AI
        handlePhaseTransition(turnManager);
    };
    
    turnManager.endTurn = function() {
        originalEndTurn();
        updateTurnDisplay(turnManager);
        
        // Delay selection indicator update to allow death processing to complete
        // Death animations and cleanup happen asynchronously, so we need to wait
        setTimeout(() => {
            updateUnitSelectionIndicators();
            
            // Manually trigger handlePhaseTransition for SELECT phase after turn switch
            // since resetToSelect() doesn't call advancePhase()
            const state = turnManager.getGameState();
            if (state.currentPhase === 'SELECT') {
                handlePhaseTransition(turnManager);
            }
        }, 100);
    };
    
    turnManager.startGame = function() {
        originalStartGame();
        updateTurnDisplay(turnManager);
        
        // Check if AI should take the first turn
        setTimeout(() => {
            handlePhaseTransition(turnManager);
        }, 200);
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

// Track the last turn that AI was triggered to prevent multiple triggers
let lastAITriggerTurn = -1;

/**
 * Handles phase transition logic and UI updates
 */
async function handlePhaseTransition(turnManager: TurnManager): Promise<void> {
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
            
            // Check if AI should take this turn
            console.log(`🔍 Checking AI turn: currentPlayer=${state.currentPlayerName}, shouldUseAI=${turnManager.shouldUseAIForCurrentTurn()}, gameScene=${!!gameScene}, turn=${state.turnCount}, lastAITurn=${lastAITriggerTurn}`);
            
            // Only trigger AI if we haven't already triggered it for this turn
            if (turnManager.shouldUseAIForCurrentTurn() && gameScene && !turnManager.isAITurnInProgress() && lastAITriggerTurn !== state.turnCount) {
                console.log('🤖 AI should take this turn, attempting to execute...');
                
                // Small delay to let UI update
                setTimeout(async () => {
                    try {
                        // Double-check AI should still run (prevent race conditions)
                        const currentState = turnManager.getGameState();
                        if (!turnManager.shouldUseAIForCurrentTurn() || turnManager.isAITurnInProgress() || lastAITriggerTurn === currentState.turnCount) {
                            console.log('🤖 AI execution cancelled - conditions changed');
                            return;
                        }
                        
                        // Mark this turn as having AI triggered
                        lastAITriggerTurn = currentState.turnCount;
                        
                        // Auto-select an enemy unit for AI
                        const selectableUnits = turnManager.getSelectableUnits();
                        const enemyUnits = selectableUnits.filter(unit => unit.team === 'enemy');
                        
                        console.log(`🔍 Selectable units: ${selectableUnits.length}, Enemy units: ${enemyUnits.length}`);
                        
                        if (enemyUnits.length > 0) {
                            const selectedUnit = enemyUnits[0]; // AI will select first available enemy
                            turnManager.setSelectedUnit(selectedUnit.id);
                            gameScene.selectUnit(selectedUnit);
                            
                            console.log(`🤖 AI auto-selected ${selectedUnit.name} (${selectedUnit.className})`);
                            
                            // Execute AI turn directly
                            if (turnManager.aiTurnManager) {
                                await turnManager.aiTurnManager.executeAITurn(selectedUnit, gameScene);
                            } else {
                                console.warn('⚠️ AI Turn Manager not available');
                            }
                        } else {
                            console.warn('⚠️ No enemy units available for AI turn');
                            console.log('Available units:', selectableUnits.map(u => `${u.name} (${u.team})`));
                        }
                    } catch (error) {
                        console.error('❌ Error in AI turn execution:', error);
                    }
                }, 500);
            } else {
                if (!turnManager.shouldUseAIForCurrentTurn()) {
                    console.log(`🎮 Player turn - no AI needed (current player: ${state.currentPlayerName})`);
                }
                if (!gameScene) {
                    console.warn('⚠️ GameScene not available for AI');
                }
            }
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