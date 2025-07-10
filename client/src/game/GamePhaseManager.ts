import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';
import { Position } from './NavigationManager';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { AttackCalculationService } from './AttackCalculationService';
import { SkillTargetingService } from './SkillTargetingService';

export class GamePhaseManager {
    private attackCalculationService: AttackCalculationService;
    private skillTargetingService: SkillTargetingService;

    constructor() {
        this.attackCalculationService = new AttackCalculationService();
        this.skillTargetingService = new SkillTargetingService();
    }

    // ===== MOVEMENT PHASE METHODS =====

    public enterMovePhase(
        unit: Unit,
        selectionManager: any,
        movementManager: any,
        uiManager: any,
        unitRenderer: any
    ): void {
        selectionManager.setSelectedUnit(unit);
        movementManager.enterMovePhase(
            unit,
            (unit: Unit) => unitRenderer.getUnitPosition(unit),
            () => unitRenderer.getUnitPositions()
        );
        uiManager.showSkipButton(() => {
            this.exitMovePhase(movementManager, uiManager);
            if (GAME_TURN_MANAGER) {
                GAME_TURN_MANAGER.advancePhase();
            }
        });
    }

    public exitMovePhase(movementManager: any, uiManager: any): void {
        movementManager.exitMovePhase();
        uiManager.hideMovementButtons();
    }

    public selectMoveTarget(
        x: number,
        y: number,
        movementManager: any,
        selectionManager: any,
        unitRenderer: any,
        uiManager: any
    ): boolean {
        const result = movementManager.selectMoveTarget(x, y);
        if (result) {
            const selectedUnit = selectionManager.getSelectedUnit();
            if (selectedUnit) {
                movementManager.drawPathToTarget(
                    (unit: Unit) => unitRenderer.getUnitPosition(unit),
                    selectedUnit
                );
            }
            uiManager.showConfirmCancelButtons(
                () => this.confirmMove(selectionManager, movementManager, unitRenderer, uiManager),
                () => this.cancelMove(movementManager, uiManager)
            );
        }
        return result;
    }

    public async confirmMove(
        selectionManager: any,
        movementManager: any,
        unitRenderer: any,
        uiManager: any
    ): Promise<void> {
        const selectedUnit = selectionManager.getSelectedUnit();
        const selectedMoveTarget = movementManager.getSelectedMoveTarget();
        
        if (!selectedUnit || !selectedMoveTarget) {
            console.warn('❌ No unit or target selected');
            return;
        }
        
        // Execute movement using the enhanced MovementManager
        await movementManager.executeMovement(
            selectedUnit,
            selectedMoveTarget,
            'basic',
            (unit: Unit, position: Position) => unitRenderer.moveUnitToPosition(unit, position),
            (unit: Unit) => unitRenderer.getUnitPosition(unit)
        );
        
        // Update unit bars after movement (in case tile effects changed health/energy)
        unitRenderer.updateUnitBars(selectedUnit);
        
        // Properly clear the movement phase UI
        this.exitMovePhase(movementManager, uiManager);
        
        // Advance to the next phase (action phase)
        if (GAME_TURN_MANAGER) {
            GAME_TURN_MANAGER.advancePhase();
        }
    }

    public cancelMove(movementManager: any, uiManager: any): void {
        movementManager.cancelMove();
        uiManager.showSkipButton(() => {
            this.exitMovePhase(movementManager, uiManager);
            if (GAME_TURN_MANAGER) {
                GAME_TURN_MANAGER.advancePhase();
            }
        });
    }

    // ===== ACTION PHASE METHODS =====

    public enterActionPhase(
        unit: Unit,
        selectionManager: any,
        actionManager: any,
        uiManager: any,
        unitRenderer: any
    ): void {
        selectionManager.setSelectedUnit(unit);
        actionManager.enterActionPhase(
            unit,
            (unit: Unit) => unitRenderer.getUnitPosition(unit),
            () => unitRenderer.getUnitPositions()
        );
        
        // Show all action options (Attack, Skills, Skip)
        uiManager.showActionOptions(
            unit,
            () => this.initiateBasicAttack(unit, selectionManager, actionManager, uiManager, unitRenderer),
            (skill: Skill) => this.initiateSkillAttack(skill, unit, selectionManager, actionManager, uiManager, unitRenderer),
            () => {
                this.exitActionPhase(actionManager, uiManager);
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.endTurn();
                }
            }
        );
    }

    public exitActionPhase(actionManager: any, uiManager: any): void {
        actionManager.exitActionPhase();
        uiManager.hideActionButtons();
    }

    public initiateBasicAttack(
        unit: Unit,
        selectionManager: any,
        actionManager: any,
        uiManager: any,
        unitRenderer: any
    ): void {
        console.log('⚔️ Initiating basic attack mode');

        // Set up basic attack mode and show targeting
        this.setupBasicAttackTargeting(unit, actionManager, uiManager, unitRenderer);
    }

    public initiateSkillAttack(
        skill: Skill,
        unit: Unit,
        selectionManager: any,
        actionManager: any,
        uiManager: any,
        unitRenderer: any,
        movementManager?: any
    ): void {
        console.log(`✨ Initiating skill attack: ${skill.name}`);

        if (unit.currentEnergy < skill.energyCost) {
            console.warn(`❌ Not enough energy for ${skill.name}. Required: ${skill.energyCost}, Current: ${unit.currentEnergy}`);
            return;
        }

        // Check if this is a self-targeting skill
        if (this.isSelfTargetingSkill(skill, unit, unitRenderer)) {
            console.log(`🎯 Self-targeting skill detected: ${skill.name} - executing immediately`);
            
            // Set up the skill without targeting interface
            actionManager.setAttackMode('skill', skill);
            
            // Get unit position and set it as the target
            const currentPosition = unitRenderer.getUnitPosition(unit);
            if (currentPosition) {
                actionManager.setSkillTarget(skill, currentPosition);
                
                // Execute the skill immediately
                const result = actionManager.confirmSkill(
                    unit,
                    (x: number, y: number) => unitRenderer.getUnitAtPosition(x, y)
                );
                
                if (result) {
                    // Update visual elements
                    unitRenderer.updateUnitBars(unit);
                    unitRenderer.updateUnitModifiers(unit);
                    console.log(`✅ Self-targeting skill ${skill.name} executed successfully`);
                }
            }
            
            // End the action phase
            this.exitActionPhase(actionManager, uiManager);
            if (GAME_TURN_MANAGER) {
                GAME_TURN_MANAGER.endTurn();
            }
            return;
        }

        // Set up skill attack mode and show targeting for non-self-targeting skills
        this.setupSkillTargeting(skill, unit, actionManager, uiManager, unitRenderer, movementManager);
    }

    private setupBasicAttackTargeting(
        unit: Unit,
        actionManager: any,
        uiManager: any,
        unitRenderer: any
    ): void {
        // Set the attack mode
        actionManager.setAttackMode('basic', null);
        
        // Calculate and show targeting indicators based on mode
        const currentPosition = unitRenderer.getUnitPosition(unit);
        if (!currentPosition) {
            console.error(`❌ No position found for unit ${unit.name}`);
            return;
        }

        // Use basic attack range
        this.showBasicAttackTargeting(unit, currentPosition, actionManager);
        
        // Show skip button for basic attacks (need target selection)
        uiManager.showActionSkipButton(() => {
            this.exitActionPhase(actionManager, uiManager);
            if (GAME_TURN_MANAGER) {
                GAME_TURN_MANAGER.endTurn();
            }
        });
    }

    private showBasicAttackTargeting(unit: Unit, currentPosition: Position, actionManager: any): void {
        const attackRange = unit.range || 1;
        console.log(`📍 Unit ${unit.name} current position: (${currentPosition.x}, ${currentPosition.y})`);
        console.log(`⚔️ Unit attack range: ${attackRange}`);
        
        // Calculate and show attack indicators
        const attackData = this.attackCalculationService.calculateValidAttackTargets(unit, currentPosition);
        actionManager.setAttackData(attackData);
        actionManager.createAttackIndicators();
        
        console.log('🎯 Basic attack targeting indicators created');
    }

    private setupSkillTargeting(
        skill: Skill,
        unit: Unit,
        actionManager: any,
        uiManager: any,
        unitRenderer: any,
        movementManager?: any
    ): void {
        // Set the attack mode
        actionManager.setAttackMode('skill', skill);
        
        // Calculate and show targeting indicators based on skill
        const currentPosition = unitRenderer.getUnitPosition(unit);
        if (!currentPosition) {
            console.error(`❌ No position found for unit ${unit.name}`);
            return;
        }

        // Use skill targeting service to handle complex skill targeting
        this.skillTargetingService.setupSkillTargeting(
            skill,
            unit,
            currentPosition,
            actionManager,
            uiManager,
            movementManager,
            unitRenderer,
            () => {
                // onConfirm callback - will be handled by GameScene
                console.log('Skill targeting confirmed');
            },
            () => {
                // onCancel callback - will be handled by GameScene
                console.log('Skill targeting cancelled');
            },
            () => {
                // onSkip callback
                this.exitActionPhase(actionManager, uiManager);
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.endTurn();
                }
            }
        );
    }

    public handleSkillTargetSelection(
        x: number,
        y: number,
        skill: Skill,
        actionManager: any,
        uiManager: any,
        onConfirm: () => void,
        onCancel: () => void,
        onRotate: () => void
    ): void {
        this.skillTargetingService.handleSkillTargetSelection(
            x,
            y,
            skill,
            actionManager,
            uiManager,
            onConfirm,
            onCancel,
            onRotate
        );
    }

    /**
     * Check if a skill only targets the caster (self-targeting)
     */
    private isSelfTargetingSkill(skill: Skill, unit: Unit, unitRenderer: any): boolean {
        const currentPosition = unitRenderer.getUnitPosition(unit);
        if (!currentPosition) {
            return false;
        }

        // Get the skill's target pattern at the unit's current position
        const targetPattern = skill.getTargetPattern(currentPosition.x, currentPosition.y);
        
        // Check if the skill only targets the caster's position and nothing else
        if (targetPattern.length === 1) {
            const target = targetPattern[0];
            return target.x === currentPosition.x && target.y === currentPosition.y;
        }
        
        return false;
    }
} 