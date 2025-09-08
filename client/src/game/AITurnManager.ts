import { AIService, AIDecision } from './AIService';
import { Unit } from '../units/Unit';
import { Position } from './NavigationManager';
import { ActionManager } from './ActionManager';
import { SkillHandler } from './SkillHandler';
import { SkillTargetingService } from './SkillTargetingService';
import { NavigationManager } from './NavigationManager';
import { MovementManager } from './MovementManager';
import { AttackCalculationService } from './AttackCalculationService';
import * as BasicAttackService from './BasicAttackService';
import { isDebugModeEnabled } from './DebugMode';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';

export class AITurnManager {
    private aiService: AIService;
    private currentAIDecision: AIDecision | null = null;
    private isExecutingAITurn: boolean = false;

    constructor(
        actionManager: ActionManager,
        skillHandler: SkillHandler,
        skillTargetingService: SkillTargetingService,
        navigationManager: NavigationManager,
        movementManager: MovementManager,
        attackCalculationService: AttackCalculationService,
        basicAttackService: typeof BasicAttackService
    ) {
        this.aiService = new AIService(
            actionManager,
            skillHandler,
            skillTargetingService,
            navigationManager,
            movementManager,
            attackCalculationService,
            basicAttackService
        );
    }

    /**
     * Check if AI should take the current turn
     */
    public shouldTakeAITurn(currentPlayer: 'PLAYER_ONE' | 'PLAYER_TWO'): boolean {
        // Only use AI for enemy turns and when not in debug mode
        return !isDebugModeEnabled() && currentPlayer === 'PLAYER_TWO' && !this.isExecutingAITurn;
    }

    /**
     * Execute AI turn for the current enemy unit
     */
    public async executeAITurn(
        selectedUnit: Unit,
        gameScene: any // GameScene instance
    ): Promise<void> {
        if (this.isExecutingAITurn) {
            console.warn('⚠️ AI turn already in progress');
            return;
        }

        if (!selectedUnit || selectedUnit.team !== 'enemy') {
            console.warn('⚠️ AI can only control enemy units');
            return;
        }

        this.isExecutingAITurn = true;
        console.log(`🤖 AI taking turn for ${selectedUnit.name}`);

        try {
            // Create decision-making context
            const getUnitAtPosition = (x: number, y: number) => gameScene.getUnitAtPosition(x, y);
            const getUnitPosition = (unit: Unit) => gameScene.getUnitPosition(unit);
            const getAllUnits = () => gameScene.getAllUnits();

            // Make AI decision
            const decision = await this.aiService.makeDecision(
                selectedUnit,
                getUnitAtPosition,
                getUnitPosition,
                getAllUnits
            );

            this.currentAIDecision = decision;

            // Execute the decision
            await this.executeAIDecision(decision, gameScene);

            console.log(`✅ AI turn completed for ${selectedUnit.name}`);
            
            // Don't call endTurn() here - the AI actions (confirmAttack, confirmSkill, etc.) 
            // already call endTurn() internally, just like normal player actions
        } catch (error) {
            console.error(`❌ AI turn failed for ${selectedUnit.name}:`, error);
            
            // Clean up any lingering UI indicators
            try {
                if (gameScene) {
                    gameScene.exitMovePhase();
                    gameScene.exitActionPhase();
                }
            } catch (cleanupError) {
                console.warn('⚠️ Error during AI cleanup:', cleanupError);
            }
            
            // On error, we still need to end the turn since actions didn't complete
            if (GAME_TURN_MANAGER) {
                setTimeout(() => {
                    console.log(`🔚 AI ending turn after error for ${selectedUnit.name}`);
                    GAME_TURN_MANAGER.endTurn();
                }, 500);
            }
        } finally {
            this.isExecutingAITurn = false;
            this.currentAIDecision = null;
        }
    }

    /**
     * Execute the AI's decision
     */
    private async executeAIDecision(decision: AIDecision, gameScene: any): Promise<void> {
        const { unit, executionPlan } = decision;
        
        console.log(`🤖 Executing AI decision for ${unit.name}:`, executionPlan);
        
        // Phase 1: Movement (if needed)
        let movementSucceeded = true;
        if (executionPlan.moveFirst) {
            console.log(`🚶 AI moving ${unit.name} to (${executionPlan.moveFirst.x}, ${executionPlan.moveFirst.y})`);
            
            // Advance to MOVE phase
            if (GAME_TURN_MANAGER) {
                GAME_TURN_MANAGER.advancePhase();
            }
            
            // Small delay for UI
            await this.delay(300);
            
            // Select move target
            const moveSuccess = gameScene.selectMoveTarget(executionPlan.moveFirst.x, executionPlan.moveFirst.y);
            if (moveSuccess) {
                await this.delay(500);
                await gameScene.confirmMove();
                console.log(`✅ AI movement succeeded for ${unit.name}`);
            } else {
                console.warn('❌ AI movement failed, canceling move');
                gameScene.cancelMove();
                movementSucceeded = false;
            }
            
            // Small delay between movement and action
            await this.delay(500);
        } else {
            // Skip move phase
            console.log(`⏭️ AI skipping movement for ${unit.name}`);
            if (GAME_TURN_MANAGER) {
                GAME_TURN_MANAGER.advancePhase(); // Go to MOVE
                await this.delay(200);
                GAME_TURN_MANAGER.advancePhase(); // Go to ACTION
            }
        }

        // Phase 2: Action
        if (executionPlan.action !== 'skip') {
            console.log(`⚔️ AI executing ${executionPlan.action} with ${unit.name}`);
            
            // Make sure we're in ACTION phase
            const currentPhase = GAME_TURN_MANAGER?.getCurrentPhase();
            if (currentPhase !== 'ACTION') {
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.advancePhase();
                }
            }
            
            // Small delay to let UI update
            await this.delay(300);
            
            let actionSucceeded = false;
            
            if (executionPlan.action === 'basic_attack' && executionPlan.target) {
                // Execute basic attack
                gameScene.initiateBasicAttack();
                
                // Small delay then select target
                await this.delay(300);
                const attackSuccess = gameScene.selectAttackTarget(executionPlan.target.x, executionPlan.target.y);
                if (attackSuccess) {
                    await this.delay(500);
                    gameScene.confirmAttack();
                    actionSucceeded = true;
                    console.log(`✅ AI basic attack succeeded for ${unit.name}`);
                } else {
                    console.warn(`❌ AI attack target selection failed for ${unit.name} - target out of range or invalid`);
                    gameScene.cancelAttack();
                }
            } else if (executionPlan.action === 'skill' && executionPlan.skill && executionPlan.target) {
                // Execute skill
                gameScene.initiateSkillAttack(executionPlan.skill);
                
                // Small delay then select target
                await this.delay(300);
                const skillSuccess = gameScene.selectAttackTarget(executionPlan.target.x, executionPlan.target.y);
                if (skillSuccess) {
                    await this.delay(500);
                    await gameScene.confirmSkill();
                    actionSucceeded = true;
                    console.log(`✅ AI skill attack succeeded for ${unit.name}`);
                } else {
                    console.warn(`❌ AI skill target selection failed for ${unit.name} - target out of range or invalid`);
                    gameScene.cancelSkill();
                }
            }
            
            // If action failed, clean up and end turn
            if (!actionSucceeded) {
                console.log(`⏭️ AI action failed, skipping action phase for ${unit.name}`);
                try {
                    gameScene.exitActionPhase();
                } catch (e) {
                    console.warn('⚠️ Error exiting action phase:', e);
                }
                
                // End turn since no successful action was taken
                if (GAME_TURN_MANAGER) {
                    setTimeout(() => {
                        console.log(`🔚 AI ending turn after failed action for ${unit.name}`);
                        GAME_TURN_MANAGER.endTurn();
                    }, 500);
                }
            }
        } else {
            // Skip action phase - need to end turn manually since no action was taken
            console.log(`⏭️ AI skipping action for ${unit.name}`);
            if (GAME_TURN_MANAGER) {
                setTimeout(() => {
                    console.log(`🔚 AI ending turn after skipping action for ${unit.name}`);
                    GAME_TURN_MANAGER.endTurn();
                }, 500);
            }
        }
    }

    /**
     * Get current AI decision for debugging
     */
    public getCurrentAIDecision(): AIDecision | null {
        return this.currentAIDecision;
    }

    /**
     * Check if AI is currently executing a turn
     */
    public isAITurnInProgress(): boolean {
        return this.isExecutingAITurn;
    }

    /**
     * Utility method for delays
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get AI thoughts for a unit (for debugging/analysis)
     */
    public async getAIThoughts(
        unit: Unit,
        gameScene: any
    ): Promise<AIDecision | null> {
        if (!unit || unit.team !== 'enemy') return null;

        try {
            const getUnitAtPosition = (x: number, y: number) => gameScene.getUnitAtPosition(x, y);
            const getUnitPosition = (unit: Unit) => gameScene.getUnitPosition(unit);
            const getAllUnits = () => gameScene.getAllUnits();

            return await this.aiService.makeDecision(
                unit,
                getUnitAtPosition,
                getUnitPosition,
                getAllUnits
            );
        } catch (error) {
            console.error('❌ Failed to get AI thoughts:', error);
            return null;
        }
    }
}
