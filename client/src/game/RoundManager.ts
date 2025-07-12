import { logDebugInfo } from './DebugMode';
import { Player } from './TurnManager';
import { UnitTracker } from './UnitTracker';
import { UnitEventHandler, UnitTrackingHandler } from './UnitEventHandler';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { ModifierService } from './ModifierService';

// Interface for tracking round state
export interface RoundState {
    roundNumber: number;
    actionableUnitLimit: number;
    turnsTakenThisRound: {
        [Player.PLAYER_ONE]: number;
        [Player.PLAYER_TWO]: number;
    };
    unitsUsedThisRound: {
        [Player.PLAYER_ONE]: Set<string>; // Unit IDs
        [Player.PLAYER_TWO]: Set<string>; // Unit IDs
    };
    shouldEndRoundAfterTurn: boolean;
}

export class RoundManager implements UnitTrackingHandler {
    private roundState: RoundState;
    private unitEventHandler: UnitEventHandler;

    constructor() {
        this.roundState = {
            roundNumber: 1,
            actionableUnitLimit: 0,
            turnsTakenThisRound: {
                [Player.PLAYER_ONE]: 0,
                [Player.PLAYER_TWO]: 0
            },
            unitsUsedThisRound: {
                [Player.PLAYER_ONE]: new Set<string>(),
                [Player.PLAYER_TWO]: new Set<string>()
            },
            shouldEndRoundAfterTurn: false
        };

        this.unitEventHandler = new UnitEventHandler(this, this.roundState.unitsUsedThisRound);
    }

    /**
     * Gets the current round number
     */
    public getRoundNumber(): number {
        return this.roundState.roundNumber;
    }

    /**
     * Gets the actionable unit limit for the current round
     */
    public getActionableUnitLimit(): number {
        return this.roundState.actionableUnitLimit;
    }

    /**
     * Gets the number of turns taken by a player this round
     */
    public getTurnsTakenThisRound(player: Player): number {
        return this.roundState.turnsTakenThisRound[player];
    }

    /**
     * Checks if the current player can take another turn this round
     */
    public canTakeAnotherTurn(currentPlayer: Player): boolean {
        return this.roundState.turnsTakenThisRound[currentPlayer] < this.roundState.actionableUnitLimit;
    }

    /**
     * Marks a unit as used for the current round
     */
    public markUnitAsUsed(unitId: string, currentPlayer: Player): void {
        this.roundState.unitsUsedThisRound[currentPlayer].add(unitId);
        logDebugInfo('Unit marked as used this round', {
            unitId,
            player: currentPlayer,
            roundNumber: this.roundState.roundNumber
        });
    }

    /**
     * Checks if a unit can be selected (hasn't been used this round)
     */
    public canSelectUnit(unitId: string, currentPlayer: Player): boolean {
        return !this.roundState.unitsUsedThisRound[currentPlayer].has(unitId);
    }

    /**
     * Recalculates the actionable unit limit mid-round and handles immediate round ending if needed
     */
    public recalculateActionableUnitLimit(): void {
        const previousLimit = this.roundState.actionableUnitLimit;
        const newLimit = UnitTracker.calculateActionableUnitLimit();
        
        if (newLimit !== previousLimit) {
            console.log(`🔄 Unit count changed! Recalculating actionable unit limit: ${previousLimit} → ${newLimit}`);
            
            this.roundState.actionableUnitLimit = newLimit;
            
            // Check if either player has already exceeded the new limit
            const player1Exceeded = this.roundState.turnsTakenThisRound[Player.PLAYER_ONE] > newLimit;
            const player2Exceeded = this.roundState.turnsTakenThisRound[Player.PLAYER_TWO] > newLimit;
            
            if (player1Exceeded || player2Exceeded) {
                console.log(`⚠️ Turn limit exceeded! P1: ${this.roundState.turnsTakenThisRound[Player.PLAYER_ONE]}/${newLimit}, P2: ${this.roundState.turnsTakenThisRound[Player.PLAYER_TWO]}/${newLimit}`);
                console.log(`🔄 Round will end immediately after current turn completes`);
                
                // Mark that we need to end the round after the current turn
                this.roundState.shouldEndRoundAfterTurn = true;
                
                logDebugInfo('Round marked for immediate ending', {
                    previousLimit,
                    newLimit,
                    player1Turns: this.roundState.turnsTakenThisRound[Player.PLAYER_ONE],
                    player2Turns: this.roundState.turnsTakenThisRound[Player.PLAYER_TWO],
                    player1Exceeded,
                    player2Exceeded
                });
            }
            
            const aliveCounts = UnitTracker.getAliveUnitCounts();
            logDebugInfo('Actionable unit limit recalculated', {
                previousLimit,
                newLimit,
                alivePlayerUnits: aliveCounts.player,
                aliveEnemyUnits: aliveCounts.enemy,
                currentRound: this.roundState.roundNumber
            });
        }
    }

    /**
     * Starts a new round
     */
    public startNewRound(): void {
        // Process round-end modifiers before starting the new round
        // This applies toxicity damage, leak energy loss, etc.
        ModifierService.processRoundEndModifiers();
        
        this.roundState.roundNumber++;
        this.roundState.actionableUnitLimit = UnitTracker.calculateActionableUnitLimit();
        this.roundState.turnsTakenThisRound[Player.PLAYER_ONE] = 0;
        this.roundState.turnsTakenThisRound[Player.PLAYER_TWO] = 0;
        this.roundState.unitsUsedThisRound[Player.PLAYER_ONE].clear();
        this.roundState.unitsUsedThisRound[Player.PLAYER_TWO].clear();
        this.roundState.shouldEndRoundAfterTurn = false; // Reset the flag

        console.log(`🔄 NEW ROUND ${this.roundState.roundNumber} STARTED!`);
        console.log(`📊 Actionable Unit Limit: ${this.roundState.actionableUnitLimit}`);
        console.log(`🔄 All units are now eligible for selection again`);
        
        const aliveCounts = UnitTracker.getAliveUnitCounts();
        logDebugInfo('New round started', {
            roundNumber: this.roundState.roundNumber,
            actionableUnitLimit: this.roundState.actionableUnitLimit,
            alivePlayerUnits: aliveCounts.player,
            aliveEnemyUnits: aliveCounts.enemy
        });
    }

    /**
     * Checks if both players have reached their turn limit for the current round
     */
    public shouldStartNewRound(): boolean {
        // Check if we're marked to end the round immediately
        if (this.roundState.shouldEndRoundAfterTurn) {
            return true;
        }
        
        const player1Limit = this.roundState.turnsTakenThisRound[Player.PLAYER_ONE] >= this.roundState.actionableUnitLimit;
        const player2Limit = this.roundState.turnsTakenThisRound[Player.PLAYER_TWO] >= this.roundState.actionableUnitLimit;
        
        return player1Limit && player2Limit;
    }

    /**
     * Increments the turn count for the current player
     */
    public incrementTurnCount(currentPlayer: Player): void {
        this.roundState.turnsTakenThisRound[currentPlayer]++;
    }

    /**
     * Utility method to check if a round is about to end
     */
    public isRoundEndingAfterTurn(): boolean {
        return this.roundState.shouldEndRoundAfterTurn;
    }

    /**
     * Utility method to get units used this round for a specific player
     */
    public getUnitsUsedThisRound(player: Player): string[] {
        return Array.from(this.roundState.unitsUsedThisRound[player]);
    }

    /**
     * Utility method to check if a specific unit has been used this round
     */
    public hasUnitBeenUsedThisRound(unitId: string, player: Player): boolean {
        return this.roundState.unitsUsedThisRound[player].has(unitId);
    }

    /**
     * Call this method when a unit dies to trigger recalculation
     */
    public onUnitDeath(unitId: string, team: 'player' | 'enemy'): void {
        this.unitEventHandler.onUnitDeath(unitId, team);
    }

    /**
     * Call this method when a unit is added/revived to trigger recalculation
     */
    public onUnitAdded(unitId: string, team: 'player' | 'enemy'): void {
        this.unitEventHandler.onUnitAdded(unitId, team);
    }

    /**
     * Call this method when unit health changes to check if recalculation is needed
     */
    public onUnitHealthChanged(unitId: string, team: 'player' | 'enemy', newHealth: number, oldHealth: number): void {
        this.unitEventHandler.onUnitHealthChanged(unitId, team, newHealth, oldHealth);
    }

    /**
     * Force start a new round (for debugging or special scenarios)
     */
    public forceNewRound(): void {
        this.startNewRound();
    }

    /**
     * Reset the round state
     */
    public reset(): void {
        this.roundState = {
            roundNumber: 1,
            actionableUnitLimit: 0,
            turnsTakenThisRound: {
                [Player.PLAYER_ONE]: 0,
                [Player.PLAYER_TWO]: 0
            },
            unitsUsedThisRound: {
                [Player.PLAYER_ONE]: new Set<string>(),
                [Player.PLAYER_TWO]: new Set<string>()
            },
            shouldEndRoundAfterTurn: false
        };

        // Recreate the unit event handler with the new state
        this.unitEventHandler = new UnitEventHandler(this, this.roundState.unitsUsedThisRound);
    }

    /**
     * Get a copy of the current round state
     */
    public getRoundState(): RoundState {
        return {
            roundNumber: this.roundState.roundNumber,
            actionableUnitLimit: this.roundState.actionableUnitLimit,
            turnsTakenThisRound: { ...this.roundState.turnsTakenThisRound },
            unitsUsedThisRound: {
                [Player.PLAYER_ONE]: new Set(this.roundState.unitsUsedThisRound[Player.PLAYER_ONE]),
                [Player.PLAYER_TWO]: new Set(this.roundState.unitsUsedThisRound[Player.PLAYER_TWO])
            },
            shouldEndRoundAfterTurn: this.roundState.shouldEndRoundAfterTurn
        };
    }

    /**
     * Gets alive unit counts for both teams
     */
    public getAliveUnitCounts(): { player: number; enemy: number } {
        return UnitTracker.getAliveUnitCounts();
    }
} 