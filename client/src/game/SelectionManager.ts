import * as THREE from 'three';
import { Unit } from '../units/Unit';
import selectImageUrl from '../assets/Images/select.png';
import { SCENE_GLOBAL } from '../game';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';

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
    private selectionIndicators: Map<Unit, THREE.Mesh> = new Map();

    constructor() {
        this.loadSelectTexture();
    }

    private async loadSelectTexture(): Promise<void> {
        this.selectTexture = await this.textureLoader.loadAsync(selectImageUrl);
        this.selectTexture.magFilter = THREE.NearestFilter;
        this.selectTexture.minFilter = THREE.NearestFilter;
    }

    public updateUnitSelectionIndicators(getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined): void {
        console.log("🎯 Updating unit selection indicators");
        
        // Clear existing indicators
        this.clearSelectionIndicators();
        
        // Only show indicators if we have the turn manager and it's in SELECT phase
        if (!GAME_TURN_MANAGER || !GAME_TURN_MANAGER.canSelect()) {
            console.log("❌ Cannot show selection indicators - not in SELECT phase");
            return;
        }
        
        // Get selectable units
        const selectableUnits = GAME_TURN_MANAGER.getSelectableUnits();
        console.log(`📋 Found ${selectableUnits.length} selectable units`);
        
        // Create selection indicators for each selectable unit
        selectableUnits.forEach(unit => {
            const position = getUnitPosition(unit);
            if (position && this.selectTexture && SCENE_GLOBAL) {
                this.createSelectionIndicator(unit, position.x, position.y);
            }
        });
    }

    private createSelectionIndicator(unit: Unit, x: number, y: number): void {
        if (!this.selectTexture || !SCENE_GLOBAL) {
            console.warn("❌ Cannot create selection indicator - texture or scene not available");
            return;
        }

        const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
        const material = new THREE.MeshBasicMaterial({
            map: this.selectTexture,
            transparent: true,
            opacity: 0.8
        });

        const indicatorMesh = new THREE.Mesh(geometry, material);
        
        // Position the indicator at the unit's tile
        indicatorMesh.position.set(
            x * TILE_WIDTH + TILE_WIDTH / 2,
            -y * TILE_HEIGHT - TILE_HEIGHT / 2,
            0.5 // Slightly below units but above tiles
        );

        SCENE_GLOBAL.add(indicatorMesh);
        this.selectionIndicators.set(unit, indicatorMesh);
        
        console.log(`✅ Created selection indicator for ${unit.name} at (${x}, ${y})`);
    }

    private clearSelectionIndicators(): void {
        this.selectionIndicators.forEach((mesh, unit) => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
            }
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
                mesh.material.dispose();
            }
        });
        this.selectionIndicators.clear();
        console.log("🧹 Cleared all selection indicators");
    }

    public selectUnit(unit: Unit): boolean {
        // Verify the unit can actually be selected
        if (GAME_TURN_MANAGER && GAME_TURN_MANAGER.canSelect()) {
            const selectableUnits = GAME_TURN_MANAGER.getSelectableUnits();
            const isSelectable = selectableUnits.some(selectableUnit => selectableUnit.id === unit.id);
            
            if (isSelectable) {
                this.selectedUnit = unit;
                console.log(`✅ Selected unit: ${unit.name}`);
                return true;
            } else {
                console.log(`❌ Unit ${unit.name} is not selectable`);
                return false;
            }
        }
        
        console.log("❌ Cannot select unit - not in SELECT phase");
        return false;
    }

    public setSelectedUnit(unit: Unit): void {
        this.selectedUnit = unit;
        console.log(`🎯 Set selected unit: ${unit.name}`);
    }

    public getSelectedUnit(): Unit | null {
        return this.selectedUnit;
    }

    public cleanup(): void {
        this.clearSelectionIndicators();
    }
} 