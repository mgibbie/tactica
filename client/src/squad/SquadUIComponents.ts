import { Unit } from '../units/Unit';
import { setupDragHandlers, setupDropHandlers } from './SquadDragAndDrop';
import { showSquadTooltip, hideSquadTooltip, positionSquadTooltip } from './SquadTooltip';

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