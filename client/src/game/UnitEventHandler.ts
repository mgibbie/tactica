import { logDebugInfo } from './DebugMode';
import { Player } from './TurnManager';

// Interface for objects that can handle unit tracking changes
export interface UnitTrackingHandler {
    recalculateActionableUnitLimit(): void;
    getUnitsUsedThisRound(player: Player): string[];
    markUnitAsUsed(unitId: string, currentPlayer: Player): void;
}

export class UnitEventHandler {
    private handler: UnitTrackingHandler;
    private unitsUsedThisRound: {
        [Player.PLAYER_ONE]: Set<string>;
        [Player.PLAYER_TWO]: Set<string>;
    };

    constructor(handler: UnitTrackingHandler, unitsUsedThisRound: {
        [Player.PLAYER_ONE]: Set<string>;
        [Player.PLAYER_TWO]: Set<string>;
    }) {
        this.handler = handler;
        this.unitsUsedThisRound = unitsUsedThisRound;
    }

    /**
     * Handle unit death event
     */
    public onUnitDeath(unitId: string, team: 'player' | 'enemy'): void {
        console.log(`💀 Unit died: ${unitId} (${team} team)`);
        
        // Remove the unit from this round's used units if it was used
        if (team === 'player') {
            this.unitsUsedThisRound[Player.PLAYER_ONE].delete(unitId);
        } else {
            this.unitsUsedThisRound[Player.PLAYER_TWO].delete(unitId);
        }
        
        logDebugInfo('Unit death processed', {
            unitId,
            team
        });
        
        // Recalculate the actionable unit limit
        this.handler.recalculateActionableUnitLimit();
    }

    /**
     * Handle unit addition/revival event
     */
    public onUnitAdded(unitId: string, team: 'player' | 'enemy'): void {
        console.log(`➕ Unit added/revived: ${unitId} (${team} team)`);
        
        logDebugInfo('Unit addition processed', {
            unitId,
            team
        });
        
        // Recalculate the actionable unit limit
        this.handler.recalculateActionableUnitLimit();
    }

    /**
     * Handle unit health change event
     */
    public onUnitHealthChanged(unitId: string, team: 'player' | 'enemy', newHealth: number, oldHealth: number): void {
        const wasAlive = oldHealth > 0;
        const isAlive = newHealth > 0;
        
        // Only trigger recalculation if alive status changed
        if (wasAlive !== isAlive) {
            if (isAlive) {
                this.onUnitAdded(unitId, team);
            } else {
                this.onUnitDeath(unitId, team);
            }
        }
    }
} 