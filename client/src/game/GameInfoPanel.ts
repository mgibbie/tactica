import { Unit } from '../units/Unit';
import { ModifierService } from './ModifierService';
import { MODIFIER_DEX } from '../units/ModifierDex';
import { TileEffectInstance, globalTileEffectManager } from './TileEffect';
import { globalUnitRegistry } from '../units/UnitRegistry';

let gameInfoPanel: HTMLElement | null = null;

export function createGameInfoPanel(appContainer: HTMLElement): HTMLElement {
    const panel = document.createElement('div');
    panel.id = 'game-info-panel';
    panel.style.position = 'absolute';
    panel.style.bottom = '20px';
    panel.style.right = '20px';
    panel.style.width = '280px';
    panel.style.minHeight = '120px';
    panel.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    panel.style.color = 'white';
    panel.style.padding = '15px';
    panel.style.borderRadius = '8px';
    panel.style.border = '2px solid #555';
    panel.style.display = 'none'; // Hidden by default
    panel.style.zIndex = '101'; // Above other UI elements
    panel.style.pointerEvents = 'none'; // Don't interfere with mouse events
    panel.style.fontSize = '0.9em';
    panel.style.fontFamily = 'Arial, sans-serif';
    panel.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    
    // Add a subtle border glow effect
    panel.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.5)';
    
    appContainer.appendChild(panel);
    return panel;
}

export function updateGameInfoPanelContent(unit: Unit) {
    if (!gameInfoPanel) return;
    
    // Determine team color for header styling
    const teamColor = unit.team === 'player' ? '#3498db' : 
                     unit.team === 'enemy' ? '#e74c3c' : '#95a5a6';
    
    // Calculate percentages for bars
    const healthPercent = Math.max(0, Math.min(100, (unit.currentHealth / unit.health) * 100));
    const energyPercent = unit.maxEnergy > 0 ? Math.max(0, Math.min(100, (unit.currentEnergy / unit.maxEnergy) * 100)) : 0;
    
    gameInfoPanel.innerHTML = `
        <div style="border-bottom: 1px solid ${teamColor}; margin-bottom: 10px; padding-bottom: 8px;">
            <h4 style="margin: 0; text-align: center; color: ${teamColor}; font-size: 1.1em;">
                ${unit.name}
            </h4>
            <p style="margin: 2px 0; text-align: center; font-style: italic; color: #bdc3c7; font-size: 0.85em;">
                ${unit.className} (${unit.team || 'neutral'}) - Level ${unit.level} - ${unit.energyType}
            </p>
        </div>
        
        <!-- Health Bar -->
        <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                <span style="font-size: 0.8em; color: #2ecc71;"><strong>Health</strong></span>
                <span style="font-size: 0.75em; color: #bdc3c7;">${unit.currentHealth}/${unit.health}</span>
            </div>
            <div style="width: 100%; height: 8px; background-color: #333; border-radius: 4px; overflow: hidden;">
                <div style="width: ${healthPercent}%; height: 100%; background-color: #2ecc71; transition: width 0.3s ease;"></div>
            </div>
        </div>
        
        <!-- Energy Bar -->
        <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                <span style="font-size: 0.8em; color: #3498db;"><strong>Energy</strong></span>
                <span style="font-size: 0.75em; color: #bdc3c7;">${unit.currentEnergy}/${unit.maxEnergy}</span>
            </div>
            <div style="width: 100%; height: 8px; background-color: #333; border-radius: 4px; overflow: hidden;">
                <div style="width: ${energyPercent}%; height: 100%; background-color: #3498db; transition: width 0.3s ease;"></div>
            </div>
        </div>
        
        <!-- Unit Stats Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.85em;">
            <div>
                <p style="margin: 3px 0;"><strong>Range:</strong> ${unit.range}</p>
                <p style="margin: 3px 0;"><strong>Move:</strong> ${unit.move}</p>
            </div>
            <div>
                <p style="margin: 3px 0;"><strong>Basic Dmg:</strong> ${unit.basicDamage}</p>
                <p style="margin: 3px 0;"><strong>Skill Dmg:</strong> ${unit.skillDamage}</p>
            </div>
        </div>
        
        <!-- Skills Section -->
        ${unit.skills && unit.skills.length > 0 ? `
            <div style="margin-top: 12px; border-top: 1px solid #555; padding-top: 8px;">
                <h5 style="margin: 0 0 6px 0; color: #8e44ad; font-size: 0.9em;">Skills:</h5>
                ${unit.skills.map(skill => `
                    <div style="margin-bottom: 4px; padding: 4px 6px; background-color: rgba(142, 68, 173, 0.1); border-radius: 3px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: bold; color: #8e44ad; font-size: 0.8em;">${skill.emoji} ${skill.name}</span>
                            <span style="color: #3498db; font-size: 0.75em;">${skill.energyCost} ⚡</span>
                        </div>
                        <p style="margin: 2px 0 0 0; font-size: 0.7em; color: #bdc3c7; line-height: 1.2;">
                            ${skill.description}
                        </p>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <!-- Modifiers Section -->
        ${unit.activeModifiers && unit.activeModifiers.length > 0 ? `
            <div style="margin-top: 12px; border-top: 1px solid #555; padding-top: 8px;">
                <h5 style="margin: 0 0 6px 0; color: #f39c12; font-size: 0.9em;">Active Modifiers:</h5>
                ${unit.activeModifiers.map(modifier => {
                    const modifierDef = MODIFIER_DEX[modifier.modifierKey];
                    const color = ModifierService.getModifierColor(modifier.modifierKey);
                    return `
                        <div style="margin-bottom: 4px; padding: 4px 6px; background-color: rgba(243, 156, 18, 0.1); border-radius: 3px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: bold; color: ${color}; font-size: 0.8em;">${modifierDef?.name || modifier.modifierKey}</span>
                                <span style="color: #f39c12; font-size: 0.75em;">x${modifier.stacks}</span>
                            </div>
                            <p style="margin: 2px 0 0 0; font-size: 0.7em; color: #bdc3c7; line-height: 1.2;">
                                ${modifierDef?.description || 'Unknown modifier effect'}
                            </p>
                        </div>
                    `;
                }).join('')}
            </div>
        ` : ''}
    `;
}

export function showGameInfoPanel(unit: Unit) {
    if (!gameInfoPanel) return;
    updateGameInfoPanelContent(unit);
    gameInfoPanel.style.display = 'block';
}

export function hideGameInfoPanel() {
    if (!gameInfoPanel) return;
    gameInfoPanel.style.display = 'none';
}

/**
 * Show tile effect information in the info panel
 */
export function showTileEffectInfo(effects: TileEffectInstance[], position: { x: number; y: number }) {
    if (!gameInfoPanel || effects.length === 0) return;
    
    gameInfoPanel.innerHTML = `
        <div style="border-bottom: 1px solid #f39c12; margin-bottom: 10px; padding-bottom: 8px;">
            <h4 style="margin: 0; text-align: center; color: #f39c12; font-size: 1.1em;">
                Tile Effects
            </h4>
            <p style="margin: 2px 0; text-align: center; font-style: italic; color: #bdc3c7; font-size: 0.85em;">
                Position: (${position.x}, ${position.y})
            </p>
        </div>
        
        ${effects.map(effect => {
            const definition = globalTileEffectManager.getEffectDefinition(effect.effectId);
            if (!definition) return '';
            
            // Get effect-specific styling
            const effectColor = getEffectColor(effect.effectId);
            const effectName = definition.name;
            const effectDescription = definition.description;
            const effectIcon = definition.icon;
            
            // Resolve the appliedBy unit ID to show name and class with team colors
            let appliedByText = '';
            if (effect.appliedBy) {
                const creatorUnit = findCreatorUnitById(effect.appliedBy);
                if (creatorUnit) {
                    const teamColor = creatorUnit.team === 'player' ? '#e74c3c' : '#3498db'; // Red for ally, blue for enemy
                    appliedByText = `<span style="color: ${teamColor}; font-weight: bold;">${creatorUnit.name} (${creatorUnit.className})</span>`;
                } else {
                    appliedByText = effect.appliedBy; // Fallback to ID if unit not found
                }
            }
            
            return `
                <div style="margin-bottom: 12px; padding: 8px; background-color: rgba(243, 156, 18, 0.1); border-radius: 6px; border-left: 3px solid ${effectColor};">
                    <div style="display: flex; align-items: center; margin-bottom: 6px;">
                        <span style="font-size: 1.2em; margin-right: 8px;">${effectIcon}</span>
                        <div>
                            <h5 style="margin: 0; color: ${effectColor}; font-size: 0.9em;">${effectName}</h5>
                            <p style="margin: 0; font-size: 0.7em; color: #bdc3c7;">
                                ${effect.duration === -1 ? 'Permanent' : `Duration: ${effect.duration} turns`}
                            </p>
                        </div>
                    </div>
                    <p style="margin: 0; font-size: 0.8em; color: #ecf0f1; line-height: 1.3;">
                        ${effectDescription}
                    </p>
                    ${appliedByText ? `
                        <p style="margin: 4px 0 0 0; font-size: 0.7em; color: #95a5a6; font-style: italic;">
                            Applied by: ${appliedByText}
                        </p>
                    ` : ''}
                </div>
            `;
        }).join('')}
        
        <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #555; font-size: 0.7em; color: #7f8c8d; text-align: center;">
            💡 Hover over units to see their information
        </div>
    `;
    
    gameInfoPanel.style.display = 'block';
}

/**
 * Get color for different tile effects
 */
function getEffectColor(effectId: string): string {
    switch (effectId) {
        case 'toxic-tile':
            return '#9b59b6'; // Purple for toxic
        case 'spotlight':
            return '#f1c40f'; // Gold for spotlight
        case 'spike-trap':
            return '#e74c3c'; // Red for damage
        case 'healing-spring':
            return '#2ecc71'; // Green for healing
        case 'energy-well':
            return '#3498db'; // Blue for energy
        default:
            return '#95a5a6'; // Gray default
    }
}

/**
 * Helper function to find a unit by ID across all registries
 */
function findCreatorUnitById(unitId: string): Unit | null {
    // Check player units
    for (const unit of globalUnitRegistry.playerParty) {
        if (unit.id === unitId) return unit;
    }
    
    // Check enemy units
    for (const unit of globalUnitRegistry.enemyUnits) {
        if (unit.id === unitId) return unit;
    }
    
    return null;
}

/**
 * Check if a position has tile effects and return them
 */
export function getTileEffectsAtPosition(x: number, y: number): TileEffectInstance[] {
    return globalTileEffectManager.getEffectsAtPosition({ x, y });
}

export function initializeGameInfoPanel(appContainer: HTMLElement) {
    gameInfoPanel = createGameInfoPanel(appContainer);
    console.log('Game info panel initialized');
}

export function cleanupGameInfoPanel() {
    if (gameInfoPanel && gameInfoPanel.parentNode) {
        gameInfoPanel.parentNode.removeChild(gameInfoPanel);
    }
    gameInfoPanel = null;
} 