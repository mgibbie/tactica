import { AIService } from './AIService';
import { Unit } from '../units/Unit';
import { isDebugModeEnabled } from './DebugMode';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';

/**
 * Debug commands for testing and analyzing AI behavior
 */
export class AIDebugCommands {
    
    /**
     * Analyze AI thoughts for a specific unit
     */
    public static async analyzeUnitAI(unitName: string): Promise<void> {
        if (!isDebugModeEnabled()) {
            console.log('🤖 AI Debug: Debug mode must be enabled to use AI analysis commands');
            return;
        }

        const gameScene = (window as any).GAME_SCENE_INSTANCE;
        if (!gameScene) {
            console.log('❌ Game scene not available');
            return;
        }

        const allUnits = gameScene.getAllUnits();
        const unit = allUnits.find((u: Unit) => u.name.toLowerCase() === unitName.toLowerCase());
        
        if (!unit) {
            console.log(`❌ Unit "${unitName}" not found. Available units:`, 
                allUnits.map((u: Unit) => `${u.name} (${u.className}, ${u.team})`));
            return;
        }

        if (!GAME_TURN_MANAGER?.getCurrentAIDecision && !GAME_TURN_MANAGER?.aiTurnManager) {
            console.log('❌ AI system not initialized');
            return;
        }

        try {
            // Get AI thoughts for the unit
            const decision = await GAME_TURN_MANAGER.aiTurnManager?.getAIThoughts(unit, gameScene);
            
            if (!decision) {
                console.log(`❌ Could not generate AI thoughts for ${unit.name}`);
                return;
            }

            console.log(`🤖 AI Analysis for ${unit.name} (${unit.className}):`);
            console.log(`   Health: ${unit.currentHealth}/${unit.health} (${Math.round(unit.currentHealth/unit.health*100)}%)`);
            console.log(`   Energy: ${unit.currentEnergy}/${unit.maxEnergy}`);
            console.log(`   Team: ${unit.team}`);
            console.log('');
            
            console.log('🧠 AI Thoughts:');
            decision.thoughts.forEach((thought, index) => {
                console.log(`   ${index + 1}. [${thought.priority}] ${thought.type.toUpperCase()}: ${thought.reasoning}`);
                if (thought.targetUnit) {
                    console.log(`      Target: ${thought.targetUnit.name} at (${thought.targetPosition?.x}, ${thought.targetPosition?.y})`);
                }
                if (thought.moveToPosition) {
                    console.log(`      Move to: (${thought.moveToPosition.x}, ${thought.moveToPosition.y})`);
                }
                if (thought.skill) {
                    console.log(`      Skill: ${thought.skill.name} (${thought.skill.energyCost} energy)`);
                }
            });
            
            console.log('');
            console.log(`✅ Selected Action: ${decision.selectedThought.type.toUpperCase()}`);
            console.log(`   Priority: ${decision.selectedThought.priority}`);
            console.log(`   Reasoning: ${decision.selectedThought.reasoning}`);
            
        } catch (error) {
            console.error('❌ Error analyzing AI:', error);
        }
    }

    /**
     * Get current AI decision if one is active
     */
    public static getCurrentAIDecision(): void {
        if (!isDebugModeEnabled()) {
            console.log('🤖 AI Debug: Debug mode must be enabled to use AI analysis commands');
            return;
        }

        const decision = GAME_TURN_MANAGER?.getCurrentAIDecision();
        
        if (!decision) {
            console.log('🤖 No active AI decision');
            return;
        }

        console.log(`🤖 Current AI Decision for ${decision.unit.name}:`);
        console.log(`   Selected: ${decision.selectedThought.type.toUpperCase()}`);
        console.log(`   Priority: ${decision.selectedThought.priority}`);
        console.log(`   Reasoning: ${decision.selectedThought.reasoning}`);
        
        if (decision.executionPlan.moveFirst) {
            console.log(`   Move: (${decision.executionPlan.moveFirst.x}, ${decision.executionPlan.moveFirst.y})`);
        }
        if (decision.executionPlan.target) {
            console.log(`   Target: (${decision.executionPlan.target.x}, ${decision.executionPlan.target.y})`);
        }
        if (decision.executionPlan.skill) {
            console.log(`   Skill: ${decision.executionPlan.skill.name}`);
        }
    }

    /**
     * Test AI behavior types
     */
    public static testAIBehaviors(): void {
        if (!isDebugModeEnabled()) {
            console.log('🤖 AI Debug: Debug mode must be enabled to use AI analysis commands');
            return;
        }

        const gameScene = (window as any).GAME_SCENE_INSTANCE;
        if (!gameScene) {
            console.log('❌ Game scene not available');
            return;
        }

        const allUnits = gameScene.getAllUnits();
        const enemyUnits = allUnits.filter((u: Unit) => u.team === 'enemy');
        
        console.log('🤖 AI Behavior Analysis:');
        
        enemyUnits.forEach((unit: Unit) => {
            // Determine behavior type using the same logic as AIService
            let behaviorType = 'offensive';
            
            if (unit.className.toLowerCase().includes('healer')) behaviorType = 'healer';
            else if (unit.className.toLowerCase().includes('hype')) behaviorType = 'buffer';
            else if (unit.className.toLowerCase().includes('hater')) behaviorType = 'debuffer';
            else {
                const hasHealingSkills = unit.skills.some(skill => 
                    skill.id.includes('heal') || skill.id.includes('bandage') || 
                    skill.id.includes('whisper') || skill.id.includes('blessing')
                );
                if (hasHealingSkills) behaviorType = 'healer';
                
                const hasBuffSkills = unit.skills.some(skill =>
                    skill.id.includes('hype') || skill.id.includes('rally') || 
                    skill.id.includes('inspire') || skill.id.includes('prepare')
                );
                if (hasBuffSkills) behaviorType = 'buffer';
                
                const hasDebuffSkills = unit.skills.some(skill =>
                    skill.id.includes('exhaust') || skill.id.includes('jeer') || 
                    skill.id.includes('toxic') || skill.id.includes('distraction')
                );
                if (hasDebuffSkills) behaviorType = 'debuffer';
                
                const hasDefensiveSkills = unit.skills.some(skill =>
                    skill.id.includes('rescue') || skill.id.includes('sturdy') || 
                    skill.id.includes('taunt') || skill.id.includes('barrier')
                );
                if (hasDefensiveSkills) behaviorType = 'defensive';
            }
            
            console.log(`   ${unit.name} (${unit.className}): ${behaviorType.toUpperCase()}`);
            console.log(`      Skills: ${unit.skills.map(s => s.name).join(', ') || 'None'}`);
        });
        
        console.log('');
        console.log('Use "aiAnalyze <unitName>" to see detailed AI thoughts for a specific unit');
    }

    /**
     * Toggle AI on/off by toggling debug mode
     */
    public static toggleAI(): void {
        const currentMode = isDebugModeEnabled();
        console.log(`🤖 AI is currently: ${currentMode ? 'DISABLED (Debug Mode ON)' : 'ENABLED (Debug Mode OFF)'}`);
        console.log('   Use F1 key to toggle debug mode and enable/disable AI');
        console.log('   When debug mode is OFF, AI will control enemy units automatically');
        console.log('   When debug mode is ON, you control both player and enemy units manually');
        
        if (GAME_TURN_MANAGER) {
            const currentPlayer = GAME_TURN_MANAGER.getCurrentPlayer();
            const isAITurn = GAME_TURN_MANAGER.shouldUseAIForCurrentTurn();
            const aiInProgress = GAME_TURN_MANAGER.isAITurnInProgress();
            console.log(`   Current Player: ${currentPlayer}`);
            console.log(`   Should Use AI This Turn: ${isAITurn}`);
            console.log(`   AI Turn In Progress: ${aiInProgress}`);
        }
    }
}

// Add debug commands to global scope for easy access
declare global {
    interface Window {
        aiAnalyze: (unitName: string) => Promise<void>;
        aiCurrent: () => void;
        aiBehaviors: () => void;
        aiToggle: () => void;
    }
}

if (typeof window !== 'undefined') {
    window.aiAnalyze = AIDebugCommands.analyzeUnitAI;
    window.aiCurrent = AIDebugCommands.getCurrentAIDecision;
    window.aiBehaviors = AIDebugCommands.testAIBehaviors;
    window.aiToggle = AIDebugCommands.toggleAI;
}
