import { Unit } from '../units/Unit';
import { globalUnitRegistry } from '../units/UnitRegistry';
import * as THREE from 'three';
import { SCENE_GLOBAL, CAMERA_GLOBAL } from '../game';

// Tile size - will be set by GameScene
let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForRenderer(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class UnitRenderer {
    private unitPositions: Map<Unit, { x: number; y: number }> = new Map();
    private unitMeshes: Map<Unit, THREE.Mesh> = new Map();
    private unitBorders: Map<Unit, THREE.Object3D> = new Map();
    private unitHealthBars: Map<Unit, THREE.Mesh> = new Map();
    private unitEnergyBars: Map<Unit, THREE.Mesh> = new Map();
    private textureLoader = new THREE.TextureLoader();

    public async placeUnit(unit: Unit, x: number, y: number): Promise<void> {
        console.log(`Placing unit ${unit.name} at (${x}, ${y})`);
        this.unitPositions.set(unit, { x, y });
        
        // Set team based on registry
        if (globalUnitRegistry.playerParty.includes(unit)) {
            unit.team = 'player';
        } else if (globalUnitRegistry.enemyUnits.includes(unit)) {
            unit.team = 'enemy';
        }

        if (SCENE_GLOBAL && CAMERA_GLOBAL) {
            this.textureLoader.load(unit.imageUrl, (texture) => {
                if (!SCENE_GLOBAL) return;
                
                // Set texture filtering for crisp pixel art
                texture.magFilter = THREE.NearestFilter;
                texture.minFilter = THREE.NearestFilter;
                texture.flipY = true; // Fix upside down units
                texture.generateMipmaps = false; // Disable mipmaps for pixel art
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;
                
                // Get the actual image size
                const imageWidth = texture.image.width;
                const imageHeight = texture.image.height;
                
                console.log(`Unit ${unit.name} image size: ${imageWidth}x${imageHeight}`);
                
                // Scale to roughly tile size
                const targetSize = TILE_WIDTH; // Use the full tile width 
                const scaleFactor = targetSize / imageWidth;
                const unitWidth = imageWidth * scaleFactor;
                const unitHeight = imageHeight * scaleFactor;
                
                console.log(`Scaling unit to ${unitWidth}x${unitHeight} (scale factor: ${scaleFactor})`);
                
                const geometry = new THREE.PlaneGeometry(unitWidth, unitHeight);
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    alphaTest: 0.1, // Helps with transparent pixels
                    depthTest: true,
                    depthWrite: false
                });
                const unitMesh = new THREE.Mesh(geometry, material);
                
                // Center the unit on the tile, using the tile center as reference
                unitMesh.position.set(
                    x * TILE_WIDTH + TILE_WIDTH / 2,
                    -y * TILE_HEIGHT - TILE_HEIGHT / 2,
                    1
                );
                
                if (SCENE_GLOBAL) {
                    SCENE_GLOBAL.add(unitMesh);
                    this.unitMeshes.set(unit, unitMesh);
                    console.log(`Added unit mesh to scene at (${unitMesh.position.x}, ${unitMesh.position.y}) scaled to ${unitWidth}x${unitHeight}`);
                    
                    // Create team-colored border
                    this.createUnitBorder(unit, unitWidth, unitHeight, unitMesh.position.x, unitMesh.position.y);
                    
                    // Create health and energy bars
                    this.createUnitBars(unit, unitMesh.position.x, unitMesh.position.y);
                }
            });
        } else {
            console.error('Three.js scene or camera not initialized');
        }
    }

    public getUnitPosition(unit: Unit): { x: number; y: number } | undefined {
        return this.unitPositions.get(unit);
    }

    public removeUnit(unit: Unit): void {
        const mesh = this.unitMeshes.get(unit);
        if (mesh && SCENE_GLOBAL) {
            SCENE_GLOBAL.remove(mesh);
            this.unitMeshes.delete(unit);
        }
        
        // Remove unit border if it exists
        const border = this.unitBorders.get(unit);
        if (border && SCENE_GLOBAL) {
            SCENE_GLOBAL.remove(border);
            this.unitBorders.delete(unit);
        }
        
        // Remove health bar and its background
        const healthBar = this.unitHealthBars.get(unit);
        if (healthBar && SCENE_GLOBAL) {
            const healthBg = (healthBar as any).backgroundMesh;
            if (healthBg) {
                SCENE_GLOBAL.remove(healthBg);
            }
            SCENE_GLOBAL.remove(healthBar);
            this.unitHealthBars.delete(unit);
        }
        
        // Remove energy bar and its background
        const energyBar = this.unitEnergyBars.get(unit);
        if (energyBar && SCENE_GLOBAL) {
            const energyBg = (energyBar as any).backgroundMesh;
            if (energyBg) {
                SCENE_GLOBAL.remove(energyBg);
            }
            SCENE_GLOBAL.remove(energyBar);
            this.unitEnergyBars.delete(unit);
        }
        
        this.unitPositions.delete(unit);
        console.log(`Removed unit ${unit.name} from scene`);
    }

    public getUnitAtPosition(x: number, y: number): Unit | null {
        for (const [unit, position] of this.unitPositions) {
            if (position.x === x && position.y === y) {
                return unit;
            }
        }
        return null;
    }

    public getAllUnits(): Unit[] {
        return Array.from(this.unitPositions.keys());
    }

    public moveUnitToPosition(unit: Unit, newPosition: { x: number; y: number }): void {
        // Update position in our map
        this.unitPositions.set(unit, newPosition);
        
        // Move the visual mesh
        const mesh = this.unitMeshes.get(unit);
        if (mesh) {
            mesh.position.set(
                newPosition.x * TILE_WIDTH + TILE_WIDTH / 2,
                -newPosition.y * TILE_HEIGHT - TILE_HEIGHT / 2,
                1
            );
            
            // Update borders and bars positions
            this.updateUnitBorder(unit, mesh.position.x, mesh.position.y);
            this.updateUnitBarsPosition(unit, mesh.position.x, mesh.position.y);
        }
        
        console.log(`Moved unit ${unit.name} to (${newPosition.x}, ${newPosition.y})`);
    }

    private createUnitBorder(unit: Unit, width: number, height: number, x: number, y: number): void {
        if (!SCENE_GLOBAL) return;

        // Create a border using line geometry to make a thin outline
        const borderColor = unit.team === 'player' ? 0xff0000 : 0x0000ff; // Red for player, blue for enemy
        const borderWidth = 2; // Thickness of the border
        
        // Use consistent tile dimensions for all borders instead of unit-specific dimensions
        const borderW = TILE_WIDTH;
        const borderH = TILE_HEIGHT;
        
        // Create border outline using lines
        const points = [
            new THREE.Vector3(-borderW/2, borderH/2, 0), // Top-left
            new THREE.Vector3(borderW/2, borderH/2, 0),  // Top-right  
            new THREE.Vector3(borderW/2, -borderH/2, 0), // Bottom-right
            new THREE.Vector3(-borderW/2, -borderH/2, 0), // Bottom-left
            new THREE.Vector3(-borderW/2, borderH/2, 0)   // Back to top-left to close
        ];
        
        const borderGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const borderMaterial = new THREE.LineBasicMaterial({
            color: borderColor,
            linewidth: borderWidth,
            transparent: true,
            opacity: 0.8
        });
        
        const borderMesh = new THREE.Line(borderGeometry, borderMaterial);
        borderMesh.position.set(x, y, 0.9); // Slightly behind the unit
        
        SCENE_GLOBAL.add(borderMesh);
        this.unitBorders.set(unit, borderMesh);
        console.log(`✅ Added ${unit.team} team border for ${unit.name} (size: ${borderW}x${borderH}, color: ${borderColor.toString(16)})`);
    }

    private updateUnitBorder(unit: Unit, x: number, y: number): void {
        const border = this.unitBorders.get(unit);
        if (border) {
            border.position.set(x, y, 0.9);
        }
    }

    private updateUnitBarsPosition(unit: Unit, x: number, y: number): void {
        const barSpacing = 6;
        const barHeight = 4;
        
        // Update health bar position
        const healthBar = this.unitHealthBars.get(unit);
        const healthBg = healthBar ? (healthBar as any).backgroundMesh : null;
        if (healthBar && healthBg) {
            const healthY = y - TILE_HEIGHT / 2 + barHeight + 2;
            healthBg.position.set(x, healthY, 1.1);
            healthBar.position.set(healthBar.position.x - (healthBar.position.x - x), healthY, 1.2);
        }
        
        // Update energy bar position
        const energyBar = this.unitEnergyBars.get(unit);
        const energyBg = energyBar ? (energyBar as any).backgroundMesh : null;
        if (energyBar && energyBg) {
            const energyY = y - TILE_HEIGHT / 2 + barHeight + 2 - barSpacing;
            energyBg.position.set(x, energyY, 1.1);
            energyBar.position.set(energyBar.position.x - (energyBar.position.x - x), energyY, 1.2);
        }
        
        console.log(`🔄 Updated unit bars position for ${unit.name} at (${x}, ${y})`);
    }

    private createUnitBars(unit: Unit, x: number, y: number): void {
        if (!SCENE_GLOBAL) return;

        const barWidth = TILE_WIDTH * 0.8; // Slightly smaller than tile
        const barHeight = 4; // Thin bars
        const barSpacing = 6; // Space between health and energy bars
        
        // Calculate health percentage
        const healthPercent = unit.currentHealth / unit.health;
        const healthBarWidth = barWidth * healthPercent;
        
        // Calculate energy percentage
        const energyPercent = unit.maxEnergy > 0 ? unit.currentEnergy / unit.maxEnergy : 0;
        const energyBarWidth = barWidth * energyPercent;
        
        // Create health bar background
        const healthBgGeometry = new THREE.PlaneGeometry(barWidth, barHeight);
        const healthBgMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333, // Dark gray background
            transparent: true,
            opacity: 0.8
        });
        const healthBgMesh = new THREE.Mesh(healthBgGeometry, healthBgMaterial);
        
        // Create health bar foreground (green)
        const healthGeometry = new THREE.PlaneGeometry(healthBarWidth, barHeight);
        const healthMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00, // Green
            transparent: true,
            opacity: 0.9
        });
        const healthMesh = new THREE.Mesh(healthGeometry, healthMaterial);
        
        // Create energy bar background
        const energyBgGeometry = new THREE.PlaneGeometry(barWidth, barHeight);
        const energyBgMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333, // Dark gray background
            transparent: true,
            opacity: 0.8
        });
        const energyBgMesh = new THREE.Mesh(energyBgGeometry, energyBgMaterial);
        
        // Create energy bar foreground (blue)
        const energyGeometry = new THREE.PlaneGeometry(energyBarWidth, barHeight);
        const energyMaterial = new THREE.MeshBasicMaterial({
            color: 0x0080ff, // Blue
            transparent: true,
            opacity: 0.9
        });
        const energyMesh = new THREE.Mesh(energyGeometry, energyMaterial);
        
        // Position bars at bottom of unit tile
        const healthY = y - TILE_HEIGHT / 2 + barHeight + 2; // Just above bottom of tile
        const energyY = healthY - barSpacing; // Below health bar
        
        // Position health bars
        healthBgMesh.position.set(x, healthY, 1.1);
        healthMesh.position.set(x - (barWidth - healthBarWidth) / 2, healthY, 1.2); // Align to left of background
        
        // Position energy bars  
        energyBgMesh.position.set(x, energyY, 1.1);
        energyMesh.position.set(x - (barWidth - energyBarWidth) / 2, energyY, 1.2); // Align to left of background
        
        // Add all bars to scene
        SCENE_GLOBAL.add(healthBgMesh);
        SCENE_GLOBAL.add(healthMesh);
        SCENE_GLOBAL.add(energyBgMesh);
        SCENE_GLOBAL.add(energyMesh);
        
        // Store references for updates
        this.unitHealthBars.set(unit, healthMesh);
        this.unitEnergyBars.set(unit, energyMesh);
        
        // Store background references on the mesh objects for cleanup
        (healthMesh as any).backgroundMesh = healthBgMesh;
        (energyMesh as any).backgroundMesh = energyBgMesh;
        
        console.log(`💚💙 Created health/energy bars for ${unit.name} - Health: ${unit.currentHealth}/${unit.health} (${Math.round(healthPercent * 100)}%), Energy: ${unit.currentEnergy}/${unit.maxEnergy} (${Math.round(energyPercent * 100)}%)`);
    }

    public updateUnitBars(unit: Unit): void {
        if (!SCENE_GLOBAL) return;
        
        console.log(`🎨 updateUnitBars called for ${unit.name} - Current energy: ${unit.currentEnergy}/${unit.maxEnergy}`);

        const barWidth = TILE_WIDTH * 0.8;
        
        // Calculate new percentages
        const healthPercent = unit.currentHealth / unit.health;
        const energyPercent = unit.maxEnergy > 0 ? unit.currentEnergy / unit.maxEnergy : 0;
        
        // Update health bar
        const healthBar = this.unitHealthBars.get(unit);
        if (healthBar) {
            console.log(`💚 Updating health bar for ${unit.name}: ${healthPercent * 100}% (${unit.currentHealth}/${unit.health})`);
            
            // Recreate geometry with correct width (left-aligned scaling)
            const newHealthBarWidth = Math.max(0.1, barWidth * healthPercent);
            const newHealthGeometry = new THREE.PlaneGeometry(newHealthBarWidth, 4);
            healthBar.geometry.dispose();
            healthBar.geometry = newHealthGeometry;
            
            // Position to be left-aligned (same as createUnitBars)
            const position = this.unitPositions.get(unit);
            if (position) {
                const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
                const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
                const healthY = worldY - TILE_HEIGHT / 2 + 4 + 2;
                const leftAlignedX = worldX - (barWidth - newHealthBarWidth) / 2;
                healthBar.position.set(leftAlignedX, healthY, 1.2);
            }
            
            healthBar.visible = healthPercent > 0;
        } else {
            console.warn(`❌ No health bar found for ${unit.name}`);
        }
        
        // Update energy bar  
        const energyBar = this.unitEnergyBars.get(unit);
        if (energyBar) {
            console.log(`💙 Updating energy bar for ${unit.name}: ${energyPercent * 100}% (${unit.currentEnergy}/${unit.maxEnergy})`);
            
            // Recreate geometry with correct width (left-aligned scaling)
            const newEnergyBarWidth = Math.max(0.1, barWidth * energyPercent);
            const newEnergyGeometry = new THREE.PlaneGeometry(newEnergyBarWidth, 4);
            energyBar.geometry.dispose();
            energyBar.geometry = newEnergyGeometry;
            
            // Position to be left-aligned (same as createUnitBars)
            const position = this.unitPositions.get(unit);
            if (position) {
                const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
                const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
                const healthY = worldY - TILE_HEIGHT / 2 + 4 + 2;
                const energyY = healthY - 6;
                const leftAlignedX = worldX - (barWidth - newEnergyBarWidth) / 2;
                energyBar.position.set(leftAlignedX, energyY, 1.2);
            }
            
            energyBar.visible = energyPercent > 0;
        } else {
            console.warn(`❌ No energy bar found for ${unit.name}`);
        }
        
        console.log(`🔄 Updated bars for ${unit.name} - Health: ${unit.currentHealth}/${unit.health} (${Math.round(healthPercent * 100)}%), Energy: ${unit.currentEnergy}/${unit.maxEnergy} (${Math.round(energyPercent * 100)}%)`);
    }

    public getUnitMesh(unit: Unit): THREE.Mesh | undefined {
        return this.unitMeshes.get(unit);
    }

    public getUnitPositions(): Map<Unit, { x: number; y: number }> {
        return this.unitPositions;
    }

    public getUnitBorder(unit: Unit): THREE.Object3D | undefined {
        return this.unitBorders.get(unit);
    }

    public setUnitBorder(unit: Unit, border: THREE.Object3D): void {
        this.unitBorders.set(unit, border);
    }

    public getUnitHealthBar(unit: Unit): THREE.Mesh | undefined {
        return this.unitHealthBars.get(unit);
    }

    public setUnitHealthBar(unit: Unit, healthBar: THREE.Mesh): void {
        this.unitHealthBars.set(unit, healthBar);
    }

    public getUnitEnergyBar(unit: Unit): THREE.Mesh | undefined {
        return this.unitEnergyBars.get(unit);
    }

    public setUnitEnergyBar(unit: Unit, energyBar: THREE.Mesh): void {
        this.unitEnergyBars.set(unit, energyBar);
    }
} 