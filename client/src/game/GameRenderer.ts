import * as THREE from 'three';

let animationId: number | null = null;
let renderState: {
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.OrthographicCamera | null;
} = {
    renderer: null,
    scene: null,
    camera: null
};

export function initializeRenderer(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.OrthographicCamera
) {
    renderState.renderer = renderer;
    renderState.scene = scene;
    renderState.camera = camera;
}

function animate() {
    animationId = requestAnimationFrame(animate);
    if (renderState.renderer && renderState.scene && renderState.camera) {
        renderState.renderer.render(renderState.scene, renderState.camera);
    }
}

export function startAnimation() {
    animate();
    console.log('Animation loop started');
}

export function stopAnimation() {
    if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
        console.log('Animation loop stopped');
    }
}

export function cleanupRenderer() {
    stopAnimation();
    
    if (renderState.renderer) {
        renderState.renderer.dispose();
        if (renderState.renderer.domElement.parentNode) {
            renderState.renderer.domElement.parentNode.removeChild(renderState.renderer.domElement);
        }
    }
    
    if (renderState.scene) {
        // Dispose geometries, materials, textures in the scene if necessary
        renderState.scene.traverse(object => {
            if (object instanceof THREE.Mesh) {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            }
        });
    }
    
    renderState.renderer = null;
    renderState.scene = null;
    renderState.camera = null;
    
    console.log('Renderer cleaned up.');
} 