import * as THREE from 'three';
// import tiledMapDataJson from './assets/Maps/TacticaMap.tmj'; // Will be fetched
// Use static asset URLs from public folder
import tilesetImageUrl from './assets/Images/Overworld.png';
import hoverSelectImageUrl from './assets/Images/hoverselect.png';
import { setTileSize } from './game/GameScene';
// import { mainPlayer } from './game/Player'; // REMOVED import
import { TiledMap } from './game/TiledMapTypes';
import { createFullTilemapMesh } from './game/TilemapRenderer';
import { initializeMouseHandler, attachMouseHandlers, detachMouseHandlers } from './game/MouseHandler';
import { initializeRenderer, startAnimation, cleanupRenderer } from './game/GameRenderer';

// Game-specific global-like variables
export let HOVER_SELECTOR_MESH: THREE.Mesh | null = null;
let COORDS_DISPLAY_ELEMENT: HTMLDivElement | null = null;
let TMAP_DATA_GLOBAL: TiledMap | null = null;
let DISPLAY_SCALE_GLOBAL: number = 1;
export let RENDERER_GLOBAL: THREE.WebGLRenderer | null = null;
export let SCENE_GLOBAL: THREE.Scene | null = null;
export let CAMERA_GLOBAL: THREE.OrthographicCamera | null = null;
export let GAME_SCENE_INSTANCE: any = null; // Will hold the current GameScene instance




export async function startGame(container: HTMLElement) {
    // Define internal scale first so it can be used throughout
    const INTERNAL_SCALE = 4; // Render map 4x larger internally
    
    try {
        const response = await fetch('./TacticaMap.tmj');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        TMAP_DATA_GLOBAL = await response.json() as TiledMap;
        console.log('Tiled Map Data Loaded via fetch:', TMAP_DATA_GLOBAL);
        
        // Set the tile size for the GameScene (scaled up)
        setTileSize(TMAP_DATA_GLOBAL.tilewidth * INTERNAL_SCALE, TMAP_DATA_GLOBAL.tileheight * INTERNAL_SCALE);
        console.log(`Tile size set to ${TMAP_DATA_GLOBAL.tilewidth * INTERNAL_SCALE}x${TMAP_DATA_GLOBAL.tileheight * INTERNAL_SCALE}`);
        
    } catch (error) {
        console.error('Error loading Tiled map data via fetch:', error);
        return;
    }

    if (!TMAP_DATA_GLOBAL) return;

    // Initialize Three.js scene
    SCENE_GLOBAL = new THREE.Scene();
    SCENE_GLOBAL.background = new THREE.Color(0x222222);
    console.log('Three.js scene initialized');

    const mapPixelWidth = TMAP_DATA_GLOBAL.width * TMAP_DATA_GLOBAL.tilewidth;
    const mapPixelHeight = TMAP_DATA_GLOBAL.height * TMAP_DATA_GLOBAL.tileheight;

    // Use the internal scale defined above
    const scaledMapWidth = mapPixelWidth * INTERNAL_SCALE;
    const scaledMapHeight = mapPixelHeight * INTERNAL_SCALE;

    // Initialize camera
    CAMERA_GLOBAL = new THREE.OrthographicCamera(
        0,
        scaledMapWidth,
        0,
        -scaledMapHeight,
        1,
        1000
    );
    CAMERA_GLOBAL.position.z = 10;
    console.log('Camera initialized');

    // Initialize renderer
    RENDERER_GLOBAL = new THREE.WebGLRenderer({ 
        antialias: false, // Disable antialiasing for pixel art
        powerPreference: "high-performance"
    });
    RENDERER_GLOBAL.setSize(scaledMapWidth, scaledMapHeight);
    container.appendChild(RENDERER_GLOBAL.domElement);
    console.log('Renderer initialized');

    DISPLAY_SCALE_GLOBAL = 1; // Reduce CSS scaling since we're rendering larger internally
    RENDERER_GLOBAL.domElement.style.width = `${scaledMapWidth * DISPLAY_SCALE_GLOBAL}px`;
    RENDERER_GLOBAL.domElement.style.height = `${scaledMapHeight * DISPLAY_SCALE_GLOBAL}px`;
    RENDERER_GLOBAL.domElement.style.imageRendering = 'pixelated';
    RENDERER_GLOBAL.domElement.style.imageRendering = 'crisp-edges'; // Additional fallback for some browsers

    const textureLoader = new THREE.TextureLoader();
    let mapTexture: THREE.Texture;
    let hoverTexture: THREE.Texture;

    try {
        mapTexture = await textureLoader.loadAsync(tilesetImageUrl);
        mapTexture.magFilter = THREE.NearestFilter;
        mapTexture.minFilter = THREE.NearestFilter;
        mapTexture.flipY = false;
        console.log('Map Texture Loaded:', mapTexture);

        hoverTexture = await textureLoader.loadAsync(hoverSelectImageUrl);
        hoverTexture.magFilter = THREE.NearestFilter;
        hoverTexture.minFilter = THREE.NearestFilter;
        hoverTexture.flipY = false;
        console.log('Hover Texture Loaded:', hoverTexture);

    } catch (error) {
        console.error('Error loading textures:', error);
        return;
    }

    // Create and add map mesh
    const fullMapMesh = createFullTilemapMesh(TMAP_DATA_GLOBAL, mapTexture, INTERNAL_SCALE);
    if (fullMapMesh && SCENE_GLOBAL) {
        SCENE_GLOBAL.add(fullMapMesh);
        console.log('Map mesh added to scene');
    } else {
        console.error('Failed to create full tilemap mesh.');
    }

    // Create and add hover selector
    const selectorGeometry = new THREE.PlaneGeometry(TMAP_DATA_GLOBAL.tilewidth * INTERNAL_SCALE, TMAP_DATA_GLOBAL.tileheight * INTERNAL_SCALE);
    const selectorMaterial = new THREE.MeshBasicMaterial({
        map: hoverTexture,
        transparent: true,
        side: THREE.FrontSide
    });
    HOVER_SELECTOR_MESH = new THREE.Mesh(selectorGeometry, selectorMaterial);
    HOVER_SELECTOR_MESH.position.z = 1;
    HOVER_SELECTOR_MESH.visible = false;
    if (SCENE_GLOBAL) {
        SCENE_GLOBAL.add(HOVER_SELECTOR_MESH);
        console.log('Hover selector added to scene');
    }
    
    // Initialize mouse handler and attach events
    initializeMouseHandler(TMAP_DATA_GLOBAL, HOVER_SELECTOR_MESH, RENDERER_GLOBAL, DISPLAY_SCALE_GLOBAL);
    attachMouseHandlers(RENDERER_GLOBAL);

    // Initialize renderer and start animation
    initializeRenderer(RENDERER_GLOBAL, SCENE_GLOBAL, CAMERA_GLOBAL);
    startAnimation();

    console.log('Three.js game started successfully');
}

export function cleanupGame() {
    if (RENDERER_GLOBAL) {
        detachMouseHandlers(RENDERER_GLOBAL);
    }
    
    cleanupRenderer();
    
    // Clean up remaining global state
    RENDERER_GLOBAL = null;
    SCENE_GLOBAL = null;
    CAMERA_GLOBAL = null;
    TMAP_DATA_GLOBAL = null;
    HOVER_SELECTOR_MESH = null;
    GAME_SCENE_INSTANCE = null;
    console.log('Game cleaned up.');
} 