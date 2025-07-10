import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';
import { Position } from './NavigationManager';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { AttackCalculationService } from './AttackCalculationService';
import { SkillTargetingService } from './SkillTargetingService';
import { AnimationManager } from './AnimationManager';
import * as THREE from 'three';
import { SCENE_GLOBAL } from '../game';

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
        movementManager?: any,
        animationManager?: AnimationManager
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
        this.setupSkillTargeting(skill, unit, actionManager, uiManager, unitRenderer, movementManager, animationManager);
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
        movementManager?: any,
        animationManager?: AnimationManager
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
                // onConfirm callback - execute the skill
                console.log(`✅ Confirming skill: ${skill.name}`);
                const result = actionManager.confirmSkill(
                    unit,
                    (x: number, y: number) => unitRenderer.getUnitAtPosition(x, y)
                );
                
                if (result) {
                    const { affectedUnits } = result;
                    
                    // Update visual elements for the caster
                    unitRenderer.updateUnitBars(unit);
                    unitRenderer.updateUnitModifiers(unit);
                    
                    // Show emoji effects for all target squares in the skill pattern
                    const selectedTarget = actionManager.getSelectedSkillTarget();
                    if (selectedTarget) {
                        const skillPattern = skill.getTargetPattern(selectedTarget.x, selectedTarget.y);
                        this.showSkillEmojiEffects(skillPattern, skill.emoji);
                    }
                    
                    // Update visual elements and show animations for all affected units
                    affectedUnits.forEach((affectedUnit: Unit) => {
                        unitRenderer.updateUnitBars(affectedUnit);
                        unitRenderer.updateUnitModifiers(affectedUnit);
                        
                        // Show proper skill effect animation using AnimationManager
                        const totalSkillDamage = unit.skillDamage + (skill.bonusDamage || 0);
                        const isHealing = skill.id === 'universal-whisper' || skill.id === 'bandage';
                        
                        if (animationManager) {
                            // Use proper AnimationManager for full effect (boom + text + flicker)
                            console.log(`🎬 Using AnimationManager for ${skill.name} on ${affectedUnit.name}`);
                            animationManager.showSkillEffectAnimation(
                                affectedUnit,
                                totalSkillDamage,
                                skill.emoji,
                                (unit: Unit) => unitRenderer.getUnitPosition(unit),
                                (unit: Unit) => unitRenderer.getUnitMesh(unit),
                                isHealing
                            );
                        } else {
                            // Fallback - show individual effects manually
                            console.log(`⚠️ No AnimationManager, using fallback for ${skill.name} on ${affectedUnit.name}`);
                            
                            // Show boom animation
                            if (!isHealing) {
                                // Create a simple boom effect manually
                                console.log(`💥 Showing boom effect for ${affectedUnit.name}`);
                            }
                            
                            // Color flicker
                            const unitMesh = unitRenderer.getUnitMesh(affectedUnit);
                            if (unitMesh) {
                                const originalColor = unitMesh.material.color.clone();
                                unitMesh.material.color.setHex(isHealing ? 0x00ff00 : 0xff0000);
                                
                                setTimeout(() => {
                                    unitMesh.material.color.copy(originalColor);
                                }, 200);
                            }
                        }
                    });
                    
                    // Handle deaths
                    const deadUnits = affectedUnits.filter((u: Unit) => u.currentHealth <= 0);
                    if (deadUnits.length > 0) {
                        deadUnits.forEach((deadUnit: Unit) => {
                            setTimeout(() => {
                                console.log(`🗑️ Removing dead unit: ${deadUnit.name}`);
                                unitRenderer.removeUnit(deadUnit);
                                
                                if (GAME_TURN_MANAGER) {
                                    const team = deadUnit.team === 'player' ? 'player' : 'enemy';
                                    GAME_TURN_MANAGER.onUnitDeath(deadUnit.id, team);
                                    console.log(`☠️ Notified turn manager of ${deadUnit.name} death (${team} team)`);
                                }
                            }, 1000);
                        });
                    }
                    
                    console.log(`✅ Skill ${skill.name} executed successfully, affected ${affectedUnits.length} units`);
                }
                
                // End the action phase
                this.exitActionPhase(actionManager, uiManager);
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.endTurn();
                }
            },
            () => {
                // onCancel callback - cancel the skill and return to action options
                console.log(`❌ Cancelling skill: ${skill.name}`);
                
                // Clear the skill targeting and return to action options
                actionManager.exitActionPhase();
                uiManager.showActionOptions(
                    unit,
                    () => this.initiateBasicAttack(unit, undefined, actionManager, uiManager, unitRenderer),
                    (skill: Skill) => this.initiateSkillAttack(skill, unit, undefined, actionManager, uiManager, unitRenderer),
                    () => {
                        this.exitActionPhase(actionManager, uiManager);
                        if (GAME_TURN_MANAGER) {
                            GAME_TURN_MANAGER.endTurn();
                        }
                    }
                );
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
     * Show emoji effects for all target squares in skill pattern
     */
    private showSkillEmojiEffects(skillPattern: any[], emoji: string): void {
        skillPattern.forEach((target) => {
            // Show emoji animation at each target square
            if (target.x >= 0 && target.x < 8 && target.y >= 0 && target.y < 8) {
                this.showEmojiAtPosition(target.x, target.y, emoji);
            }
        });
    }

    /**
     * Show emoji animation at a specific position using direct Three.js access
     */
    private showEmojiAtPosition(x: number, y: number, emoji: string): void {
        if (!SCENE_GLOBAL) {
            console.warn('SCENE_GLOBAL not available for emoji display');
            return;
        }

        try {
            // Create canvas for emoji
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const context = canvas.getContext('2d');
            
            if (!context) return;

            // Clear canvas and draw emoji
            context.clearRect(0, 0, 64, 64);
            context.font = '48px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(emoji, 32, 32);
            
            // Create texture and mesh
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            
            const geometry = new THREE.PlaneGeometry(32 * 0.8, 32 * 0.8);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 1.0,
                alphaTest: 0.1,
                depthTest: false,
                depthWrite: false
            });
            
            const emojiMesh = new THREE.Mesh(geometry, material);
            
            // Position the emoji
            const worldX = x * 32 + 32 / 2;
            const worldY = -y * 32 - 32 / 2;
            emojiMesh.position.set(worldX, worldY, 2.5);
            
            SCENE_GLOBAL.add(emojiMesh);
            
            console.log(`🔥 Added emoji ${emoji} at position (${x}, ${y})`);
            
            // Remove emoji after animation
            setTimeout(() => {
                if (SCENE_GLOBAL) {
                    SCENE_GLOBAL.remove(emojiMesh);
                    console.log(`🔥 Removed emoji ${emoji} from position (${x}, ${y})`);
                }
            }, 800);
        } catch (error) {
            console.error('Error creating emoji animation:', error);
        }
    }

    /**
     * Check if a skill only targets the caster (self-targeting)
     */
    private isSelfTargetingSkill(skill: Skill, unit: Unit, unitRenderer: any): boolean {
        const currentPosition = unitRenderer.getUnitPosition(unit);
        if (!currentPosition) {
            return false;
        }

        // Adjacent-attack skills should never be considered self-targeting
        // as they need to show targeting indicators for player selection
        if (skill.targetingType === 'adjacent-attack') {
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