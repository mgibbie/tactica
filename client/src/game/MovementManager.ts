import { Unit } from '../units/Unit';
import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { globalNavigationManager, Position, MovementData } from './NavigationManager';
import * as THREE from 'three';
import { SCENE_GLOBAL } from '../game';

// Tile size - will be set by GameScene
let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForMovement(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class MovementManager {
    private movementIndicators: Map<string, THREE.Mesh> = new Map(); // Key is "x,y"
    private pathLines: THREE.Line[] = [];
    private textureLoader = new THREE.TextureLoader();
    private hoverSelectTexture: THREE.Texture | null = null;
    
    // Movement state
    private selectedMoveTarget: Position | null = null;
    private movementData: MovementData | null = null;

    constructor() {
        this.loadHoverSelectTexture();
    }

    private async loadHoverSelectTexture(): Promise<void> {
        try {
            const hoverSelectImageUrl = '../assets/Images/hoverselect.png';
            console.log('🎨 Loading hover select texture from:', hoverSelectImageUrl);
            this.hoverSelectTexture = await this.textureLoader.loadAsync(hoverSelectImageUrl);
            this.hoverSelectTexture.magFilter = THREE.NearestFilter;
            this.hoverSelectTexture.minFilter = THREE.NearestFilter;
            this.hoverSelectTexture.flipY = true;
            this.hoverSelectTexture.generateMipmaps = false;
            this.hoverSelectTexture.wrapS = THREE.ClampToEdgeWrapping;
            this.hoverSelectTexture.wrapT = THREE.ClampToEdgeWrapping;
            console.log('✅ Hover select texture loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load hover select texture:', error);
            console.log('🔄 Will use fallback colored indicator');
        }
    }

    public enterMovePhase(unit: Unit, getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined, getUnitPositions: () => Map<Unit, { x: number; y: number }>): void {
        console.log(`🚶 Entering move phase for unit: ${unit.name}`);
        
        this.selectedMoveTarget = null;
        
        // Update navigation manager with current unit positions
        console.log(`📊 Updating occupied tiles with ${getUnitPositions().size} units`);
        globalNavigationManager.updateOccupiedTiles(getUnitPositions());
        
        // Calculate valid movement tiles
        const currentPosition = getUnitPosition(unit);
        if (!currentPosition) {
            console.error(`❌ No position found for unit ${unit.name}`);
            return;
        }
        
        console.log(`📍 Unit ${unit.name} current position: (${currentPosition.x}, ${currentPosition.y})`);
        console.log(`🏃 Unit range: ${unit.range || 3}`);
        
        this.movementData = globalNavigationManager.calculateValidMovement(unit, currentPosition);
        console.log(`🎯 Movement data:`, this.movementData);
        
        // Create movement indicators
        this.createMovementIndicators();
        
        console.log(`✅ Move phase setup complete`);
    }

    public exitMovePhase(): void {
        console.log(`🚫 Exiting move phase`);
        
        this.selectedMoveTarget = null;
        this.movementData = null;
        
        // Clear movement indicators and path
        this.clearMovementIndicators();
        this.clearPathLines();
    }

    private createMovementIndicators(): void {
        if (!this.movementData) {
            console.warn(`❌ No movement data available`);
            return;
        }
        
        if (!SCENE_GLOBAL) {
            console.warn(`❌ Scene not available`);
            return;
        }
        
        console.log(`🔷 Creating ${this.movementData.validTiles.length} movement indicators`);
        
        let indicatorsCreated = 0;
        for (const tile of this.movementData.validTiles) {
            const indicator = this.createMovementIndicator(tile);
            if (indicator) {
                const key = `${tile.x},${tile.y}`;
                this.movementIndicators.set(key, indicator);
                indicatorsCreated++;
            }
        }
        
        console.log(`🎯 Successfully created ${indicatorsCreated}/${this.movementData.validTiles.length} movement indicators`);
    }

    private createMovementIndicator(position: Position): THREE.Mesh | null {
        if (!SCENE_GLOBAL) return null;
        
        // Create blue movement indicator
        const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
        
        let material: THREE.MeshBasicMaterial;
        
        if (this.hoverSelectTexture) {
            material = new THREE.MeshBasicMaterial({
                map: this.hoverSelectTexture,
                transparent: true,
                opacity: 0.7,
                color: 0x0080ff, // Blue tint
                alphaTest: 0.1,
                depthTest: true,
                depthWrite: false,
                side: THREE.DoubleSide
            });
        } else {
            material = new THREE.MeshBasicMaterial({
                color: 0x0080ff, // Blue color
                transparent: true,
                opacity: 0.6,
                depthTest: true,
                depthWrite: false,
                side: THREE.DoubleSide
            });
        }
        
        const indicatorMesh = new THREE.Mesh(geometry, material);
        
        // Position it at the tile center
        const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
        const worldZ = 1.2;
        
        indicatorMesh.position.set(worldX, worldY, worldZ);
        
        SCENE_GLOBAL.add(indicatorMesh);
        
        return indicatorMesh;
    }

    private clearMovementIndicators(): void {
        for (const [key, indicator] of this.movementIndicators) {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(indicator);
            }
        }
        this.movementIndicators.clear();
        console.log(`🧹 Cleared movement indicators`);
    }

    public selectMoveTarget(x: number, y: number): boolean {
        if (!this.movementData) {
            console.warn('❌ No movement data available');
            return false;
        }
        
        const key = `${x},${y}`;
        if (!this.movementIndicators.has(key)) {
            console.warn(`❌ Tile (${x}, ${y}) is not a valid movement target`);
            return false;
        }
        
        console.log(`🎯 Selected move target: (${x}, ${y})`);
        
        this.selectedMoveTarget = { x, y };
        
        return true;
    }

    public drawPathToTarget(getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined, selectedUnit: Unit): void {
        if (!selectedUnit || !this.selectedMoveTarget || !SCENE_GLOBAL) return;
        
        const currentPosition = getUnitPosition(selectedUnit);
        if (!currentPosition) return;
        
        // Clear existing path lines
        this.clearPathLines();
        
        // Calculate step path
        const pathPositions = globalNavigationManager.calculateStepPath(currentPosition, this.selectedMoveTarget);
        
        // Create line geometry
        const points: THREE.Vector3[] = [];
        for (const pos of pathPositions) {
            const worldX = pos.x * TILE_WIDTH + TILE_WIDTH / 2;
            const worldY = -pos.y * TILE_HEIGHT - TILE_HEIGHT / 2;
            const worldZ = 2;
            points.push(new THREE.Vector3(worldX, worldY, worldZ));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
            color: 0xff4444, // Red path line
            linewidth: 3
        });
        
        const line = new THREE.Line(geometry, material);
        SCENE_GLOBAL.add(line);
        this.pathLines.push(line);
        
        console.log(`🛤️ Drew path with ${pathPositions.length} steps`);
    }

    private clearPathLines(): void {
        for (const line of this.pathLines) {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(line);
            }
        }
        this.pathLines = [];
    }

    public getSelectedMoveTarget(): Position | null {
        return this.selectedMoveTarget;
    }

    public cancelMove(): void {
        console.log(`❌ Cancelling move selection`);
        this.selectedMoveTarget = null;
        this.clearPathLines();
    }

    public cleanup(): void {
        this.clearMovementIndicators();
        this.clearPathLines();
        this.selectedMoveTarget = null;
        this.movementData = null;
    }
} 