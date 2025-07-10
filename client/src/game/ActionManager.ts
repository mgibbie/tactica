import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';
import { UnitTracker } from './UnitTracker';
import { ActionState, AttackData } from './ActionState';
import { IndicatorManager, setTileSizeForIndicators } from './IndicatorManager';
import { AttackHandler, AttackResult } from './AttackHandler';
import { SkillHandler, SkillResult } from './SkillHandler';

let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForAction(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
    setTileSizeForIndicators(width, height);
}

export class ActionManager {
    private actionState: ActionState;
    private indicatorManager: IndicatorManager;
    private attackHandler: AttackHandler;
    private skillHandler: SkillHandler;

    constructor() {
        this.actionState = new ActionState();
        this.indicatorManager = new IndicatorManager();
        this.attackHandler = new AttackHandler(this.actionState);
        this.skillHandler = new SkillHandler(this.actionState);
    }

    public enterActionPhase(unit: Unit, getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined, getUnitPositions: () => Map<Unit, { x: number; y: number }>): void {
        console.log(`⚔️ Entering ACTION phase for ${unit.name}`);
        
        // Clear all state and indicators
        this.indicatorManager.clearAllIndicators();
        this.actionState.reset();
    }

    public exitActionPhase(): void {
        console.log('🚪 Exiting ACTION phase');
        this.indicatorManager.clearAllIndicators();
        this.actionState.reset();
    }

    public setAttackMode(mode: 'basic' | 'skill', skill: Skill | null): void {
        this.actionState.setAttackMode(mode);
        this.actionState.setCurrentSkill(skill);
        console.log(`🎯 Attack mode set to: ${mode}${skill ? ` (${skill.name})` : ''}`);
    }

    public setAttackData(attackData: AttackData): void {
        this.actionState.setCurrentAttackData(attackData);
        console.log(`📋 Attack data set with ${attackData.validTiles.length} valid targets`);
    }

    public createAttackIndicators(): void {
        const attackData = this.actionState.getCurrentAttackData();
        if (attackData) {
            this.indicatorManager.createAttackIndicators(attackData);
        }
    }

    public setSkillTarget(skill: Skill, targetPosition: { x: number, y: number }): void {
        this.skillHandler.setSkillTarget(skill, targetPosition);
    }

    public showSkillPreview(x: number, y: number): void {
        const currentSkill = this.actionState.getCurrentSkill();
        const rotation = this.actionState.getSkillRotation();
        
        if (currentSkill) {
            this.indicatorManager.showSkillPreview(currentSkill, x, y, rotation);
        }
    }

    public setSkillTargeting(skill: Skill, validTargets: {x:number, y:number}[]): void {
        this.skillHandler.setSkillTargeting(skill, validTargets);
    }

    public createSkillTargetIndicators(): void {
        const validTargets = this.actionState.getValidSkillTargets();
        this.indicatorManager.createSkillTargetIndicators(validTargets);
    }

    public selectAttackTarget(x: number, y: number, getUnitAtPosition: (x: number, y: number) => Unit | null, selectedUnit: Unit): { success: boolean; targetUnit: Unit | null } {
        const attackMode = this.actionState.getAttackMode();
        
        if (attackMode === 'basic') {
            return this.attackHandler.selectTarget(x, y, getUnitAtPosition, selectedUnit);
        } else {
            return this.skillHandler.selectTarget(x, y, getUnitAtPosition, selectedUnit);
        }
    }

    public getCurrentAttackMode(): 'basic' | 'skill' {
        return this.actionState.getAttackMode();
    }

    public getCurrentSkill(): Skill | null {
        return this.actionState.getCurrentSkill();
    }
    
    public getSelectedSkillTarget(): { x: number; y: number } | null {
        return this.actionState.getSelectedSkillTarget();
    }

    public confirmAttack(selectedUnit: Unit): AttackResult | null {
        const attackMode = this.actionState.getAttackMode();
        
        if (attackMode === 'basic') {
            return this.attackHandler.confirmAttack(selectedUnit);
        }
        
        console.warn("❌ Skill attacks should use confirmSkill() method");
        return null;
    }

    public cancelAttack(): void {
        this.attackHandler.cancelAttack();
    }

    public rotateSkillTargets(): void {
        this.skillHandler.rotateSkillTargets();
        
        // Update the skill preview with new rotation
        const selectedTarget = this.actionState.getSelectedSkillTarget();
        if (selectedTarget) {
            this.showSkillPreview(selectedTarget.x, selectedTarget.y);
        }
    }

    public checkGameEndConditions(): 'victory' | 'defeat' | 'continue' {
        return UnitTracker.checkGameEndConditions();
    }

    public confirmSkill(selectedUnit: Unit, getUnitAtPosition: (x: number, y: number) => Unit | null): SkillResult | null {
        return this.skillHandler.confirmSkill(selectedUnit, getUnitAtPosition);
    }
} 