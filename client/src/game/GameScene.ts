import { Globe } from '../globes/Globe';
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
import { GameStateManager } from './GameStateManager';
import { GamePhaseManager, setTileSizeForGamePhase } from './GamePhaseManager';
import { SkillTargetingService } from './SkillTargetingService';
import { setTileSizeForTileEffects } from './TileEffectRenderer';

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
    setTileSizeForGamePhase(width, height);
    setTileSizeForTileEffects(width, height);
}

export class GameScene {
    private unitRenderer: UnitRenderer = new UnitRenderer();
    private selectionManager: SelectionManager = new SelectionManager();
    private movementManager: MovementManager = new MovementManager();
    private actionManager: ActionManager = new ActionManager();
    private uiManager: UIManager = new UIManager();
    private animationManager: AnimationManager = new AnimationManager();
    private gameStateManager: GameStateManager = new GameStateManager();
    private gamePhaseManager: GamePhaseManager = new GamePhaseManager();
    private skillTargetingService: SkillTargetingService = new SkillTargetingService();

    constructor() {
        console.log('GameScene initialized');
        globalNavigationManager.setMapDimensions(8, 8);
    }

    public setAppContainer(container: HTMLElement): void {
        this.gameStateManager.setAppContainer(container);
    }

    private checkGameEndConditions(): void {
        this.gameStateManager.checkGameEndConditions(this.actionManager);
    }

    public async setSelectedGlobe(globe: Globe): Promise<void> {
        await this.gameStateManager.setSelectedGlobe(globe, this);
    }

    // ===== UNIT MANAGEMENT METHODS =====

    public async placeUnit(unit: Unit, x: number, y: number): Promise<void> {
        console.log(`🎯 GameScene.placeUnit called for ${unit.name} (${unit.className}, ${unit.team}) at (${x}, ${y})`);
        console.log(`📋 Unit details: ID=${unit.id}, Health=${unit.currentHealth}/${unit.health}, Energy=${unit.currentEnergy}/${unit.maxEnergy}`);
        await this.unitRenderer.placeUnit(unit, x, y);
        console.log(`✅ Unit placement completed for ${unit.name}`);
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
        this.gamePhaseManager.enterMovePhase(
            unit,
            this.selectionManager,
            this.movementManager,
            this.uiManager,
            this.unitRenderer
        );
    }

    public exitMovePhase(): void {
        this.gamePhaseManager.exitMovePhase(this.movementManager, this.uiManager);
    }

    public selectMoveTarget(x: number, y: number): boolean {
        return this.gamePhaseManager.selectMoveTarget(
            x,
            y,
            this.movementManager,
            this.selectionManager,
            this.unitRenderer,
            this.uiManager
        );
    }

    public async confirmMove(): Promise<void> {
        await this.gamePhaseManager.confirmMove(
            this.selectionManager,
            this.movementManager,
            this.unitRenderer,
            this.uiManager
        );
        
        // Phase manager handles both UI cleanup and phase transition
    }

    public cancelMove(): void {
        this.gamePhaseManager.cancelMove(this.movementManager, this.uiManager);
    }

    /**
     * Execute movement using the enhanced MovementManager with tile effects
     */
    public async executeMovement(unit: Unit, destination: Position, movementType: 'basic' | 'teleport'): Promise<void> {
        await this.movementManager.executeMovement(
            unit,
            destination,
            movementType,
            (unit: Unit, position: Position) => this.unitRenderer.moveUnitToPosition(unit, position),
            (unit: Unit) => this.unitRenderer.getUnitPosition(unit)
        );
        
        // Update unit bars after movement (in case tile effects changed health/energy)
        this.unitRenderer.updateUnitBars(unit);
    }

    // ===== ACTION PHASE METHODS =====

    public enterActionPhase(unit: Unit): void {
        this.gamePhaseManager.enterActionPhase(
            unit,
            this.selectionManager,
            this.actionManager,
            this.uiManager,
            this.unitRenderer
        );
    }

    public exitActionPhase(): void {
        this.gamePhaseManager.exitActionPhase(this.actionManager, this.uiManager);
    }

    public initiateBasicAttack(): void {
        const selectedUnit = this.selectionManager.getSelectedUnit();
        if (!selectedUnit) {
            console.warn('❌ No unit selected');
            return;
        }

        this.gamePhaseManager.initiateBasicAttack(
            selectedUnit,
            this.selectionManager,
            this.actionManager,
            this.uiManager,
            this.unitRenderer
        );
    }

    public initiateSkillAttack(skill: Skill): void {
        const selectedUnit = this.selectionManager.getSelectedUnit();
        if (!selectedUnit) {
            console.warn('❌ No unit selected');
            return;
        }

        this.gamePhaseManager.initiateSkillAttack(
            skill,
            selectedUnit,
            this.selectionManager,
            this.actionManager,
            this.uiManager,
            this.unitRenderer,
            this.movementManager,
            this.animationManager
        );
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
                // For skills, delegate to skill targeting service
                const skill = this.actionManager.getCurrentSkill();
                if (skill) {
                    this.skillTargetingService.handleSkillTargetSelection(
                        x,
                        y,
                        skill,
                        this.actionManager,
                        this.uiManager,
                        () => this.confirmSkill(),
                        () => this.cancelSkill(),
                        () => this.rotateSkillTargets()
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
            this.unitRenderer.updateUnitModifiers(target); // Update defender modifier indicators
        }
        
        if (selectedUnit) {
            this.unitRenderer.updateUnitBars(selectedUnit); // Update attacker's energy bar
            this.unitRenderer.updateUnitModifiers(selectedUnit); // Update attacker modifier indicators
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

    public async confirmSkill(): Promise<void> {
        const selectedUnit = this.selectionManager.getSelectedUnit();
        if (!selectedUnit) {
            console.warn('❌ No unit selected for skill');
            return;
        }

        // Get the current skill before confirmation (since it gets cleared after)
        const currentSkill = this.actionManager.getCurrentSkill();
        
        // Clear skill preview indicators to avoid double-vision with tile effects
        this.actionManager.exitActionPhase();
        this.actionManager.enterActionPhase(
            selectedUnit,
            (unit: Unit) => this.getUnitPosition(unit),
            () => this.unitRenderer.getUnitPositions()
        );
        
        // Special handling for teleport skill
        if (currentSkill?.id === 'teleport') {
            await this.handleTeleportSkill(selectedUnit, currentSkill);
            return;
        }

        // Use ActionManager's confirmSkill method for proper dual-rotational handling
        const result = this.actionManager.confirmSkill(
            selectedUnit,
            (x: number, y: number) => this.getUnitAtPosition(x, y),
            (unit: Unit) => this.unitRenderer.getUnitPosition(unit) || null
        );
        
        if (!result) {
            console.warn('❌ Skill confirmation failed');
            return;
        }

        const { affectedUnits } = result;
        
        // Update visual elements
        this.unitRenderer.updateUnitBars(selectedUnit); // Update caster's energy bar
        
        // Update modifier indicators for the caster (for self-buff skills like Prepare)
        this.unitRenderer.updateUnitModifiers(selectedUnit);
        
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

    private async handleTeleportSkill(unit: Unit, skill: Skill): Promise<void> {
        console.log(`⚡ Handling teleport skill for ${unit.name}`);
        
        // Get the selected teleport destination from ActionManager
        const selectedTarget = this.actionManager.getSelectedSkillTarget();
        if (!selectedTarget) {
            console.warn('❌ No teleport destination selected');
            return;
        }
        
        // Check energy cost
        if (unit.currentEnergy < skill.energyCost) {
            console.warn(`❌ Not enough energy for ${skill.name}. Required: ${skill.energyCost}, Current: ${unit.currentEnergy}`);
            return;
        }
        
        // Consume energy
        const oldEnergy = unit.currentEnergy;
        unit.currentEnergy = Math.max(0, unit.currentEnergy - skill.energyCost);
        console.log(`⚡ ${unit.name} energy: ${oldEnergy} → ${unit.currentEnergy}/${unit.maxEnergy}`);
        
        // Execute teleport movement
        await this.executeMovement(unit, selectedTarget, 'teleport');
        
        // Update visual elements
        this.unitRenderer.updateUnitBars(unit);
        
        console.log(`⚡ ${unit.name} teleported to (${selectedTarget.x}, ${selectedTarget.y})`);
        
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

    // ===== UTILITY METHODS FOR TILE EFFECTS =====

    public showDamageAnimation(unit: Unit, damage: number, emoji: string): void {
        this.animationManager.showDamageTextPopup(
            unit,
            damage,
            emoji,
            (unit: Unit) => this.getUnitPosition(unit)
        );
    }

    public updateUnitBars(unit: Unit): void {
        this.unitRenderer.updateUnitBars(unit);
    }

    public handleUnitDeath(unit: Unit): void {
        console.log(`💀 Handling death of ${unit.name}`);
        this.removeUnit(unit);
        
        // Notify the turn manager about the unit death
        if (GAME_TURN_MANAGER) {
            const team = unit.team === 'player' ? 'player' : 'enemy';
            GAME_TURN_MANAGER.onUnitDeath(unit.id, team);
            console.log(`☠️ Notified turn manager of ${unit.name} death (${team} team)`);
        }
        
        // Clean up action phase UI before checking victory conditions
        // This ensures no action buttons appear on the victory screen
        const currentPhase = GAME_TURN_MANAGER?.getGameState().currentPhase;
        if (currentPhase === 'ACTION') {
            console.log(`🧹 Cleaning up action phase UI before victory check`);
            this.exitActionPhase();
            if (GAME_TURN_MANAGER) {
                GAME_TURN_MANAGER.endTurn();
            }
        }
        
        // Small delay to ensure UI cleanup completes before victory screen
        setTimeout(() => {
            this.checkGameEndConditions();
        }, 50);
    }
}