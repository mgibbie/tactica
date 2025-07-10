import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';

export interface AttackData {
    validTiles: { x: number; y: number }[];
    paths: Map<string, { x: number; y: number }[]>;
}

export type AttackMode = 'basic' | 'skill';

export class ActionState {
    private selectedAttackTarget: { x: number; y: number } | null = null;
    private currentAttackData: AttackData | null = null;
    private validSkillTargets: { x: number; y: number }[] = [];
    private selectedSkillTarget: { x: number; y: number } | null = null;
    private skillRotation: number = 0;
    private attackMode: AttackMode = 'basic';
    private currentSkill: Skill | null = null;
    private targetUnit: Unit | null = null;

    public reset(): void {
        this.selectedAttackTarget = null;
        this.currentAttackData = null;
        this.validSkillTargets = [];
        this.selectedSkillTarget = null;
        this.skillRotation = 0;
        this.attackMode = 'basic';
        this.currentSkill = null;
        this.targetUnit = null;
    }

    // Attack target methods
    public setSelectedAttackTarget(target: { x: number; y: number } | null): void {
        this.selectedAttackTarget = target;
    }

    public getSelectedAttackTarget(): { x: number; y: number } | null {
        return this.selectedAttackTarget;
    }

    // Attack data methods
    public setCurrentAttackData(data: AttackData | null): void {
        this.currentAttackData = data;
    }

    public getCurrentAttackData(): AttackData | null {
        return this.currentAttackData;
    }

    // Skill target methods
    public setValidSkillTargets(targets: { x: number; y: number }[]): void {
        this.validSkillTargets = targets;
    }

    public getValidSkillTargets(): { x: number; y: number }[] {
        return this.validSkillTargets;
    }

    public setSelectedSkillTarget(target: { x: number; y: number } | null): void {
        this.selectedSkillTarget = target;
    }

    public getSelectedSkillTarget(): { x: number; y: number } | null {
        return this.selectedSkillTarget;
    }

    // Skill rotation methods
    public setSkillRotation(rotation: number): void {
        this.skillRotation = rotation;
    }

    public getSkillRotation(): number {
        return this.skillRotation;
    }

    public rotateSkill(): number {
        this.skillRotation = (this.skillRotation + 1) % 4;
        return this.skillRotation;
    }

    // Attack mode methods
    public setAttackMode(mode: AttackMode): void {
        this.attackMode = mode;
    }

    public getAttackMode(): AttackMode {
        return this.attackMode;
    }

    // Current skill methods
    public setCurrentSkill(skill: Skill | null): void {
        this.currentSkill = skill;
    }

    public getCurrentSkill(): Skill | null {
        return this.currentSkill;
    }

    // Target unit methods
    public setTargetUnit(unit: Unit | null): void {
        this.targetUnit = unit;
    }

    public getTargetUnit(): Unit | null {
        return this.targetUnit;
    }
} 