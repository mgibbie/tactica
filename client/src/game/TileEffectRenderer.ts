import * as THREE from 'three';
import { TileEffectManager, TileEffectInstance } from './TileEffect';
import { SCENE_GLOBAL } from '../game';

let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForTileEffects(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class TileEffectRenderer {
    private effectMeshes: Map<string, THREE.Mesh> = new Map(); // Key: effect instance ID
    private textureLoader = new THREE.TextureLoader();

    /**
     * Render all active tile effects from the manager
     */
    public renderTileEffects(tileEffectManager: TileEffectManager): void {
        console.log('🎨 Rendering tile effects');
        
        // Clear existing effect meshes
        this.clearAllEffectMeshes();
        
        // Get all active effects
        const allEffectsMap = tileEffectManager.getAllActiveEffects();
        const allEffects: TileEffectInstance[] = [];
        
        // Flatten the map to get all effect instances
        for (const effects of allEffectsMap.values()) {
            allEffects.push(...effects);
        }
        
        allEffects.forEach((effect: TileEffectInstance) => {
            this.renderSingleEffect(effect, tileEffectManager);
        });
        
        console.log(`✅ Rendered ${allEffects.length} tile effects`);
    }

    /**
     * Render a single tile effect
     */
    private renderSingleEffect(effect: TileEffectInstance, tileEffectManager: TileEffectManager): void {
        if (!SCENE_GLOBAL) return;
        
        const definition = tileEffectManager.getEffectDefinition(effect.effectId);
        if (!definition) return;
        
        // Create emoji texture for the effect
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        if (!context) return;
        
        // Clear canvas with background color
        context.clearRect(0, 0, 64, 64);
        
        // Draw background circle with effect color
        const centerX = 32;
        const centerY = 32;
        const radius = 24;
        
        context.fillStyle = definition.visualColor;
        context.globalAlpha = 0.3;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.fill();
        
        // Draw icon
        context.globalAlpha = 1.0;
        context.font = '32px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = definition.visualColor;
        context.fillText(definition.icon, centerX, centerY);
        
        // Create texture and mesh
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        const geometry = new THREE.PlaneGeometry(TILE_WIDTH * 0.8, TILE_HEIGHT * 0.8);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.8,
            alphaTest: 0.1,
            depthTest: false,
            depthWrite: false
        });
        
        const effectMesh = new THREE.Mesh(geometry, material);
        
        // Position the effect on the tile
        const worldX = effect.position.x * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -effect.position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
        effectMesh.position.set(worldX, worldY, 0.3); // Slightly above ground
        
        if (SCENE_GLOBAL) {
            SCENE_GLOBAL.add(effectMesh);
            this.effectMeshes.set(effect.id, effectMesh);
        }
        
        console.log(`🎨 Rendered ${definition.name} effect at (${effect.position.x}, ${effect.position.y})`);
    }

    /**
     * Update tile effects when they change
     */
    public updateTileEffects(tileEffectManager: TileEffectManager): void {
        this.renderTileEffects(tileEffectManager);
    }

    /**
     * Clear all effect meshes from the scene
     */
    private clearAllEffectMeshes(): void {
        if (!SCENE_GLOBAL) return;
        
        this.effectMeshes.forEach(mesh => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
            }
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.MeshBasicMaterial) {
                mesh.material.dispose();
                if (mesh.material.map) {
                    mesh.material.map.dispose();
                }
            }
        });
        
        this.effectMeshes.clear();
    }

    /**
     * Remove a specific effect mesh
     */
    public removeEffect(effectId: string): void {
        const mesh = this.effectMeshes.get(effectId);
        if (mesh && SCENE_GLOBAL) {
            SCENE_GLOBAL.remove(mesh);
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.MeshBasicMaterial) {
                mesh.material.dispose();
                if (mesh.material.map) {
                    mesh.material.map.dispose();
                }
            }
            this.effectMeshes.delete(effectId);
        }
    }

    /**
     * Clean up all resources
     */
    public cleanup(): void {
        this.clearAllEffectMeshes();
    }
}

// Global tile effect renderer instance
export const globalTileEffectRenderer = new TileEffectRenderer(); 