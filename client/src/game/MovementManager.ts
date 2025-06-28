import * as THREE from 'three';
import { Unit } from '../units/Unit';
import hoverSelectImageUrl from '../assets/Images/hoverselect.png';
import { Position } from './NavigationManager';

let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForMovement(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}
export class MovementManager {
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

    public enterMovePhase(unit: Unit, getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined, getUnitPositions: () => Map<Unit, { x: number; y: number }>): void {
        console.log('enterMovePhase');
    }

    public exitMovePhase(): void {
        console.log('exitMovePhase');
    }

    public selectMoveTarget(x: number, y: number): boolean {
        console.log('selectMoveTarget');
        return true;
    }

    public drawPathToTarget(getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined, selectedUnit: Unit): void {
        console.log('drawPathToTarget');
    }

    public getSelectedMoveTarget(): Position | null {
        console.log('getSelectedMoveTarget');
        return null;
    }

    public cancelMove(): void {
        console.log('cancelMove');
    }
} 