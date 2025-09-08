/**
 * Debug utilities for turn flow and AI integration
 */

import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { isDebugModeEnabled } from './DebugMode';

/**
 * Shows detailed turn flow status
 */
export function debugTurnFlow(): void {
    console.log('🔄 TURN FLOW DEBUG STATUS:');
    console.log('================================');
    
    if (!GAME_TURN_MANAGER) {
        console.log('❌ GAME_TURN_MANAGER not available');
        return;
    }
    
    const state = GAME_TURN_MANAGER.getGameState();
    
    console.log(`🎯 Current Turn: ${state.turnCount}`);
    console.log(`👤 Current Player: ${state.currentPlayerName} (${state.currentPlayer})`);
    console.log(`📋 Current Phase: ${state.currentPhaseName} (${state.currentPhase})`);
    console.log(`🔄 Round: ${state.roundNumber}`);
    console.log('');
    
    console.log(`🎮 Debug Mode: ${isDebugModeEnabled() ? 'ON (AI Disabled)' : 'OFF (AI Enabled)'}`);
    console.log(`🤖 Should Use AI: ${GAME_TURN_MANAGER.shouldUseAIForCurrentTurn()}`);
    console.log(`⚡ AI In Progress: ${GAME_TURN_MANAGER.isAITurnInProgress()}`);
    console.log('');
    
    console.log(`📊 Turns This Round: P1=${state.turnsTakenThisRound.PLAYER_ONE}/${state.actionableUnitLimit}, P2=${state.turnsTakenThisRound.PLAYER_TWO}/${state.actionableUnitLimit}`);
    console.log(`👥 Alive Units: Player=${state.alivePlayerUnits}, Enemy=${state.aliveEnemyUnits}`);
    console.log(`🎯 Selectable Units: ${state.selectableUnits}`);
    console.log('');
    
    console.log(`🔧 Phase Capabilities: Select=${state.canSelect}, Move=${state.canMove}, Act=${state.canAct}`);
    console.log(`⏭️ Phase Skipped: Move=${state.phaseSkipped.move}, Action=${state.phaseSkipped.action}`);
    console.log('');
    
    const selectedUnitId = GAME_TURN_MANAGER.getSelectedUnitId();
    if (selectedUnitId) {
        console.log(`🎯 Selected Unit ID: ${selectedUnitId}`);
        
        const gameScene = (window as any).GAME_SCENE_INSTANCE;
        if (gameScene) {
            const allUnits = gameScene.getAllUnits();
            const selectedUnit = allUnits.find((u: any) => u.id === selectedUnitId);
            if (selectedUnit) {
                console.log(`   Unit: ${selectedUnit.name} (${selectedUnit.className}, ${selectedUnit.team})`);
                console.log(`   Health: ${selectedUnit.currentHealth}/${selectedUnit.health}`);
                console.log(`   Energy: ${selectedUnit.currentEnergy}/${selectedUnit.maxEnergy}`);
            }
        }
    } else {
        console.log(`🎯 Selected Unit: None`);
    }
    
    console.log('================================');
    console.log('🔄 Turn Flow Debug Complete');
}

/**
 * Monitor turn changes for debugging
 */
let lastTurnCount = 0;
let lastPlayer = '';

export function monitorTurnFlow(): void {
    if (!GAME_TURN_MANAGER) return;
    
    const state = GAME_TURN_MANAGER.getGameState();
    
    if (state.turnCount !== lastTurnCount || state.currentPlayerName !== lastPlayer) {
        console.log(`🔄 TURN CHANGE: Turn ${state.turnCount} - ${state.currentPlayerName} (${state.currentPhase})`);
        
        if (GAME_TURN_MANAGER.shouldUseAIForCurrentTurn()) {
            console.log(`   🤖 This is an AI turn`);
        } else {
            console.log(`   🎮 This is a player turn`);
        }
        
        lastTurnCount = state.turnCount;
        lastPlayer = state.currentPlayerName;
    }
}

// Auto-monitor turn flow
if (typeof window !== 'undefined') {
    setInterval(monitorTurnFlow, 500); // Check every 500ms
}

// Add debug commands to global scope
declare global {
    interface Window {
        debugTurnFlow: () => void;
    }
}

if (typeof window !== 'undefined') {
    window.debugTurnFlow = debugTurnFlow;
}
