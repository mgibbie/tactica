import { Unit } from '../units/Unit';

let squadTooltip: HTMLElement | null = null;

export function createSquadTooltip(appContainer: HTMLElement): HTMLElement {
    const tooltip = document.createElement('div');
    tooltip.id = 'squad-tooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.border = '1px solid #ccc';
    tooltip.style.display = 'none'; // Hidden by default
    tooltip.style.zIndex = '1001'; // Ensure it's on top
    tooltip.style.pointerEvents = 'none'; // So it doesn't interfere with mouse events
    tooltip.style.fontSize = '0.9em';
    tooltip.style.maxWidth = '250px';
    appContainer.appendChild(tooltip); // Append to app container to ensure it's not clipped
    return tooltip;
}

export function updateSquadTooltipContent(unit: Unit) {
    if (!squadTooltip) return;
    squadTooltip.innerHTML = `
        <h4 style="margin: 0 0 5px 0; text-align: center;">${unit.name} (${unit.className}) - Level ${unit.level}</h4>
        <p style="margin: 3px 0;">HP: ${unit.health} | Max Energy: ${unit.maxEnergy}</p>
        <p style="margin: 3px 0;">Basic Dmg: ${unit.basicDamage} | Skill Dmg: ${unit.skillDamage}</p>
        <p style="margin: 3px 0;">Range: ${unit.range} | Move: ${unit.move}</p>
        ${unit.skills.length > 0 ? `
        <div style="margin-top: 8px; border-top: 1px solid #555; padding-top: 6px;">
            <h5 style="margin: 0 0 4px 0; color: #8e44ad; font-size: 0.85em;">Skills:</h5>
            ${unit.skills.map(skill => `
                <div style="margin-bottom: 4px; padding: 3px 4px; background-color: rgba(142, 68, 173, 0.1); border-radius: 3px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold; color: #8e44ad; font-size: 0.75em;">${skill.emoji} ${skill.name}</span>
                        <span style="color: #3498db; font-size: 0.7em;">${skill.energyCost} ⚡</span>
                    </div>
                    <p style="margin: 1px 0 0 0; font-size: 0.65em; color: #bdc3c7; line-height: 1.1;">
                        ${skill.description}
                    </p>
                </div>
            `).join('')}
        </div>
        ` : ''}
    `;
}

export function positionSquadTooltip(event: MouseEvent) {
    if (!squadTooltip) return;
    // Position to the right and slightly below the cursor
    let x = event.clientX + 15;
    let y = event.clientY + 15;

    // Prevent tooltip from going off-screen
    if (x + squadTooltip.offsetWidth > window.innerWidth) {
        x = window.innerWidth - squadTooltip.offsetWidth - 10;
    }
    if (y + squadTooltip.offsetHeight > window.innerHeight) {
        y = window.innerHeight - squadTooltip.offsetHeight - 10;
    }
    if (x < 10) x = 10;
    if (y < 10) y = 10;

    squadTooltip.style.left = `${x}px`;
    squadTooltip.style.top = `${y}px`;
}

export function showSquadTooltip(unit: Unit, event: MouseEvent) {
    if (!squadTooltip) return;
    updateSquadTooltipContent(unit);
    squadTooltip.style.display = 'block';
    positionSquadTooltip(event);
}

export function hideSquadTooltip() {
    if (squadTooltip) {
        squadTooltip.style.display = 'none';
    }
}

export function initializeSquadTooltip(appContainer: HTMLElement) {
    if (!squadTooltip || !appContainer.contains(squadTooltip)) {
        squadTooltip = createSquadTooltip(appContainer);
    }
} 