import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { isDebugModeEnabled, logDebugInfo } from './DebugMode';

let inputHandlerActive = false;

/**
 * Initializes keyboard input handling for the game
 */
export function initializeGameInputHandler(): void {
    if (inputHandlerActive) return;
    
    inputHandlerActive = true;
    document.addEventListener('keydown', handleKeyDown);
    
    if (isDebugModeEnabled()) {
        console.log('🎮 Game input handler initialized');
        console.log('💡 Press ENTER to advance phase, SHIFT+ENTER to skip phase, SPACE to end turn, ESC to show turn info');
        console.log('💡 Debug: P for phase info, U for unit info, L to recalc limits, SHIFT+D to kill unit');
        console.log('💡 Debug: CTRL+R to reset, SHIFT+R for new round');
    }
}

/**
 * Cleans up keyboard input handling
 */
export function cleanupGameInputHandler(): void {
    if (!inputHandlerActive) return;
    
    inputHandlerActive = false;
    document.removeEventListener('keydown', handleKeyDown);
    
    logDebugInfo('Game input handler cleaned up');
}

/**
 * Handles keyboard input for the game
 */
function handleKeyDown(event: KeyboardEvent): void {
    if (!GAME_TURN_MANAGER) return;
    
    switch (event.code) {
        case 'Enter':
            event.preventDefault();
            if (GAME_TURN_MANAGER.isGameStarted()) {
                if (event.shiftKey) {
                    // SHIFT+ENTER: Skip current phase
                    GAME_TURN_MANAGER.skipPhase();
                } else {
                    // ENTER: Advance to next phase
                    GAME_TURN_MANAGER.advancePhase();
                }
            } else {
                console.log('⚠️ Game not started yet!');
            }
            break;
            
        case 'Space':
            event.preventDefault();
            if (GAME_TURN_MANAGER.isGameStarted()) {
                // SPACE: End turn (same as advancing from ACTION phase)
                GAME_TURN_MANAGER.endTurn();
            } else {
                console.log('⚠️ Game not started yet!');
            }
            break;
            
        case 'Escape':
            event.preventDefault();
            const state = GAME_TURN_MANAGER.getGameState();
            console.log('📊 Current Game State:', state);
            console.log(`📋 Phase Capabilities: Select=${state.canSelect}, Move=${state.canMove}, Act=${state.canAct}`);
            console.log(`🔄 Round Info: Round ${state.roundNumber}, Limit ${state.actionableUnitLimit}`);
            console.log(`🎯 Turns taken: P1=${state.turnsTakenThisRound.PLAYER_ONE}/${state.actionableUnitLimit}, P2=${state.turnsTakenThisRound.PLAYER_TWO}/${state.actionableUnitLimit}`);
            console.log(`👥 Alive units: Player=${state.alivePlayerUnits}, Enemy=${state.aliveEnemyUnits}`);
            console.log(`🎯 Selectable units: ${state.selectableUnits}`);
            break;
            
        case 'KeyR':
            if (event.ctrlKey && isDebugModeEnabled()) {
                event.preventDefault();
                console.log('🔄 Resetting turn manager...');
                GAME_TURN_MANAGER.reset();
                GAME_TURN_MANAGER.startGame();
            } else if (event.shiftKey && isDebugModeEnabled()) {
                event.preventDefault();
                console.log('🔄 Forcing new round...');
                GAME_TURN_MANAGER.forceNewRound();
            }
            break;
            
        case 'KeyP':
            if (isDebugModeEnabled()) {
                event.preventDefault();
                const currentPhase = GAME_TURN_MANAGER.getCurrentPhase();
                console.log(`📋 Current Phase: ${GAME_TURN_MANAGER.getPhaseDisplayName(currentPhase)}`);
                console.log(`🎯 Phase Capabilities:`);
                console.log(`  Can Select: ${GAME_TURN_MANAGER.canSelect()}`);
                console.log(`  Can Move: ${GAME_TURN_MANAGER.canMove()}`);
                console.log(`  Can Act: ${GAME_TURN_MANAGER.canAct()}`);
            }
            break;
            
        case 'KeyU':
            if (isDebugModeEnabled()) {
                event.preventDefault();
                const selectableUnits = GAME_TURN_MANAGER.getSelectableUnits();
                console.log(`🎯 Selectable Units (${selectableUnits.length}):`);
                selectableUnits.forEach(unit => {
                    console.log(`  - ${unit.name} (${unit.className}) - ID: ${unit.id} - HP: ${unit.currentHealth}/${unit.health}`);
                });
                
                const gameState = GAME_TURN_MANAGER.getGameState();
                console.log(`👥 Unit counts: Player=${gameState.alivePlayerUnits}, Enemy=${gameState.aliveEnemyUnits}`);
                console.log(`🔄 Should end round after turn: ${gameState.shouldEndRoundAfterTurn}`);
            }
            break;
            
        case 'KeyL':
            if (isDebugModeEnabled()) {
                event.preventDefault();
                console.log('🔄 Forcing recalculation of actionable unit limit...');
                GAME_TURN_MANAGER.forceRecalculateActionableUnitLimit();
            }
            break;
            
        case 'KeyD':
            if (event.shiftKey && isDebugModeEnabled()) {
                event.preventDefault();
                console.log('💀 Simulating unit death for testing...');
                const selectableUnits = GAME_TURN_MANAGER.getSelectableUnits();
                if (selectableUnits.length > 0) {
                    const unitToDie = selectableUnits[0];
                    const oldHealth = unitToDie.currentHealth;
                    unitToDie.currentHealth = 0;
                    const team = unitToDie.team;
                    GAME_TURN_MANAGER.onUnitHealthChanged(unitToDie.id, team, 0, oldHealth);
                    console.log(`💀 Killed ${unitToDie.name} (${team} team)`);
                } else {
                    console.log('⚠️ No selectable units to kill');
                }
            }
            break;
    }
}

/**
 * Shows help information for keyboard controls
 */
export function showGameControls(): void {
    console.log('🎮 Game Controls:');
    console.log('  ENTER - Advance to next phase');
    console.log('  SHIFT+ENTER - Skip current phase');
    console.log('  SPACE - End current turn');
    console.log('  ESC - Show current game state');
    if (isDebugModeEnabled()) {
        console.log('  P - Show current phase info (debug only)');
        console.log('  U - Show selectable units info (debug only)');
        console.log('  L - Force recalculate unit limit (debug only)');
        console.log('  SHIFT+D - Simulate unit death (debug only)');
        console.log('  CTRL+R - Reset turn manager (debug only)');
        console.log('  SHIFT+R - Force new round (debug only)');
    }
} 