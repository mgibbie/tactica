import { logDebugInfo } from './DebugMode';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { Player } from './TurnManager';

export class UnitTracker {
    /**
     * Counts alive units for a given team
     */
    public static countAliveUnits(team: 'player' | 'enemy'): number {
        const units = team === 'player' ? globalUnitRegistry.playerParty : globalUnitRegistry.enemyUnits;
        // Do not count structures or sub-units toward alive unit counts
        return units.filter(unit => unit.currentHealth > 0 && !unit.isStructure && !unit.isSubUnit).length;
    }

    /**
     * Calculates the actionable unit limit based on the team with fewer alive units
     */
    public static calculateActionableUnitLimit(): number {
        // Count units that can actually act this round. Structures are excluded.
        // Sub-units are usually excluded, except for special actionable sub-units (e.g., Soulbound Bodyguard).
        const countActionable = (team: 'player' | 'enemy') => {
            const units = team === 'player' ? globalUnitRegistry.playerParty : globalUnitRegistry.enemyUnits;
            return units.filter(unit => {
                const alive = unit.currentHealth > 0;
                if (!alive) return false;
                if (unit.isStructure) return false;
                // Allow soulbound sub-units (Bodyguard) to act; other sub-units remain non-actionable
                const hasSoulbound = !!(unit.passives && unit.passives.some(p => p.id === 'soulbound'));
                const isActionableSubUnit = unit.isSubUnit && hasSoulbound;
                return !unit.isSubUnit || isActionableSubUnit;
            }).length;
        };

        const alivePlayerUnits = countActionable('player');
        const aliveEnemyUnits = countActionable('enemy');
        
        const limit = Math.min(alivePlayerUnits, aliveEnemyUnits);
        
        logDebugInfo('Calculated actionable unit limit', {
            alivePlayerUnits,
            aliveEnemyUnits,
            actionableUnitLimit: limit
        });
        
        return Math.max(1, limit); // Ensure at least 1 turn per player per round
    }

    /**
     * Gets alive unit counts for both teams
     */
    public static getAliveUnitCounts(): { player: number; enemy: number } {
        return {
            player: this.countAliveUnits('player'),
            enemy: this.countAliveUnits('enemy')
        };
    }

    /**
     * Checks if player has won (all enemies defeated)
     */
    public static checkPlayerVictory(): boolean {
        const aliveEnemies = this.countAliveUnits('enemy');
        const victory = aliveEnemies === 0;
        
        if (victory) {
            console.log('🎉 PLAYER VICTORY! All enemies have been defeated!');
        }
        
        return victory;
    }

    /**
     * Checks if player has lost (all player units defeated)
     */
    public static checkPlayerDefeat(): boolean {
        const alivePlayerUnits = this.countAliveUnits('player');
        const defeat = alivePlayerUnits === 0;
        
        if (defeat) {
            console.log('💀 PLAYER DEFEAT! All player units have been defeated!');
        }
        
        return defeat;
    }

    /**
     * Checks win/lose conditions and returns the game state
     */
    public static checkGameEndConditions(): 'victory' | 'defeat' | 'continue' {
        if (this.checkPlayerVictory()) {
            return 'victory';
        } else if (this.checkPlayerDefeat()) {
            return 'defeat';
        } else {
            return 'continue';
        }
    }
} 