import { initializeApp, runApplication } from './app/AppInitializer';
import { createNavigationHandlers } from './app/NavigationHandlers';



async function initializeAppMain() {
    // First create the DOM containers
    const { appContainer, gameSpecificContainer } = await initializeApp();
    
    // Now create the real handlers with the actual containers
    const handlers = createNavigationHandlers(appContainer, gameSpecificContainer);
    
    // Start with the splash screen
    handlers.showSplash();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => runApplication(initializeAppMain));
} else {
    runApplication(initializeAppMain);
}

 