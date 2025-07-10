import { Unit } from '../units/Unit';
import { ModifierService } from './ModifierService';
import { MODIFIER_DEX } from '../units/ModifierDex';

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