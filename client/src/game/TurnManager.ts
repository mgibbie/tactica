import { logDebugInfo } from './DebugMode';
import { Unit } from '../units/Unit';
import { RoundManager } from './RoundManager';
import { PhaseManager } from './PhaseManager';
import { PlayerManager } from './PlayerManager';
import { GameStateAggregator, GameStateSnapshot } from './GameStateAggregator';
import { TurnManagerDebugger } from './TurnManagerDebugger';

// Player identity constants
export enum Player {
    PLAYER_ONE = 'PLAYER_ONE',
    PLAYER_TWO = 'PLAYER_TWO'
}

// Turn phase constants
export enum TurnPhase {
    SELECT = 'SELECT',
    MOVE = 'MOVE',
    ACTION = 'ACTION'
}

// Alternative constants for clarity
export const PLAYER_CONSTANTS = {
    PLAYER_ONE: Player.PLAYER_ONE,
    PLAYER_TWO: Player.PLAYER_TWO
} as const;

export const PHASE_CONSTANTS = {
    SELECT: TurnPhase.SELECT,
    MOVE: TurnPhase.MOVE,
    ACTION: TurnPhase.ACTION
} as const;

export class TurnManager {
    private turnCount: number;
    private gameStarted: boolean;
    private roundManager: RoundManager;
    private phaseManager: PhaseManager;
    private playerManager: PlayerManager;
    private gameStateAggregator: GameStateAggregator;
    private debugger: TurnManagerDebugger;
    private selectedUnitId: string | null = null;

    constructor(startingPlayer: Player = Player.PLAYER_ONE) {
        this.turnCount = 1;
        this.gameStarted = false;
        this.roundManager = new RoundManager();
        this.phaseManager = new PhaseManager();
        this.playerManager = new PlayerManager(startingPlayer);
        this.gameStateAggregator = new GameStateAggregator(this.roundManager, this.phaseManager, this.playerManager);
        this.debugger = new TurnManagerDebugger(this.roundManager, this.phaseManager, this.playerManager);
        
        logDebugInfo('TurnManager initialized', {
            startingPlayer: this.playerManager.getCurrentPlayer(),
            currentPhase: this.phaseManager.getCurrentPhase(),
            turnCount: this.turnCount,
            roundNumber: this.roundManager.getRoundNumber()
        });
    }

    // ===== BASIC GETTERS =====

    public getCurrentPlayer(): Player { return this.playerManager.getCurrentPlayer(); }
    public getCurrentPhase(): TurnPhase { return this.phaseManager.getCurrentPhase(); }
    public getTurnCount(): number { return this.turnCount; }
    public getRoundNumber(): number { return this.roundManager.getRoundNumber(); }
    public getActionableUnitLimit(): number { return this.roundManager.getActionableUnitLimit(); }
    public getTurnsTakenThisRound(player: Player): number { return this.roundManager.getTurnsTakenThisRound(player); }
    public isGameStarted(): boolean { return this.gameStarted; }

    // ===== UNIT SELECTION METHODS =====

    public markUnitAsUsed(unitId: string): void { this.gameStateAggregator.markUnitAsUsed(unitId); }
    public canSelectUnit(unitId: string): boolean { return this.gameStateAggregator.canSelectUnit(unitId); }
    public getSelectableUnits(): Unit[] { return this.gameStateAggregator.getSelectableUnits(); }
    public setSelectedUnit(unitId: string): void { this.selectedUnitId = unitId; }
    public getSelectedUnitId(): string | null { return this.selectedUnitId; }

    // ===== GAME FLOW METHODS =====

    /**
     * Starts the game
     */
    public startGame(): void {
        if (this.gameStarted) {
            console.warn('⚠️ Game already started');
            return;
        }
        
        this.gameStarted = true;
        this.roundManager.recalculateActionableUnitLimit();
        
        console.log('🎮 GAME STARTED!');
        console.log(`👤 Starting Player: ${this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer())}`);
        console.log(`📊 Actionable Unit Limit: ${this.roundManager.getActionableUnitLimit()}`);
        
        logDebugInfo('Game started', {
            startingPlayer: this.playerManager.getCurrentPlayer(),
            actionableUnitLimit: this.roundManager.getActionableUnitLimit()
        });
    }

    /**
     * Advances to the next phase
     */
    public advancePhase(): void {
        if (!this.gameStarted) {
            console.warn('❌ Cannot advance phase - game not started');
            return;
        }
        this.phaseManager.advancePhase();
    }

    /**
     * Skips the current phase
     */
    public skipPhase(): void {
        if (!this.gameStarted) {
            console.warn('❌ Cannot skip phase - game not started');
            return;
        }
        this.phaseManager.skipPhase();
    }

    /**
     * Ends the current turn and handles player switching
     */
    public endTurn(): void {
        if (!this.gameStarted) {
            console.warn('❌ Cannot end turn - game not started');
            return;
        }
        
        const currentPlayer = this.playerManager.getCurrentPlayer();
        
        // Mark the selected unit as used for this round
        if (this.selectedUnitId) {
            this.markUnitAsUsed(this.selectedUnitId);
            console.log(`🎯 Unit ${this.selectedUnitId} marked as used for this round`);
        } else {
            console.warn('⚠️ No unit was selected for this turn');
        }
        
        this.roundManager.incrementTurnCount(currentPlayer);
        this.turnCount++;
        
        console.log(`🔚 Turn ${this.turnCount - 1} ended for ${this.playerManager.getPlayerDisplayName(currentPlayer)}`);
        console.log(`📊 Turns taken this round: P1=${this.roundManager.getTurnsTakenThisRound(Player.PLAYER_ONE)}, P2=${this.roundManager.getTurnsTakenThisRound(Player.PLAYER_TWO)}`);
        
        // Check if we should start a new round
        if (this.roundManager.shouldStartNewRound()) {
            this.roundManager.startNewRound();
        }
        
        // Switch to the other player
        this.playerManager.switchPlayer();
        this.phaseManager.resetToSelect();
        
        // Clear the selected unit for the next turn
        this.selectedUnitId = null;
        
        console.log(`🎯 Turn ${this.turnCount} - ${this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer())}'s turn`);
        
        logDebugInfo('Turn ended', {
            previousPlayer: currentPlayer,
            newPlayer: this.playerManager.getCurrentPlayer(),
            turnCount: this.turnCount,
            roundNumber: this.roundManager.getRoundNumber()
        });
    }

    // ===== DELEGATION METHODS =====

    public canTakeAnotherTurn(): boolean { return this.gameStateAggregator.canTakeAnotherTurn(); }
    public canMove(): boolean { return this.phaseManager.canMove(); }
    public canAct(): boolean { return this.phaseManager.canAct(); }
    public canSelect(): boolean { return this.phaseManager.canSelect(); }
    public isPlayerTurn(player: Player): boolean { return this.playerManager.isPlayerTurn(player); }
    public getPlayerDisplayName(player: Player): string { return this.playerManager.getPlayerDisplayName(player); }
    public getPhaseDisplayName(phase: TurnPhase): string { return this.phaseManager.getPhaseDisplayName(phase); }
    public getOpposingPlayer(player: Player): Player { return this.playerManager.getOpposingPlayer(player); }

    // ===== STATE AND UTILITY METHODS =====

    public getGameState(): GameStateSnapshot { return this.gameStateAggregator.getGameState(this.turnCount, this.gameStarted); }
    public isRoundEndingAfterTurn(): boolean { return this.gameStateAggregator.isRoundEndingAfterTurn(); }
    public getUnitsUsedThisRound(player: Player): string[] { return this.gameStateAggregator.getUnitsUsedThisRound(player); }
    public hasUnitBeenUsedThisRound(unitId: string, player: Player): boolean { return this.gameStateAggregator.hasUnitBeenUsedThisRound(unitId, player); }

    // ===== RESET METHOD =====

    /**
     * Resets the turn manager to initial state
     */
    public reset(startingPlayer: Player = Player.PLAYER_ONE): void {
        this.turnCount = 1;
        this.gameStarted = false;
        this.selectedUnitId = null;
        this.roundManager.reset();
        this.phaseManager.reset();
        this.playerManager.reset(startingPlayer);
        
        console.log('🔄 TurnManager reset');
        logDebugInfo('TurnManager reset', {
            startingPlayer: this.playerManager.getCurrentPlayer(),
            currentPhase: this.phaseManager.getCurrentPhase(),
            turnCount: this.turnCount,
            roundNumber: this.roundManager.getRoundNumber()
        });
    }

    // ===== DEBUG METHODS =====

    public forceRecalculateActionableUnitLimit(): void { this.debugger.forceRecalculateActionableUnitLimit(); }
    public forceSetPlayer(player: Player): void { this.debugger.forceSetPlayer(player); }
    public forceSetPhase(phase: TurnPhase): void { this.debugger.forceSetPhase(phase); }
    public forceNewRound(): void { this.debugger.forceNewRound(); }

    // ===== EVENT DELEGATION METHODS =====

    public onUnitDeath(unitId: string, team: 'player' | 'enemy'): void { this.roundManager.onUnitDeath(unitId, team); }
    public onUnitAdded(unitId: string, team: 'player' | 'enemy'): void { this.roundManager.onUnitAdded(unitId, team); }
    public onUnitHealthChanged(unitId: string, team: 'player' | 'enemy', newHealth: number, oldHealth: number): void { this.roundManager.onUnitHealthChanged(unitId, team, newHealth, oldHealth); }
    public recalculateActionableUnitLimit(): void { if (this.gameStarted) this.roundManager.recalculateActionableUnitLimit(); }
} 