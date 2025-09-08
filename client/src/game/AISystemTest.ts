/**
 * Simple test functions to verify AI system functionality
 */

import { AIService } from './AIService';
import { isDebugModeEnabled } from './DebugMode';

/**
 * Test function to verify AI system is working
 */
export function testAISystem(): void {
    console.log('🧪 Testing AI System...');
    console.log('================================');
    
    // Test 1: Debug mode detection
    const debugMode = isDebugModeEnabled();
    console.log(`   Debug Mode: ${debugMode ? 'ON (AI Disabled)' : 'OFF (AI Enabled)'}`);
    
    // Test 2: AI Service static method
    const shouldUseAI = AIService.shouldUseAI();
    console.log(`   Should Use AI: ${shouldUseAI}`);
    
    // Test 3: Game scene availability
    const gameScene = (window as any).GAME_SCENE_INSTANCE;
    console.log(`   Game Scene Available: ${!!gameScene}`);
    
    // Test 4: Turn manager availability
    const { GAME_TURN_MANAGER } = require('../app/NavigationHandlers');
    console.log(`   Turn Manager Available: ${!!GAME_TURN_MANAGER}`);
    
    if (GAME_TURN_MANAGER) {
        console.log(`   AI Turn Manager Initialized: ${!!GAME_TURN_MANAGER.aiTurnManager}`);
        const currentPlayer = GAME_TURN_MANAGER.getCurrentPlayer();
        console.log(`   Current Player: ${currentPlayer}`);
        
        if (GAME_TURN_MANAGER.aiTurnManager) {
            const shouldTakeAI = GAME_TURN_MANAGER.aiTurnManager.shouldTakeAITurn(currentPlayer);
            console.log(`   AI Should Take Turn: ${shouldTakeAI}`);
        } else {
            console.log(`   AI Should Take Turn: Cannot check - AI Turn Manager not available`);
        }
        
        const shouldUseAIForCurrentTurn = GAME_TURN_MANAGER.shouldUseAIForCurrentTurn();
        console.log(`   Should Use AI For Current Turn: ${shouldUseAIForCurrentTurn}`);
        
        const isAIInProgress = GAME_TURN_MANAGER.isAITurnInProgress();
        console.log(`   AI Turn In Progress: ${isAIInProgress}`);
        
        const gameState = GAME_TURN_MANAGER.getGameState();
        console.log(`   Current Phase: ${gameState.currentPhaseName}`);
        console.log(`   Can Select: ${gameState.canSelect}`);
    }
    
    // Test 5: Available units
    if (gameScene) {
        const allUnits = gameScene.getAllUnits();
        const playerUnits = allUnits.filter((u: any) => u.team === 'player');
        const enemyUnits = allUnits.filter((u: any) => u.team === 'enemy');
        console.log(`   Player Units: ${playerUnits.length}, Enemy Units: ${enemyUnits.length}`);
        
        if (enemyUnits.length > 0) {
            console.log(`   Enemy Units: ${enemyUnits.map((u: any) => `${u.name} (${u.className})`).join(', ')}`);
        }
        
        // Test selectable units
        if (GAME_TURN_MANAGER) {
            const selectableUnits = GAME_TURN_MANAGER.getSelectableUnits();
            const selectableEnemies = selectableUnits.filter(u => u.team === 'enemy');
            console.log(`   Selectable Units: ${selectableUnits.length}, Selectable Enemies: ${selectableEnemies.length}`);
        }
    }
    
    console.log('================================');
    console.log('🧪 AI System Test Complete');
}

// Add to global scope for easy testing
declare global {
    interface Window {
        testAI: () => void;
    }
}

if (typeof window !== 'undefined') {
    window.testAI = testAISystem;
}
