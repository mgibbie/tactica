import { mainPlayer } from '../game/Player'; // To access player's resources
import { globalUnitRegistry, UnitRegistry } from '../units/UnitRegistry';
import { Unit } from '../units/Unit';
import { Item } from '../items/Item';
import { showEncounterScene } from '../encounter/EncounterScene';
import { showSquadScene } from '../squad/SquadScene';
import { ShopDisplayItem, ShopDisplayItemSlot, markShopForNextVisitRefresh, getCurrentShopDisplayItems, getCurrentShopItemSlots, updateShopDisplayItem, updateShopItemSlot, ensureShopPopulated } from './ShopInventory';
import { initializeShopTooltip, showShopTooltip, hideShopTooltip, positionShopTooltip } from './ShopTooltip';

let selectedSlotDiv: HTMLElement | null = null;
let currentBuyButton: HTMLButtonElement | null = null;

// Re-export for external use
export { markShopForNextVisitRefresh };

function showNotEnoughResourcesMessage(container: HTMLElement) {
    // Remove any existing message
    const existingMessage = document.getElementById('not-enough-resources-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create the message element
    const messageDiv = document.createElement('div');
    messageDiv.id = 'not-enough-resources-message';
    messageDiv.textContent = 'Not Enough Resources';
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

export function showShopScene(
    appContainer: HTMLElement,
    onProceedToGameCallback: () => void
): void {
    ensureShopPopulated(); // Ensure units and items are populated based on the flag

    console.log('Showing Shop Scene with display items:', getCurrentShopDisplayItems());
    console.log('Showing Shop Scene with item slots:', getCurrentShopItemSlots());
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
                            showNotEnoughResourcesMessage(appContainer);
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

    // Item slots area (below unit slots)
    const itemSlotsContainer = document.createElement('div');
    itemSlotsContainer.style.display = 'flex';
    itemSlotsContainer.style.justifyContent = 'center';
    itemSlotsContainer.style.gap = '20px';
    itemSlotsContainer.style.width = '90%';
    itemSlotsContainer.style.alignItems = 'center';
    itemSlotsContainer.style.paddingBottom = '20px';

    getCurrentShopItemSlots().forEach((item: ShopDisplayItemSlot, index: number) => {
        const itemSlotDiv = document.createElement('div');
        itemSlotDiv.id = `shop-item-slot-${index}`;
        itemSlotDiv.style.width = '100px'; // 50% of unit slot width (200px)
        itemSlotDiv.style.height = 'auto';
        itemSlotDiv.style.minHeight = '90px'; // 50% of unit slot height (180px)
        itemSlotDiv.style.border = '2px solid #f39c12';
        itemSlotDiv.style.borderRadius = '10px';
        itemSlotDiv.style.display = 'flex';
        itemSlotDiv.style.flexDirection = 'column';
        itemSlotDiv.style.alignItems = 'center';
        itemSlotDiv.style.justifyContent = 'center';
        itemSlotDiv.style.backgroundColor = '#34495e';
        itemSlotDiv.style.padding = '8px';
        itemSlotDiv.style.boxSizing = 'border-box';
        itemSlotDiv.style.textAlign = 'center';
        itemSlotDiv.style.cursor = 'pointer';
        itemSlotDiv.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';

        if (item && 'sold' in item && item.sold === true) {
            // Render SOLD slot
            itemSlotDiv.innerHTML = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 0.8em; font-weight: bold;">SOLD</p></div>`;
            itemSlotDiv.style.cursor = 'default';
            itemSlotDiv.dataset.sold = 'true';
        } else if (item && 'id' in item) { // It's an Item object
            const itemInstance = item as Item;
            itemSlotDiv.dataset.itemId = itemInstance.id;
            
            const itemImage = document.createElement('img');
            itemImage.src = itemInstance.imageUrl;
            itemImage.alt = itemInstance.name;
            itemImage.style.width = '30px'; // 50% of unit image size
            itemImage.style.height = '30px';
            itemImage.style.marginBottom = '4px';
            itemImage.style.borderRadius = '2px';
            itemSlotDiv.appendChild(itemImage);

            const itemNameDisplay = document.createElement('h6');
            itemNameDisplay.textContent = itemInstance.name;
            itemNameDisplay.style.margin = '0';
            itemNameDisplay.style.fontSize = '0.7em';
            itemNameDisplay.style.fontWeight = 'bold';
            itemSlotDiv.appendChild(itemNameDisplay);

            // Add tooltip functionality for items
            itemSlotDiv.addEventListener('mouseenter', () => {
                // For now, we'll use a simple tooltip. You might want to create a separate item tooltip later
                itemSlotDiv.title = `${itemInstance.name}\n${itemInstance.description}\nCost: ${itemInstance.cost} Resource`;
            });

            itemSlotDiv.addEventListener('click', () => {
                if (itemSlotDiv.dataset.sold === 'true') return;

                const currentItemForPurchase = globalUnitRegistry.shopItems.find(i => i.id === itemInstance.id);
                if (!currentItemForPurchase) {
                    console.warn('Clicked item no longer available in shopItems registry for purchase.', itemInstance.id);
                    return;
                }

                // Clear previous selections
                if (selectedSlotDiv && selectedSlotDiv !== itemSlotDiv) {
                    selectedSlotDiv.style.transform = 'translateY(0)';
                    selectedSlotDiv.style.boxShadow = 'none';
                    const oldButton = selectedSlotDiv.querySelector('button.buy-button-shop');
                    if (oldButton) selectedSlotDiv.removeChild(oldButton);
                }

                if (selectedSlotDiv === itemSlotDiv) {
                    // Deselect
                    itemSlotDiv.style.transform = 'translateY(0)';
                    itemSlotDiv.style.boxShadow = 'none';
                    const existingButton = itemSlotDiv.querySelector('button.buy-button-shop');
                    if (existingButton) itemSlotDiv.removeChild(existingButton);
                    selectedSlotDiv = null;
                    currentBuyButton = null;
                } else {
                    // Select
                    selectedSlotDiv = itemSlotDiv;
                    itemSlotDiv.style.transform = 'translateY(-5px)'; // Smaller elevation for smaller slot
                    itemSlotDiv.style.boxShadow = '0px 3px 10px rgba(0,0,0,0.3)';

                    const existingButton = itemSlotDiv.querySelector('button.buy-button-shop');
                    if (existingButton) itemSlotDiv.removeChild(existingButton);

                    currentBuyButton = document.createElement('button');
                    currentBuyButton.className = 'buy-button-shop';
                    currentBuyButton.textContent = `Buy (${currentItemForPurchase.cost} R)`;
                    currentBuyButton.style.padding = '4px 8px'; // Smaller padding
                    currentBuyButton.style.fontSize = '0.7em'; // Smaller font
                    currentBuyButton.style.backgroundColor = '#e67e22';
                    currentBuyButton.style.color = 'white';
                    currentBuyButton.style.border = 'none';
                    currentBuyButton.style.borderRadius = '3px';
                    currentBuyButton.style.cursor = 'pointer';
                    currentBuyButton.style.marginTop = '5px';
                    currentBuyButton.dataset.itemId = currentItemForPurchase.id;

                    currentBuyButton.onclick = (e) => {
                        e.stopPropagation();
                        const itemToBuy = currentItemForPurchase;

                        if (mainPlayer.resource < itemToBuy.cost) {
                            showNotEnoughResourcesMessage(appContainer);
                            return;
                        }
                        mainPlayer.spendResource(itemToBuy.cost);

                        globalUnitRegistry.removeItemFromShop(itemToBuy.id);
                        globalUnitRegistry.addItemToPlayer(itemToBuy);

                        // Update the display item state for this slot
                        updateShopItemSlot(index, { sold: true, originalItem: itemToBuy });

                        console.log(`${itemToBuy.name} purchased and added to inventory!`);

                        // Update UI for the currently selected slot
                        itemSlotDiv.innerHTML = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 0.8em; font-weight: bold;">SOLD</p></div>`;
                        itemSlotDiv.style.transform = 'translateY(0)';
                        itemSlotDiv.style.boxShadow = 'none';
                        itemSlotDiv.style.cursor = 'default';
                        itemSlotDiv.dataset.sold = 'true';

                        selectedSlotDiv = null;

                        const resourceDisplayElement = document.getElementById('shop-resource-display');
                        if (resourceDisplayElement) {
                            resourceDisplayElement.textContent = `Resource: ${mainPlayer.resource}`;
                        }
                    };
                    itemSlotDiv.style.justifyContent = 'space-between';
                    itemSlotDiv.appendChild(currentBuyButton);
                }
            });
        } else {
            // Slot is null - render as empty
            itemSlotDiv.textContent = 'N/A';
            itemSlotDiv.style.cursor = 'default';
        }
        itemSlotsContainer.appendChild(itemSlotDiv);
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
    shopDiv.appendChild(itemSlotsContainer);
    shopDiv.appendChild(footer);

    appContainer.appendChild(shopDiv);
    console.log('Shop Scene displayed with Proceed button.');
} 