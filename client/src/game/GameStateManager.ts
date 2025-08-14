import { Globe } from '../globes/Globe';
import { GlobeLoader } from '../globes/GlobeLoader';
import { showVictoryScreen, showDefeatScreen } from './VictoryScreens';
import { showShopScene } from '../shop/ShopScene';
import { showEncounterScene } from '../encounter/EncounterScene';
import { GLOBAL_NAVIGATION_HANDLERS, GAME_TURN_MANAGER } from '../app/NavigationHandlers';

export class GameStateManager {
    private selectedGlobe: Globe | null = null;
    private appContainer: HTMLElement | null = null;

    constructor() {
        console.log('GameStateManager initialized');
    }

    public setAppContainer(container: HTMLElement): void {
        this.appContainer = container;
    }

    public getAppContainer(): HTMLElement | null {
        return this.appContainer;
    }

    public async setSelectedGlobe(globe: Globe, gameScene: any): Promise<void> {
        console.log('Setting selected globe:', globe);
        this.selectedGlobe = globe;
        if (globe) {
            await this.loadGlobe(globe, gameScene);
        }
    }

    public getSelectedGlobe(): Globe | null {
        return this.selectedGlobe;
    }

    private async loadGlobe(globe: Globe, gameScene: any): Promise<void> {
        console.log('Loading globe in GameStateManager:', globe);
        await GlobeLoader.loadGlobe(gameScene, globe);
    }

    public checkGameEndConditions(actionManager: any): void {
        if (!this.appContainer) {
            console.warn('❌ Cannot check game end conditions - no app container set');
            return;
        }

        const gameEndState = actionManager.checkGameEndConditions();
        
        if (gameEndState === 'victory') {
            console.log('🎉 VICTORY! Showing victory screen...');
            showVictoryScreen(this.appContainer, () => {
                // Navigate back to shop when continue is clicked
                showShopScene(this.appContainer!, () => {
                    // Use proper navigation: shop → encounter → game
                    console.log('🎮 Navigating from shop to encounter scene...');
                    if (GLOBAL_NAVIGATION_HANDLERS) {
                        GLOBAL_NAVIGATION_HANDLERS.handleDisplayEncounter();
                    } else {
                        console.error('❌ Global navigation handlers not available');
                        showEncounterScene(this.appContainer!, () => {
                            console.error('🎮 Fallback: Globe selection may not work properly');
                        });
                    }
                });
            });
        } else if (gameEndState === 'defeat') {
            console.log('💀 DEFEAT! Showing defeat screen...');
            showDefeatScreen(this.appContainer, () => {
                // Restart -> go to splash screen instead of shop
                console.log('🔄 Restarting game to splash screen...');
                if (GAME_TURN_MANAGER) {
                    GAME_TURN_MANAGER.reset();
                }
                try {
                    import('./PassiveService').then(({ PassiveService }) => {
                        PassiveService.revertRabbitRidersAtBattleEnd();
                        PassiveService.restoreKnockOffItemsAtBattleEnd();
                    });
                } catch {}
                // Navigate to splash
                import('../splash').then(({ showSplashScreen }) => {
                    const cleanup = showSplashScreen(this.appContainer!, () => {
                        // On start game from splash, proceed to shop as usual
                        showShopScene(this.appContainer!, () => {
                            if (GLOBAL_NAVIGATION_HANDLERS) {
                                GLOBAL_NAVIGATION_HANDLERS.handleDisplayEncounter();
                            } else {
                                showEncounterScene(this.appContainer!, () => {});
                            }
                        });
                    });
                    // optional: keep cleanup handle if needed
                });
            });
        }
        // If gameEndState === 'continue', do nothing and let the game continue
    }
} 