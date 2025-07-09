import { logDebugInfo } from './DebugMode';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { Player } from './TurnManager';

export class UnitTracker {
    /**
     * Counts alive units for a given team
     */
    public static countAliveUnits(team: 'player' | 'enemy'): number {
        const units = team === 'player' ? globalUnitRegistry.playerParty : globalUnitRegistry.enemyUnits;
        return units.filter(unit => unit.currentHealth > 0).length;
    }

    /**
     * Calculates the actionable unit limit based on the team with fewer alive units
     */
    public static calculateActionableUnitLimit(): number {
        const alivePlayerUnits = this.countAliveUnits('player');
        const aliveEnemyUnits = this.countAliveUnits('enemy');
        
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