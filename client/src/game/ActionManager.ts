import * as THREE from 'three';
import { Unit } from '../units/Unit';
import hoverSelectImageUrl from '../assets/Images/hoverselect.png';
import { Skill } from '../units/Skill';

export interface AttackData {
    name: string;
    damage: number;
    range: number;
    areaOfEffect: 'single' | 'line' | 'cone';
    appliesModifier?: string;
}

let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForAction(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class ActionManager {
    private textureLoader = new THREE.TextureLoader();
    private hoverSelectTexture: THREE.Texture | null = null;

    constructor() {
        this.loadHoverSelectTexture();
    }

    private async loadHoverSelectTexture(): Promise<void> {
        this.hoverSelectTexture = await this.textureLoader.loadAsync(hoverSelectImageUrl);
        this.hoverSelectTexture.magFilter = THREE.NearestFilter;
        this.hoverSelectTexture.minFilter = THREE.NearestFilter;
    }

    public enterActionPhase(unit: Unit, getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined, getUnitPositions: () => Map<Unit, { x: number; y: number }>): void {}
    public exitActionPhase(): void {}
    public setAttackMode(mode: 'basic' | 'skill', skill: Skill | null): void {}
    public setAttackData(attackData: AttackData): void {}
    public createAttackIndicators(): void {}
    public setSkillTarget(skill: Skill, currentPosition: { x: number, y: number }): void {}
    public showSkillPreview(x: number, y: number): void {}
    public setSkillTargeting(skill: Skill, validTargets: {x:number, y:number}[]): void {}
    public createSkillTargetIndicators(): void {}
    public selectAttackTarget(x: number, y: number, getUnitAtPosition: (x: number, y: number) => Unit | null, selectedUnit: Unit): { success: boolean; targetUnit: Unit | null } { return { success: false, targetUnit: null }; }
    public getCurrentAttackMode(): 'basic' | 'skill' { return 'basic'; }
    public getCurrentSkill(): Skill | null { return null; }
    public confirmAttack(selectedUnit: Unit): { success: boolean, damage: number, target: Unit } | null { return null; }
    public cancelAttack(): void {}
    public rotateSkillTargets(): void {}
    public confirmSkill(selectedUnit: Unit, getUnitAtPosition: (x: number, y: number) => Unit | null): { success: boolean; affectedUnits: Unit[]; skill: Skill; } | null { return null; }
} 