import * as THREE from 'three';
import { Unit } from '../units/Unit';
import selectImageUrl from '../assets/Images/select.png';
import { SCENE_GLOBAL } from '../game';

let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForSelection(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class SelectionManager {
    private selectedUnit: Unit | null = null;
    private textureLoader = new THREE.TextureLoader();
    private selectTexture: THREE.Texture | null = null;

    constructor() {
        this.loadSelectTexture();
    }

    private async loadSelectTexture(): Promise<void> {
        this.selectTexture = await this.textureLoader.loadAsync(selectImageUrl);
        this.selectTexture.magFilter = THREE.NearestFilter;
        this.selectTexture.minFilter = THREE.NearestFilter;
    }

    public updateUnitSelectionIndicators(getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined): void {
        // TODO: Implement logic from TurnManagerUI and other places
        console.log("updateUnitSelectionIndicators called");
    }

    public selectUnit(unit: Unit): boolean {
        // TODO: Implement selection logic
        this.selectedUnit = unit;
        console.log(`Selected unit: ${unit.name}`);
        return true;
    }

    public getSelectedUnit(): Unit | null {
        return this.selectedUnit;
    }
} 