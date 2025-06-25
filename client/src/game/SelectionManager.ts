import { Unit } from '../units/Unit';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import * as THREE from 'three';
import { SCENE_GLOBAL } from '../game';

// Tile size - will be set by GameScene
let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForSelection(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class SelectionManager {
    private selectionIndicators: Map<Unit, THREE.Mesh> = new Map();
    private textureLoader = new THREE.TextureLoader();
    private selectTexture: THREE.Texture | null = null;
    private selectedUnit: Unit | null = null;

    constructor() {
        this.loadSelectTexture();
    }

    private async loadSelectTexture(): Promise<void> {
        try {
            const selectImageUrl = '../assets/Images/select.png';
            console.log('🎨 Loading select texture from:', selectImageUrl);
            this.selectTexture = await this.textureLoader.loadAsync(selectImageUrl);
            this.selectTexture.magFilter = THREE.NearestFilter;
            this.selectTexture.minFilter = THREE.NearestFilter;
            this.selectTexture.flipY = true;
            this.selectTexture.generateMipmaps = false;
            this.selectTexture.wrapS = THREE.ClampToEdgeWrapping;
            this.selectTexture.wrapT = THREE.ClampToEdgeWrapping;
            console.log('✅ Select texture loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load select texture:', error);
            console.log('🔄 Will use fallback colored indicator');
        }
    }

    public updateUnitSelectionIndicators(getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined): void {
        console.log('🔍 updateUnitSelectionIndicators called');
        
        if (!GAME_TURN_MANAGER) {
            console.warn('❌ Turn manager not available');
            return;
        }

        if (!GAME_TURN_MANAGER.isGameStarted()) {
            console.warn('❌ Game not started yet');
            return;
        }

        console.log('✅ Turn manager available and game started');
        console.log(`Current phase: ${GAME_TURN_MANAGER.getCurrentPhase()}`);
        console.log(`Can select: ${GAME_TURN_MANAGER.canSelect()}`);
        console.log(`Current player: ${GAME_TURN_MANAGER.getCurrentPlayer()}`);

        // Clear all existing indicators
        this.clearAllSelectionIndicators();

        // Only show indicators if we're in the SELECT phase
        if (!GAME_TURN_MANAGER.canSelect()) {
            console.log('❌ Not in SELECT phase, hiding all indicators');
            return;
        }

        console.log('✅ In SELECT phase, proceeding with indicator creation');

        // Get selectable units for the current player
        const selectableUnits = GAME_TURN_MANAGER.getSelectableUnits();
        console.log(` Found ${selectableUnits.length} selectable units for current player`);
        
        if (selectableUnits.length === 0) {
            console.warn('❌ No selectable units found');
            return;
        }

        // Add indicators for selectable units
        let indicatorsCreated = 0;
        selectableUnits.forEach(unit => {
            const indicator = this.createSelectionIndicator(unit, getUnitPosition);
            if (indicator) {
                this.selectionIndicators.set(unit, indicator);
                indicatorsCreated++;
                console.log(`✅ Created indicator for ${unit.name}`);
            } else {
                console.warn(`❌ Failed to create indicator for ${unit.name}`);
            }
        });

        console.log(`🎯 Successfully added ${indicatorsCreated}/${selectableUnits.length} selection indicators`);
    }

    private createSelectionIndicator(unit: Unit, getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined): THREE.Mesh | null {
        console.log(`🔨 Creating selection indicator for ${unit.name}`);
        
        if (!SCENE_GLOBAL) {
            console.warn(`❌ Scene not available for ${unit.name}`);
            return null;
        }

        const position = getUnitPosition(unit);
        if (!position) {
            console.warn(`❌ No position found for unit ${unit.name}`);
            return null;
        }

        console.log(`📍 Unit ${unit.name} position: (${position.x}, ${position.y})`);

        // Create selection indicator mesh
        const geometry = new THREE.PlaneGeometry(TILE_WIDTH * 0.4, TILE_HEIGHT * 0.4);
        
        let material: THREE.MeshBasicMaterial;
        
        if (this.selectTexture) {
            console.log(`🎨 Using select texture`);
            material = new THREE.MeshBasicMaterial({
                map: this.selectTexture,
                transparent: true,
                opacity: 0.7,
                alphaTest: 0.1,
                depthTest: true,
                depthWrite: false,
                side: THREE.DoubleSide
            });
        } else {
            console.log(`🎨 Using fallback colored indicator (yellow)`);
            material = new THREE.MeshBasicMaterial({
                color: 0xffff00, // Yellow color
                transparent: true,
                opacity: 0.6,
                depthTest: true,
                depthWrite: false,
                side: THREE.DoubleSide
            });
        }
        
        const indicatorMesh = new THREE.Mesh(geometry, material);
        
        // Position it lower so it doesn't cover the unit
        const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2 - TILE_HEIGHT * 0.2;
        const worldZ = 1.5;
        
        indicatorMesh.position.set(worldX, worldY, worldZ);

        SCENE_GLOBAL.add(indicatorMesh);
        console.log(`✅ Added selection indicator for ${unit.name} to scene`);
        
        return indicatorMesh;
    }

    public selectUnit(unit: Unit): boolean {
        if (!GAME_TURN_MANAGER) {
            console.warn('Turn manager not available');
            return false;
        }

        if (!GAME_TURN_MANAGER.canSelect()) {
            console.warn('Cannot select units - not in SELECT phase');
            return false;
        }

        if (!GAME_TURN_MANAGER.canSelectUnit(unit.id)) {
            console.warn(`Unit ${unit.name} cannot be selected - already used this round`);
            return false;
        }

        // Mark unit as used and store as selected unit
        GAME_TURN_MANAGER.markUnitAsUsed(unit.id);
        this.selectedUnit = unit;
        console.log(`Selected unit: ${unit.name}`);
        
        // Clear ALL selection indicators since we're moving to MOVE phase
        this.clearAllSelectionIndicators();
        
        // Advance to MOVE phase
        GAME_TURN_MANAGER.advancePhase();
        
        return true;
    }

    private clearAllSelectionIndicators(): void {
        for (const [unit, indicator] of this.selectionIndicators) {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(indicator);
            }
        }
        this.selectionIndicators.clear();
        console.log(`🧹 Cleared all selection indicators`);
    }

    public getSelectedUnit(): Unit | null {
        return this.selectedUnit;
    }

    public setSelectedUnit(unit: Unit | null): void {
        this.selectedUnit = unit;
    }

    public cleanup(): void {
        this.clearAllSelectionIndicators();
        this.selectedUnit = null;
    }
} 