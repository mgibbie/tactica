import { setDebugMode, isDebugModeEnabled } from './game/DebugMode';

export function showSplashScreen(container: HTMLElement, onStartGame: () => void): () => void {
    // Create splash screen elements
    const splashContainer = document.createElement('div');
    splashContainer.id = 'splash-screen';
    splashContainer.style.position = 'fixed';
    splashContainer.style.width = '100%';
    splashContainer.style.height = '100%';
    splashContainer.style.backgroundColor = '#1a1a1a'; // Dark background
    splashContainer.style.display = 'flex';
    splashContainer.style.flexDirection = 'column';
    splashContainer.style.justifyContent = 'center';
    splashContainer.style.alignItems = 'center';
    splashContainer.style.zIndex = '1000'; // Ensure it's on top

    const title = document.createElement('h1');
    title.textContent = 'Magepunk Presents: Tactica Trials';
    title.style.color = '#e0e0e0'; // Light grey text
    title.style.fontSize = '2.5em';
    title.style.marginBottom = '30px';
    title.style.fontFamily = '"Arial Black", Gadget, sans-serif';

    const startButton = document.createElement('button');
    startButton.textContent = 'Start Game';
    startButton.style.padding = '15px 30px';
    startButton.style.fontSize = '1.5em';
    startButton.style.backgroundColor = '#4CAF50'; // Green
    startButton.style.color = 'white';
    startButton.style.border = 'none';
    startButton.style.borderRadius = '5px';
    startButton.style.cursor = 'pointer';
    startButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    startButton.onmouseover = () => startButton.style.backgroundColor = '#45a049'; // Darker green on hover
    startButton.onmouseout = () => startButton.style.backgroundColor = '#4CAF50'; // Original green

    // Create debug mode checkbox container
    const debugContainer = document.createElement('div');
    debugContainer.style.display = 'flex';
    debugContainer.style.alignItems = 'center';
    debugContainer.style.marginTop = '20px';
    debugContainer.style.marginBottom = '10px';

    const debugCheckbox = document.createElement('input');
    debugCheckbox.type = 'checkbox';
    debugCheckbox.id = 'debug-mode-checkbox';
    debugCheckbox.checked = isDebugModeEnabled();
    debugCheckbox.style.marginRight = '10px';
    debugCheckbox.style.transform = 'scale(1.2)'; // Make checkbox slightly larger
    debugCheckbox.style.cursor = 'pointer';

    const debugLabel = document.createElement('label');
    debugLabel.htmlFor = 'debug-mode-checkbox';
    debugLabel.textContent = 'Debug Mode (Player controls enemies)';
    debugLabel.style.color = '#e0e0e0';
    debugLabel.style.fontSize = '1.1em';
    debugLabel.style.cursor = 'pointer';
    debugLabel.style.userSelect = 'none';

    // Add hover effect to label
    debugLabel.onmouseover = () => debugLabel.style.color = '#f0f0f0';
    debugLabel.onmouseout = () => debugLabel.style.color = '#e0e0e0';

    // Handle checkbox change
    const handleDebugChange = () => {
        setDebugMode(debugCheckbox.checked);
    };

    debugCheckbox.addEventListener('change', handleDebugChange);

    debugContainer.appendChild(debugCheckbox);
    debugContainer.appendChild(debugLabel);

    // Event listener for the start button
    const handleStartClick = () => {
        cleanupSplashScreen();
        onStartGame(); // Callback to start the game
    };

    startButton.addEventListener('click', handleStartClick);

    splashContainer.appendChild(title);
    splashContainer.appendChild(debugContainer);
    splashContainer.appendChild(startButton);
    container.appendChild(splashContainer);

    // Cleanup function to remove splash screen elements and event listeners
    const cleanupSplashScreen = () => {
        startButton.removeEventListener('click', handleStartClick);
        debugCheckbox.removeEventListener('change', handleDebugChange);
        if (splashContainer.parentNode) {
            splashContainer.parentNode.removeChild(splashContainer);
        }
        console.log('Splash screen cleaned up.');
    };

    return cleanupSplashScreen; // Return the cleanup function
} 