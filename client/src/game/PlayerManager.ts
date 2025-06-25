import { logDebugInfo, debugAlert } from './DebugMode';
import { Player } from './TurnManager';

export class PlayerManager {
    private currentPlayer: Player;

    constructor(startingPlayer: Player = Player.PLAYER_ONE) {
        this.currentPlayer = startingPlayer;
    }

    /**
     * Gets the current active player
     */
    public getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    /**
     * Switches to the other player
     */
    public switchPlayer(): Player {
        const previousPlayer = this.currentPlayer;
        this.currentPlayer = this.getOpposingPlayer(this.currentPlayer);
        
        console.log(`🔄 Player switched: ${this.getPlayerDisplayName(previousPlayer)} → ${this.getPlayerDisplayName(this.currentPlayer)}`);
        
        logDebugInfo('Player switched', {
            previousPlayer,
            currentPlayer: this.currentPlayer
        });

        return this.currentPlayer;
    }

    /**
     * Gets the opposing player
     */
    public getOpposingPlayer(player: Player): Player {
        return player === Player.PLAYER_ONE ? Player.PLAYER_TWO : Player.PLAYER_ONE;
    }

    /**
     * Checks if it's a specific player's turn
     */
    public isPlayerTurn(player: Player): boolean {
        return this.currentPlayer === player;
    }

    /**
     * Gets a human-readable display name for a player
     */
    public getPlayerDisplayName(player: Player): string {
        const playerNames = {
            [Player.PLAYER_ONE]: 'Player 1',
            [Player.PLAYER_TWO]: 'Player 2'
        };
        
        return playerNames[player] || 'Unknown Player';
    }

    /**
     * Force set the current player (for debugging or special scenarios)
     */
    public forceSetPlayer(player: Player): void {
        debugAlert(`Forcing player change from ${this.currentPlayer} to ${player}`);
        const previousPlayer = this.currentPlayer;
        this.currentPlayer = player;
        
        logDebugInfo('Player forced', {
            previousPlayer,
            currentPlayer: this.currentPlayer
        });
    }

    /**
     * Reset to the starting player
     */
    public reset(startingPlayer: Player = Player.PLAYER_ONE): void {
        this.currentPlayer = startingPlayer;
    }
} 