import { mainPlayer } from '../game/Player'; // To access player's resources
import { globalUnitRegistry, UnitRegistry } from '../units/UnitRegistry';
import { Unit } from '../units/Unit';
import { showEncounterScene } from '../encounter/EncounterScene';
import { showSquadScene } from '../squad/SquadScene';
import { ShopDisplayItem, markShopForNextVisitRefresh, getCurrentShopDisplayItems, updateShopDisplayItem, ensureShopUnitsPopulated } from './ShopInventory';
import { initializeShopTooltip, showShopTooltip, hideShopTooltip, positionShopTooltip } from './ShopTooltip';

let selectedSlotDiv: HTMLElement | null = null;
let currentBuyButton: HTMLButtonElement | null = null;

// Re-export for external use
export { markShopForNextVisitRefresh };

export function showShopScene(
    appContainer: HTMLElement,
    onProceedToGameCallback: () => void
): void {
    ensureShopUnitsPopulated(); // Ensure units are populated based on the flag

    console.log('Showing Shop Scene with display items:', getCurrentShopDisplayItems());
    appContainer.innerHTML = ''; // Clear previous content
    selectedSlotDiv = null; // Reset selection
    currentBuyButton = null;

    // Initialize tooltip
    initializeShopTooltip(appContainer);
    
    const shopDiv = document.createElement('div');
    shopDiv.id = 'shop-scene';
    shopDiv.style.width = '100%';
    shopDiv.style.height = '100%';
    shopDiv.style.display = 'flex';
    shopDiv.style.flexDirection = 'column';
    shopDiv.style.alignItems = 'center';
    shopDiv.style.justifyContent = 'space-between'; // Pushes header/footer to top/bottom
    shopDiv.style.backgroundColor = '#2c3e50'; // A calm, dark blue
    shopDiv.style.color = '#ecf0f1'; // Light text color
    shopDiv.style.fontFamily = 'Arial, sans-serif';
    shopDiv.style.padding = '20px';
    shopDiv.style.boxSizing = 'border-box';

    // Header: SHOP title
    const header = document.createElement('h1');
    header.textContent = 'SHOP';
    header.style.textAlign = 'center';
    header.style.fontSize = '3em';
    header.style.margin = '0 0 20px 0'; // No top margin, space at bottom

    // Unit slots area
    const unitSlotsContainer = document.createElement('div');
    unitSlotsContainer.style.display = 'flex';
    unitSlotsContainer.style.justifyContent = 'space-around';
    unitSlotsContainer.style.width = '90%'; // Adjusted for slightly more space
    unitSlotsContainer.style.flexGrow = '1'; // Allow slots to take available space
    unitSlotsContainer.style.alignItems = 'center';
    unitSlotsContainer.style.paddingBottom = '20px'; // Space for elevated item

    getCurrentShopDisplayItems().forEach((item: ShopDisplayItem, index: number) => {
        const slotDiv = document.createElement('div');
        slotDiv.id = `shop-slot-${index}`;
        slotDiv.style.width = '200px'; // Slightly wider to accommodate more initial info
        slotDiv.style.height = 'auto'; // Auto height for content
        slotDiv.style.minHeight = '180px'; // Ensure a decent minimum height
        slotDiv.style.border = '2px solid #3498db';
        slotDiv.style.borderRadius = '10px';
        slotDiv.style.display = 'flex';
        slotDiv.style.flexDirection = 'column';
        slotDiv.style.alignItems = 'center';
        slotDiv.style.justifyContent = 'center'; // Center content vertically initially
        slotDiv.style.backgroundColor = '#34495e'; 
        slotDiv.style.padding = '10px'; // Adjusted padding
        slotDiv.style.boxSizing = 'border-box';
        slotDiv.style.textAlign = 'center';
        slotDiv.style.cursor = 'pointer';
        slotDiv.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';

        if (item && 'sold' in item && item.sold === true) {
            // Render SOLD slot
            slotDiv.innerHTML = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 1.5em; font-weight: bold;">SOLD</p></div>`;
            slotDiv.style.cursor = 'default';
            slotDiv.dataset.sold = 'true';
        } else if (item && 'id' in item) { // It's a Unit object
            const unitInstance = item as Unit;
            slotDiv.dataset.unitId = unitInstance.id;
            const unitImage = document.createElement('img');
            unitImage.src = unitInstance.imageUrl;
            unitImage.alt = unitInstance.className;
            unitImage.style.width = '60px'; // Standard size for initial display
            unitImage.style.height = '60px';
            unitImage.style.marginBottom = '8px';
            unitImage.style.borderRadius = '4px';
            slotDiv.appendChild(unitImage);

            const personalNameDisplay = document.createElement('h4');
            personalNameDisplay.textContent = unitInstance.name;
            personalNameDisplay.style.margin = '0 0 4px 0';
            personalNameDisplay.style.fontSize = '1.1em';
            slotDiv.appendChild(personalNameDisplay);

            const classNameDisplay = document.createElement('p'); // Changed to <p> for less emphasis than name
            classNameDisplay.textContent = `(${unitInstance.className})`;
            classNameDisplay.style.margin = '0';
            classNameDisplay.style.fontSize = '0.9em';
            classNameDisplay.style.fontStyle = 'italic';
            slotDiv.appendChild(classNameDisplay);

            // Event Listeners for non-sold items
            slotDiv.addEventListener('mouseenter', (event) => {
                const currentDisplayItem = getCurrentShopDisplayItems()[index];
                if (currentDisplayItem && 'id' in currentDisplayItem) { // Check it's a Unit
                    showShopTooltip(currentDisplayItem as Unit, event);
                }
            });
            slotDiv.addEventListener('mousemove', (event) => {
                positionShopTooltip(event);
            });
            slotDiv.addEventListener('mouseleave', () => {
                hideShopTooltip();
            });

            slotDiv.addEventListener('click', () => {
                if (slotDiv.dataset.sold === 'true') return; 

                const currentUnitForPurchase = globalUnitRegistry.shopUnits.find(u => u.id === unitInstance.id);
                if (!currentUnitForPurchase) { // Unit might have been bought in a rapid click scenario, or something went wrong
                    console.warn('Clicked unit no longer available in shopUnits registry for purchase.', unitInstance.id);
                    // Visually, it should look sold if currentShopDisplayItems[index] is marked sold.
                    // This check ensures we don't try to buy something not in the *actual* for-sale list.
                    return;
                }

                if (selectedSlotDiv && selectedSlotDiv !== slotDiv) {
                    selectedSlotDiv.style.transform = 'translateY(0)';
                    selectedSlotDiv.style.boxShadow = 'none';
                    const oldButton = selectedSlotDiv.querySelector('button.buy-button-shop');
                    if (oldButton) selectedSlotDiv.removeChild(oldButton);
                }

                if (selectedSlotDiv === slotDiv) { 
                    slotDiv.style.transform = 'translateY(0)';
                    slotDiv.style.boxShadow = 'none';
                    const existingButton = slotDiv.querySelector('button.buy-button-shop');
                    if (existingButton) slotDiv.removeChild(existingButton);
                    selectedSlotDiv = null;
                    currentBuyButton = null;
                } else { 
                    selectedSlotDiv = slotDiv;
                    slotDiv.style.transform = 'translateY(-10px)';
                    slotDiv.style.boxShadow = '0px 5px 15px rgba(0,0,0,0.3)';
                    
                    const existingButton = slotDiv.querySelector('button.buy-button-shop');
                    if (existingButton) slotDiv.removeChild(existingButton);

                    currentBuyButton = document.createElement('button');
                    currentBuyButton.className = 'buy-button-shop';
                    currentBuyButton.textContent = `Buy (${currentUnitForPurchase.cost} R)`;
                    currentBuyButton.style.padding = '8px 12px';
                    currentBuyButton.style.fontSize = '0.9em';
                    currentBuyButton.style.backgroundColor = '#e67e22';
                    currentBuyButton.style.color = 'white';
                    currentBuyButton.style.border = 'none';
                    currentBuyButton.style.borderRadius = '5px';
                    currentBuyButton.style.cursor = 'pointer';
                    currentBuyButton.style.marginTop = '10px'; 
                    currentBuyButton.dataset.unitId = currentUnitForPurchase.id;
                    
                    currentBuyButton.onclick = (e) => {
                        e.stopPropagation(); 
                        // const unitToBuy = globalUnitRegistry.shopUnits.find(u => u.id === currentBuyButton?.dataset.unitId);
                        // We use currentUnitForPurchase which is already resolved and verified to be in shopUnits.
                        const unitToBuy = currentUnitForPurchase; 

                        if (mainPlayer.resource < unitToBuy.cost) {
                            alert('Not enough resources to purchase this unit.');
                            return;
                        }
                        mainPlayer.spendResource(unitToBuy.cost);
                        
                        globalUnitRegistry.removeUnitFromShop(unitToBuy.id); // Remove from actual purchasable list
                        
                        // Update the display item state for this slot
                        updateShopDisplayItem(index, { sold: true, originalUnit: unitToBuy }); 

                        if (globalUnitRegistry.playerParty.length < UnitRegistry.MAX_PLAYER_PARTY_SIZE) {
                            globalUnitRegistry.addUnitToPlayerParty(unitToBuy);
                            console.log(`${unitToBuy.name} (${unitToBuy.className}) purchased and added to Squad!`);
                        } else {
                            globalUnitRegistry.addUnitToStorage(unitToBuy);
                            console.log(`${unitToBuy.name} (${unitToBuy.className}) purchased and added to Box (Squad was full).`);
                        }

                        // Update UI for the currently selected slot (which is slotDiv)
                        slotDiv.innerHTML = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 1.5em; font-weight: bold;">SOLD</p></div>`;
                        slotDiv.style.transform = 'translateY(0)';
                        slotDiv.style.boxShadow = 'none';
                        slotDiv.style.cursor = 'default';
                        slotDiv.dataset.sold = 'true'; 
                        
                        selectedSlotDiv = null;
                        // currentBuyButton is already gone because slotDiv.innerHTML was replaced.

                        const resourceDisplayElement = document.getElementById('shop-resource-display');
                        if (resourceDisplayElement) {
                            resourceDisplayElement.textContent = `Resource: ${mainPlayer.resource}`;
                        }
                        hideShopTooltip();
                    };
                    slotDiv.style.justifyContent = 'space-between'; 
                    slotDiv.appendChild(currentBuyButton);
                }
            });
        } else {
            // Slot is null in currentShopDisplayItems - render as empty or N/A
            slotDiv.textContent = 'N/A';
            slotDiv.style.cursor = 'default';
        }
        unitSlotsContainer.appendChild(slotDiv);
    });

    // Footer: Resource display and Proceed button
    const footer = document.createElement('div');
    footer.style.width = '100%';
    footer.style.display = 'flex';
    footer.style.justifyContent = 'space-between';
    footer.style.alignItems = 'center';
    footer.style.paddingTop = '20px'; // Only top padding for separation

    // Resource Display
    const resourceDisplay = document.createElement('div');
    resourceDisplay.id = 'shop-resource-display';
    resourceDisplay.textContent = `Resource: ${mainPlayer.resource}`;
    // resourceDisplay.style.flexGrow = '1'; // This line is removed/commented out
    resourceDisplay.style.padding = '10px 15px'; 
    resourceDisplay.style.backgroundColor = '#1a1a1a'; 
    resourceDisplay.style.color = '#f1c40f'; 
    resourceDisplay.style.borderRadius = '5px'; 
    resourceDisplay.style.fontSize = '1em'; 
    resourceDisplay.style.fontWeight = 'bold'; 
    resourceDisplay.style.display = 'flex'; 
    resourceDisplay.style.alignItems = 'center'; 

    const squadButton = document.createElement('button');
    squadButton.textContent = 'Squad/Inventory';
    squadButton.style.padding = '8px 15px';
    squadButton.style.fontSize = '1em';
    squadButton.style.backgroundColor = '#3498db';
    squadButton.style.color = 'white';
    squadButton.style.border = 'none';
    squadButton.style.borderRadius = '5px';
    squadButton.style.cursor = 'pointer';
    squadButton.style.margin = '0 8px';
    squadButton.addEventListener('mouseover', () => squadButton.style.backgroundColor = '#2980b9');
    squadButton.addEventListener('mouseout', () => squadButton.style.backgroundColor = '#3498db');
    squadButton.onclick = () => {
        hideShopTooltip();
        showSquadScene(appContainer, onProceedToGameCallback, () => showShopScene(appContainer, onProceedToGameCallback));
    };

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

    // Footer button container for centering the middle button
    const footerButtonContainer = document.createElement('div');
    footerButtonContainer.style.display = 'flex';
    footerButtonContainer.style.justifyContent = 'center';
    footerButtonContainer.style.alignItems = 'center';
    footerButtonContainer.style.flexGrow = '2';
    footerButtonContainer.appendChild(squadButton);

    footer.appendChild(resourceDisplay);
    footer.appendChild(footerButtonContainer);
    footer.appendChild(proceedButton);

    shopDiv.appendChild(header);
    shopDiv.appendChild(unitSlotsContainer);
    shopDiv.appendChild(footer);

    appContainer.appendChild(shopDiv);
    console.log('Shop Scene displayed with Proceed button.');
} 