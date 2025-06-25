import { globalUnitRegistry, UnitRegistry } from '../units/UnitRegistry';
import { mainPlayer } from '../game/Player';
import { showEncounterScene } from '../encounter/EncounterScene';
import { createUnitDisplayElement, createSlotElement } from './SquadUIComponents';
import { initializeSquadTooltip } from './SquadTooltip';

// Store callbacks to re-render the scene
let currentAppContainer: HTMLElement | null = null;
let currentOnProceedToGameCallback: (() => void) | null = null;
let currentOnShopCallback: (() => void) | null = null;

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
            slot.appendChild(createUnitDisplayElement(unitInSlot, 'squad', i, refreshSquadScene));
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
            slot.appendChild(createUnitDisplayElement(unitInSlot, 'box', i, refreshSquadScene));
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
    itemsTitle.style.marginBottom = '5px';
    itemsTitle.style.width = '100%';
    itemsTitle.style.textAlign = 'center';
    
    const itemsContentPlaceholder = document.createElement('p');
    itemsContentPlaceholder.textContent = 'Item management will go here.';
    itemsContentPlaceholder.style.textAlign = 'center';
    itemsContentPlaceholder.style.marginTop = '20px';
    
    itemsSection.appendChild(itemsTitle);
    itemsSection.appendChild(itemsContentPlaceholder);

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
    proceedButton.onclick = () => onProceedToGameCallback();

    footer.appendChild(resourceDisplayFooter);
    footer.appendChild(footerButtonContainer);
    footer.appendChild(proceedButton);

    squadDiv.appendChild(header);
    squadDiv.appendChild(contentArea);
    squadDiv.appendChild(footer);

    appContainer.appendChild(squadDiv);
    console.log('Squad/Inventory Scene displayed with new layout and smaller slots.');
} 