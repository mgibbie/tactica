import { markShopForNextVisitRefresh } from '../shop/ShopScene';
import { showSplashScreen } from '../splash';
import { isDebugModeEnabled } from '../game/DebugMode';
import { globalUnitFactory } from '../units/UnitFactory';

export async function initializeApp() {
    console.log('Initializing application...');
    markShopForNextVisitRefresh();
    
    // Add testguy to party if debug mode is enabled
    if (isDebugModeEnabled()) {
        console.log('🐛 Debug mode enabled - adding testguy to party');
        const testguy = globalUnitFactory.createAndAddUnitToPlayerParty('testguy');
        if (testguy) {
            console.log(`✅ Added testguy to party: ${testguy.name} with ${testguy.skills.length} skills`);
        } else {
            console.error('❌ Failed to create testguy');
        }
    }
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden'; // Prevent body scrollbars

    const appContainer = document.createElement('div');
    appContainer.id = 'app-container';
    appContainer.style.width = '100vw';
    appContainer.style.height = '100vh';
    appContainer.style.margin = '0';
    appContainer.style.padding = '0';
    appContainer.style.display = 'flex'; 
    appContainer.style.justifyContent = 'center';
    appContainer.style.alignItems = 'center';
    appContainer.style.overflow = 'hidden';
    document.body.appendChild(appContainer);

    // This container is used by startGame, passed to it.
    const gameSpecificContainer = document.createElement('div');
    gameSpecificContainer.id = 'game-content-wrapper';
    gameSpecificContainer.style.position = 'relative'; // Added for positioning context within game scene

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