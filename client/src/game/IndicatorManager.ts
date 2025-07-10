import * as THREE from 'three';
import hoverSelectImageUrl from '../assets/Images/hoverselect.png';
import { Skill } from '../units/Skill';
import { SCENE_GLOBAL } from '../game';
import { AttackData } from './ActionState';

let TILE_WIDTH = 32;
let TILE_HEIGHT = 32;

export function setTileSizeForIndicators(width: number, height: number) {
    TILE_WIDTH = width;
    TILE_HEIGHT = height;
}

export class IndicatorManager {
    private textureLoader = new THREE.TextureLoader();
    private hoverSelectTexture: THREE.Texture | null = null;
    private attackIndicators: THREE.Mesh[] = [];
    private skillTargetIndicators: THREE.Mesh[] = [];
    private skillPreviewIndicators: THREE.Mesh[] = [];

    constructor() {
        this.loadHoverSelectTexture();
    }

    private async loadHoverSelectTexture(): Promise<void> {
        this.hoverSelectTexture = await this.textureLoader.loadAsync(hoverSelectImageUrl);
        this.hoverSelectTexture.magFilter = THREE.NearestFilter;
        this.hoverSelectTexture.minFilter = THREE.NearestFilter;
    }

    public clearAllIndicators(): void {
        this.clearAttackIndicators();
        this.clearSkillTargetIndicators();
        this.clearSkillPreviewIndicators();
    }

    // Attack indicator methods
    public createAttackIndicators(attackData: AttackData): void {
        console.log('🎯 Creating attack indicators');
        
        this.clearAttackIndicators();
        
        if (!attackData || !this.hoverSelectTexture || !SCENE_GLOBAL) {
            console.warn("❌ Cannot create attack indicators - missing data, texture, or scene");
            return;
        }

        attackData.validTiles.forEach(tile => {
            const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
            const material = new THREE.MeshBasicMaterial({
                map: this.hoverSelectTexture,
                transparent: true,
                opacity: 0.7,
                color: 0xff0000 // Red tint for attack indicators
            });

            const indicatorMesh = new THREE.Mesh(geometry, material);
            
            indicatorMesh.position.set(
                tile.x * TILE_WIDTH + TILE_WIDTH / 2,
                -tile.y * TILE_HEIGHT - TILE_HEIGHT / 2,
                0.4 // Slightly above ground but below units
            );

            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.add(indicatorMesh);
                this.attackIndicators.push(indicatorMesh);
            }
        });
        
        console.log(`✅ Created ${attackData.validTiles.length} attack indicators`);
    }

    public clearAttackIndicators(): void {
        this.attackIndicators.forEach(mesh => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
            }
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
                mesh.material.dispose();
            }
        });
        this.attackIndicators = [];
        console.log("🧹 Cleared attack indicators");
    }

    // Skill target indicator methods
    public createSkillTargetIndicators(validTargets: { x: number; y: number }[]): void {
        console.log('✨ Creating skill target indicators');
        
        this.clearSkillTargetIndicators();
        
        if (!validTargets.length || !this.hoverSelectTexture || !SCENE_GLOBAL) {
            console.warn("❌ Cannot create skill target indicators - missing data, texture, or scene");
            return;
        }

        validTargets.forEach(target => {
            const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
            const material = new THREE.MeshBasicMaterial({
                map: this.hoverSelectTexture,
                transparent: true,
                opacity: 0.7,
                color: 0x00ff00 // Green for skill targets
            });

            const indicatorMesh = new THREE.Mesh(geometry, material);
            
            indicatorMesh.position.set(
                target.x * TILE_WIDTH + TILE_WIDTH / 2,
                -target.y * TILE_HEIGHT - TILE_HEIGHT / 2,
                0.4 // Same level as attack indicators
            );

            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.add(indicatorMesh);
                this.skillTargetIndicators.push(indicatorMesh);
            }
        });
        
        console.log(`✅ Created ${validTargets.length} skill target indicators`);
    }

    public clearSkillTargetIndicators(): void {
        this.skillTargetIndicators.forEach(mesh => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
            }
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
                mesh.material.dispose();
            }
        });
        this.skillTargetIndicators = [];
        console.log("🧹 Cleared skill target indicators");
    }

    // Skill preview indicator methods
    public showSkillPreview(skill: Skill, x: number, y: number, rotation: number): void {
        console.log(`👁️ Showing skill preview at (${x}, ${y})`);
        
        this.clearSkillPreviewIndicators();
        
        if (!skill || !this.hoverSelectTexture || !SCENE_GLOBAL) {
            console.warn("❌ Cannot show skill preview - missing skill, texture, or scene");
            return;
        }
        
        const targetPattern = skill.getTargetPattern(x, y, 'north', rotation);
        
        targetPattern.forEach(target => {
            // Check if target is within map bounds
            if (target.x >= 0 && target.x < 8 && target.y >= 0 && target.y < 8) {
                const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
                const material = new THREE.MeshBasicMaterial({
                    map: this.hoverSelectTexture,
                    transparent: true,
                    opacity: 0.6,
                    color: target.isPrimary ? 0xff8800 : 0xffff00 // Orange for primary, yellow for secondary
                });

                const indicatorMesh = new THREE.Mesh(geometry, material);
                
                indicatorMesh.position.set(
                    target.x * TILE_WIDTH + TILE_WIDTH / 2,
                    -target.y * TILE_HEIGHT - TILE_HEIGHT / 2,
                    0.5 // Above attack indicators
                );

                if (SCENE_GLOBAL) {
                    SCENE_GLOBAL.add(indicatorMesh);
                    this.skillPreviewIndicators.push(indicatorMesh);
                }
            }
        });
        
        console.log(`✅ Created ${targetPattern.length} skill preview indicators`);
    }

    public clearSkillPreviewIndicators(): void {
        this.skillPreviewIndicators.forEach(mesh => {
            if (SCENE_GLOBAL) {
                SCENE_GLOBAL.remove(mesh);
            }
            mesh.geometry.dispose();
            if (mesh.material instanceof THREE.Material) {
                mesh.material.dispose();
            }
        });
        this.skillPreviewIndicators = [];
        console.log("🧹 Cleared skill preview indicators");
    }
} 