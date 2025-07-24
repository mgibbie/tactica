import { Unit } from '../units/Unit';
import * as THREE from 'three';
import { SCENE_GLOBAL } from '../game';
import boomImageUrl from '../assets/Images/boom.png';

// Tile size - will be set by GameScene
let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForAnimation(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class AnimationManager {
    private textureLoader = new THREE.TextureLoader();

    public showDamageAnimation(unit: Unit, getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined): void {
        if (!SCENE_GLOBAL) return;

        // Show boom animation
        this.textureLoader.load(boomImageUrl, (boomTexture) => {
            if (!SCENE_GLOBAL) return;
            
            boomTexture.magFilter = THREE.NearestFilter;
            boomTexture.minFilter = THREE.NearestFilter;
            boomTexture.flipY = true;
            boomTexture.generateMipmaps = false;
            
            const geometry = new THREE.PlaneGeometry(TILE_WIDTH * 0.8, TILE_WIDTH * 0.8);
            const material = new THREE.MeshBasicMaterial({
                map: boomTexture,
                transparent: true,
                opacity: 1.0,
                alphaTest: 0.1,
                depthTest: false,
                depthWrite: false
            });
            
            const boomMesh = new THREE.Mesh(geometry, material);
            
            const position = getUnitPosition(unit);
            if (position) {
                const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
                const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
                boomMesh.position.set(worldX, worldY, 2.5);
                
                SCENE_GLOBAL.add(boomMesh);
                
                setTimeout(() => {
                    if (SCENE_GLOBAL) {
                        SCENE_GLOBAL.remove(boomMesh);
                    }
                }, 500);
            }
        });
        
        // Start flicker animation
        this.flickerUnit(unit);
    }
    
    private flickerUnit(unit: Unit, getUnitMesh?: (unit: Unit) => THREE.Mesh | undefined): void {
        // If no getUnitMesh function provided, try to access it directly (for backward compatibility)
        let unitMesh: THREE.Mesh | undefined;
        
        if (getUnitMesh) {
            unitMesh = getUnitMesh(unit);
        } else {
            // Fallback - this assumes we can access the UnitRenderer somehow
            // In practice, we'll pass the getUnitMesh function from GameScene
            console.warn('No getUnitMesh function provided to flickerUnit');
            return;
        }
        
        if (!unitMesh) return;
        
        const originalOpacity = (unitMesh.material as THREE.MeshBasicMaterial).opacity;
        
        const flickerSequence = [
            { opacity: 0.2, delay: 100 },
            { opacity: originalOpacity, delay: 200 },
            { opacity: 0.2, delay: 300 },
            { opacity: originalOpacity, delay: 400 }
        ];
        
        flickerSequence.forEach(({ opacity, delay }) => {
            setTimeout(() => {
                if (unitMesh && unitMesh.material) {
                    const material = unitMesh.material as THREE.MeshBasicMaterial;
                    material.opacity = opacity;
                    material.transparent = true;
                }
            }, delay);
        });
    }

    public showDeathAnimation(
        unit: Unit, 
        getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined,
        onAnimationComplete?: () => void
    ): void {
        if (!SCENE_GLOBAL) return;

        console.log(`💀 Starting death animation for ${unit.name}`);

        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        if (context) {
            context.clearRect(0, 0, 64, 64);
            context.font = '48px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = 'white';
            context.fillText('💀', 32, 32);
            
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            
            const geometry = new THREE.PlaneGeometry(TILE_WIDTH * 0.6, TILE_WIDTH * 0.6);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 1.0,
                alphaTest: 0.1,
                depthTest: false,
                depthWrite: false
            });
            
            const skullMesh = new THREE.Mesh(geometry, material);
            
            const position = getUnitPosition(unit);
            if (position) {
                const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
                const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
                skullMesh.position.set(worldX, worldY - TILE_HEIGHT * 0.3, 3);
                
                SCENE_GLOBAL.add(skullMesh);
                
                setTimeout(() => {
                    if (SCENE_GLOBAL) {
                        SCENE_GLOBAL.remove(skullMesh);
                    }
                    
                    // Call the completion callback to remove the unit
                    if (onAnimationComplete) {
                        console.log(`🗑️ Death animation complete for ${unit.name}, calling cleanup callback`);
                        onAnimationComplete();
                    }
                }, 2000);
                
                console.log(`💀 Skull animation added for ${unit.name}`);
            }
        }
    }

    public showDamageAnimationWithFlicker(
        unit: Unit, 
        getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined,
        getUnitMesh: (unit: Unit) => THREE.Mesh | undefined
    ): void {
        this.showDamageAnimation(unit, getUnitPosition);
        this.flickerUnit(unit, getUnitMesh);
    }

    public showDamageTextPopup(
        unit: Unit, 
        damage: number, 
        skillEmoji: string | null, 
        getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined
    ): void {
        if (!SCENE_GLOBAL) return;

        const position = getUnitPosition(unit);
        if (!position) return;

        // Create canvas for damage text
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        if (!context) return;

        // Clear canvas
        context.clearRect(0, 0, 128, 64);
        
        // Create damage text with emoji
        const damageText = skillEmoji ? `${skillEmoji}💥 -${damage}` : `💥 -${damage}`;
        
        // Draw text
        context.font = 'bold 24px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.fillStyle = 'white';
        
        // Draw text with outline
        context.strokeText(damageText, 64, 32);
        context.fillText(damageText, 64, 32);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        const geometry = new THREE.PlaneGeometry(TILE_WIDTH * 1.5, TILE_WIDTH * 0.75);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1.0,
            alphaTest: 0.1,
            depthTest: false,
            depthWrite: false
        });
        
        const textMesh = new THREE.Mesh(geometry, material);
        
        // Position above the unit
        const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
        textMesh.position.set(worldX, worldY - TILE_HEIGHT * 0.7, 3.0);
        
        SCENE_GLOBAL.add(textMesh);
        
        // Animate the text popup (move up and fade out)
        let startTime = Date.now();
        const animationDuration = 2000; // 2 seconds
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / animationDuration;
            
            if (progress >= 1.0) {
                // Animation complete, remove text
                if (SCENE_GLOBAL) {
                    SCENE_GLOBAL.remove(textMesh);
                }
                return;
            }
            
            // Move up and fade out
            const startY = worldY - TILE_HEIGHT * 0.7;
            const endY = worldY - TILE_HEIGHT * 1.5;
            textMesh.position.y = startY + (endY - startY) * progress;
            
            // Fade out
            material.opacity = 1.0 - progress;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    public showHealingTextPopup(
        unit: Unit, 
        healAmount: number, 
        skillEmoji: string, 
        getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined
    ): void {
        if (!SCENE_GLOBAL) return;

        const position = getUnitPosition(unit);
        if (!position) return;

        // Create canvas for healing text
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        if (!context) return;

        // Clear canvas
        context.clearRect(0, 0, 128, 64);
        
        // Create healing text with emoji
        const healText = `${skillEmoji}💚 +${healAmount}`;
        
        // Draw text
        context.font = 'bold 24px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.fillStyle = '#2ecc71'; // Green color for healing
        
        // Draw text with outline
        context.strokeText(healText, 64, 32);
        context.fillText(healText, 64, 32);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        const geometry = new THREE.PlaneGeometry(TILE_WIDTH * 1.5, TILE_WIDTH * 0.75);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1.0,
            alphaTest: 0.1,
            depthTest: false,
            depthWrite: false
        });
        
        const textMesh = new THREE.Mesh(geometry, material);
        
        // Position above the unit
        const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
        textMesh.position.set(worldX, worldY - TILE_HEIGHT * 0.7, 3.0);
        
        SCENE_GLOBAL.add(textMesh);
        
        // Animate the text popup (move up and fade out)
        let startTime = Date.now();
        const animationDuration = 2000; // 2 seconds
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / animationDuration;
            
            if (progress >= 1.0) {
                // Animation complete, remove text
                if (SCENE_GLOBAL) {
                    SCENE_GLOBAL.remove(textMesh);
                }
                return;
            }
            
            // Move up and fade out
            const startY = worldY - TILE_HEIGHT * 0.7;
            const endY = worldY - TILE_HEIGHT * 1.5;
            textMesh.position.y = startY + (endY - startY) * progress;
            
            // Fade out
            material.opacity = 1.0 - progress;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    public showHealingAnimation(
        unit: Unit, 
        healAmount: number, 
        skillEmoji: string,
        getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined,
        getUnitMesh?: (unit: Unit) => THREE.Mesh | undefined
    ): void {
        // Show healing text popup (no boom animation for healing)
        this.showHealingTextPopup(unit, healAmount, skillEmoji, getUnitPosition);
        
        // Add green glow effect instead of flicker
        if (getUnitMesh) {
            this.glowUnit(unit, getUnitMesh, '#2ecc71'); // Green glow for healing
        }
    }

    private glowUnit(unit: Unit, getUnitMesh: (unit: Unit) => THREE.Mesh | undefined, color: string): void {
        const unitMesh = getUnitMesh(unit);
        if (!unitMesh) return;
        
        const originalMaterial = unitMesh.material as THREE.MeshBasicMaterial;
        const originalColor = originalMaterial.color.clone();
        
        // Convert hex color to THREE.Color
        const glowColor = new THREE.Color(color);
        
        const glowSequence = [
            { color: glowColor, delay: 100 },
            { color: originalColor, delay: 200 },
            { color: glowColor, delay: 300 },
            { color: originalColor, delay: 400 }
        ];
        
        glowSequence.forEach(({ color, delay }) => {
            setTimeout(() => {
                if (unitMesh && unitMesh.material) {
                    const material = unitMesh.material as THREE.MeshBasicMaterial;
                    material.color.copy(color);
                }
            }, delay);
        });
    }

    public showSkillDamageAnimation(
        unit: Unit, 
        damage: number, 
        skillEmoji: string,
        getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined,
        getUnitMesh?: (unit: Unit) => THREE.Mesh | undefined
    ): void {
        // Show both boom animation and damage text with skill emoji
        this.showDamageAnimation(unit, getUnitPosition);
        this.showDamageTextPopup(unit, damage, skillEmoji, getUnitPosition);
        
        // Add flicker effect if getUnitMesh is provided
        if (getUnitMesh) {
            this.flickerUnit(unit, getUnitMesh);
        }
    }

    public showSkillEffectAnimation(
        unit: Unit, 
        amount: number, 
        skillEmoji: string,
        getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined,
        getUnitMesh?: (unit: Unit) => THREE.Mesh | undefined,
        isHealing: boolean = false
    ): void {
        if (isHealing) {
            this.showHealingAnimation(unit, amount, skillEmoji, getUnitPosition, getUnitMesh);
        } else {
            this.showSkillDamageAnimation(unit, amount, skillEmoji, getUnitPosition, getUnitMesh);
        }
    }

    /**
     * Show a debuff/buff effect animation with only emoji, no damage numbers
     * Used for skills like Exhaust that apply modifiers but don't deal damage
     */
    public showDebuffEffectAnimation(
        unit: Unit, 
        skillEmoji: string,
        getUnitPosition: (unit: Unit) => { x: number; y: number } | undefined,
        getUnitMesh?: (unit: Unit) => THREE.Mesh | undefined
    ): void {
        if (!SCENE_GLOBAL) return;

        const position = getUnitPosition(unit);
        if (!position) return;

        // Create canvas for emoji text (no damage numbers)
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        if (!context) return;

        // Clear canvas
        context.clearRect(0, 0, 128, 64);
        
        // Create emoji text without damage numbers
        const effectText = `${skillEmoji}`;
        
        // Draw text
        context.font = 'bold 32px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.fillStyle = '#9b59b6'; // Purple color for debuffs
        
        // Draw text with outline
        context.strokeText(effectText, 64, 32);
        context.fillText(effectText, 64, 32);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        const geometry = new THREE.PlaneGeometry(TILE_WIDTH * 1.2, TILE_WIDTH * 0.6);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1.0,
            alphaTest: 0.1,
            depthTest: false,
            depthWrite: false
        });
        
        const textMesh = new THREE.Mesh(geometry, material);
        
        // Position above the unit
        const worldX = position.x * TILE_WIDTH + TILE_WIDTH / 2;
        const worldY = -position.y * TILE_HEIGHT - TILE_HEIGHT / 2;
        textMesh.position.set(worldX, worldY - TILE_HEIGHT * 0.7, 3.0);
        
        SCENE_GLOBAL.add(textMesh);
        
        // Animate the text popup (move up and fade out)
        let startTime = Date.now();
        const animationDuration = 1500; // 1.5 seconds
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / animationDuration;
            
            if (progress >= 1.0) {
                // Animation complete, remove text
                if (SCENE_GLOBAL) {
                    SCENE_GLOBAL.remove(textMesh);
                }
                return;
            }
            
            // Move up and fade out
            const startY = worldY - TILE_HEIGHT * 0.7;
            const endY = worldY - TILE_HEIGHT * 1.2;
            textMesh.position.y = startY + (endY - startY) * progress;
            
            // Fade out
            material.opacity = 1.0 - progress;
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Add flicker effect if getUnitMesh is provided (slight purple tint for debuffs)
        if (getUnitMesh) {
            const unitMesh = getUnitMesh(unit);
            if (unitMesh && unitMesh.material && (unitMesh.material as THREE.MeshBasicMaterial).color) {
                const material = unitMesh.material as THREE.MeshBasicMaterial;
                const originalColor = material.color.clone();
                material.color.setHex(0x9b59b6); // Purple tint for debuffs
                
                setTimeout(() => {
                    if (material) {
                        material.color.copy(originalColor);
                    }
                }, 300);
            }
        }
    }
} 