import { Globe } from './Globe';

// Global state for the selected globe
export let selectedGlobe: Globe | null = null;

export function setSelectedGlobe(globe: Globe | null): void {
    selectedGlobe = globe;
}

export function getSelectedGlobe(): Globe | null {
    return selectedGlobe;
}

export function clearSelectedGlobe(): void {
    selectedGlobe = null;
} 