import { Player, TurnPhase } from './TurnManager';
import { isDebugModeEnabled } from './DebugMode';
import { RoundManager } from './RoundManager';
import { PhaseManager } from './PhaseManager';
import { PlayerManager } from './PlayerManager';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { Unit } from '../units/Unit';

export interface GameStateSnapshot {
    currentPlayer: Player;
    currentPlayerName: string;
    currentPhase: TurnPhase;
    currentPhaseName: string;
    turnCount: number;
    roundNumber: number;
    actionableUnitLimit: number;
    turnsTakenThisRound: { [key in Player]: number };
    canTakeAnotherTurn: boolean;
    shouldEndRoundAfterTurn: boolean;
    gameStarted: boolean;
    canMove: boolean;
    canAct: boolean;
    canSelect: boolean;
    phaseSkipped: { move: boolean; action: boolean };
    alivePlayerUnits: number;
    aliveEnemyUnits: number;
    selectableUnits: number;
}

export class GameStateAggregator {
    constructor(
        private roundManager: RoundManager,
        private phaseManager: PhaseManager,
        private playerManager: PlayerManager
    ) {}

    /**
     * Gets all selectable units for the current player
     */
    public getSelectableUnits(): Unit[] {
        const currentPlayer = this.playerManager.getCurrentPlayer();
        const units = currentPlayer === Player.PLAYER_ONE ? globalUnitRegistry.playerParty : globalUnitRegistry.enemyUnits;
        return units.filter(unit => {
            const alive = unit.currentHealth > 0;
            if (!alive) return false;
            // Structures are never selectable during SELECT phase
            if (unit.isStructure) return false;
            // Sub-units are selectable if they are combat-capable (have basic damage, range, move) or have soulbound
            if (unit.isSubUnit) {
                const hasSoulbound = !!(unit.passives && unit.passives.some(p => p.id === 'soulbound'));
                const isCombatCapable = unit.basicDamage > 0 && unit.range > 0 && unit.move > 0;
                if (!hasSoulbound && !isCombatCapable) return false;
            }
            const notUsed = this.roundManager.canSelectUnit(unit.id, currentPlayer);
            return notUsed;
        });
    }

    /**
     * Checks if both players have reached their turn limit for the current round
     */
    public canTakeAnotherTurn(): boolean {
        return this.roundManager.canTakeAnotherTurn(this.playerManager.getCurrentPlayer());
    }

    /**
     * Gets current game state as a comprehensive snapshot
     */
    public getGameState(turnCount: number, gameStarted: boolean): GameStateSnapshot {
        const aliveUnitCounts = this.roundManager.getAliveUnitCounts();
        const roundState = this.roundManager.getRoundState();
        
        return {
            currentPlayer: this.playerManager.getCurrentPlayer(),
            currentPlayerName: this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer()),
            currentPhase: this.phaseManager.getCurrentPhase(),
            currentPhaseName: this.phaseManager.getPhaseDisplayName(this.phaseManager.getCurrentPhase()),
            turnCount: turnCount,
            roundNumber: this.roundManager.getRoundNumber(),
            actionableUnitLimit: this.roundManager.getActionableUnitLimit(),
            turnsTakenThisRound: roundState.turnsTakenThisRound,
            canTakeAnotherTurn: this.canTakeAnotherTurn(),
            shouldEndRoundAfterTurn: this.roundManager.isRoundEndingAfterTurn(),
            gameStarted: gameStarted,
            canMove: this.phaseManager.canMove(),
            canAct: this.phaseManager.canAct(),
            canSelect: this.phaseManager.canSelect(),
            phaseSkipped: this.phaseManager.getPhaseSkipped(),
            alivePlayerUnits: aliveUnitCounts.player,
            aliveEnemyUnits: aliveUnitCounts.enemy,
            selectableUnits: this.getSelectableUnits().length
        };
    }

    /**
     * Utility method to check if a round is about to end
     */
    public isRoundEndingAfterTurn(): boolean {
        return this.roundManager.isRoundEndingAfterTurn();
    }

    /**
     * Utility method to get units used this round for a specific player
     */
    public getUnitsUsedThisRound(player: Player): string[] {
        return this.roundManager.getUnitsUsedThisRound(player);
    }

    /**
     * Utility method to check if a specific unit has been used this round
     */
    public hasUnitBeenUsedThisRound(unitId: string, player: Player): boolean {
        return this.roundManager.hasUnitBeenUsedThisRound(unitId, player);
    }

    /**
     * Marks a unit as used for the current round
     */
    public markUnitAsUsed(unitId: string): void {
        this.roundManager.markUnitAsUsed(unitId, this.playerManager.getCurrentPlayer());
    }

    /**
     * Checks if a unit can be selected (hasn't been used this round)
     */
    public canSelectUnit(unitId: string): boolean {
        return this.roundManager.canSelectUnit(unitId, this.playerManager.getCurrentPlayer());
    }
} 