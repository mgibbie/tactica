import { markShopForNextVisitRefresh } from '../shop/ShopScene';
import { mainPlayer } from './Player';
import { cleanupGame } from '../game';

export function showVictoryScreen(
    appContainer: HTMLElement,
    onContinueToShop: () => void
): void {
    console.log('Showing Victory Screen');
    
    // Properly clean up the game scene and all THREE.js objects
    cleanupGame();
    
    // Additional comprehensive UI cleanup to ensure no buttons remain
    // This catches any buttons that might have been created after cleanupGame()
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        // Only remove buttons that are likely game UI buttons (not the victory screen button)
        if (button.id !== 'victory-continue-button' && 
            button.id !== 'defeat-restart-button' &&
            !button.closest('#victory-screen') && 
            !button.closest('#defeat-screen')) {
            console.log(`🧹 Removing leftover button: ${button.textContent} (ID: ${button.id})`);
            button.remove();
        }
    });
    
    // Also clean up any remaining UI elements that might have buttons
    const uiElements = document.querySelectorAll('#game-info-panel, #turn-display-game-scene, #phase-display-game-scene, #debug-mode-display-game-scene');
    uiElements.forEach(element => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
            console.log(`🧹 Removed UI element: ${element.id}`);
        }
    });
    
    appContainer.innerHTML = ''; // Clear previous content

    const victoryDiv = document.createElement('div');
    victoryDiv.id = 'victory-screen';
    victoryDiv.style.width = '100%';
    victoryDiv.style.height = '100%';
    victoryDiv.style.display = 'flex';
    victoryDiv.style.flexDirection = 'column';
    victoryDiv.style.alignItems = 'center';
    victoryDiv.style.justifyContent = 'center';
    victoryDiv.style.backgroundColor = '#2c5234'; // Victory green background
    victoryDiv.style.color = '#ecf0f1';
    victoryDiv.style.fontFamily = 'Arial, sans-serif';
    victoryDiv.style.textAlign = 'center';

    // Victory Title
    const title = document.createElement('h1');
    title.textContent = 'YOU WIN!';
    title.style.fontSize = '4em';
    title.style.margin = '0 0 30px 0';
    title.style.color = '#27ae60';
    title.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
    title.style.fontWeight = 'bold';

    // Victory Message
    const message = document.createElement('p');
    message.textContent = 'Congratulations! You have defeated all enemies.';
    message.style.fontSize = '1.5em';
    message.style.margin = '0 0 40px 0';
    message.style.color = '#ecf0f1';

    // Continue Button
    const continueButton = document.createElement('button');
    continueButton.id = 'victory-continue-button'; // Set ID to prevent cleanup
    continueButton.textContent = 'CONTINUE TO SHOP';
    continueButton.style.padding = '15px 30px';
    continueButton.style.fontSize = '1.2em';
    continueButton.style.backgroundColor = '#27ae60';
    continueButton.style.color = 'white';
    continueButton.style.border = 'none';
    continueButton.style.borderRadius = '8px';
    continueButton.style.cursor = 'pointer';
    continueButton.style.fontWeight = 'bold';
    continueButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    continueButton.style.transition = 'background-color 0.2s ease';

    continueButton.addEventListener('mouseover', () => {
        continueButton.style.backgroundColor = '#229954';
    });
    continueButton.addEventListener('mouseout', () => {
        continueButton.style.backgroundColor = '#27ae60';
    });

    const cleanupInterval = setInterval(() => {
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {
            // Only remove buttons that are likely game UI buttons (not the victory screen button)
            if (button.id !== 'victory-continue-button' && 
                button.id !== 'defeat-restart-button' &&
                !button.closest('#victory-screen') && 
                !button.closest('#defeat-screen')) {
                console.log(`🧹 Periodic cleanup: Removing button: ${button.textContent} (ID: ${button.id})`);
                button.remove();
            }
        });
    }, 100); // Check every 100ms
    
    continueButton.onclick = () => {
        // Set player resources to 10 and increment victories
        mainPlayer.resource = 10;
        mainPlayer.incrementVictories();
        console.log(`🎉 Victory! Resources set to 10, victories: ${mainPlayer.victories}`);
        
        // Mark shop for refresh and continue
        markShopForNextVisitRefresh();
        
        // Clear interval and continue
        clearInterval(cleanupInterval);
        onContinueToShop();
    };

    victoryDiv.appendChild(title);
    victoryDiv.appendChild(message);
    victoryDiv.appendChild(continueButton);
    appContainer.appendChild(victoryDiv);
}

export function showDefeatScreen(
    appContainer: HTMLElement,
    onRestart: () => void
): void {
    console.log('Showing Defeat Screen');
    
    // Properly clean up the game scene and all THREE.js objects
    cleanupGame();
    
    // Additional comprehensive UI cleanup to ensure no buttons remain
    // This catches any buttons that might have been created after cleanupGame()
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        // Only remove buttons that are likely game UI buttons (not the defeat screen button)
        if (button.id !== 'victory-continue-button' && 
            button.id !== 'defeat-restart-button' &&
            !button.closest('#victory-screen') && 
            !button.closest('#defeat-screen')) {
            console.log(`🧹 Removing leftover button: ${button.textContent} (ID: ${button.id})`);
            button.remove();
        }
    });
    
    // Also clean up any remaining UI elements that might have buttons
    const uiElements = document.querySelectorAll('#game-info-panel, #turn-display-game-scene, #phase-display-game-scene, #debug-mode-display-game-scene');
    uiElements.forEach(element => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
            console.log(`🧹 Removed UI element: ${element.id}`);
        }
    });
    
    appContainer.innerHTML = ''; // Clear previous content

    const defeatDiv = document.createElement('div');
    defeatDiv.id = 'defeat-screen';
    defeatDiv.style.width = '100%';
    defeatDiv.style.height = '100%';
    defeatDiv.style.display = 'flex';
    defeatDiv.style.flexDirection = 'column';
    defeatDiv.style.alignItems = 'center';
    defeatDiv.style.justifyContent = 'center';
    defeatDiv.style.backgroundColor = '#5c2c2c'; // Defeat red background
    defeatDiv.style.color = '#ecf0f1';
    defeatDiv.style.fontFamily = 'Arial, sans-serif';
    defeatDiv.style.textAlign = 'center';

    // Defeat Title
    const title = document.createElement('h1');
    title.textContent = 'YOU LOSE!';
    title.style.fontSize = '4em';
    title.style.margin = '0 0 30px 0';
    title.style.color = '#e74c3c';
    title.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
    title.style.fontWeight = 'bold';

    // Defeat Message
    const message = document.createElement('p');
    message.textContent = 'All your units have been defeated. Better luck next time!';
    message.style.fontSize = '1.5em';
    message.style.margin = '0 0 40px 0';
    message.style.color = '#ecf0f1';

    // Restart Button
    const restartButton = document.createElement('button');
    restartButton.id = 'defeat-restart-button'; // Set ID to prevent cleanup
    restartButton.textContent = 'RESTART GAME';
    restartButton.style.padding = '15px 30px';
    restartButton.style.fontSize = '1.2em';
    restartButton.style.backgroundColor = '#e74c3c';
    restartButton.style.color = 'white';
    restartButton.style.border = 'none';
    restartButton.style.borderRadius = '8px';
    restartButton.style.cursor = 'pointer';
    restartButton.style.fontWeight = 'bold';
    restartButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    restartButton.style.transition = 'background-color 0.2s ease';

    restartButton.addEventListener('mouseover', () => {
        restartButton.style.backgroundColor = '#c0392b';
    });
    restartButton.addEventListener('mouseout', () => {
        restartButton.style.backgroundColor = '#e74c3c';
    });

    restartButton.onclick = () => {
        onRestart();
    };

    defeatDiv.appendChild(title);
    defeatDiv.appendChild(message);
    defeatDiv.appendChild(restartButton);
    appContainer.appendChild(defeatDiv);
    
    // Set up periodic cleanup to catch any buttons created after defeat screen
    const cleanupInterval = setInterval(() => {
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {
            // Only remove buttons that are likely game UI buttons (not the defeat screen button)
            if (button.id !== 'victory-continue-button' && 
                button.id !== 'defeat-restart-button' &&
                !button.closest('#victory-screen') && 
                !button.closest('#defeat-screen')) {
                console.log(`🧹 Periodic cleanup: Removing button: ${button.textContent} (ID: ${button.id})`);
                button.remove();
            }
        });
    }, 100); // Check every 100ms
    
    // Clear interval when button is clicked
    const originalRestartOnClick = restartButton.onclick;
    restartButton.onclick = () => {
        clearInterval(cleanupInterval);
        onRestart();
    };
} 