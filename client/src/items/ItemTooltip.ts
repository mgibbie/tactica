import { Item } from './Item';

let itemTooltip: HTMLElement | null = null;

export function createItemTooltip(appContainer: HTMLElement): HTMLElement {
    const tooltip = document.createElement('div');
    tooltip.id = 'item-tooltip';
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

export function updateItemTooltipContent(item: Item) {
    if (!itemTooltip) return;
    
    // Determine item type color and icon
    let typeColor = '#95a5a6'; // Default gray
    let typeIcon = '📦';
    let typeText = item.type;
    
    switch (item.type) {
        case 'consumable':
            typeColor = '#e74c3c';
            typeIcon = '🍎';
            typeText = 'Consumable';
            break;
        case 'permanent':
            typeColor = '#27ae60';
            typeIcon = '⚡';
            typeText = 'Permanent';
            break;
        case 'equipment':
            typeColor = '#f39c12';
            typeIcon = '💎';
            typeText = 'Equipment';
            break;
    }
    
    itemTooltip.innerHTML = `
        <h4 style="margin: 0 0 5px 0; text-align: center;">${item.name}</h4>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="color: ${typeColor}; font-size: 0.8em; font-weight: bold;">
                ${typeIcon} ${typeText}
            </span>
            <span style="color: #f1c40f; font-size: 0.8em; font-weight: bold;">
                ${item.cost} 💰
            </span>
        </div>
        <p style="margin: 0; font-size: 0.8em; color: #bdc3c7; line-height: 1.3;">
            ${item.description}
        </p>
        ${item.type === 'equipment' ? `
        <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #555;">
            <p style="margin: 0; font-size: 0.75em; color: #8e44ad; font-style: italic;">
                Equip to a unit to apply its effects
            </p>
        </div>
        ` : ''}
    `;
}

export function positionItemTooltip(event: MouseEvent) {
    if (!itemTooltip) return;
    // Position to the right and slightly below the cursor
    let x = event.clientX + 15;
    let y = event.clientY + 15;

    // Prevent tooltip from going off-screen
    if (x + itemTooltip.offsetWidth > window.innerWidth) {
        x = window.innerWidth - itemTooltip.offsetWidth - 10;
    }
    if (y + itemTooltip.offsetHeight > window.innerHeight) {
        y = window.innerHeight - itemTooltip.offsetHeight - 10;
    }
    if (x < 10) x = 10;
    if (y < 10) y = 10;

    itemTooltip.style.left = `${x}px`;
    itemTooltip.style.top = `${y}px`;
}

export function showItemTooltip(item: Item, event: MouseEvent) {
    if (!itemTooltip) return;
    updateItemTooltipContent(item);
    itemTooltip.style.display = 'block';
    positionItemTooltip(event);
}

export function hideItemTooltip() {
    if (itemTooltip) {
        itemTooltip.style.display = 'none';
    }
}

export function initializeItemTooltip(appContainer: HTMLElement) {
    if (!itemTooltip || !appContainer.contains(itemTooltip)) {
        itemTooltip = createItemTooltip(appContainer);
    }
}