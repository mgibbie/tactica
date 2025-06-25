import { Unit } from '../units/Unit';
import { globalUnitRegistry, UnitRegistry } from '../units/UnitRegistry';

// Store information about the currently dragged unit
let draggedUnitInfo: { unitId: string, sourceContainer: 'squad' | 'box', originalIndex: number, element: HTMLElement } | null = null;

export function setupDragHandlers(
    unitElement: HTMLElement, 
    unit: Unit, 
    source: 'squad' | 'box', 
    index: number,
    refreshCallback: () => void
) {
    unitElement.addEventListener('dragstart', (event) => {
        if (!(event.target instanceof HTMLElement)) return;
        const targetElement = event.target as HTMLElement;
        // Ensure we're dragging the unit element itself, not a child
        const draggableUnitElement = targetElement.closest('.squad-unit-display');
        if (!draggableUnitElement || draggableUnitElement !== unitElement) return;

        draggedUnitInfo = { unitId: unit.id, sourceContainer: source, originalIndex: index, element: unitElement };
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', unit.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        unitElement.style.opacity = '0.5';
        unitElement.style.cursor = 'grabbing'; 
    });

    unitElement.addEventListener('dragend', () => {
        unitElement.style.opacity = '1';
        unitElement.style.cursor = 'grab';
        // Clear visual cues on all slots
        document.querySelectorAll('.unit-slot').forEach(slot => {
            (slot as HTMLElement).style.border = '1px dashed #566573'; // Reset to original
            (slot as HTMLElement).style.backgroundColor = '#34495e'; // Reset to original
        });
        draggedUnitInfo = null;
    });
}

export function setupDropHandlers(
    slot: HTMLElement,
    targetType: 'squad' | 'box',
    targetIndex: number,
    refreshCallback: () => void
) {
    slot.addEventListener('dragover', (event) => {
        event.preventDefault();
        if (draggedUnitInfo) {
            slot.style.backgroundColor = '#5e8b9e'; 
            slot.style.border = '1px solid #76c7c0'; 
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move';
            }
        }
    });

    slot.addEventListener('dragleave', () => {
        slot.style.backgroundColor = '#34495e'; 
        slot.style.border = '1px dashed #566573'; 
    });

    slot.addEventListener('drop', (event) => {
        event.preventDefault();
        slot.style.backgroundColor = '#34495e'; // Reset visual cue
        slot.style.border = '1px dashed #566573'; // Reset visual cue

        if (!draggedUnitInfo) return;

        const { unitId, sourceContainer, originalIndex } = draggedUnitInfo;
        
        // Prevent dropping onto the same slot if no actual move happens.
        if (sourceContainer === targetType && originalIndex === targetIndex && slot.contains(draggedUnitInfo.element)) {
            console.log("Dropped onto the same slot. No action taken.");
            return; 
        }

        console.log(`Attempting to drop unit ${unitId}`);
        console.log(`Source: ${sourceContainer}[${originalIndex}] -> Target: ${targetType}[${targetIndex}]`);

        const unitToMove = globalUnitRegistry.findUnitById(unitId);
        if (!unitToMove) {
            console.error("Drag-and-drop: Unit not found by ID", unitId);
            draggedUnitInfo = null;
            return;
        }

        // Logic for moving/reordering units
        if (sourceContainer === 'squad' && targetType === 'squad') {
            // Reorder within squad
            globalUnitRegistry.reorderUnitInSquad(unitId, targetIndex);
        } else if (sourceContainer === 'box' && targetType === 'box') {
            // Reorder within box
            globalUnitRegistry.reorderUnitInStorage(unitId, targetIndex);
        } else if (sourceContainer === 'squad' && targetType === 'box') {
            // Move from squad to box (insert at specific box index)
            if (globalUnitRegistry.playerParty.length <= 1) {
                console.warn("Cannot move the last unit from squad to box. At least one unit must remain in the squad.");
                draggedUnitInfo = null; // Clear dragged info as the drop is invalid
                return; // Prevent the move
            }
            globalUnitRegistry.moveUnitToStorage(unitId, targetIndex);
        } else if (sourceContainer === 'box' && targetType === 'squad') {
            // Move from box to squad (insert at specific squad index)
            // Check if squad is full and target slot is occupied by another unit - then swap
            if (globalUnitRegistry.playerParty.length >= UnitRegistry.MAX_PLAYER_PARTY_SIZE && 
                globalUnitRegistry.playerParty[targetIndex]) {
                 // If squad is full and target slot has a unit, attempt a swap
                const unitInTargetSquadSlot = globalUnitRegistry.playerParty[targetIndex];
                if(unitInTargetSquadSlot) {
                    console.log(`Squad full, swapping ${unitToMove.name} with ${unitInTargetSquadSlot.name}`);
                    globalUnitRegistry.swapUnitsBetweenSquadAndStorage(unitId, unitInTargetSquadSlot.id, targetIndex, originalIndex);
                } else {
                     // This case should ideally not happen if length is max and slot is occupied.
                    console.warn("Squad full, but target slot unexpectedly empty. Cannot move from box.");
                    draggedUnitInfo = null;
                    return; // Don't proceed if can't place
                }
            } else {
                 // Squad has space, or targetIndex is empty
                 globalUnitRegistry.moveUnitToSquad(unitId, targetIndex);
            }
        }
        
        draggedUnitInfo = null; // Clear after successful drop
        refreshCallback(); // Re-render the scene
    });
} 