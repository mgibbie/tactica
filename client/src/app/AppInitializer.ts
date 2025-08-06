import { markShopForNextVisitRefresh } from '../shop/ShopScene';
import { showSplashScreen } from '../splash';

export async function initializeApp() {
    console.log('Initializing application...');
    markShopForNextVisitRefresh();
    

    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden'; // Prevent body scrollbars

    const appContainer = document.createElement('div');
    appContainer.id = 'app-container';
    appContainer.style.width = '100vw';
    appContainer.style.height = '100vh';
    appContainer.style.margin = '0';
    appContainer.style.padding = '0';
    appContainer.style.display = 'flex'; 
    appContainer.style.flexDirection = 'row'; // Horizontal layout
    appContainer.style.overflow = 'hidden';
    document.body.appendChild(appContainer);

    // Create main game area (left side)
    const gameArea = document.createElement('div');
    gameArea.id = 'game-area';
    gameArea.style.flex = '1'; // Take remaining space
    gameArea.style.display = 'flex';
    gameArea.style.justifyContent = 'center';
    gameArea.style.alignItems = 'center';
    gameArea.style.position = 'relative';
    appContainer.appendChild(gameArea);

    // Create info panel area (right side)
    const infoPanelArea = document.createElement('div');
    infoPanelArea.id = 'info-panel-area';
    infoPanelArea.style.width = '350px'; // Fixed width for info panel area
    infoPanelArea.style.height = '100vh';
    infoPanelArea.style.position = 'relative';
    infoPanelArea.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; // Subtle background to show the area
    appContainer.appendChild(infoPanelArea);

    // This container is used by startGame, passed to it.
    const gameSpecificContainer = document.createElement('div');
    gameSpecificContainer.id = 'game-content-wrapper';
    gameSpecificContainer.style.position = 'relative'; // Added for positioning context within game scene
    
    // Append game container to the game area instead of app container
    gameArea.appendChild(gameSpecificContainer);

    console.log('Application initialized, ready for content.');

    return { appContainer, gameSpecificContainer };
}

export function runApplication(initializeAppFn: () => Promise<void>) {
    initializeAppFn().catch(error => {
        console.error("Critical error during application initialization:", error);
        try {
            document.body.innerHTML = 
                '<div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #1a1a1a; color: #e0e0e0; font-family: sans-serif;">' +
                '<h1>Application Error</h1>' +
                '<p>A critical error occurred and the application cannot start.</p>' +
                '<p>Please check the browser console for more details.</p>' +
                '</div>';
        } catch (e) {
            console.error("Could not display error message in DOM.", e);
        }
    });
} 