// Debug mode state management
let debugModeEnabled = false;

export function setDebugMode(enabled: boolean): void {
    debugModeEnabled = enabled;
    console.log(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
}

export function isDebugModeEnabled(): boolean {
    return debugModeEnabled;
}

export function getDebugModeStatus(): string {
    return debugModeEnabled ? 'ON' : 'OFF';
}

// Combat-specific debug functions
export function shouldPlayerControlEnemies(): boolean {
    return debugModeEnabled;
}

export function shouldUseEnemyAI(): boolean {
    return !debugModeEnabled;
}

// Utility functions for combat debugging
export function logDebugInfo(message: string, data?: any): void {
    if (debugModeEnabled) {
        console.log(`[DEBUG] ${message}`, data || '');
    }
}

export function debugAlert(message: string): void {
    if (debugModeEnabled) {
        console.warn(`[DEBUG ALERT] ${message}`);
    }
}

// Function to be used in future turn management
export function getCurrentTurnController(): 'player' | 'ai' {
    return debugModeEnabled ? 'player' : 'ai';
} 