import * as THREE from 'three';
import { TileEffectManager, TileEffectInstance } from './TileEffect';
import { SCENE_GLOBAL } from '../game';
import hoverSelectImageUrl from '../assets/Images/hoverselect.png';

let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForTileEffects(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class TileEffectRenderer {
    private effectMeshes: Map<string, THREE.Mesh> = new Map(); // Key: effect instance ID
    private textureLoader = new THREE.TextureLoader();
    private hoverSelectTexture: THREE.Texture | null = null;

    constructor() {
        this.loadHoverSelectTexture();
    }

    private loadHoverSelectTexture(): void {
        this.textureLoader.load(hoverSelectImageUrl, (texture) => {
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestFilter;
            texture.generateMipmaps = false;
            this.hoverSelectTexture = texture;
            console.log('✅ Loaded hover select texture for tile effects');
        });
    }

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
        
        console.log(`🎨 Found ${allEffects.length} active effects to render:`);
        allEffects.forEach((effect: TileEffectInstance) => {
            console.log(`  - ${effect.effectId} at (${effect.position.x}, ${effect.position.y}) ID: ${effect.id}`);
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
        
        // For toxic tiles, create a transparent purple overlay similar to targeting indicators
        if (effect.effectId === 'toxic-tile' && this.hoverSelectTexture) {
            this.renderToxicTile(effect, definition);
            return;
        }
        
        // For other tile effects, use the original rendering method
        this.renderStandardTileEffect(effect, definition);
    }

    /**
     * Render toxic tile with transparent purple overlay
     */
    private renderToxicTile(effect: TileEffectInstance, definition: any): void {
        if (!SCENE_GLOBAL || !this.hoverSelectTexture) return;

        // Create the transparent purple overlay using the same method as targeting indicators
        const overlayGeometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
        const overlayMaterial = new THREE.MeshBasicMaterial({
            map: this.hoverSelectTexture,
            transparent: true,
            opacity: 0.6,
            color: 0x800080, // Purple color
            depthTest: false,
            depthWrite: false
        });
        
        const overlayMesh = new THREE.Mesh(overlayGeometry, overlayMaterial);
        
        // Position the overlay on the tile
        const worldX = effect.position.x * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -effect.position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
        overlayMesh.position.set(worldX, worldY, 0.3); // Base layer
        
        // Create emoji texture for the radioactive symbol on top
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        if (context) {
            // Clear canvas
            context.clearRect(0, 0, 64, 64);
            
            // Draw radioactive emoji
            context.font = '32px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = '#FFFF00'; // Bright yellow for visibility on purple
            context.strokeStyle = '#000000'; // Black outline
            context.lineWidth = 2;
            
            // Draw emoji with outline for better visibility
            context.strokeText(definition.icon, 32, 32);
            context.fillText(definition.icon, 32, 32);
            
            // Create texture and mesh for the emoji
            const emojiTexture = new THREE.CanvasTexture(canvas);
            emojiTexture.needsUpdate = true;
            
            const emojiGeometry = new THREE.PlaneGeometry(TILE_WIDTH * 0.6, TILE_HEIGHT * 0.6);
            const emojiMaterial = new THREE.MeshBasicMaterial({
                map: emojiTexture,
                transparent: true,
                opacity: 1.0,
                alphaTest: 0.1,
                depthTest: false,
                depthWrite: false
            });
            
            const emojiMesh = new THREE.Mesh(emojiGeometry, emojiMaterial);
            emojiMesh.position.set(worldX, worldY, 0.4); // Above the overlay
            
            // Create a group to hold both the overlay and emoji
            const effectGroup = new THREE.Group();
            effectGroup.add(overlayMesh);
            effectGroup.add(emojiMesh);
            
            SCENE_GLOBAL.add(effectGroup);
            this.effectMeshes.set(effect.id, effectGroup as any); // Store the group as the effect mesh
        }
        
        console.log(`☢️ Rendered toxic tile with purple overlay at (${effect.position.x}, ${effect.position.y})`);
    }

    /**
     * Render standard tile effects (non-toxic)
     */
    private renderStandardTileEffect(effect: TileEffectInstance, definition: any): void {
        if (!SCENE_GLOBAL) return;
        
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
        
        console.log(`🧹 Clearing ${this.effectMeshes.size} effect meshes from scene`);
        
        this.effectMeshes.forEach((mesh, effectId) => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
                console.log(`🧹 Removed effect mesh for ${effectId}`);
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
        console.log(`🧹 Cleared all effect meshes, map size: ${this.effectMeshes.size}`);
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