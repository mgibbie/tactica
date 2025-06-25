import { TurnManager, Player, TurnPhase } from './TurnManager';
import { isDebugModeEnabled } from './DebugMode';

/**
 * Demo function to showcase TurnManager functionality
 * This can be called from the console for testing purposes
 */
export function runTurnManagerDemo(): void {
    console.log('🎯 Starting TurnManager Demo...');
    console.log('=====================================');
    
    // Create a new turn manager
    const turnManager = new TurnManager();
    
    // Display initial state
    console.log('Initial state:', turnManager.getGameState());
    
    // Start the game
    turnManager.startGame();
    
    // Simulate several turns with phases and round tracking
    console.log('\n🎮 Simulating turns with round tracking...');
    for (let turn = 0; turn < 4; turn++) {
        const state = turnManager.getGameState();
        console.log(`\n=== ROUND ${state.roundNumber} | TURN ${turn + 1} ===`);
        console.log(`Player: ${turnManager.getPlayerDisplayName(turnManager.getCurrentPlayer())}`);
        console.log(`Actionable Unit Limit: ${state.actionableUnitLimit}`);
        console.log(`Turns taken this round: P1=${state.turnsTakenThisRound.PLAYER_ONE}/${state.actionableUnitLimit}, P2=${state.turnsTakenThisRound.PLAYER_TWO}/${state.actionableUnitLimit}`);
        console.log(`Can take another turn: ${state.canTakeAnotherTurn}`);
        
        // Demonstrate phase progression
        console.log('\n--- Phase Progression ---');
        console.log(`Current phase: ${turnManager.getPhaseDisplayName(turnManager.getCurrentPhase())}`);
        console.log(`Can select: ${turnManager.canSelect()}, Can move: ${turnManager.canMove()}, Can act: ${turnManager.canAct()}`);
        
        // Simulate unit selection
        const selectableUnits = turnManager.getSelectableUnits();
        if (selectableUnits.length > 0) {
            const selectedUnit = selectableUnits[0];
            turnManager.markUnitAsUsed(selectedUnit.id);
            console.log(`Selected unit: ${selectedUnit.name} (${selectedUnit.id})`);
        }
        
        // Advance through phases
        turnManager.advancePhase(); // SELECT -> MOVE
        turnManager.advancePhase(); // MOVE -> ACTION
        turnManager.advancePhase(); // ACTION -> End Turn
    }
    
    // Show final state
    console.log('\n📊 Final state:', turnManager.getGameState());
    
    // Test reset functionality
    console.log('\n🔄 Testing reset...');
    turnManager.reset(Player.PLAYER_TWO);
    turnManager.startGame();
    console.log('After reset:', turnManager.getGameState());
    
    console.log('\n✅ TurnManager Demo Complete!');
    console.log('=====================================');
}

/**
 * Demo function specifically for round management
 */
export function runRoundDemo(): void {
    console.log('🎯 Starting Round Management Demo...');
    console.log('=====================================');
    
    const turnManager = new TurnManager();
    turnManager.startGame();
    
    console.log('\n🔄 Testing round progression...');
    
    // Simulate multiple rounds
    for (let round = 1; round <= 2; round++) {
        console.log(`\n--- ROUND ${round} ---`);
        const state = turnManager.getGameState();
        console.log(`Actionable Unit Limit: ${state.actionableUnitLimit}`);
        
        // Simulate turns until round limit is reached
        let turnInRound = 0;
        while (turnManager.canTakeAnotherTurn() && turnInRound < 6) {
            turnInRound++;
            const currentState = turnManager.getGameState();
            
            console.log(`\n  Turn ${turnInRound} - ${turnManager.getPlayerDisplayName(turnManager.getCurrentPlayer())}`);
            console.log(`  Turns taken: P1=${currentState.turnsTakenThisRound.PLAYER_ONE}/${currentState.actionableUnitLimit}, P2=${currentState.turnsTakenThisRound.PLAYER_TWO}/${currentState.actionableUnitLimit}`);
            
            // Simulate selecting a unit
            const selectableUnits = turnManager.getSelectableUnits();
            if (selectableUnits.length > 0) {
                turnManager.markUnitAsUsed(selectableUnits[0].id);
                console.log(`  Selected unit: ${selectableUnits[0].name}`);
            }
            
            // Complete the turn
            turnManager.advancePhase();
            turnManager.advancePhase();
            turnManager.advancePhase();
            
            // Check if we've moved to a new round
            const newState = turnManager.getGameState();
            if (newState.roundNumber > round) {
                break;
            }
        }
    }
    
    console.log('\n✅ Round Demo Complete!');
    console.log('=====================================');
}

/**
 * Demo function specifically for phase management
 */
export function runPhaseDemo(): void {
    console.log('🎯 Starting Phase Management Demo...');
    console.log('=====================================');
    
    const turnManager = new TurnManager();
    turnManager.startGame();
    
    console.log('\n📋 Testing all phase capabilities...');
    
    // Test each phase
    const phases = [TurnPhase.SELECT, TurnPhase.MOVE, TurnPhase.ACTION];
    phases.forEach(phase => {
        turnManager.forceSetPhase(phase);
        console.log(`\n--- ${turnManager.getPhaseDisplayName(phase)} Phase ---`);
        console.log(`Can select: ${turnManager.canSelect()}`);
        console.log(`Can move: ${turnManager.canMove()}`);
        console.log(`Can act: ${turnManager.canAct()}`);
    });
    
    console.log('\n✅ Phase Demo Complete!');
    console.log('=====================================');
}

// Make demo function available globally for console access
if (isDebugModeEnabled()) {
    (window as any).runTurnDemo = runTurnManagerDemo;
    (window as any).runRoundDemo = runRoundDemo;
    (window as any).runPhaseDemo = runPhaseDemo;
} 