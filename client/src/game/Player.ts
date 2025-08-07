export interface PlayerData {
    resource: number; // Represents the player's money
    victories: number; // Tracks the number of encounters completed
}

// You might want a class if the player will have methods later
export class Player {
    public resource: number;
    public victories: number;
    public coinTossPenalties: number; // Track pending resource penalties from coin toss
    public deathOfASalesmanBonuses: number; // Track pending resource bonuses from Death of a Salesman

    constructor(initialResource: number = 0, initialVictories: number = 0) {
        this.resource = initialResource;
        this.victories = initialVictories;
        this.coinTossPenalties = 0;
        this.deathOfASalesmanBonuses = 0;
    }

    gainResource(amount: number): void {
        if (amount > 0) {
            this.resource += amount;
            console.log(`Player gained ${amount} resource. Total: ${this.resource}`);
        }
    }

    spendResource(amount: number): boolean {
        if (amount > 0 && this.resource >= amount) {
            this.resource -= amount;
            console.log(`Player spent ${amount} resource. Remaining: ${this.resource}`);
            return true;
        }
        console.log(`Player attempted to spend ${amount} resource, but has only ${this.resource}.`);
        return false;
    }

    incrementVictories(): void {
        this.victories++;
        console.log(`Player victories incremented. Total: ${this.victories}`);
    }

    addCoinTossPenalty(): void {
        this.coinTossPenalties++;
        console.log(`🪙 Coin Toss penalty added. Penalties to apply at next shop: ${this.coinTossPenalties}`);
    }

    applyCoinTossPenalties(): void {
        if (this.coinTossPenalties > 0) {
            const oldResource = this.resource;
            this.resource = Math.max(0, this.resource - this.coinTossPenalties);
            console.log(`🪙 Applied ${this.coinTossPenalties} Coin Toss penalties: ${oldResource} → ${this.resource} resource`);
            this.coinTossPenalties = 0; // Reset penalties after applying
        }
    }

    addDeathOfASalesmanBonus(): void {
        this.deathOfASalesmanBonuses++;
        console.log(`💰 Death of a Salesman bonus added. Bonuses to apply at next shop: ${this.deathOfASalesmanBonuses}`);
    }

    applyDeathOfASalesmanBonuses(): void {
        if (this.deathOfASalesmanBonuses > 0) {
            const oldResource = this.resource;
            this.resource += this.deathOfASalesmanBonuses;
            console.log(`💰 Applied ${this.deathOfASalesmanBonuses} Death of a Salesman bonuses: ${oldResource} → ${this.resource} resource`);
            this.deathOfASalesmanBonuses = 0; // Reset bonuses after applying
        }
    }
}

// Example of how you might manage the player's state globally or pass it around.
// For a single-player game, a global instance might be acceptable.
export const mainPlayer = new Player(10, 0); // Starting with 10 resource and 0 victories 