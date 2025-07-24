import { Unit } from '../units/Unit';
import { globalUnitRegistry } from '../units/UnitRegistry';
import * as THREE from 'three';
import { SCENE_GLOBAL, CAMERA_GLOBAL } from '../game';
import { ModifierService } from './ModifierService';

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
    private unitModifierIndicators: Map<Unit, THREE.Group> = new Map();
    private textureLoader = new THREE.TextureLoader();

    public async placeUnit(unit: Unit, x: number, y: number): Promise<void> {
        console.log(`🎨 UnitRenderer.placeUnit: Placing unit ${unit.name} at (${x}, ${y})`);
        console.log(`📊 Unit team before setting: ${unit.team}`);
        console.log(`📊 globalUnitRegistry.playerParty.length: ${globalUnitRegistry.playerParty.length}`);
        console.log(`📊 globalUnitRegistry.enemyUnits.length: ${globalUnitRegistry.enemyUnits.length}`);
        console.log(`📊 Unit is in playerParty: ${globalUnitRegistry.playerParty.includes(unit)}`);
        console.log(`📊 Unit is in enemyUnits: ${globalUnitRegistry.enemyUnits.includes(unit)}`);
        
        this.unitPositions.set(unit, { x, y });
        
        // Set team based on registry
        if (globalUnitRegistry.playerParty.includes(unit)) {
            unit.team = 'player';
        } else if (globalUnitRegistry.enemyUnits.includes(unit)) {
            unit.team = 'enemy';
        }
        
        console.log(`📊 Unit team after setting: ${unit.team}`);
        console.log(`📊 SCENE_GLOBAL exists: ${!!SCENE_GLOBAL}`);
        console.log(`📊 CAMERA_GLOBAL exists: ${!!CAMERA_GLOBAL}`);
        console.log(`📊 Unit imageUrl: ${unit.imageUrl}`);

        if (SCENE_GLOBAL && CAMERA_GLOBAL) {
            console.log(`🖼️ Loading texture for ${unit.name} from: ${unit.imageUrl}`);
            this.textureLoader.load(
                unit.imageUrl, 
                (texture) => {
                    console.log(`✅ Texture loaded successfully for ${unit.name}`);
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
                    
                    // Create modifier indicators
                    this.createModifierIndicators(unit, unitMesh.position.x, unitMesh.position.y);
                }
            },
            (progress) => {
                console.log(`📊 Loading progress for ${unit.name}: ${progress.loaded}/${progress.total} bytes`);
            },
            (error) => {
                console.error(`❌ Failed to load texture for ${unit.name}:`, error);
                console.error(`❌ Image URL: ${unit.imageUrl}`);
                console.error(`❌ Error details:`, error instanceof Error ? error.message : error);
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
        
        // Remove modifier indicators
        const modifierGroup = this.unitModifierIndicators.get(unit);
        if (modifierGroup && SCENE_GLOBAL) {
            SCENE_GLOBAL.remove(modifierGroup);
            this.unitModifierIndicators.delete(unit);
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
            this.updateModifierIndicatorsPosition(unit, mesh.position.x, mesh.position.y);
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
        const barWidth = TILE_WIDTH * 0.8;
        
        // Update health bar position
        const healthBar = this.unitHealthBars.get(unit);
        const healthBg = healthBar ? (healthBar as any).backgroundMesh : null;
        if (healthBar && healthBg) {
            const healthY = y - TILE_HEIGHT / 2 + barHeight + 2;
            healthBg.position.set(x, healthY, 1.1);
            // Calculate current bar width from unit's health percentage
            const healthPercent = unit.currentHealth / unit.health;
            const currentHealthWidth = barWidth * healthPercent;
            healthBar.position.set(x - barWidth / 2 + currentHealthWidth / 2, healthY, 1.2); // Left-anchor with background
        }
        
        // Update energy bar position
        const energyBar = this.unitEnergyBars.get(unit);
        const energyBg = energyBar ? (energyBar as any).backgroundMesh : null;
        if (energyBar && energyBg) {
            const energyY = y - TILE_HEIGHT / 2 + barHeight + 2 - barSpacing;
            energyBg.position.set(x, energyY, 1.1);
            // Calculate current bar width from unit's energy percentage
            const energyPercent = unit.maxEnergy > 0 ? unit.currentEnergy / unit.maxEnergy : 0;
            const currentEnergyWidth = barWidth * energyPercent;
            energyBar.position.set(x - barWidth / 2 + currentEnergyWidth / 2, energyY, 1.2); // Left-anchor with background
        }
        
        console.log(`🔄 Updated unit bars position for ${unit.name} at (${x}, ${y})`);
    }

    private updateModifierIndicatorsPosition(unit: Unit, x: number, y: number): void {
        const modifierGroup = this.unitModifierIndicators.get(unit);
        if (modifierGroup) {
            // Position the group at the unit's position - individual indicators will be offset relative to this
            modifierGroup.position.set(x, y, 2);
        }
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
        healthMesh.position.set(x - barWidth / 2 + healthBarWidth / 2, healthY, 1.2); // Left-anchor with background
        
        // Position energy bars  
        energyBgMesh.position.set(x, energyY, 1.1);
        energyMesh.position.set(x - barWidth / 2 + energyBarWidth / 2, energyY, 1.2); // Left-anchor with background
        
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

    private createModifierIndicators(unit: Unit, x: number, y: number): void {
        if (!SCENE_GLOBAL) return;

        // Create a group to hold all modifier indicators for this unit
        const modifierGroup = new THREE.Group();
        modifierGroup.position.set(x, y, 2); // Position at unit's world position
        
        this.updateModifierIndicators(unit, modifierGroup);
        
        SCENE_GLOBAL.add(modifierGroup);
        this.unitModifierIndicators.set(unit, modifierGroup);
    }

    private updateModifierIndicators(unit: Unit, modifierGroup: THREE.Group): void {
        if (!SCENE_GLOBAL) return;

        // Clear existing modifier indicators
        while (modifierGroup.children.length > 0) {
            const child = modifierGroup.children[0];
            modifierGroup.remove(child);
            if ((child as any).geometry) {
                (child as any).geometry.dispose();
            }
            if ((child as any).material) {
                if (Array.isArray((child as any).material)) {
                    (child as any).material.forEach((mat: any) => mat.dispose());
                } else {
                    (child as any).material.dispose();
                }
            }
        }

        // Create new modifier indicators (max 6 visual indicators)
        if (unit.activeModifiers && unit.activeModifiers.length > 0) {
            const visibleModifiers = unit.activeModifiers.slice(0, 6); // Limit to 6 visual indicators
            
            visibleModifiers.forEach((modifier, index) => {
                const abbreviation = ModifierService.getModifierAbbreviation(modifier.modifierKey);
                const color = ModifierService.getModifierColor(modifier.modifierKey);
                const text = `${abbreviation}x${modifier.stacks}`;
                
                // Create text texture using canvas
                const textTexture = this.createTextTexture(text, color);
                
                // Smaller indicators to fit within tile
                const indicatorWidth = 22;
                const indicatorHeight = 10;
                
                // Create plane with text texture
                const geometry = new THREE.PlaneGeometry(indicatorWidth, indicatorHeight);
                const material = new THREE.MeshBasicMaterial({
                    map: textTexture,
                    transparent: true,
                    alphaTest: 0.1
                });
                const indicatorMesh = new THREE.Mesh(geometry, material);
                
                // Get dice-like position within the tile
                const position = this.getDicePosition(index, visibleModifiers.length);
                
                // Position relative to tile boundaries (tile is TILE_WIDTH x TILE_HEIGHT)
                const tileMargin = 2; // Small margin from tile edges
                const offsetX = position.x * (TILE_WIDTH / 2 - indicatorWidth / 2 - tileMargin);
                const offsetY = position.y * (TILE_HEIGHT / 2 - indicatorHeight / 2 - tileMargin);
                
                indicatorMesh.position.set(offsetX, offsetY, 0.1); // Slight z-offset to appear above unit
                modifierGroup.add(indicatorMesh);
                
                console.log(`🏷️ Created modifier indicator for ${unit.name}: ${text} at dice position ${index + 1}/${visibleModifiers.length} -> offset (${offsetX.toFixed(1)}, ${offsetY.toFixed(1)})`);
            });
            
            if (unit.activeModifiers.length > 6) {
                console.log(`🏷️ ${unit.name} has ${unit.activeModifiers.length} modifiers, showing first 6 visually (rest in info panel)`);
            }
        }
    }

    /**
     * Get dice-like positions for modifier indicators within the tile
     * Returns normalized coordinates (-1 to 1) for x and y
     */
    private getDicePosition(index: number, totalCount: number): { x: number; y: number } {
        // Dice-like positioning patterns
        switch (totalCount) {
            case 1:
                // Center
                return { x: 0, y: 0 };
                
            case 2:
                // Diagonal: top-left, bottom-right
                return index === 0 ? { x: -0.6, y: 0.6 } : { x: 0.6, y: -0.6 };
                
            case 3:
                // Diagonal: top-left, center, bottom-right
                const positions3 = [
                    { x: -0.6, y: 0.6 },   // top-left
                    { x: 0, y: 0 },        // center
                    { x: 0.6, y: -0.6 }    // bottom-right
                ];
                return positions3[index];
                
            case 4:
                // Four corners
                const positions4 = [
                    { x: -0.6, y: 0.6 },   // top-left
                    { x: 0.6, y: 0.6 },    // top-right
                    { x: -0.6, y: -0.6 },  // bottom-left
                    { x: 0.6, y: -0.6 }    // bottom-right
                ];
                return positions4[index];
                
            case 5:
                // Four corners + center
                const positions5 = [
                    { x: -0.6, y: 0.6 },   // top-left
                    { x: 0.6, y: 0.6 },    // top-right
                    { x: 0, y: 0 },        // center
                    { x: -0.6, y: -0.6 },  // bottom-left
                    { x: 0.6, y: -0.6 }    // bottom-right
                ];
                return positions5[index];
                
            case 6:
            default:
                // Two columns of three (like dice 6)
                const positions6 = [
                    { x: -0.6, y: 0.6 },   // left-top
                    { x: -0.6, y: 0 },     // left-middle
                    { x: -0.6, y: -0.6 },  // left-bottom
                    { x: 0.6, y: 0.6 },    // right-top
                    { x: 0.6, y: 0 },      // right-middle
                    { x: 0.6, y: -0.6 }    // right-bottom
                ];
                return positions6[index];
        }
    }

    private createTextTexture(text: string, color: string): THREE.CanvasTexture {
        // Create canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        
        // Set canvas size (increased for better resolution)
        canvas.width = 128;
        canvas.height = 48;
        
        // Set up text styling (larger font)
        context.fillStyle = color;
        context.font = 'bold 18px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Add black outline for better readability (thicker outline)
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.strokeText(text, canvas.width / 2, canvas.height / 2);
        
        // Fill the text
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.generateMipmaps = false;
        
        return texture;
    }

    public updateUnitBars(unit: Unit): void {
        if (!SCENE_GLOBAL) return;
        
        // Add null check to prevent TypeError
        if (!unit) {
            console.warn('❌ updateUnitBars called with undefined unit');
            return;
        }
        
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
            
            // Position to be left-anchored with background
            const position = this.unitPositions.get(unit);
            if (position) {
                const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
                const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
                const healthY = worldY - TILE_HEIGHT / 2 + 4 + 2;
                healthBar.position.set(worldX - barWidth / 2 + newHealthBarWidth / 2, healthY, 1.2); // Left-anchor with background
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
            
            // Position to be left-anchored with background
            const position = this.unitPositions.get(unit);
            if (position) {
                const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
                const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
                const healthY = worldY - TILE_HEIGHT / 2 + 4 + 2;
                const energyY = healthY - 6;
                energyBar.position.set(worldX - barWidth / 2 + newEnergyBarWidth / 2, energyY, 1.2); // Left-anchor with background
            }
            
            energyBar.visible = energyPercent > 0;
        } else {
            console.warn(`❌ No energy bar found for ${unit.name}`);
        }
        
        console.log(`🔄 Updated bars for ${unit.name} - Health: ${unit.currentHealth}/${unit.health} (${Math.round(healthPercent * 100)}%), Energy: ${unit.currentEnergy}/${unit.maxEnergy} (${Math.round(energyPercent * 100)}%)`);
    }

    public updateUnitModifiers(unit: Unit): void {
        const modifierGroup = this.unitModifierIndicators.get(unit);
        if (modifierGroup) {
            this.updateModifierIndicators(unit, modifierGroup);
            console.log(`🏷️ Updated modifier indicators for ${unit.name}`);
        }
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