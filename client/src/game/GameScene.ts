import { Globe } from '../globes/Globe';
import { GlobeLoader } from '../globes/GlobeLoader';
import { Unit } from '../units/Unit';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { globalNavigationManager, Position } from './NavigationManager';
import { UnitRenderer, setTileSizeForRenderer } from './UnitRenderer';
import { SelectionManager, setTileSizeForSelection } from './SelectionManager';
import { MovementManager, setTileSizeForMovement } from './MovementManager';
import { ActionManager, setTileSizeForAction } from './ActionManager';
import { UIManager } from './UIManager';
import { AnimationManager, setTileSizeForAnimation } from './AnimationManager';
import { Skill } from '../units/Skill';
import { showVictoryScreen, showDefeatScreen } from './VictoryScreens';
import { showShopScene } from '../shop/ShopScene';

// These should be set after the map loads, but we'll default to 32 for now
let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSize(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
    // Also set it for all managers
    setTileSizeForRenderer(width, height);
    setTileSizeForSelection(width, height);
    setTileSizeForMovement(width, height);
    setTileSizeForAction(width, height);
    setTileSizeForAnimation(width, height);
}

export class GameScene {
    private selectedGlobe: Globe | null = null;
    private unitRenderer: UnitRenderer = new UnitRenderer();
    private selectionManager: SelectionManager = new SelectionManager();
    private movementManager: MovementManager = new MovementManager();
    private actionManager: ActionManager = new ActionManager();
    private uiManager: UIManager = new UIManager();
    private animationManager: AnimationManager = new AnimationManager();
    private appContainer: HTMLElement | null = null;

    constructor() {
        console.log('GameScene initialized');
        globalNavigationManager.setMapDimensions(8, 8);
    }

    public setAppContainer(container: HTMLElement): void {
        this.appContainer = container;
    }

    private checkGameEndConditions(): void {
        if (!this.appContainer) {
            console.warn('❌ Cannot check game end conditions - no app container set');
            return;
        }

        const gameEndState = this.actionManager.checkGameEndConditions();
        
        if (gameEndState === 'victory') {
            console.log('🎉 VICTORY! Showing victory screen...');
            showVictoryScreen(this.appContainer, () => {
                // Navigate back to shop when continue is clicked
                showShopScene(this.appContainer!, () => {
                    // This would be the "proceed to game" callback from shop
                    // For now, we'll just log since the game flow would restart
                    console.log('🎮 Starting new game from shop...');
                });
            });
        } else if (gameEndState === 'defeat') {
            console.log('💀 DEFEAT! Showing defeat screen...');
            showDefeatScreen(this.appContainer, () => {
                // Restart the game when restart is clicked
                console.log('🔄 Restarting game...');
                // Reset the game state and return to shop
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.reset();
                }
                showShopScene(this.appContainer!, () => {
                    console.log('🎮 Starting new game from shop...');
                });
            });
        }
        // If gameEndState === 'continue', do nothing and let the game continue
    }

    public async setSelectedGlobe(globe: Globe): Promise<void> {
        console.log('Setting selected globe:', globe);
        this.selectedGlobe = globe;
        if (globe) {
            await this.loadGlobe(globe);
        }
    }

    private async loadGlobe(globe: Globe): Promise<void> {
        console.log('Loading globe in GameScene:', globe);
        await GlobeLoader.loadGlobe(this, globe);
    }

    // ===== UNIT MANAGEMENT METHODS =====

    public async placeUnit(unit: Unit, x: number, y: number): Promise<void> {
        this.unitRenderer.placeUnit(unit, x, y);
    }

    public getUnitPosition(unit: Unit): { x: number; y: number } | undefined {
        return this.unitRenderer.getUnitPosition(unit);
    }

    public removeUnit(unit: Unit): void {
        this.unitRenderer.removeUnit(unit);
    }

    public getUnitAtPosition(x: number, y: number): Unit | null {
        return this.unitRenderer.getUnitAtPosition(x, y);
    }

    public getAllUnits(): Unit[] {
        return this.unitRenderer.getAllUnits();
    }

    // ===== SELECTION METHODS =====

    public updateUnitSelectionIndicators(): void {
        this.selectionManager.updateUnitSelectionIndicators(
            (unit: Unit) => this.unitRenderer.getUnitPosition(unit)
        );
    }

    public selectUnit(unit: Unit): boolean {
        return this.selectionManager.selectUnit(unit);
    }

    public getSelectedUnit(): Unit | null {
        return this.selectionManager.getSelectedUnit();
    }

    // ===== MOVEMENT PHASE METHODS =====

    public enterMovePhase(unit: Unit): void {
        this.selectionManager.setSelectedUnit(unit);
        this.movementManager.enterMovePhase(
            unit,
            (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
            () => this.unitRenderer.getUnitPositions()
        );
        this.uiManager.showSkipButton(() => {
            this.exitMovePhase();
            if (GAME_TURN_MANAGER) {
                GAME_TURN_MANAGER.advancePhase();
            }
        });
    }

    public exitMovePhase(): void {
        this.movementManager.exitMovePhase();
        this.uiManager.hideMovementButtons();
        this.exitActionPhase();
    }

    public selectMoveTarget(x: number, y: number): boolean {
        const result = this.movementManager.selectMoveTarget(x, y);
        if (result) {
            const selectedUnit = this.selectionManager.getSelectedUnit();
            if (selectedUnit) {
                this.movementManager.drawPathToTarget(
                    (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
                    selectedUnit
                );
            }
            this.uiManager.showConfirmCancelButtons(
                () => this.confirmMove(),
                () => this.cancelMove()
            );
        }
        return result;
    }

    public confirmMove(): void {
        const selectedUnit = this.selectionManager.getSelectedUnit();
        const selectedMoveTarget = this.movementManager.getSelectedMoveTarget();
        
        if (!selectedUnit || !selectedMoveTarget) {
            console.warn('❌ No unit or target selected');
            return;
        }
        
        this.moveUnitToPosition(selectedUnit, selectedMoveTarget);
        this.exitMovePhase();
        
        if (GAME_TURN_MANAGER) {
            GAME_TURN_MANAGER.advancePhase();
        }
    }

    public cancelMove(): void {
        this.movementManager.cancelMove();
        this.uiManager.showSkipButton(() => {
            this.exitMovePhase();
            if (GAME_TURN_MANAGER) {
                GAME_TURN_MANAGER.advancePhase();
            }
        });
    }

    private moveUnitToPosition(unit: Unit, newPosition: Position): void {
        const oldPosition = this.unitRenderer.getUnitPosition(unit);
        this.unitRenderer.moveUnitToPosition(unit, newPosition);
        
        // Note: Kinetic energy gain from movement has been removed
        // Kinetic units now gain energy from basic attacks instead
    }

    // ===== ACTION PHASE METHODS =====

    public enterActionPhase(unit: Unit): void {
        this.selectionManager.setSelectedUnit(unit);
        this.actionManager.enterActionPhase(
            unit,
            (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
            () => this.unitRenderer.getUnitPositions()
        );
        
        // Show all action options (Attack, Skills, Skip)
        this.uiManager.showActionOptions(
            unit,
            () => this.initiateBasicAttack(),
            (skill: Skill) => this.initiateSkillAttack(skill),
            () => {
                this.exitActionPhase();
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.endTurn();
                }
            }
        );
    }

    public exitActionPhase(): void {
        this.actionManager.exitActionPhase();
        this.uiManager.hideActionButtons();
    }

    public initiateBasicAttack(): void {
        console.log('⚔️ Initiating basic attack mode');
        const selectedUnit = this.selectionManager.getSelectedUnit();
        if (!selectedUnit) {
            console.warn('❌ No unit selected');
            return;
        }

        // Set up basic attack mode and show targeting
        this.setupAttackTargeting(selectedUnit, 'basic');
    }

    public initiateSkillAttack(skill: Skill): void {
        console.log(`✨ Initiating skill attack: ${skill.name}`);
        const selectedUnit = this.selectionManager.getSelectedUnit();
        if (!selectedUnit) {
            console.warn('❌ No unit selected');
            return;
        }

        if (selectedUnit.currentEnergy < skill.energyCost) {
            console.warn(`❌ Not enough energy for ${skill.name}. Required: ${skill.energyCost}, Current: ${selectedUnit.currentEnergy}`);
            return;
        }

        // Set up skill attack mode and show targeting
        this.setupAttackTargeting(selectedUnit, 'skill', skill);
    }

    private setupAttackTargeting(unit: Unit, mode: 'basic' | 'skill', skill?: Skill): void {
        // Set the attack mode
        this.actionManager.setAttackMode(mode, skill || null);
        
        // Calculate and show targeting indicators based on mode
        const currentPosition = this.unitRenderer.getUnitPosition(unit);
        if (!currentPosition) {
            console.error(`❌ No position found for unit ${unit.name}`);
            return;
        }

        if (mode === 'basic') {
            // Use basic attack range
            this.showBasicAttackTargeting(unit, currentPosition);
            
            // Show skip button for basic attacks (need target selection)
            this.uiManager.showActionSkipButton(() => {
                this.exitActionPhase();
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.endTurn();
                }
            });
        } else if (mode === 'skill' && skill) {
            // Use skill targeting pattern
            this.showSkillTargeting(unit, currentPosition, skill);
            
            // Don't show skip button for self-centered skills - confirmation buttons are shown in showSkillTargeting
            // For skills that need target selection, skip button will be shown in the else branch of showSkillTargeting
        }
    }

    private showBasicAttackTargeting(unit: Unit, currentPosition: Position): void {
        // This is the original attack targeting logic
        const attackRange = unit.range || 1;
        console.log(`📍 Unit ${unit.name} current position: (${currentPosition.x}, ${currentPosition.y})`);
        console.log(`⚔️ Unit attack range: ${attackRange}`);
        
        // Calculate and show attack indicators (restore original functionality)
        const attackData = this.calculateValidAttackTargets(unit, currentPosition);
        this.actionManager.setAttackData(attackData);
        this.actionManager.createAttackIndicators();
        
        console.log('🎯 Basic attack targeting indicators created');
    }

    private calculateValidAttackTargets(unit: Unit, currentPosition: Position): any {
        const validTiles: Position[] = [];
        const paths = new Map<string, Position[]>();
        const attackRange = unit.range || 1;
        
        console.log(`⚔️ Calculating attack targets for ${unit.name} with attack range ${attackRange}`);
        
        // Calculate all tiles within attack range
        for (let dx = -attackRange; dx <= attackRange; dx++) {
            for (let dy = -attackRange; dy <= attackRange; dy++) {
                const distance = Math.abs(dx) + Math.abs(dy); // Manhattan distance
                
                if (distance > 0 && distance <= attackRange) {
                    const targetX = currentPosition.x + dx;
                    const targetY = currentPosition.y + dy;
                    
                    // Check if position is within map bounds
                    if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
                        validTiles.push({ x: targetX, y: targetY });
                        paths.set(`${targetX},${targetY}`, [currentPosition, { x: targetX, y: targetY }]);
                    }
                }
            }
        }
        
        console.log(`🎯 Found ${validTiles.length} valid attack tiles`);
        return { validTiles, paths };
    }

    private showSkillTargeting(unit: Unit, currentPosition: Position, skill: Skill): void {
        console.log(`✨ Showing skill targeting for ${skill.name}`);
        console.log(`🎯 Skill targeting type: ${skill.targetingType}`);
        
        // For Bandage skill, auto-execute immediately without targeting
        if (skill.id === 'bandage') {
            console.log(`🩹 Bandage skill - auto-executing on caster`);
            
            // Set the skill target to the caster's position and immediately execute
            this.actionManager.setSkillTarget(skill, currentPosition);
            this.confirmSkill(); // Auto-execute the skill
            return; // Exit early, no targeting needed
        }
        
        // For Blazing Knuckle and similar self-centered skills, show immediate preview
        if (skill.targetingType === 'non-rotational' && skill.id === 'blazing-knuckle') {
            console.log(`🔥 Self-centered skill - showing immediate preview around caster`);
            
            // Set the skill target to the caster's position
            this.actionManager.setSkillTarget(skill, currentPosition);
            this.actionManager.showSkillPreview(currentPosition.x, currentPosition.y);
            
            // Show immediate confirmation buttons
            this.uiManager.showSkillConfirmCancelButtons(
                skill.name,
                () => this.confirmSkill(),
                () => this.cancelSkill()
            );
        } else if (skill.targetingType === 'adjacent-attack') {
            console.log(`⚔️ Adjacent attack skill - showing attack-style targeting`);
            
            // For adjacent-attack skills like Hurricane Slash, show red attack indicators around unit
            const attackData = this.calculateAdjacentAttackTargets(unit, currentPosition);
            
            // Set up attack-style targeting in ActionManager (treating as skill mode)
            this.actionManager.setAttackMode('skill', skill);
            this.actionManager.setAttackData(attackData);
            this.actionManager.createAttackIndicators();
            
            console.log(`⚔️ Created ${attackData.validTiles.length} adjacent attack indicators for ${skill.name}`);
            
            // Show skip button for adjacent-attack skills
            this.uiManager.showActionSkipButton(() => {
                this.exitActionPhase();
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.endTurn();
                }
            });
        } else if (skill.targetingType === 'dual-rotational') {
            console.log(`🔄 Dual-rotational skill - allowing target selection with rotation`);
            
            // For dual-rotational skills, allow target selection within range
            const skillRange = 4; // Tera Fire has range of 4
            const validTargets = this.calculateSkillTargets(unit, currentPosition, skill, skillRange);
            
            // Set up skill targeting in ActionManager
            this.actionManager.setSkillTargeting(skill, validTargets);
            this.actionManager.createSkillTargetIndicators();
            
            console.log(`🎯 Created ${validTargets.length} skill target indicators for ${skill.name}`);
            
            // Show skip button for dual-rotational skills that need target selection
            this.uiManager.showActionSkipButton(() => {
                this.exitActionPhase();
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.endTurn();
                }
            });
        } else {
            // For other skills that need target selection
            const skillRange = unit.range || 1;
            const validTargets = this.calculateSkillTargets(unit, currentPosition, skill, skillRange);
            
            // Set up skill targeting in ActionManager
            this.actionManager.setSkillTargeting(skill, validTargets);
            this.actionManager.createSkillTargetIndicators();
            
            console.log(`🎯 Created ${validTargets.length} skill target indicators for ${skill.name}`);
            
            // Show skip button for skills that need target selection
            this.uiManager.showActionSkipButton(() => {
                this.exitActionPhase();
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.endTurn();
                }
            });
        }
    }

    private calculateSkillTargets(unit: Unit, currentPosition: Position, skill: Skill, range: number): Position[] {
        const validTargets: Position[] = [];
        
        // For most skills, allow targeting within unit's range
        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                const distance = Math.abs(dx) + Math.abs(dy); // Manhattan distance
                
                if (distance > 0 && distance <= range) {
                    const targetX = currentPosition.x + dx;
                    const targetY = currentPosition.y + dy;
                    
                    // Check if position is within map bounds
                    if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
                        // For skills like Blazing Knuckle, we want to ensure the skill pattern
                        // doesn't go out of bounds when centered on this position
                        if (this.isValidSkillCenter(targetX, targetY, skill)) {
                            validTargets.push({ x: targetX, y: targetY });
                        }
                    }
                }
            }
        }
        
        return validTargets;
    }

    private isValidSkillCenter(centerX: number, centerY: number, skill: Skill): boolean {
        // Get the skill pattern to check if all affected tiles are in bounds
        const pattern = skill.getTargetPattern(centerX, centerY);
        
        return pattern.every(target => 
            target.x >= 0 && target.x < 8 && target.y >= 0 && target.y < 8
        );
    }

    private calculateAdjacentAttackTargets(unit: Unit, currentPosition: Position): any {
        const validTiles: Position[] = [];
        const paths = new Map<string, Position[]>();
        
        console.log(`⚔️ Calculating adjacent attack targets for ${unit.name}`);
        
        // Calculate the 4 adjacent tiles (up, down, left, right)
        const adjacentOffsets = [
            { x: 0, y: -1 }, // North
            { x: 1, y: 0 },  // East
            { x: 0, y: 1 },  // South
            { x: -1, y: 0 }  // West
        ];
        
        for (const offset of adjacentOffsets) {
            const targetX = currentPosition.x + offset.x;
            const targetY = currentPosition.y + offset.y;
            
            // Check if position is within map bounds
            if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
                validTiles.push({ x: targetX, y: targetY });
                paths.set(`${targetX},${targetY}`, [currentPosition, { x: targetX, y: targetY }]);
            }
        }
        
        console.log(`⚔️ Found ${validTiles.length} adjacent attack tiles`);
        return { validTiles, paths };
    }

    public selectAttackTarget(x: number, y: number): boolean {
        const selectedUnit = this.selectionManager.getSelectedUnit();
        if (!selectedUnit) {
            console.warn('❌ No unit selected');
            return false;
        }

        const result = this.actionManager.selectAttackTarget(
            x, y,
            (x: number, y: number) => this.getUnitAtPosition(x, y),
            selectedUnit
        );

        if (result.success) {
            // Check if this is a skill or basic attack
            const mode = this.actionManager.getCurrentAttackMode();
            
            if (mode === 'skill') {
                // For skills, show confirmation immediately after selecting target position
                const skill = this.actionManager.getCurrentSkill();
                
                if (skill?.targetingType === 'dual-rotational') {
                    // Show skill preview at selected target
                    this.actionManager.showSkillPreview(x, y);
                    
                    // For dual-rotational skills, show confirm, rotate, and cancel buttons
                    this.uiManager.showDualRotationalSkillButtons(
                        skill.name,
                        () => this.confirmSkill(),
                        () => this.cancelSkill(),
                        () => this.rotateSkillTargets()
                    );
                } else if (skill?.targetingType === 'adjacent-attack') {
                    // Set skill target for adjacent-attack skills
                    this.actionManager.setSkillTarget(skill, { x, y });
                    
                    // For adjacent-attack skills, show skill confirmation (but they target like basic attacks)
                    this.uiManager.showSkillConfirmCancelButtons(
                        skill.name,
                        () => this.confirmSkill(),
                        () => this.cancelSkill()
                    );
                } else {
                    // For other skills, show normal confirmation
                    this.uiManager.showSkillConfirmCancelButtons(
                        skill?.name || 'Skill',
                        () => this.confirmSkill(),
                        () => this.cancelSkill()
                    );
                }
            } else if (result.targetUnit) {
                // For basic attacks, show normal confirmation
                this.uiManager.showAttackConfirmCancelButtons(
                    () => this.confirmAttack(),
                    () => this.cancelAttack()
                );
            }
        }

        return result.success;
    }

    public confirmAttack(): void {
        const selectedUnit = this.selectionManager.getSelectedUnit();
        if (!selectedUnit) {
            console.warn('❌ No unit selected for attack');
            return;
        }

        const result = this.actionManager.confirmAttack(selectedUnit);
        if (!result) {
            console.warn('❌ Attack confirmation failed');
            return;
        }

        const { damage, target } = result;

        console.log(`🔍 Debug - About to update unit bars:`);
        console.log(`  - selectedUnit:`, selectedUnit ? `${selectedUnit.name} (${selectedUnit.team})` : 'null');
        console.log(`  - target:`, target ? `${target.name} (${target.team})` : 'null');

        // Update visual elements for both attacker and target
        if (target) {
            this.unitRenderer.updateUnitBars(target);
        } else {
            console.warn('❌ target is null, skipping target health bar update');
        }
        
        if (selectedUnit) {
            this.unitRenderer.updateUnitBars(selectedUnit); // Update attacker's energy bar
        } else {
            console.warn('❌ selectedUnit is null, skipping attacker energy bar update');
        }
        
        // Show damage animation with flicker
        this.animationManager.showDamageAnimationWithFlicker(
            target,
            (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
            (unit: Unit) => this.unitRenderer.getUnitMesh(unit)
        );

        // Handle death
        if (target.currentHealth <= 0) {
            setTimeout(() => {
                this.animationManager.showDeathAnimation(
                    target,
                    (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
                    () => {
                        // Remove the unit from the game
                        console.log(`🗑️ Removing dead unit: ${target.name}`);
                        this.removeUnit(target);
                        
                        // Notify the turn manager about the unit death
                        if (GAME_TURN_MANAGER) {
                            const team = target.team === 'player' ? 'player' : 'enemy';
                            GAME_TURN_MANAGER.onUnitDeath(target.id, team);
                            console.log(`☠️ Notified turn manager of ${target.name} death (${team} team)`);
                        }

                        // Check for victory/defeat conditions after death
                        setTimeout(() => {
                            this.checkGameEndConditions();
                        }, 100);
                    }
                );
            }, 900);
        }

        this.exitActionPhase();
        if (GAME_TURN_MANAGER) {
            GAME_TURN_MANAGER.endTurn();
        }
    }

    public cancelAttack(): void {
        this.actionManager.cancelAttack();
        this.uiManager.showActionSkipButton(() => {
            this.exitActionPhase();
            if (GAME_TURN_MANAGER) {
                GAME_TURN_MANAGER.endTurn();
            }
        });
    }

    public confirmSkill(): void {
        const selectedUnit = this.selectionManager.getSelectedUnit();
        if (!selectedUnit) {
            console.warn('❌ No unit selected for skill');
            return;
        }

        // Get the current skill before confirmation (since it gets cleared after)
        const currentSkill = this.actionManager.getCurrentSkill();

        // Use ActionManager's confirmSkill method for proper dual-rotational handling
        const result = this.actionManager.confirmSkill(
            selectedUnit,
            (x: number, y: number) => this.getUnitAtPosition(x, y)
        );
        
        if (!result) {
            console.warn('❌ Skill confirmation failed');
            return;
        }

        const { affectedUnits } = result;
        
        // Update visual elements
        this.unitRenderer.updateUnitBars(selectedUnit); // Update caster's energy bar
        
        // Show damage animations for all affected units
        affectedUnits.forEach((unit) => {
            this.unitRenderer.updateUnitBars(unit);
            
            // Show skill effect animation (damage or healing)
            if (currentSkill) {
                // For now, assume a default damage amount since we don't have individual damage values
                const defaultDamage = selectedUnit.skillDamage + (currentSkill.bonusDamage || 0);
                const isHealing = false; // For now, assume all skills deal damage
                
                this.animationManager.showSkillEffectAnimation(
                    unit,
                    defaultDamage,
                    currentSkill.emoji,
                    (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
                    (unit: Unit) => this.unitRenderer.getUnitMesh(unit),
                    isHealing
                );
            } else {
                // Fallback to regular damage animation
                this.animationManager.showDamageAnimationWithFlicker(
                    unit,
                    (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
                    (unit: Unit) => this.unitRenderer.getUnitMesh(unit)
                );
            }
        });

        // Handle deaths
        const deadUnits = affectedUnits.filter((unit) => unit.currentHealth <= 0);
        if (deadUnits.length > 0) {
            let deathAnimationsCompleted = 0;
            deadUnits.forEach((targetUnit) => {
                setTimeout(() => {
                    this.animationManager.showDeathAnimation(
                        targetUnit,
                        (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
                        () => {
                            console.log(`🗑️ Removing dead unit: ${targetUnit.name}`);
                            this.removeUnit(targetUnit);
                            
                            if (GAME_TURN_MANAGER) {
                                const team = targetUnit.team === 'player' ? 'player' : 'enemy';
                                GAME_TURN_MANAGER.onUnitDeath(targetUnit.id, team);
                                console.log(`☠️ Notified turn manager of ${targetUnit.name} death (${team} team)`);
                            }

                            // Check for victory/defeat after all death animations complete
                            deathAnimationsCompleted++;
                            if (deathAnimationsCompleted === deadUnits.length) {
                                setTimeout(() => {
                                    this.checkGameEndConditions();
                                }, 100);
                            }
                        }
                    );
                }, 900);
            });
        }

        this.exitActionPhase();
        if (GAME_TURN_MANAGER) {
            GAME_TURN_MANAGER.endTurn();
        }
    }

    public cancelSkill(): void {
        console.log('❌ Cancelling skill selection');
        
        // Go back to action options
        const selectedUnit = this.selectionManager.getSelectedUnit();
        if (selectedUnit) {
            this.uiManager.showActionOptions(
                selectedUnit,
                () => this.initiateBasicAttack(),
                (skill: Skill) => this.initiateSkillAttack(skill),
                () => {
                    this.exitActionPhase();
                    if (GAME_TURN_MANAGER) {
                        GAME_TURN_MANAGER.endTurn();
                    }
                }
            );
        }
    }

    public rotateSkillTargets(): void {
        console.log(`🔄 Rotating skill targets`);
        this.actionManager.rotateSkillTargets();
    }
}