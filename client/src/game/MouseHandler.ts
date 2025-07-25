import * as THREE from 'three';
import { GAME_COORDS_DISPLAY_ELEMENT_MAIN, GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { TiledMap } from './TiledMapTypes';
import { showGameInfoPanel, hideGameInfoPanel, showTileEffectInfo, getTileEffectsAtPosition } from './GameInfoPanel';
import { Unit } from '../units/Unit';

// This will need to be injected from the main game file
let gameState: {
    mapData: TiledMap | null;
    hoverMesh: THREE.Mesh | null;
    renderer: THREE.WebGLRenderer | null;
    displayScale: number;
} = {
    mapData: null,
    hoverMesh: null,
    renderer: null,
    displayScale: 1
};

let currentHoveredUnit: Unit | null = null;

export function initializeMouseHandler(
    mapData: TiledMap,
    hoverMesh: THREE.Mesh,
    renderer: THREE.WebGLRenderer,
    displayScale: number
) {
    gameState.mapData = mapData;
    gameState.hoverMesh = hoverMesh;
    gameState.renderer = renderer;
    gameState.displayScale = displayScale;
}

export function handleMouseMove(event: MouseEvent) {
    if (!gameState.mapData || !GAME_COORDS_DISPLAY_ELEMENT_MAIN || !gameState.hoverMesh || !gameState.renderer) return;

    const INTERNAL_SCALE = 4; // Same scale as used in startGame
    const canvas = gameState.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if mouse is actually within the canvas bounds
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    
    if (mouseX < 0 || mouseY < 0 || mouseX >= canvasWidth || mouseY >= canvasHeight) {
        // Mouse is outside canvas bounds
        GAME_COORDS_DISPLAY_ELEMENT_MAIN.innerText = 'Outside map';
        gameState.hoverMesh.visible = false;
        canvas.style.cursor = 'default';
        return;
    }

    const sceneMouseX = mouseX / gameState.displayScale;
    const sceneMouseY = mouseY / gameState.displayScale;

    const scaledTileWidth = gameState.mapData.tilewidth * INTERNAL_SCALE;
    const scaledTileHeight = gameState.mapData.tileheight * INTERNAL_SCALE;

    const gridX = Math.floor(sceneMouseX / scaledTileWidth);
    const gridY = Math.floor(sceneMouseY / scaledTileHeight);

    if (gridX >= 0 && gridX < gameState.mapData.width && gridY >= 0 && gridY < gameState.mapData.height) {
        GAME_COORDS_DISPLAY_ELEMENT_MAIN.innerText = `Tile: (${gridX}, ${gridY})`;

        gameState.hoverMesh.position.x = gridX * scaledTileWidth + scaledTileWidth / 2;
        gameState.hoverMesh.position.y = -gridY * scaledTileHeight - scaledTileHeight / 2;
        gameState.hoverMesh.visible = true;

        // Check if there's a unit at this position
        const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
        if (gameSceneInstance) {
            const unitAtPosition = gameSceneInstance.getUnitAtPosition(gridX, gridY);
            
            // Update cursor based on unit selectability
            if (unitAtPosition && GAME_TURN_MANAGER && GAME_TURN_MANAGER.canSelect() && GAME_TURN_MANAGER.canSelectUnit(unitAtPosition.id)) {
                canvas.style.cursor = 'pointer'; // Show pointer for selectable units
            } else {
                canvas.style.cursor = 'none'; // Hide cursor for non-selectable areas
            }
            
            // Update info panel based on hovered unit
            if (unitAtPosition && unitAtPosition !== currentHoveredUnit) {
                currentHoveredUnit = unitAtPosition;
                showGameInfoPanel(unitAtPosition);
            } else if (!unitAtPosition && currentHoveredUnit) {
                currentHoveredUnit = null;
                
                // Check for tile effects at this position when there's no unit
                const tileEffects = getTileEffectsAtPosition(gridX, gridY);
                if (tileEffects.length > 0) {
                    // Show tile effect information
                    showTileEffectInfo(tileEffects, { x: gridX, y: gridY });
                } else {
                    // No unit and no tile effects, hide panel
                    hideGameInfoPanel();
                }
            } else if (!unitAtPosition) {
                // Still no unit at position, check if tile effects changed
                const tileEffects = getTileEffectsAtPosition(gridX, gridY);
                if (tileEffects.length > 0) {
                    // Show tile effect information
                    showTileEffectInfo(tileEffects, { x: gridX, y: gridY });
                } else if (!currentHoveredUnit) {
                    // No unit and no tile effects, hide panel
                    hideGameInfoPanel();
                }
            }
        } else {
            canvas.style.cursor = 'none'; // Hide cursor
        }
    } else {
        GAME_COORDS_DISPLAY_ELEMENT_MAIN.innerText = 'Outside map';
        gameState.hoverMesh.visible = false;
        canvas.style.cursor = 'default'; // Show cursor
        
        // Hide info panel when outside map
        if (currentHoveredUnit) {
            currentHoveredUnit = null;
            hideGameInfoPanel();
        }
    }
}

export function handleMouseClick(event: MouseEvent) {
    if (!gameState.mapData || !gameState.renderer || !GAME_TURN_MANAGER) return;

    const INTERNAL_SCALE = 4; // Same scale as used in startGame
    const canvas = gameState.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if mouse is within canvas bounds
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    
    if (mouseX < 0 || mouseY < 0 || mouseX >= canvasWidth || mouseY >= canvasHeight) {
        return; // Click outside canvas
    }

    const sceneMouseX = mouseX / gameState.displayScale;
    const sceneMouseY = mouseY / gameState.displayScale;

    const scaledTileWidth = gameState.mapData.tilewidth * INTERNAL_SCALE;
    const scaledTileHeight = gameState.mapData.tileheight * INTERNAL_SCALE;

    const gridX = Math.floor(sceneMouseX / scaledTileWidth);
    const gridY = Math.floor(sceneMouseY / scaledTileHeight);

    if (gridX >= 0 && gridX < gameState.mapData.width && gridY >= 0 && gridY < gameState.mapData.height) {
        // Check if there's a unit at this position
        const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
        if (gameSceneInstance) {
            const unitAtPosition = gameSceneInstance.getUnitAtPosition(gridX, gridY);
            
            // Handle clicks based on current phase
            if (GAME_TURN_MANAGER && GAME_TURN_MANAGER.canSelect()) {
                // SELECT phase - try to select units
                if (unitAtPosition) {
                    // CRITICAL FIX: Only allow selection of units that are actually selectable
                    // (i.e., units that should have select indicators)
                    const selectableUnits = GAME_TURN_MANAGER.getSelectableUnits();
                    const isUnitSelectable = selectableUnits.some(unit => unit.id === unitAtPosition.id);
                    
                    if (isUnitSelectable) {
                        const success = gameSceneInstance.selectUnit(unitAtPosition);
                        if (success) {
                            console.log(`✅ Successfully selected unit: ${unitAtPosition.name}`);
                            // CRITICAL FIX: Advance phase after successful unit selection
                            GAME_TURN_MANAGER.advancePhase();
                        } else {
                            console.log(`❌ Failed to select unit: ${unitAtPosition.name}`);
                        }
                    } else {
                        console.log(`❌ Unit not selectable: ${unitAtPosition.name}`);
                    }
                }
            } else if (GAME_TURN_MANAGER && GAME_TURN_MANAGER.canAct()) {
                // ACTION phase - try to select attack target
                // Let ActionManager validate if the target is valid (enemy unit for basic attacks, any tile for skills)
                const success = gameSceneInstance.selectAttackTarget(gridX, gridY);
                if (success) {
                    if (unitAtPosition) {
                        console.log(`✅ Successfully selected attack target: ${unitAtPosition.name} at (${gridX}, ${gridY})`);
                    } else {
                        console.log(`✅ Successfully selected attack target position: (${gridX}, ${gridY})`);
                    }
                } else {
                    if (unitAtPosition) {
                        console.log(`❌ Invalid attack target: ${unitAtPosition.name} at (${gridX}, ${gridY})`);
                    } else {
                        console.log(`❌ Invalid attack target position: (${gridX}, ${gridY})`);
                    }
                }
            } else if (GAME_TURN_MANAGER && GAME_TURN_MANAGER.canMove()) {
                // MOVE phase - try to select movement target (only empty tiles)
                if (!unitAtPosition) {
                    const success = gameSceneInstance.selectMoveTarget(gridX, gridY);
                    if (success) {
                        console.log(`✅ Successfully selected move target: (${gridX}, ${gridY})`);
                    } else {
                        console.log(`❌ Invalid move target: (${gridX}, ${gridY})`);
                    }
                }
            }
        }
    }
}

export function handleMouseLeave() {
    if (gameState.hoverMesh && GAME_COORDS_DISPLAY_ELEMENT_MAIN) {
        gameState.hoverMesh.visible = false;
        GAME_COORDS_DISPLAY_ELEMENT_MAIN.innerText = 'Outside map';
        if (gameState.renderer) {
            gameState.renderer.domElement.style.cursor = 'default';
        }
    }
    
    // Hide info panel when mouse leaves canvas
    if (currentHoveredUnit) {
        currentHoveredUnit = null;
        hideGameInfoPanel();
    }
}

export function attachMouseHandlers(renderer: THREE.WebGLRenderer) {
    renderer.domElement.addEventListener('mousemove', handleMouseMove, false);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave, false);
    renderer.domElement.addEventListener('click', handleMouseClick, false);
}

export function detachMouseHandlers(renderer: THREE.WebGLRenderer) {
    renderer.domElement.removeEventListener('mousemove', handleMouseMove);
    renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
    renderer.domElement.removeEventListener('click', handleMouseClick);
} 