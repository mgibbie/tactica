import { mainPlayer } from '../game/Player';
import { Globe } from '../globes/Globe';
import { getRandomGlobes } from '../globes/GlobeDex';
import { setSelectedGlobe } from '../globes/GlobalState';
import { globalUnitRegistry } from '../units/UnitRegistry';

let currentAppContainer: HTMLElement | null = null;
let currentOnProceedToGameCallback: (() => void) | null = null;
let currentGlobes: Globe[] = [];

function refreshEncounterScene() {
    if (currentAppContainer && currentOnProceedToGameCallback) {
        showEncounterScene(currentAppContainer, currentOnProceedToGameCallback);
    } else {
        console.error("Cannot refresh encounter scene: a container or callback is missing.");
    }
}

export function showEncounterScene(
    appContainer: HTMLElement,
    onProceedToGameCallback: () => void
): void {
    // Store args for potential refresh
    currentAppContainer = appContainer;
    currentOnProceedToGameCallback = onProceedToGameCallback;

    // Get random globes for level 1 (we can make this dynamic later)
    currentGlobes = getRandomGlobes(1);

    // Check if player has any units
    const hasUnits = globalUnitRegistry.playerParty.length > 0;

    console.log('Showing Encounter Scene...');
    appContainer.innerHTML = '';

    const encounterDiv = document.createElement('div');
    encounterDiv.id = 'encounter-scene';
    encounterDiv.style.width = '100%';
    encounterDiv.style.height = '100%';
    encounterDiv.style.display = 'flex';
    encounterDiv.style.flexDirection = 'column';
    encounterDiv.style.alignItems = 'center';
    encounterDiv.style.justifyContent = 'space-between';
    encounterDiv.style.backgroundColor = '#2c3e50';
    encounterDiv.style.color = '#ecf0f1';
    encounterDiv.style.fontFamily = 'Arial, sans-serif';
    encounterDiv.style.padding = '20px';
    encounterDiv.style.boxSizing = 'border-box';
    encounterDiv.style.position = 'relative';

    const header = document.createElement('h1');
    header.textContent = 'ENCOUNTER';
    header.style.textAlign = 'center';
    header.style.fontSize = '3em';
    header.style.margin = '0 0 15px 0';

    // Add warning message if no units
    if (!hasUnits) {
        const warningDiv = document.createElement('div');
        warningDiv.style.width = '100%';
        warningDiv.style.padding = '15px';
        warningDiv.style.backgroundColor = '#e74c3c';
        warningDiv.style.color = '#ffffff';
        warningDiv.style.borderRadius = '8px';
        warningDiv.style.textAlign = 'center';
        warningDiv.style.fontSize = '1.2em';
        warningDiv.style.fontWeight = 'bold';
        warningDiv.style.marginBottom = '15px';
        warningDiv.style.border = '2px solid #c0392b';
        warningDiv.innerHTML = '⚠️ NO UNITS AVAILABLE!<br><span style="font-size: 0.9em; font-weight: normal;">You need to purchase units from the Shop before entering battles.</span>';
        encounterDiv.appendChild(warningDiv);
    }

    const contentArea = document.createElement('div');
    contentArea.id = 'encounter-content-area';
    contentArea.style.flexGrow = '1';
    contentArea.style.width = '100%';
    contentArea.style.display = 'flex';
    contentArea.style.justifyContent = 'space-around';
    contentArea.style.alignItems = 'center';
    contentArea.style.overflow = 'hidden';
    contentArea.style.padding = '20px';

    // Create globe selection slots
    currentGlobes.forEach((globe, index) => {
        const globeSlot = document.createElement('div');
        globeSlot.style.width = '250px';
        globeSlot.style.height = '350px';
        globeSlot.style.border = hasUnits ? '2px solid #3498db' : '2px solid #7f8c8d';
        globeSlot.style.borderRadius = '10px';
        globeSlot.style.padding = '15px';
        globeSlot.style.display = 'flex';
        globeSlot.style.flexDirection = 'column';
        globeSlot.style.alignItems = 'center';
        globeSlot.style.justifyContent = 'space-between';
        globeSlot.style.backgroundColor = hasUnits ? '#34495e' : '#2c3e50';
        globeSlot.style.cursor = hasUnits ? 'pointer' : 'not-allowed';
        globeSlot.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
        globeSlot.style.opacity = hasUnits ? '1' : '0.5';

        // Globe image
        const globeImage = document.createElement('img');
        globeImage.src = globe.imageUrl;
        globeImage.alt = globe.name;
        globeImage.style.width = '150px';
        globeImage.style.height = '150px';
        globeImage.style.objectFit = 'contain';
        globeImage.style.marginBottom = '10px';
        globeImage.style.filter = hasUnits ? 'none' : 'grayscale(100%)';

        // Globe name
        const nameText = document.createElement('h3');
        nameText.textContent = globe.name;
        nameText.style.margin = '0 0 10px 0';
        nameText.style.textAlign = 'center';

        // Level indicator
        const levelText = document.createElement('p');
        levelText.textContent = `Level ${globe.level}`;
        levelText.style.margin = '0 0 10px 0';
        levelText.style.color = '#f1c40f';

        // Battle condition
        const conditionText = document.createElement('p');
        conditionText.textContent = globe.battleCondition.name;
        conditionText.style.margin = '0 0 10px 0';
        conditionText.style.fontStyle = 'italic';

        // Reward
        const rewardText = document.createElement('p');
        rewardText.textContent = `Reward: ${globe.reward.resource} Resources`;
        rewardText.style.margin = '0 0 10px 0';
        rewardText.style.color = '#2ecc71';

        // Enemy count
        const enemyText = document.createElement('p');
        enemyText.textContent = `Enemies: ${globe.enemies.length}`;
        enemyText.style.margin = '0 0 10px 0';

        // Click handler - only if player has units
        if (hasUnits) {
            globeSlot.onclick = () => {
                // Reset previous selection
                const previousSelected = document.querySelector('.selected-globe') as HTMLElement;
                if (previousSelected) {
                    previousSelected.classList.remove('selected-globe');
                    previousSelected.style.transform = 'translateY(0)';
                    previousSelected.style.boxShadow = 'none';
                }

                // Set new selection
                globeSlot.classList.add('selected-globe');
                globeSlot.style.transform = 'translateY(-10px)';
                globeSlot.style.boxShadow = '0px 5px 15px rgba(0,0,0,0.3)';

                // Store the selected globe globally
                setSelectedGlobe(globe);
                console.log('Selected globe stored:', globe);

                // Navigate directly to the game scene with the selected globe
                console.log('Navigating to game scene with selected globe');
                onProceedToGameCallback();
            };

            // Hover effects
            globeSlot.addEventListener('mouseenter', () => {
                if (!globeSlot.classList.contains('selected-globe')) {
                    globeSlot.style.transform = 'translateY(-5px)';
                    globeSlot.style.boxShadow = '0px 3px 10px rgba(0,0,0,0.2)';
                }
            });

            globeSlot.addEventListener('mouseleave', () => {
                if (!globeSlot.classList.contains('selected-globe')) {
                    globeSlot.style.transform = 'translateY(0)';
                    globeSlot.style.boxShadow = 'none';
                }
            });
        } else {
            // Show tooltip on hover when disabled
            globeSlot.addEventListener('mouseenter', () => {
                globeSlot.title = 'Purchase units from the Shop first!';
            });
        }

        globeSlot.appendChild(globeImage);
        globeSlot.appendChild(nameText);
        globeSlot.appendChild(levelText);
        globeSlot.appendChild(conditionText);
        globeSlot.appendChild(rewardText);
        globeSlot.appendChild(enemyText);

        contentArea.appendChild(globeSlot);
    });

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

    // Add squad info to footer
    const squadInfoFooter = document.createElement('div');
    squadInfoFooter.id = 'squad-info-display';
    squadInfoFooter.textContent = `Squad: ${globalUnitRegistry.playerParty.length}/5 units`;
    squadInfoFooter.style.padding = '10px 15px';
    squadInfoFooter.style.backgroundColor = hasUnits ? '#27ae60' : '#e74c3c';
    squadInfoFooter.style.color = '#ffffff';
    squadInfoFooter.style.borderRadius = '5px';
    squadInfoFooter.style.fontSize = '1em';
    squadInfoFooter.style.fontWeight = 'bold';
    squadInfoFooter.style.display = 'flex';
    squadInfoFooter.style.alignItems = 'center';

    footer.appendChild(squadInfoFooter);
    footer.appendChild(resourceDisplayFooter);

    encounterDiv.appendChild(header);
    encounterDiv.appendChild(contentArea);
    encounterDiv.appendChild(footer);

    appContainer.appendChild(encounterDiv);
    console.log('Encounter Scene displayed.');
} 