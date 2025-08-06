import { Unit } from '../units/Unit';
import { setupDragHandlers, setupDropHandlers } from './SquadDragAndDrop';
import { showSquadTooltip, hideSquadTooltip, positionSquadTooltip } from './SquadTooltip';
import { EquipmentService } from '../items/EquipmentService';
import { ITEM_DEX } from '../items/ItemDex';
import { globalUnitRegistry } from '../units/UnitRegistry';

export function createUnitDisplayElement(
    unit: Unit, 
    source: 'squad' | 'box', 
    index: number,
    refreshCallback: () => void
): HTMLElement {
    const unitElement = document.createElement('div');
    unitElement.className = 'squad-unit-display';
    unitElement.dataset.unitId = unit.id;
    unitElement.style.width = '50px';
    unitElement.style.height = '65px';
    unitElement.style.border = '1px solid #7f8c8d';
    unitElement.style.borderRadius = '4px';
    unitElement.style.backgroundColor = '#4a6378';
    unitElement.style.display = 'flex';
    unitElement.style.flexDirection = 'column';
    unitElement.style.alignItems = 'center';
    unitElement.style.justifyContent = 'center';
    unitElement.style.padding = '3px';
    unitElement.style.textAlign = 'center';
    unitElement.style.cursor = 'grab';
    unitElement.draggable = true;

    // Setup drag handlers
    setupDragHandlers(unitElement, unit, source, index, refreshCallback);

    // Setup tooltip handlers
    unitElement.addEventListener('mouseenter', (event) => {
        showSquadTooltip(unit, event);
    });
    unitElement.addEventListener('mousemove', (event) => {
        positionSquadTooltip(event);
    });
    unitElement.addEventListener('mouseleave', () => {
        hideSquadTooltip();
    });

    const unitImage = document.createElement('img');
    unitImage.src = unit.imageUrl;
    unitImage.alt = unit.className;
    unitImage.style.width = '25px';
    unitImage.style.height = '25px';
    unitImage.style.marginBottom = '3px';
    unitImage.style.borderRadius = '2px';

    const personalNameDisplay = document.createElement('h5');
    personalNameDisplay.textContent = unit.name;
    personalNameDisplay.style.margin = '0 0 2px 0';
    personalNameDisplay.style.fontSize = '0.7em';
    personalNameDisplay.style.color = '#ecf0f1';

    const classNameDisplay = document.createElement('p');
    classNameDisplay.textContent = `(${unit.className})`;
    classNameDisplay.style.margin = '0';
    classNameDisplay.style.fontSize = '0.6em';
    classNameDisplay.style.fontStyle = 'italic';
    classNameDisplay.style.color = '#bdc3c7';

    unitElement.appendChild(unitImage);
    unitElement.appendChild(personalNameDisplay);
    unitElement.appendChild(classNameDisplay);
    
    // Add equipment indicator if unit has held item
    if (unit.heldItem) {
        const itemStats = ITEM_DEX[unit.heldItem];
        if (itemStats) {
            const equipmentIndicator = document.createElement('div');
            equipmentIndicator.style.position = 'absolute';
            equipmentIndicator.style.top = '-3px';
            equipmentIndicator.style.right = '-3px';
            equipmentIndicator.style.width = '12px';
            equipmentIndicator.style.height = '12px';
            equipmentIndicator.style.backgroundColor = 'rgba(243, 156, 18, 0.8)';
            equipmentIndicator.style.borderRadius = '50%';
            equipmentIndicator.style.border = '1px solid #e67e22';
            equipmentIndicator.style.display = 'flex';
            equipmentIndicator.style.alignItems = 'center';
            equipmentIndicator.style.justifyContent = 'center';
            equipmentIndicator.style.overflow = 'hidden';
            equipmentIndicator.title = `Equipped: ${itemStats.name}`;
            
            // Create image element for the item
            const itemImage = document.createElement('img');
            itemImage.src = itemStats.imageUrl;
            itemImage.alt = itemStats.name;
            itemImage.style.width = '10px';
            itemImage.style.height = '10px';
            itemImage.style.borderRadius = '50%';
            itemImage.style.objectFit = 'cover';
            
            equipmentIndicator.appendChild(itemImage);
            
            // Make unit element position relative so indicator can be positioned absolutely
            unitElement.style.position = 'relative';
            unitElement.appendChild(equipmentIndicator);
        }
    }
    
    return unitElement;
}

export function createSlotElement(
    slotId: string, 
    type: 'squad' | 'box', 
    index: number,
    refreshCallback: () => void
): HTMLElement {
    const slot = document.createElement('div');
    slot.id = slotId;
    slot.className = `unit-slot ${type}-slot`;
    slot.dataset.slotType = type;
    slot.dataset.slotIndex = String(index);

    slot.style.width = type === 'squad' ? '60px' : '60px';
    slot.style.height = type === 'squad' ? '75px' : '75px';
    slot.style.border = '1px dashed #566573';
    slot.style.borderRadius = '5px';
    slot.style.backgroundColor = '#34495e';
    slot.style.margin = '3px';
    slot.style.display = 'flex';
    slot.style.alignItems = 'center';
    slot.style.justifyContent = 'center';
    slot.style.transition = 'background-color 0.2s, border-color 0.2s'; // For visual feedback

    // Setup drop handlers
    setupDropHandlers(slot, type, index, refreshCallback);

    return slot;
} 