import { globalUnitRegistry, UnitRegistry } from '../units/UnitRegistry';
import { mainPlayer } from '../game/Player';
import { showEncounterScene } from '../encounter/EncounterScene';
import { createUnitDisplayElement, createSlotElement } from './SquadUIComponents';
import { initializeSquadTooltip } from './SquadTooltip';
import { Item } from '../items/Item';
import { Unit } from '../units/Unit';

// Store information about the currently dragged item
let draggedItemInfo: { itemId: string, originalIndex: number, element: HTMLElement } | null = null;

function setupItemDragHandlers(
    itemElement: HTMLElement, 
    item: Item, 
    index: number,
    refreshCallback: () => void
) {
    itemElement.draggable = true;
    itemElement.addEventListener('dragstart', (event) => {
        if (!(event.target instanceof HTMLElement)) return;
        const targetElement = event.target as HTMLElement;
        // Ensure we're dragging the item element itself, not a child
        const draggableItemElement = targetElement.closest('.squad-item-display');
        if (!draggableItemElement || draggableItemElement !== itemElement) return;

        draggedItemInfo = { itemId: item.id, originalIndex: index, element: itemElement };
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', item.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        itemElement.style.opacity = '0.5';
        itemElement.style.cursor = 'grabbing'; 
    });

    itemElement.addEventListener('dragend', () => {
        itemElement.style.opacity = '1';
        itemElement.style.cursor = 'grab';
        // Clear visual cues on all item slots
        document.querySelectorAll('.item-slot').forEach(slot => {
            const slotElement = slot as HTMLElement;
            if (slotElement.classList.contains('empty-item-slot')) {
                slotElement.style.border = '1px dashed #566573'; // Reset to original for empty slots
            } else {
                slotElement.style.border = '1px solid #f39c12'; // Reset to original for filled slots
            }
            slotElement.style.backgroundColor = '#34495e'; // Reset to original
        });
        draggedItemInfo = null;
    });
}

function setupItemDropHandlers(
    slot: HTMLElement,
    targetIndex: number,
    refreshCallback: () => void
) {
    slot.addEventListener('dragover', (event) => {
        event.preventDefault();
        if (draggedItemInfo) {
            slot.style.backgroundColor = '#5e8b9e'; 
            slot.style.border = '1px solid #76c7c0'; 
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move';
            }
        }
    });

    slot.addEventListener('dragleave', () => {
        slot.style.backgroundColor = '#34495e'; 
        if (slot.classList.contains('empty-item-slot')) {
            slot.style.border = '1px dashed #566573'; 
        } else {
            slot.style.border = '1px solid #f39c12'; 
        }
    });

    slot.addEventListener('drop', (event) => {
        event.preventDefault();
        slot.style.backgroundColor = '#34495e'; // Reset visual cue
        if (slot.classList.contains('empty-item-slot')) {
            slot.style.border = '1px dashed #566573'; // Reset visual cue for empty slots
        } else {
            slot.style.border = '1px solid #f39c12'; // Reset visual cue for filled slots
        }

        if (!draggedItemInfo) return;

        const { itemId, originalIndex } = draggedItemInfo;
        
        // Don't move if dropping on the same position
        if (originalIndex === targetIndex) {
            console.log("Dropped onto the same slot. No action taken.");
            return; 
        }

        console.log(`Attempting to drop item ${itemId}`);
        console.log(`Source: [${originalIndex}] -> Target: [${targetIndex}]`);

        const itemToMove = globalUnitRegistry.playerItems.find(item => item.id === itemId);
        if (!itemToMove) {
            console.error("Drag-and-drop: Item not found by ID", itemId);
            draggedItemInfo = null;
            return;
        }

        // Remove item from original position
        globalUnitRegistry.playerItems.splice(originalIndex, 1);
        
        // Insert at target position (but limit to actual array length)
        const insertIndex = Math.min(targetIndex, globalUnitRegistry.playerItems.length);
        globalUnitRegistry.playerItems.splice(insertIndex, 0, itemToMove);

        console.log(`Item ${itemToMove.name} moved from ${originalIndex} to ${insertIndex}`);
        
        draggedItemInfo = null; // Clear after successful drop
        refreshCallback(); // Re-render the scene
    });
}

// Store callbacks to re-render the scene
let currentAppContainer: HTMLElement | null = null;
let currentOnProceedToGameCallback: (() => void) | null = null;
let currentOnShopCallback: (() => void) | null = null;

function showNeedUnitsMessage(container: HTMLElement) {
    // Remove any existing message
    const existingMessage = document.getElementById('need-units-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create the message element
    const messageDiv = document.createElement('div');
    messageDiv.id = 'need-units-message';
    messageDiv.textContent = 'Need At Least 1 Unit In Party';
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.backgroundColor = 'rgba(231, 76, 60, 0.9)'; // Red background
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '20px 40px';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.fontSize = '1.5em';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.fontFamily = 'sans-serif';
    messageDiv.style.zIndex = '2000';
    messageDiv.style.border = '3px solid #c0392b';
    messageDiv.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    messageDiv.style.opacity = '0';
    messageDiv.style.transition = 'opacity 0.3s ease-in-out';

    // Add to container
    container.appendChild(messageDiv);

    // Fade in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
    }, 10);

    // Fade out and remove after 1 second
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300); // Wait for fade out transition
    }, 1000);
}

// Item interaction state
let selectedItemSlot: HTMLElement | null = null;
let currentUseButton: HTMLButtonElement | null = null;

function createEmptyItemSlot(index: number): HTMLElement {
    const emptySlot = document.createElement('div');
    emptySlot.id = `empty-item-slot-${index}`;
    emptySlot.className = 'item-slot empty-item-slot';
    emptySlot.style.width = '60px';
    emptySlot.style.height = '75px';
    emptySlot.style.border = '1px dashed #566573';
    emptySlot.style.borderRadius = '5px';
    emptySlot.style.backgroundColor = '#34495e';
    emptySlot.style.margin = '3px';
    emptySlot.style.display = 'flex';
    emptySlot.style.alignItems = 'center';
    emptySlot.style.justifyContent = 'center';
    emptySlot.style.transition = 'background-color 0.2s, border-color 0.2s';
    
    // Setup drop handlers for rearranging items
    setupItemDropHandlers(emptySlot, index, refreshSquadScene);
    
    return emptySlot;
}

function createItemSlotElement(item: Item, index: number, refreshCallback: () => void): HTMLElement {
    const itemSlotDiv = document.createElement('div');
    itemSlotDiv.id = `item-slot-${index}`;
    itemSlotDiv.className = 'item-slot squad-item-display';
    itemSlotDiv.dataset.itemId = item.id;
    itemSlotDiv.style.width = '60px'; // Same size as box slots
    itemSlotDiv.style.height = '75px'; // Same size as box slots
    itemSlotDiv.style.border = '1px solid #f39c12';
    itemSlotDiv.style.borderRadius = '5px';
    itemSlotDiv.style.display = 'flex';
    itemSlotDiv.style.flexDirection = 'column';
    itemSlotDiv.style.alignItems = 'center';
    itemSlotDiv.style.justifyContent = 'center';
    itemSlotDiv.style.backgroundColor = '#34495e';
    itemSlotDiv.style.padding = '3px';
    itemSlotDiv.style.boxSizing = 'border-box';
    itemSlotDiv.style.textAlign = 'center';
    itemSlotDiv.style.cursor = 'grab';
    itemSlotDiv.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
    itemSlotDiv.style.margin = '3px';

    // Item image
    const itemImage = document.createElement('img');
    itemImage.src = item.imageUrl;
    itemImage.alt = item.name;
    itemImage.style.width = '25px'; // Same size as unit images in box
    itemImage.style.height = '25px';
    itemImage.style.marginBottom = '2px';
    itemImage.style.borderRadius = '2px';
    itemSlotDiv.appendChild(itemImage);

    // Item name (full name with wrapping)
    const itemName = document.createElement('h6');
    itemName.textContent = item.name;
    itemName.style.margin = '0';
    itemName.style.fontSize = '0.4em';
    itemName.style.color = '#ecf0f1';
    itemName.style.fontWeight = 'bold';
    itemName.style.lineHeight = '1.1';
    itemName.style.wordWrap = 'break-word';
    itemName.style.textAlign = 'center';
    itemName.style.maxWidth = '54px'; // Slightly less than slot width to account for padding
    itemSlotDiv.appendChild(itemName);

    // Remove description as it won't fit in the smaller slot

    // Add tooltip for full item info
    itemSlotDiv.addEventListener('mouseenter', () => {
        itemSlotDiv.title = `${item.name}\n${item.description}`;
    });

    // Setup drag handlers for rearranging items
    setupItemDragHandlers(itemSlotDiv, item, index, refreshCallback);
    
    // Setup drop handlers for rearranging items
    setupItemDropHandlers(itemSlotDiv, index, refreshCallback);

    // Click handler for selection
    itemSlotDiv.addEventListener('click', () => {
        // Clear previous selection
        if (selectedItemSlot && selectedItemSlot !== itemSlotDiv) {
            selectedItemSlot.style.transform = 'translateY(0)';
            selectedItemSlot.style.boxShadow = 'none';
            selectedItemSlot.style.borderColor = '#f39c12';
            selectedItemSlot.style.backgroundColor = '#34495e';
            const oldButton = selectedItemSlot.querySelector('button.use-button-item');
            if (oldButton) selectedItemSlot.removeChild(oldButton);
        }

        if (selectedItemSlot === itemSlotDiv) {
            // Deselect
            itemSlotDiv.style.transform = 'translateY(0)';
            itemSlotDiv.style.boxShadow = 'none';
            itemSlotDiv.style.borderColor = '#f39c12';
            itemSlotDiv.style.backgroundColor = '#34495e';
            const existingButton = itemSlotDiv.querySelector('button.use-button-item');
            if (existingButton) itemSlotDiv.removeChild(existingButton);
            selectedItemSlot = null;
            currentUseButton = null;
        } else {
            // Select
            selectedItemSlot = itemSlotDiv;
            itemSlotDiv.style.transform = 'translateY(-3px)'; // Smaller elevation for smaller slot
            itemSlotDiv.style.boxShadow = '0px 2px 8px rgba(0,0,0,0.3)';
            itemSlotDiv.style.borderColor = '#27ae60';
            itemSlotDiv.style.backgroundColor = '#2c5238';

            const existingButton = itemSlotDiv.querySelector('button.use-button-item');
            if (existingButton) itemSlotDiv.removeChild(existingButton);

            currentUseButton = document.createElement('button');
            currentUseButton.className = 'use-button-item';
            currentUseButton.textContent = 'Use';
            currentUseButton.style.padding = '6px 8px';
            currentUseButton.style.fontSize = '0.8em';
            currentUseButton.style.backgroundColor = '#27ae60';
            currentUseButton.style.color = 'white';
            currentUseButton.style.border = 'none';
            currentUseButton.style.borderRadius = '4px';
            currentUseButton.style.cursor = 'pointer';
            currentUseButton.style.marginTop = '4px';
            currentUseButton.style.width = '100%';
            currentUseButton.style.fontWeight = 'bold';
            currentUseButton.style.transition = 'background-color 0.2s';
            currentUseButton.dataset.itemId = item.id;

            // Add hover effects
            currentUseButton.addEventListener('mouseenter', () => {
                if (currentUseButton) currentUseButton.style.backgroundColor = '#2ecc71'; // Lighter green on hover
            });
            currentUseButton.addEventListener('mouseleave', () => {
                if (currentUseButton) currentUseButton.style.backgroundColor = '#27ae60'; // Original green
            });

            currentUseButton.onclick = (e) => {
                e.stopPropagation();
                // Set the item as selected for use on units
                selectedItem = item;
                refreshCallback();
            };

            itemSlotDiv.appendChild(currentUseButton);
        }
    });

    return itemSlotDiv;
}

// Keep the original selected item logic for unit interaction
let selectedItem: Item | null = null;

function addItemUsageHandler(unitElement: HTMLElement, unit: Unit) {
    // Add click handler for item usage
    unitElement.addEventListener('click', (event) => {
        if (selectedItem) {
            event.preventDefault();
            event.stopPropagation();
            
            // Use the item on the unit
            const success = globalUnitRegistry.useItemOnUnit(selectedItem.id, unit);
            
            if (success) {
                // Show feedback
                console.log(`Used ${selectedItem.name} on ${unit.name}`);
                
                // Clear all selection states
                selectedItem = null;
                selectedItemSlot = null;
                currentUseButton = null;
                
                // Refresh the scene to update display
                refreshSquadScene();
            } else {
                console.warn(`Failed to use ${selectedItem.name} on ${unit.name}`);
            }
        }
    });
    
    // Visual feedback when item is selected (this will be called during refresh)
    if (selectedItem) {
        unitElement.style.boxShadow = '0 0 5px #e74c3c';
        unitElement.style.cursor = 'pointer';
        unitElement.title = `Click to use ${selectedItem.name} on ${unit.name}`;
    } else {
        unitElement.style.boxShadow = 'none';
        unitElement.style.cursor = 'grab';
        unitElement.title = '';
    }
}

function refreshSquadScene() {
    if (currentAppContainer && currentOnProceedToGameCallback && currentOnShopCallback) {
        // Temporarily store scroll position for the box
        const boxAreaElement = document.getElementById('box-area');
        const scrollTop = boxAreaElement ? boxAreaElement.scrollTop : 0;

        showSquadScene(currentAppContainer, currentOnProceedToGameCallback, currentOnShopCallback);

        // Restore scroll position
        const newBoxAreaElement = document.getElementById('box-area');
        if (newBoxAreaElement) {
            newBoxAreaElement.scrollTop = scrollTop;
        }
    } else {
        console.error("Cannot refresh squad scene: a container or callback is missing.");
    }
}

export function showSquadScene(
    appContainer: HTMLElement,
    onProceedToGameCallback: () => void,
    onShopCallback: () => void
): void {
    // Store args for potential refresh
    currentAppContainer = appContainer;
    currentOnProceedToGameCallback = onProceedToGameCallback;
    currentOnShopCallback = onShopCallback;

    console.log('Showing Squad/Inventory Scene...');
    appContainer.innerHTML = ''; 

    // Initialize tooltip system
    initializeSquadTooltip(appContainer);

    const squadDiv = document.createElement('div');
    squadDiv.id = 'squad-scene';
    squadDiv.style.width = '100%';
    squadDiv.style.height = '100%';
    squadDiv.style.display = 'flex';
    squadDiv.style.flexDirection = 'column';
    squadDiv.style.alignItems = 'center';
    squadDiv.style.justifyContent = 'space-between';
    squadDiv.style.backgroundColor = '#2c3e50';
    squadDiv.style.color = '#ecf0f1';
    squadDiv.style.fontFamily = 'Arial, sans-serif';
    squadDiv.style.padding = '20px';
    squadDiv.style.boxSizing = 'border-box';
    squadDiv.style.position = 'relative';

    const header = document.createElement('h1');
    header.textContent = 'SQUAD / INVENTORY';
    header.style.textAlign = 'center';
    header.style.fontSize = '3em';
    header.style.margin = '0 0 15px 0';

    const contentArea = document.createElement('div');
    contentArea.id = 'squad-content-area';
    contentArea.style.flexGrow = '1';
    contentArea.style.width = '100%';
    contentArea.style.display = 'flex';
    contentArea.style.justifyContent = 'space-between';
    contentArea.style.overflow = 'hidden';

    // --- Units Section (Left) ---
    const unitsSection = document.createElement('div');
    unitsSection.id = 'units-section';
    unitsSection.style.width = '65%';
    unitsSection.style.height = '100%';
    unitsSection.style.display = 'flex';
    unitsSection.style.flexDirection = 'column';
    unitsSection.style.borderRight = '2px solid #34495e';
    unitsSection.style.paddingRight = '10px';
    unitsSection.style.boxSizing = 'border-box';

    // Squad Area (Top Left)
    const squadArea = document.createElement('div');
    squadArea.id = 'squad-area';
    squadArea.style.marginBottom = '10px';
    const squadTitle = document.createElement('h2');
    squadTitle.textContent = 'SQUAD (Active Party)';
    squadTitle.style.fontSize = '1.2em';
    squadTitle.style.borderBottom = '1px solid #7f8c8d';
    squadTitle.style.paddingBottom = '3px';
    squadTitle.style.marginBottom = '5px';
    squadArea.appendChild(squadTitle);
    const squadSlotsContainer = document.createElement('div');
    squadSlotsContainer.style.display = 'flex';
    squadSlotsContainer.style.flexWrap = 'wrap';
    squadSlotsContainer.style.justifyContent = 'flex-start';
    for (let i = 0; i < UnitRegistry.MAX_PLAYER_PARTY_SIZE; i++) {
        const slot = createSlotElement(`squad-slot-${i}`, 'squad', i, refreshSquadScene);
        const unitInSlot = globalUnitRegistry.playerParty[i];
        if (unitInSlot) {
            const unitElement = createUnitDisplayElement(unitInSlot, 'squad', i, refreshSquadScene);
            addItemUsageHandler(unitElement, unitInSlot);
            slot.appendChild(unitElement);
        }
        squadSlotsContainer.appendChild(slot);
    }
    squadArea.appendChild(squadSlotsContainer);
    unitsSection.appendChild(squadArea);

    // Box Area (Bottom Left)
    const boxArea = document.createElement('div');
    boxArea.id = 'box-area';
    boxArea.style.flexGrow = '1';
    boxArea.style.overflowY = 'auto';
    boxArea.style.padding = '5px';
    boxArea.style.border = '1px solid #34495e';
    boxArea.style.borderRadius = '5px';

    const boxTitle = document.createElement('h2');
    boxTitle.textContent = 'BOX (Storage)';
    boxTitle.style.fontSize = '1.2em';
    boxTitle.style.borderBottom = '1px solid #7f8c8d';
    boxTitle.style.paddingBottom = '3px';
    boxTitle.style.marginBottom = '5px';
    boxArea.appendChild(boxTitle);
    const boxSlotsContainer = document.createElement('div');
    boxSlotsContainer.style.display = 'flex';
    boxSlotsContainer.style.flexWrap = 'wrap';
    boxSlotsContainer.style.justifyContent = 'flex-start';
    boxSlotsContainer.style.width = '340px';

    // Calculate a reasonable number of box slots: at least 20, or enough to fit all storage units + some empty
    const minBoxSlots = 20;
    const actualStorageCount = globalUnitRegistry.storageUnits.length;
    const totalBoxSlots = Math.max(minBoxSlots, Math.ceil((actualStorageCount + 4) / 5) * 5); // Ensure rows of 5, with some buffer

    for (let i = 0; i < totalBoxSlots; i++) {
        const slot = createSlotElement(`box-slot-${i}`, 'box', i, refreshSquadScene);
        const unitInSlot = globalUnitRegistry.storageUnits[i];
        if (unitInSlot) {
            const unitElement = createUnitDisplayElement(unitInSlot, 'box', i, refreshSquadScene);
            addItemUsageHandler(unitElement, unitInSlot);
            slot.appendChild(unitElement);
        }
        boxSlotsContainer.appendChild(slot);
    }
    boxArea.appendChild(boxSlotsContainer);
    unitsSection.appendChild(boxArea);

    // --- Items Section (Right - Placeholder) ---
    const itemsSection = document.createElement('div');
    itemsSection.id = 'items-section';
    itemsSection.style.width = '33%';
    itemsSection.style.height = '100%';
    itemsSection.style.paddingLeft = '10px';
    itemsSection.style.boxSizing = 'border-box';
    itemsSection.style.display = 'flex';
    itemsSection.style.flexDirection = 'column';
    itemsSection.style.alignItems = 'center';

    const itemsTitle = document.createElement('h2');
    itemsTitle.textContent = 'ITEMS';
    itemsTitle.style.fontSize = '1.2em';
    itemsTitle.style.borderBottom = '1px solid #7f8c8d';
    itemsTitle.style.paddingBottom = '3px';
    itemsTitle.style.marginBottom = '10px';
    itemsTitle.style.width = '100%';
    itemsTitle.style.textAlign = 'center';
    
    // Items container
    const itemsContainer = document.createElement('div');
    itemsContainer.style.width = '100%';
    itemsContainer.style.overflowY = 'auto';
    itemsContainer.style.maxHeight = '60%';
    itemsContainer.style.padding = '5px';
    itemsContainer.style.border = '1px solid #34495e';
    itemsContainer.style.borderRadius = '5px';
    itemsContainer.style.backgroundColor = '#34495e';
    itemsContainer.style.display = 'flex';
    itemsContainer.style.flexWrap = 'wrap';
    itemsContainer.style.justifyContent = 'flex-start';
    itemsContainer.style.alignContent = 'flex-start';
    itemsContainer.style.paddingBottom = '10px'; // Space for elevated items

    // Create item slots (same number as box slots)
    const minItemSlots = 20;
    const actualItemCount = globalUnitRegistry.playerItems.length;
    const totalItemSlots = Math.max(minItemSlots, Math.ceil((actualItemCount + 4) / 5) * 5); // Ensure rows of 5, with some buffer

    for (let i = 0; i < totalItemSlots; i++) {
        const itemInSlot = globalUnitRegistry.playerItems[i];
        if (itemInSlot) {
            const itemElement = createItemSlotElement(itemInSlot, i, refreshSquadScene);
            itemsContainer.appendChild(itemElement);
        } else {
            // Create empty item slot
            const emptySlot = createEmptyItemSlot(i);
            itemsContainer.appendChild(emptySlot);
        }
    }

    // Instructions
    const instructionsText = document.createElement('p');
    instructionsText.id = 'item-instructions';
    if (selectedItem) {
        instructionsText.innerHTML = `<span style="color: #e74c3c;">✓ ${selectedItem.name} selected</span><br>Click a unit to use it`;
        instructionsText.style.color = '#e74c3c';
    } else {
        instructionsText.textContent = 'Click an item to select it, then click "Use" to prepare it, then click a unit to apply it.';
        instructionsText.style.color = '#bdc3c7';
    }
    instructionsText.style.textAlign = 'center';
    instructionsText.style.fontSize = '0.9em';
    instructionsText.style.marginTop = '10px';
    instructionsText.style.fontStyle = 'italic';
    
    itemsSection.appendChild(itemsTitle);
    itemsSection.appendChild(itemsContainer);
    itemsSection.appendChild(instructionsText);

    contentArea.appendChild(unitsSection);
    contentArea.appendChild(itemsSection);

    const footer = document.createElement('div');
    footer.style.width = '100%';
    footer.style.display = 'flex';
    footer.style.justifyContent = 'space-between';
    footer.style.alignItems = 'center';
    footer.style.paddingTop = '15px';
    footer.style.flexShrink = '0';

    const resourceDisplayFooter = document.createElement('div');
    resourceDisplayFooter.id = 'player-resource-display';
    resourceDisplayFooter.textContent = `Resource: ${mainPlayer.resource}`;
    resourceDisplayFooter.style.padding = '10px 15px';
    resourceDisplayFooter.style.backgroundColor = '#1a1a1a';
    resourceDisplayFooter.style.color = '#f1c40f';
    resourceDisplayFooter.style.borderRadius = '5px';
    resourceDisplayFooter.style.fontSize = '1em';
    resourceDisplayFooter.style.fontWeight = 'bold';
    resourceDisplayFooter.style.display = 'flex';
    resourceDisplayFooter.style.alignItems = 'center';

    const shopButton = document.createElement('button');
    shopButton.textContent = 'Shop';
    shopButton.style.padding = '8px 15px';
    shopButton.style.fontSize = '1em';
    shopButton.style.backgroundColor = '#3498db'; 
    shopButton.style.color = 'white';
    shopButton.style.border = 'none';
    shopButton.style.borderRadius = '5px';
    shopButton.style.cursor = 'pointer';
    shopButton.style.margin = '0 8px'; 
    shopButton.addEventListener('mouseover', () => shopButton.style.backgroundColor = '#2980b9');
    shopButton.addEventListener('mouseout', () => shopButton.style.backgroundColor = '#3498db');
    shopButton.onclick = onShopCallback;

    const footerButtonContainer = document.createElement('div');
    footerButtonContainer.style.display = 'flex';
    footerButtonContainer.style.justifyContent = 'center';
    footerButtonContainer.style.alignItems = 'center';
    footerButtonContainer.style.flexGrow = '2'; 
    footerButtonContainer.appendChild(shopButton);

    const proceedButton = document.createElement('button');
    proceedButton.textContent = 'PROCEED';
    proceedButton.style.padding = '8px 15px';
    proceedButton.style.fontSize = '1em';
    proceedButton.style.backgroundColor = '#27ae60'; 
    proceedButton.style.color = 'white';
    proceedButton.style.border = 'none';
    proceedButton.style.borderRadius = '5px';
    proceedButton.style.cursor = 'pointer';
    proceedButton.onclick = () => {
        // Check if player has at least 1 unit in party
        if (globalUnitRegistry.playerParty.length === 0) {
            showNeedUnitsMessage(appContainer);
            return;
        }
        onProceedToGameCallback();
    };

    footer.appendChild(resourceDisplayFooter);
    footer.appendChild(footerButtonContainer);
    footer.appendChild(proceedButton);

    squadDiv.appendChild(header);
    squadDiv.appendChild(contentArea);
    squadDiv.appendChild(footer);

    appContainer.appendChild(squadDiv);
    console.log('Squad/Inventory Scene displayed with new layout and smaller slots.');
} 