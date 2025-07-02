import * as THREE from 'three';
import { Unit } from '../units/Unit';
import hoverSelectImageUrl from '../assets/Images/hoverselect.png';
import { Position, globalNavigationManager } from './NavigationManager';
import { SCENE_GLOBAL } from '../game';

let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForMovement(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class MovementManager {
    private textureLoader = new THREE.TextureLoader();
    private hoverSelectTexture: THREE.Texture | null = null;
    private movementIndicators: THREE.Mesh[] = [];
    private selectedMoveTarget: Position | null = null;
    private currentMovementData: { validTiles: Position[]; paths: Map<string, Position[]> } | null = null;
    private pathIndicators: THREE.Mesh[] = [];

    constructor() {
        this.loadHoverSelectTexture();
    }

    private async loadHoverSelectTexture(): Promise<void> {
        this.hoverSelectTexture = await this.textureLoader.loadAsync(hoverSelectImageUrl);
        this.hoverSelectTexture.magFilter = THREE.NearestFilter;
        this.hoverSelectTexture.minFilter = THREE.NearestFilter;
    }

    public enterMovePhase(unit: Unit, getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined, getUnitPositions: () => Map<Unit, { x: number; y: number }>): void {
        console.log(`🚶 Entering MOVE phase for ${unit.name}`);
        
        // Clear any existing movement indicators
        this.clearMovementIndicators();
        this.clearPathIndicators();
        this.selectedMoveTarget = null;
        
        // Get current unit position
        const currentPosition = getUnitPosition(unit);
        if (!currentPosition) {
            console.error(`❌ No position found for unit ${unit.name}`);
            return;
        }
        
        // Update navigation manager with current unit positions
        const allPositions = getUnitPositions();
        const positionMap = new Map<Unit, Position>();
        allPositions.forEach((pos, unit) => {
            positionMap.set(unit, { x: pos.x, y: pos.y });
        });
        globalNavigationManager.updateOccupiedTiles(positionMap);
        
        // Calculate valid movement using NavigationManager
        const movementData = globalNavigationManager.calculateValidMovement(unit, currentPosition);
        this.currentMovementData = movementData;
        
        // Create visual indicators for valid movement tiles
        this.createMovementIndicators(movementData.validTiles);
        
        console.log(`✅ Created ${movementData.validTiles.length} movement indicators for ${unit.name}`);
    }

    private createMovementIndicators(validTiles: Position[]): void {
        if (!this.hoverSelectTexture || !SCENE_GLOBAL) {
            console.warn("❌ Cannot create movement indicators - texture or scene not available");
            return;
        }

        validTiles.forEach(tile => {
            const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
            const material = new THREE.MeshBasicMaterial({
                map: this.hoverSelectTexture,
                transparent: true,
                opacity: 0.6,
                color: 0x00ff00 // Green tint for movement indicators
            });

            const indicatorMesh = new THREE.Mesh(geometry, material);
            
            // Position the indicator at the tile
            indicatorMesh.position.set(
                tile.x * TILE_WIDTH + TILE_WIDTH / 2,
                -tile.y * TILE_HEIGHT - TILE_HEIGHT / 2,
                0.4 // Slightly above ground but below units
            );

            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.add(indicatorMesh);
                this.movementIndicators.push(indicatorMesh);
            }
        });
        
        console.log(`✅ Created ${validTiles.length} movement indicators`);
    }

    private clearMovementIndicators(): void {
        this.movementIndicators.forEach(mesh => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
            }
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
                mesh.material.dispose();
            }
        });
        this.movementIndicators = [];
        console.log("🧹 Cleared movement indicators");
    }

    public exitMovePhase(): void {
        console.log('🚪 Exiting MOVE phase');
        this.clearMovementIndicators();
        this.clearPathIndicators();
        this.selectedMoveTarget = null;
        this.currentMovementData = null;
    }

    public selectMoveTarget(x: number, y: number): boolean {
        console.log(`🎯 Attempting to select move target: (${x}, ${y})`);
        
        if (!this.currentMovementData) {
            console.warn("❌ No movement data available");
            return false;
        }
        
        // Check if the target is a valid movement tile
        const isValid = this.currentMovementData.validTiles.some(tile => 
            tile.x === x && tile.y === y
        );
        
        if (isValid) {
            this.selectedMoveTarget = { x, y };
            console.log(`✅ Selected valid move target: (${x}, ${y})`);
            return true;
        } else {
            console.log(`❌ Invalid move target: (${x}, ${y}) - not in valid tiles`);
            return false;
        }
    }

    public drawPathToTarget(getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined, selectedUnit: Unit): void {
        console.log('🛤️ Drawing path to target');
        
        // Clear existing path indicators
        this.clearPathIndicators();
        
        if (!this.selectedMoveTarget || !this.currentMovementData) {
            console.warn("❌ No target selected or movement data missing");
            return;
        }
        
        const currentPosition = getUnitPosition(selectedUnit);
        if (!currentPosition) {
            console.error(`❌ No position found for unit ${selectedUnit.name}`);
            return;
        }
        
        // Get the path from movement data
        const pathKey = `${this.selectedMoveTarget.x},${this.selectedMoveTarget.y}`;
        const path = this.currentMovementData.paths.get(pathKey);
        
        if (path && path.length > 1) {
            this.createPathIndicators(path);
            console.log(`✅ Created path with ${path.length} steps`);
        }
    }

    private createPathIndicators(path: Position[]): void {
        if (!this.hoverSelectTexture || !SCENE_GLOBAL) return;

        // Skip the first position (current unit position) and create indicators for the path
        for (let i = 1; i < path.length; i++) {
            const tile = path[i];
            const geometry = new THREE.PlaneGeometry(TILE_WIDTH * 0.5, TILE_HEIGHT * 0.5);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffff00, // Yellow for path
                transparent: true,
                opacity: 0.8
            });

            const indicatorMesh = new THREE.Mesh(geometry, material);
            
            indicatorMesh.position.set(
                tile.x * TILE_WIDTH + TILE_WIDTH / 2,
                -tile.y * TILE_HEIGHT - TILE_HEIGHT / 2,
                0.6 // Above movement indicators but below units
            );

            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.add(indicatorMesh);
                this.pathIndicators.push(indicatorMesh);
            }
        }
    }

    private clearPathIndicators(): void {
        this.pathIndicators.forEach(mesh => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
            }
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
                mesh.material.dispose();
            }
        });
        this.pathIndicators = [];
    }

    public getSelectedMoveTarget(): Position | null {
        return this.selectedMoveTarget;
    }

    public cancelMove(): void {
        console.log('❌ Cancelling move');
        this.clearPathIndicators();
        this.selectedMoveTarget = null;
    }
} 