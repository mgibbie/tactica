import { Unit } from '../units/Unit';

let shopTooltip: HTMLElement | null = null;

export function createShopTooltip(appContainer: HTMLElement): HTMLElement {
    const tooltip = document.createElement('div');
    tooltip.id = 'shop-tooltip';
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

export function updateShopTooltipContent(unit: Unit) {
    if (!shopTooltip) return;
    
    // Build skills section
    const skillsSection = unit.skills && unit.skills.length > 0 ? `
        <div style="margin-top: 8px; border-top: 1px solid #555; padding-top: 5px;">
            <p style="margin: 0 0 3px 0; font-weight: bold; color: #8e44ad; font-size: 0.85em;">Skills:</p>
            ${unit.skills.map(skill => `
                <div style="margin: 2px 0; padding: 2px 4px; background-color: rgba(142, 68, 173, 0.1); border-radius: 3px;">
                    <span style="font-weight: bold; color: #8e44ad; font-size: 0.8em;">${skill.emoji} ${skill.name}</span>
                    <span style="color: #3498db; font-size: 0.75em; margin-left: 5px;">(${skill.energyCost} ⚡)</span>
                </div>
            `).join('')}
        </div>
    ` : '';
    
    shopTooltip.innerHTML = `
        <h4 style="margin: 0 0 5px 0; text-align: center;">${unit.name} (${unit.className})</h4>
        <p style="margin: 3px 0;">HP: ${unit.health} | Max Energy: ${unit.maxEnergy}</p>
        <p style="margin: 3px 0;">Basic Dmg: ${unit.basicDamage} | Skill Dmg: ${unit.skillDamage}</p>
        <p style="margin: 3px 0;">Range: ${unit.range} | Move: ${unit.move}</p>
        <p style="margin: 3px 0; font-weight: bold;">Cost: ${unit.cost}</p>
        ${skillsSection}
    `;
}

export function positionShopTooltip(event: MouseEvent) {
    if (!shopTooltip) return;
    // Position to the right and slightly below the cursor
    // Adjust numbers as needed for optimal positioning
    let x = event.clientX + 15;
    let y = event.clientY + 15;

    // Prevent tooltip from going off-screen
    if (x + shopTooltip.offsetWidth > window.innerWidth) {
        x = window.innerWidth - shopTooltip.offsetWidth - 10;
    }
    if (y + shopTooltip.offsetHeight > window.innerHeight) {
        y = window.innerHeight - shopTooltip.offsetHeight - 10;
    }
    if (x < 10) x = 10;
    if (y < 10) y = 10;

    shopTooltip.style.left = `${x}px`;
    shopTooltip.style.top = `${y}px`;
}

export function showShopTooltip(unit: Unit, event: MouseEvent) {
    if (!shopTooltip) return;
    updateShopTooltipContent(unit);
    shopTooltip.style.display = 'block';
    positionShopTooltip(event);
}

export function hideShopTooltip() {
    if (shopTooltip) {
        shopTooltip.style.display = 'none';
    }
}

export function initializeShopTooltip(appContainer: HTMLElement) {
    if (!shopTooltip || !appContainer.contains(shopTooltip)) {
        shopTooltip = createShopTooltip(appContainer);
    }
} 