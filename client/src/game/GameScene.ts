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
import { setTileSizeForPassives, PassiveService } from './PassiveService';
import { globalUnitRegistry } from '../units/UnitRegistry';

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
    setTileSizeForPassives(width, height);
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
        
        // If this is a player unit, permanently remove it from the party
        if (unit.team === 'player') {
            const removed = globalUnitRegistry.removeUnitFromPlayerParty(unit.id);
            if (removed) {
                console.log(`💀 Permanently removed dead player unit ${unit.name} from party`);
            }
        }
    }

    public getUnitAtPosition(x: number, y: number): Unit | null {
        return this.unitRenderer.getUnitAtPosition(x, y);
    }

    public getAllUnits(): Unit[] {
        return this.unitRenderer.getAllUnits();
    }

    public clearAllUnits(): void {
        this.unitRenderer.clearAllUnits();
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
    public async executeMovement(unit: Unit, destination: Position, movementType: 'basic' | 'teleport' | 'leap'): Promise<void> {
        // Get the unit's starting position before movement
        const fromPosition = this.unitRenderer.getUnitPosition(unit);
        
        await this.movementManager.executeMovement(
            unit,
            destination,
            movementType,
            (unit: Unit, position: Position) => this.unitRenderer.moveUnitToPosition(unit, position),
            (unit: Unit) => this.unitRenderer.getUnitPosition(unit)
        );
        
        // Process movement-based passives after movement completes (only for basic movement, not teleport/leap)
        if (fromPosition && movementType === 'basic') {
            PassiveService.processMovementPassives(unit, fromPosition, destination);
        }
        
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
            this.unitRenderer,
            this.movementManager,
            this.animationManager
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
                        // Always route through handleUnitDeath so passives trigger
                        this.handleUnitDeath(target);
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

        // Get the current skill and target before any clearing (since they might get cleared)
        const currentSkill = this.actionManager.getCurrentSkill();
        const currentTarget = this.actionManager.getSelectedSkillTarget();
        
        if (!currentSkill) {
            console.warn('❌ No skill selected for confirmation');
            return;
        }
        
        // Clear only the visual indicators without clearing skill data
        this.actionManager.clearVisualIndicators();
        
        // Special handling for teleport skill
        if (currentSkill?.id === 'teleport') {
            await this.handleTeleportSkill(selectedUnit, currentSkill);
            return;
        }

        // Special handling for Lead The Charge skill
        if (currentSkill?.id === 'lead-the-charge') {
            await this.handleLeadTheChargeSkill(selectedUnit, currentSkill);
            return;
        }

        // Special handling for Bounce skill
        if (currentSkill?.id === 'bounce') {
            await this.handleBounceSkill(selectedUnit, currentSkill);
            return;
        }

        // Special handling for Spring Slash
        if (currentSkill?.id === 'spring-slash') {
            // If we're awaiting the second-phase target, execute the strike immediately
            try {
                if ((window as any).SPRING_SLASH_AWAITING_TARGET === true) {
                    (window as any).SPRING_SLASH_AWAITING_TARGET = false;
                    const sel = this.actionManager.getSelectedSkillTarget();
                    if (sel) {
                        const target = this.getUnitAtPosition(sel.x, sel.y);
                        if (target && target.team !== selectedUnit.team) {
                            await this.executeSpringSlashStrike(selectedUnit, target, currentSkill);
                            this.unitRenderer.updateUnitBars(selectedUnit);
                            this.exitActionPhase();
                            if (GAME_TURN_MANAGER) GAME_TURN_MANAGER.endTurn();
                            return;
                        }
                    }
                }
            } catch {}
            // Otherwise, run the first-phase leap handler
            await this.handleSpringSlashSkill(selectedUnit, currentSkill);
            return;
        }

        // Special handling for Teleport Slash
        if (currentSkill?.id === 'teleport-slash') {
            await this.handleTeleportSlashSkill(selectedUnit, currentSkill);
            return;
        }
        
        // Special handling for Backflip
        if (currentSkill?.id === 'backflip') {
            await this.handleBackflipSkill(selectedUnit, currentSkill);
            return;
        }
        // Special handling for Dizzy Slam
        if (currentSkill?.id === 'dizzy-slam') {
            await this.handleDizzySlamSkill(selectedUnit, currentSkill);
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

        const { affectedUnits, damageDealt } = result;

        // (Spring Slash second-phase handled earlier before generic flow)
        
        // Update visual elements
        this.unitRenderer.updateUnitBars(selectedUnit); // Update caster's energy bar
        
        // Update modifier indicators for the caster (for self-buff skills like Prepare)
        this.unitRenderer.updateUnitModifiers(selectedUnit);
        
        // Show damage animations for all affected units
        affectedUnits.forEach((unit) => {
            this.unitRenderer.updateUnitBars(unit);
            this.unitRenderer.updateUnitModifiers(unit); // Update modifier indicators for affected units
            
            // Show skill effect animation (damage, healing, or debuff)
            if (currentSkill) {
                const isHealing = currentSkill.id === 'universal-whisper' || currentSkill.id === 'healing-circle' || currentSkill.id === 'bandage' || currentSkill.id === 'finger-of-god' || currentSkill.id === 'star-song' || currentSkill.id === 'aethers-grace' || currentSkill.id === 'symphony';
                const isDebuff = currentSkill.id === 'exhaust' || currentSkill.id === 'prepare' || currentSkill.id === 'zero-in' || currentSkill.id === 'tracking-dart' || currentSkill.id === 'flashbang' || currentSkill.id === 'hunker-down' || currentSkill.id === 'jeer' || currentSkill.id === 'distraction' || currentSkill.id === 'back-off' || currentSkill.id === 'psyche-break' || currentSkill.id === 'hype-up' || currentSkill.id === 'steady-beat' || currentSkill.id === 'rescue' || currentSkill.id === 'get-sturdy' || currentSkill.id === 'taunt' || currentSkill.id === 'switcheroo' || currentSkill.id === 'flare-up' || (currentSkill.id === 'whirlwind' && unit.team === selectedUnit.team);
                const isInspiringSlash = currentSkill.id === 'inspiring-slash';
                
                // For Inspiring Slash, only the enemy target shows damage; allies show buff-only effect
                if (isInspiringSlash && unit.team === selectedUnit.team) {
                    this.animationManager.showDebuffEffectAnimation(
                        unit,
                        currentSkill.emoji,
                        (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
                        (unit: Unit) => this.unitRenderer.getUnitMesh(unit)
                    );
                } else if (isDebuff) {
                    // For debuff/buff skills, show emoji only without damage numbers
                    this.animationManager.showDebuffEffectAnimation(
                        unit,
                        currentSkill.emoji,
                        (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
                        (unit: Unit) => this.unitRenderer.getUnitMesh(unit)
                    );
                } else {
                    // For damage or healing skills - use actual final damage/healing amount
                    const actualAmount = damageDealt?.get(unit.id) || (selectedUnit.skillDamage + (currentSkill.bonusDamage || 0));
                    console.log(`🎬 Using actual ${isHealing ? 'healing' : 'damage'} amount for ${unit.name}: ${actualAmount}`);
                    
                    this.animationManager.showSkillEffectAnimation(
                        unit,
                        actualAmount,
                        currentSkill.emoji,
                        (unit: Unit) => this.unitRenderer.getUnitPosition(unit),
                        (unit: Unit) => this.unitRenderer.getUnitMesh(unit),
                        isHealing
                    );
                }
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
        const deadUnits = affectedUnits.filter(unit => unit.currentHealth <= 0);
        if (deadUnits.length > 0) {
            deadUnits.forEach(deadUnit => {
                setTimeout(() => {
                    console.log(`💀 Unit died from skill: ${deadUnit.name}`);
                    this.handleUnitDeath(deadUnit);
                }, 1000);
            });
        }

        // End turn
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

    private async handleTeleportSlashSkill(unit: Unit, skill: Skill): Promise<void> {
        console.log(`🌟 Handling Teleport Slash for ${unit.name}`);
        const destination = this.actionManager.getSelectedSkillTarget();
        if (!destination) {
            console.warn('❌ No destination selected for Teleport Slash');
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
        console.log(`🌟 ${unit.name} energy: ${oldEnergy} → ${unit.currentEnergy}/${unit.maxEnergy}`);
        // Execute teleport movement
        await this.executeMovement(unit, destination, 'teleport');
        // After landing, deal damage to all adjacent units (8-way), allies and enemies
        const casterPos = this.unitRenderer.getUnitPosition(unit);
        if (!casterPos) return;
        const offsets = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: 0 },                   { x: 1, y: 0 },
            { x: -1, y: 1 },  { x: 0, y: 1 },  { x: 1, y: 1 }
        ];
        const baseDamage = unit.skillDamage + (skill.bonusDamage || 0);
        const { ModifierService } = await import('./ModifierService');
        const affected: Unit[] = [];
        const damageMap = new Map<string, number>();
        for (const off of offsets) {
            const tx = casterPos.x + off.x;
            const ty = casterPos.y + off.y;
            if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8) continue;
            const target = this.getUnitAtPosition(tx, ty);
            if (!target || target.id === unit.id) continue;
            const attackResult = ModifierService.processSkillDamageModifiers(unit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(target, attackResult.finalDamage, unit);
            const finalDamage = defenseResult.finalDamage;
            const oldHp = target.currentHealth;
            target.currentHealth = Math.max(0, target.currentHealth - finalDamage);
            console.log(`🌟 Teleport Slash hits ${target.name} for ${finalDamage}: ${oldHp} → ${target.currentHealth}/${target.health}`);
            affected.push(target);
            damageMap.set(target.id, finalDamage);
            this.unitRenderer.updateUnitBars(target);
            this.unitRenderer.updateUnitModifiers(target);
            this.animationManager.showSkillEffectAnimation(
                target,
                finalDamage,
                '🌟',
                (u: Unit) => this.unitRenderer.getUnitPosition(u),
                (u: Unit) => this.unitRenderer.getUnitMesh(u),
                false
            );
            if (target.currentHealth <= 0) setTimeout(() => this.handleUnitDeath(target), 800);
        }
        // Update caster bars and finish
        this.unitRenderer.updateUnitBars(unit);
        this.exitActionPhase();
        if (GAME_TURN_MANAGER) GAME_TURN_MANAGER.endTurn();
    }

    private async handleBackflipSkill(unit: Unit, skill: Skill): Promise<void> {
        console.log(`🤸 Handling Backflip for ${unit.name}`);
        const destination = this.actionManager.getSelectedSkillTarget();
        if (!destination) {
            console.warn('❌ No destination selected for Backflip');
            return;
        }
        if (unit.currentEnergy < skill.energyCost) {
            console.warn(`❌ Not enough energy for ${skill.name}. Required: ${skill.energyCost}, Current: ${unit.currentEnergy}`);
            return;
        }
        const oldEnergy = unit.currentEnergy;
        unit.currentEnergy = Math.max(0, unit.currentEnergy - skill.energyCost);
        console.log(`🤸 ${unit.name} energy: ${oldEnergy} → ${unit.currentEnergy}/${unit.maxEnergy}`);
        await this.executeMovement(unit, destination, 'leap');
        this.unitRenderer.updateUnitBars(unit);
        this.exitActionPhase();
        if (GAME_TURN_MANAGER) GAME_TURN_MANAGER.endTurn();
    }

    private async handleDizzySlamSkill(unit: Unit, skill: Skill): Promise<void> {
        console.log(`💫 Handling Dizzy Slam for ${unit.name}`);
        const destination = this.actionManager.getSelectedSkillTarget();
        if (!destination) {
            console.warn('❌ No destination selected for Dizzy Slam');
            return;
        }
        if (unit.currentEnergy < skill.energyCost) {
            console.warn(`❌ Not enough energy for ${skill.name}. Required: ${skill.energyCost}, Current: ${unit.currentEnergy}`);
            return;
        }
        // Consume energy
        const oldEnergy = unit.currentEnergy;
        unit.currentEnergy = Math.max(0, unit.currentEnergy - skill.energyCost);
        console.log(`💫 ${unit.name} energy: ${oldEnergy} → ${unit.currentEnergy}/${unit.maxEnergy}`);

        // Execute leap 3
        await this.executeMovement(unit, destination, 'leap');

        // After landing, damage and apply Confusion to adjacent enemies (8-way)
        const casterPos = this.unitRenderer.getUnitPosition(unit);
        if (!casterPos) return;
        const offsets = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: 0 },                    { x: 1, y: 0 },
            { x: -1, y: 1 },  { x: 0, y: 1 },  { x: 1, y: 1 }
        ];
        const baseDamage = unit.skillDamage + (skill.bonusDamage || 0);
        const { ModifierService } = await import('./ModifierService');
        for (const off of offsets) {
            const tx = casterPos.x + off.x;
            const ty = casterPos.y + off.y;
            if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8) continue;
            const target = this.getUnitAtPosition(tx, ty);
            if (!target || target.team === unit.team) continue; // enemies only

            const attackResult = ModifierService.processSkillDamageModifiers(unit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(target, attackResult.finalDamage, unit);
            const finalDamage = defenseResult.finalDamage;
            const oldHp = target.currentHealth;
            target.currentHealth = Math.max(0, target.currentHealth - finalDamage);
            console.log(`💫 Dizzy Slam hits ${target.name} for ${finalDamage}: ${oldHp} → ${target.currentHealth}/${target.health}`);

            // Apply 2 Confusion stacks
            ModifierService.applyModifier(target, 'CONFUSION', 2, unit.id);

            // Update visuals
            this.unitRenderer.updateUnitBars(target);
            this.unitRenderer.updateUnitModifiers(target);
            this.animationManager.showSkillEffectAnimation(
                target,
                finalDamage,
                '💫',
                (u: Unit) => this.unitRenderer.getUnitPosition(u),
                (u: Unit) => this.unitRenderer.getUnitMesh(u),
                false
            );
            if (target.currentHealth <= 0) setTimeout(() => this.handleUnitDeath(target), 800);
        }

        // Update caster bars and finish
        this.unitRenderer.updateUnitBars(unit);
        this.exitActionPhase();
        if (GAME_TURN_MANAGER) GAME_TURN_MANAGER.endTurn();
    }

    private async handleLeadTheChargeSkill(unit: Unit, skill: Skill): Promise<void> {
        console.log(`🏃 Handling Lead The Charge skill for ${unit.name}`);
        
        // Get the selected leap destination from ActionManager
        const selectedTarget = this.actionManager.getSelectedSkillTarget();
        if (!selectedTarget) {
            console.warn('❌ No leap destination selected');
            return;
        }
        
        // Check energy cost
        if (unit.currentEnergy < skill.energyCost) {
            console.warn(`❌ Not enough energy for ${skill.name}. Required: ${skill.energyCost}, Current: ${unit.currentEnergy}`);
            return;
        }
        
        // First, execute the skill to apply buffs to adjacent allies
        const skillResult = this.actionManager.confirmSkill(
            unit,
            (x: number, y: number) => this.unitRenderer.getUnitAtPosition(x, y),
            (unit: Unit) => this.unitRenderer.getUnitPosition(unit) || null
        );
        
        if (!skillResult || !skillResult.success) {
            console.warn(`❌ Lead The Charge skill execution failed`);
            return;
        }
        
        // Consume energy
        const oldEnergy = unit.currentEnergy;
        unit.currentEnergy = Math.max(0, unit.currentEnergy - skill.energyCost);
        console.log(`🏃 ${unit.name} energy: ${oldEnergy} → ${unit.currentEnergy}/${unit.maxEnergy}`);
        
        // Execute leap movement
        await this.executeMovement(unit, selectedTarget, 'leap');
        
        // Update visual elements
        this.unitRenderer.updateUnitBars(unit);
        
        console.log(`🏃 ${unit.name} completed Lead The Charge and leaped to (${selectedTarget.x}, ${selectedTarget.y})`);
        
        this.exitActionPhase();
        if (GAME_TURN_MANAGER) {
            GAME_TURN_MANAGER.endTurn();
        }
    }

    private async handleSpringSlashSkill(unit: Unit, skill: Skill): Promise<void> {
        console.log(`🌸 Handling Spring Slash for ${unit.name}`);
        const leapDestination = this.actionManager.getSelectedSkillTarget();
        if (!leapDestination) {
            console.warn('❌ No leap destination selected for Spring Slash');
            return;
        }
        if (unit.currentEnergy < skill.energyCost) {
            console.warn(`❌ Not enough energy for ${skill.name}. Required: ${skill.energyCost}, Current: ${unit.currentEnergy}`);
            return;
        }
        // Consume energy up front
        const oldEnergy = unit.currentEnergy;
        unit.currentEnergy = Math.max(0, unit.currentEnergy - skill.energyCost);
        console.log(`🌸 ${unit.name} energy: ${oldEnergy} → ${unit.currentEnergy}/${unit.maxEnergy}`);

        // Execute leap 2
        await this.executeMovement(unit, leapDestination, 'leap');

        // After landing, allow targeting of an enemy exactly 3 tiles away in a cardinal direction
        const casterPos = this.unitRenderer.getUnitPosition(unit);
        if (!casterPos) {
            console.warn('❌ Could not determine position after Spring Slash leap');
            return;
        }

        // Compute valid cardinal tiles at distance 3
        const candidates = [
            { x: casterPos.x, y: casterPos.y - 3 },
            { x: casterPos.x + 3, y: casterPos.y },
            { x: casterPos.x, y: casterPos.y + 3 },
            { x: casterPos.x - 3, y: casterPos.y }
        ].filter(p => p.x >= 0 && p.x < 8 && p.y >= 0 && p.y < 8);

        // Filter to tiles occupied by enemies
        const validEnemyTargets = candidates.filter(p => {
            const u = this.getUnitAtPosition(p.x, p.y);
            return !!u && u.team !== unit.team;
        });

        // Important: clear any previous skill validTargets from phase 1 so selection uses attackData tiles
        this.actionManager.setSkillTargeting(skill, []);

        // If none, still show the four candidate tiles and provide a Skip button to proceed
        if (validEnemyTargets.length === 0) {
            console.log('🌸 No valid enemy exactly 3 tiles away after leap — showing candidate tiles and Skip');
            const attackData = { validTiles: candidates, paths: new Map() } as any;
            this.actionManager.setAttackMode('skill', skill);
            this.actionManager.setAttackData(attackData);
            this.actionManager.createAttackIndicators();

            try { (window as any).SPRING_SLASH_AWAITING_TARGET = true; } catch {}

            // Allow the player to skip to end the action
            this.uiManager.showActionSkipButton(() => {
                this.unitRenderer.updateUnitBars(unit);
                this.exitActionPhase();
                if (GAME_TURN_MANAGER) GAME_TURN_MANAGER.endTurn();
            });
            return;
        }

        // Show attack indicators and use attack flow (even if only one target)
        const attackData = { validTiles: validEnemyTargets, paths: new Map() } as any;
        this.actionManager.setAttackMode('skill', skill);
        this.actionManager.setAttackData(attackData);
        this.actionManager.createAttackIndicators();

        // Override selection handler temporarily by waiting for player selection through normal flow
        // When the player clicks, confirmSkill will be called again; detect spring-slash second phase
        try { (window as any).SPRING_SLASH_AWAITING_TARGET = true; } catch {}
    }

    private async executeSpringSlashStrike(unit: Unit, target: Unit, skill: Skill): Promise<void> {
        const baseDamage = unit.skillDamage + (skill.bonusDamage || 0);
        const { ModifierService } = await import('./ModifierService');
        const attackResult = ModifierService.processSkillDamageModifiers(unit, baseDamage);
        const defenseResult = ModifierService.processSkillDamageDefenseModifiers(target, attackResult.finalDamage, unit);
        const finalDamage = defenseResult.finalDamage;
        const oldHp = target.currentHealth;
        target.currentHealth = Math.max(0, target.currentHealth - finalDamage);
        console.log(`🌸 Spring Slash hits ${target.name} for ${finalDamage}: ${oldHp} → ${target.currentHealth}/${target.health}`);
        this.unitRenderer.updateUnitBars(target);
        this.unitRenderer.updateUnitModifiers(target);
        this.animationManager.showSkillEffectAnimation(
            target,
            finalDamage,
            '🌸',
            (u: Unit) => this.unitRenderer.getUnitPosition(u),
            (u: Unit) => this.unitRenderer.getUnitMesh(u),
            false
        );
        if (target.currentHealth <= 0) {
            setTimeout(() => this.handleUnitDeath(target), 800);
        }
    }

    private async handleBounceSkill(unit: Unit, skill: Skill): Promise<void> {
        console.log(`🦘 Handling Bounce skill for ${unit.name}`);
        // If we're in the second phase, immediately execute the second leap without confirm/cancel UI
        try {
            const isSecondPhase = (window as any).BOUNCE_SECOND_PHASE === true;
            if (isSecondPhase) {
                const second = this.actionManager.getSelectedSkillTarget();
                if (!second) {
                    console.warn('❌ No second leap destination selected');
                    return;
                }
                // Clear second-phase flag and execute second leap
                (window as any).BOUNCE_SECOND_PHASE = false;
                // Ensure any lingering action buttons are removed
                this.uiManager.hideActionButtons();
                await this.executeMovement(unit, second, 'leap');
                this.unitRenderer.updateUnitBars(unit);
                this.exitActionPhase();
                if (GAME_TURN_MANAGER) GAME_TURN_MANAGER.endTurn();
                return;
            }
        } catch {}
        
        // Get the selected first leap destination
        const firstDestination = this.actionManager.getSelectedSkillTarget();
        if (!firstDestination) {
            console.warn('❌ No first leap destination selected for Bounce');
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
        console.log(`🦘 ${unit.name} energy: ${oldEnergy} → ${unit.currentEnergy}/${unit.maxEnergy}`);
        
        // Execute first leap movement (range 2, cardinal)
        await this.executeMovement(unit, firstDestination, 'leap');
        
        // After landing, deal Skill Damage to all adjacent (8-way) enemy units
        const casterPos = this.unitRenderer.getUnitPosition(unit);
        if (!casterPos) {
            console.warn('❌ Could not determine unit position after first leap for Bounce');
            return;
        }
        
        const adjacentOffsets = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: 0 },                   { x: 1, y: 0 },
            { x: -1, y: 1 },  { x: 0, y: 1 },  { x: 1, y: 1 }
        ];
        
        const affected: Unit[] = [];
        const damageMap = new Map<string, number>();
        const baseDamage = unit.skillDamage + (skill.bonusDamage || 0);
        
        for (const offset of adjacentOffsets) {
            const tx = casterPos.x + offset.x;
            const ty = casterPos.y + offset.y;
            if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8) continue;
            const target = this.getUnitAtPosition(tx, ty);
            if (!target || target.team === unit.team) continue;
            
            // Run through modifier pipeline just like other skills
            const attackModule = await import('./ModifierService');
            const { ModifierService } = attackModule as any;
            const attackResult = ModifierService.processSkillDamageModifiers(unit, baseDamage);
            const defenseResult = ModifierService.processSkillDamageDefenseModifiers(target, attackResult.finalDamage, unit);
            const finalDamage = defenseResult.finalDamage;
            const oldHp = target.currentHealth;
            target.currentHealth = Math.max(0, target.currentHealth - finalDamage);
            console.log(`🦘 Bounce AoE hits ${target.name} for ${finalDamage}: ${oldHp} → ${target.currentHealth}/${target.health}`);
            affected.push(target);
            damageMap.set(target.id, finalDamage);
            
            // Update visuals per target
            this.unitRenderer.updateUnitBars(target);
            this.unitRenderer.updateUnitModifiers(target);
            this.animationManager.showSkillEffectAnimation(
                target,
                finalDamage,
                '🏀',
                (u: Unit) => this.unitRenderer.getUnitPosition(u),
                (u: Unit) => this.unitRenderer.getUnitMesh(u),
                false
            );
            
            if (target.currentHealth <= 0) {
                setTimeout(() => this.handleUnitDeath(target), 800);
            }
        }
        
        // Try second leap: show immediate cardinal range-2 options relative to new position
        // Auto-select any valid landing if only one; otherwise, prompt the player
        const currentPos = this.unitRenderer.getUnitPosition(unit);
        if (!currentPos) {
            console.warn('❌ Could not determine position for second leap');
            this.exitActionPhase();
            if (GAME_TURN_MANAGER) GAME_TURN_MANAGER.endTurn();
            return;
        }
        
        // Build occupied tiles map
        const occupiedTiles = new Map<string, Unit>();
        this.unitRenderer.getUnitPositions().forEach((pos: Position, other: Unit) => {
            if (other.id !== unit.id) {
                occupiedTiles.set(`${pos.x},${pos.y}`, other);
            }
        });
        
        // Compute valid leap-2 cardinal destinations from current
        const navModule = await import('./NavigationManager');
        const { globalNavigationManager } = navModule as any;
        const unitPositions = new Map<Unit, Position>();
        occupiedTiles.forEach((u, key) => {
            const [x, y] = key.split(',').map(Number);
            unitPositions.set(u, { x, y });
        });
        globalNavigationManager.updateOccupiedTiles(unitPositions);
        const allLeap2 = globalNavigationManager.calculateValidLeapDestinations(unit, currentPos, 2);
        const cardinalLeap2 = allLeap2.filter((dest: Position) => {
            const dx = Math.abs(dest.x - currentPos.x);
            const dy = Math.abs(dest.y - currentPos.y);
            return (dx > 0 && dy === 0) || (dx === 0 && dy > 0);
        });
        
        // If none available, finish
        if (cardinalLeap2.length === 0) {
            console.log('🦘 No valid second leap destinations for Bounce');
            this.exitActionPhase();
            if (GAME_TURN_MANAGER) GAME_TURN_MANAGER.endTurn();
            return;
        }
        
        // Before second-phase selection, remove any lingering action buttons from first phase
        this.uiManager.hideActionButtons();

        // If exactly one, auto-execute; otherwise, show indicators and let player click
        if (cardinalLeap2.length === 1) {
            try { (window as any).BOUNCE_SECOND_PHASE = false; } catch {}
            await this.executeMovement(unit, cardinalLeap2[0], 'leap');
            console.log(`🦘 Bounce auto second leap to (${cardinalLeap2[0].x}, ${cardinalLeap2[0].y})`);
            this.unitRenderer.updateUnitBars(unit);
            this.exitActionPhase();
            if (GAME_TURN_MANAGER) GAME_TURN_MANAGER.endTurn();
        } else {
            // Reuse ActionManager to display selectable destinations
            this.actionManager.setSkillTargeting(skill, cardinalLeap2);
            this.actionManager.createSkillTargetIndicators();
            
            // Mark that we're in Bounce's second phase; selection will auto-confirm
            try { (window as any).BOUNCE_SECOND_PHASE = true; } catch {}
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
        
        // Process unit death passives before removing the unit
        try {
            PassiveService.processUnitDeathPassives(unit);
        } catch (e) {
            console.warn('⚠️ Error in processUnitDeathPassives:', e);
        }
        
        // If a passive requested to prevent removal (e.g., Rabbit Riding), skip removal
        const removed = !PassiveService.consumePreventRemoval(unit.id);
        if (removed) {
            this.removeUnit(unit);
        } else {
            console.log(`🐇 Preventing removal of ${unit.name} due to death passive`);
        }
        
        // Always notify the turn manager about the unit death event so round tracking updates
        if (GAME_TURN_MANAGER) {
            const team = unit.team === 'player' ? 'player' : 'enemy';
            GAME_TURN_MANAGER.onUnitDeath(unit.id, team);
            console.log(`☠️ Notified turn manager of ${unit.name} death (${team} team)`);

            // If we prevented removal (Rabbit form), clear unit used flag so it becomes selectable
            if (!removed) {
                try {
                    // Properly call through public API by checking team enum used in RoundManager
                    GAME_TURN_MANAGER['roundManager'].clearUnitUsed(unit.id, team);
                } catch {}
            }

            // Recalculate limits since selectability may change
            GAME_TURN_MANAGER.recalculateActionableUnitLimit();
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

        // If we're in SELECT phase and the unit stayed due to a death passive (e.g., Rabbit Riding),
        // refresh selection indicators so newly spawned/transformed units become selectable immediately.
        try {
            const inSelectPhase = GAME_TURN_MANAGER?.canSelect && GAME_TURN_MANAGER.canSelect();
            if (inSelectPhase) {
                // Allow a short delay to let PassiveService re-place the unit with the new sprite
                setTimeout(() => {
                    this.updateUnitSelectionIndicators();
                }, 200);
            }
        } catch {}
    }
}