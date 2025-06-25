import { debugAlert } from './DebugMode';
import { Player, TurnPhase } from './TurnManager';
import { RoundManager } from './RoundManager';
import { PhaseManager } from './PhaseManager';
import { PlayerManager } from './PlayerManager';

export class TurnManagerDebugger {
    constructor(
        private roundManager: RoundManager,
        private phaseManager: PhaseManager,
        private playerManager: PlayerManager
    ) {}

    /**
     * Force recalculate actionable unit limit (for debugging or external triggers)
     */
    public forceRecalculateActionableUnitLimit(): void {
        debugAlert('Forcing recalculation of actionable unit limit');
        this.roundManager.recalculateActionableUnitLimit();
    }

    /**
     * Force set the current player (for debugging or special scenarios)
     */
    public forceSetPlayer(player: Player): void {
        this.playerManager.forceSetPlayer(player);
        this.phaseManager.resetToSelect();
    }

    /**
     * Force set the current phase (for debugging or special scenarios)
     */
    public forceSetPhase(phase: TurnPhase): void {
        this.phaseManager.forceSetPhase(phase);
    }

    /**
     * Force start a new round (for debugging or special scenarios)
     */
    public forceNewRound(): void {
        debugAlert('Forcing new round to start');
        this.roundManager.forceNewRound();
    }
} 