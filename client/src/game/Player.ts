export interface PlayerData {
    resource: number; // Represents the player's money
    victories: number; // Tracks the number of encounters completed
}

// You might want a class if the player will have methods later
export class Player {
    public resource: number;
    public victories: number;

    constructor(initialResource: number = 0, initialVictories: number = 0) {
        this.resource = initialResource;
        this.victories = initialVictories;
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
}

// Example of how you might manage the player's state globally or pass it around.
// For a single-player game, a global instance might be acceptable.
export const mainPlayer = new Player(10, 0); // Starting with 10 resource and 0 victories 