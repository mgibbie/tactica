import { Unit } from './Unit';

export class UnitRegistry {
    public playerParty: Unit[] = [];
    public enemyUnits: Unit[] = [];
    public shopUnits: Unit[] = [];
    public storageUnits: Unit[] = [];

    static readonly MAX_PLAYER_PARTY_SIZE = 5;

    constructor() {
        // Initialization logic if needed
    }

    addUnitToPlayerParty(unit: Unit): void {
        if (this.playerParty.length < UnitRegistry.MAX_PLAYER_PARTY_SIZE) {
            this.playerParty.push(unit);
            console.log(`${unit.name} (${unit.className}) added to player party. Party size: ${this.playerParty.length}/${UnitRegistry.MAX_PLAYER_PARTY_SIZE}`);
        } else {
            console.warn(`Player party is full (${UnitRegistry.MAX_PLAYER_PARTY_SIZE} units). ${unit.name} (${unit.className}) was not added.`);
            // Optionally, could add to storage here by default, or let calling code decide.
        }
    }

    addUnitToEnemies(unit: Unit): void {
        this.enemyUnits.push(unit);
        console.log(`${unit.name} (${unit.className}) added to enemy units.`);
    }

    addUnitToShop(unit: Unit): void {
        this.shopUnits.push(unit);
        console.log(`${unit.name} (${unit.className}) added to shop units.`);
    }

    addUnitToStorage(unit: Unit): void {
        this.storageUnits.push(unit);
        console.log(`${unit.name} (${unit.className}) added to storage units.`);
    }

    findUnitById(id: string): Unit | undefined {
        const allUnits = [...this.playerParty, ...this.enemyUnits, ...this.shopUnits, ...this.storageUnits];
        return allUnits.find(unit => unit.id === id);
    }

    // Specific removal methods
    removeUnitFromPlayerParty(unitId: string): boolean {
        const index = this.playerParty.findIndex(unit => unit.id === unitId);
        if (index > -1) {
            const unit = this.playerParty[index];
            this.playerParty.splice(index, 1);
            console.log(`${unit.name} (${unit.className}) removed from player party.`);
            return true;
        }
        return false;
    }

    removeUnitFromEnemies(unitId: string): boolean {
        const index = this.enemyUnits.findIndex(unit => unit.id === unitId);
        if (index > -1) {
            const unit = this.enemyUnits[index];
            this.enemyUnits.splice(index, 1);
            console.log(`${unit.name} (${unit.className}) removed from enemy units.`);
            return true;
        }
        return false;
    }

    removeUnitFromShop(unitId: string): boolean {
        const index = this.shopUnits.findIndex(unit => unit.id === unitId);
        if (index > -1) {
            const unit = this.shopUnits[index];
            this.shopUnits.splice(index, 1);
            console.log(`${unit.name} (${unit.className}) removed from shop units.`);
            return true;
        }
        return false;
    }

    removeUnitFromStorage(unitId: string): boolean {
        const index = this.storageUnits.findIndex(unit => unit.id === unitId);
        if (index > -1) {
            const unit = this.storageUnits[index];
            this.storageUnits.splice(index, 1);
            console.log(`${unit.name} (${unit.className}) removed from storage units.`);
            return true;
        }
        return false;
    }

    // --- Methods for Drag-and-Drop in Squad Scene ---

    private _removeUnitFromList(list: Unit[], unitId: string): Unit | null {
        const index = list.findIndex(u => u.id === unitId);
        if (index > -1) {
            return list.splice(index, 1)[0];
        }
        console.warn(`_removeUnitFromList: Unit with ID ${unitId} not found in provided list.`);
        return null;
    }

    public reorderUnitInSquad(unitId: string, newIndex: number): void {
        const unit = this._removeUnitFromList(this.playerParty, unitId);
        if (unit) {
            const finalIndex = Math.max(0, Math.min(newIndex, this.playerParty.length));
            this.playerParty.splice(finalIndex, 0, unit);
            console.log(`Reordered ${unit.name} in squad to index ${finalIndex}.`);
        } else {
            console.error(`reorderUnitInSquad: Unit ${unitId} not found in player party.`);
        }
    }

    public reorderUnitInStorage(unitId: string, newIndex: number): void {
        const unit = this._removeUnitFromList(this.storageUnits, unitId);
        if (unit) {
            const finalIndex = Math.max(0, Math.min(newIndex, this.storageUnits.length));
            this.storageUnits.splice(finalIndex, 0, unit);
            console.log(`Reordered ${unit.name} in storage to index ${finalIndex}.`);
        } else {
            console.error(`reorderUnitInStorage: Unit ${unitId} not found in storage units.`);
        }
    }

    public moveUnitToStorage(unitId: string, targetBoxIndex: number): void {
        const unit = this._removeUnitFromList(this.playerParty, unitId);
        if (unit) {
            const finalIndex = Math.max(0, Math.min(targetBoxIndex, this.storageUnits.length));
            this.storageUnits.splice(finalIndex, 0, unit);
            console.log(`${unit.name} moved from squad to storage at index ${finalIndex}.`);
        } else {
            console.error(`moveUnitToStorage: Unit ${unitId} not found in player party to move to storage.`);
        }
    }

    public moveUnitToSquad(unitId: string, targetSquadIndex: number): void {
        const unit = this._removeUnitFromList(this.storageUnits, unitId);
        if (unit) {
            if (this.playerParty.length < UnitRegistry.MAX_PLAYER_PARTY_SIZE) {
                const finalIndex = Math.max(0, Math.min(targetSquadIndex, this.playerParty.length));
                this.playerParty.splice(finalIndex, 0, unit);
                console.log(`${unit.name} moved from storage to squad at index ${finalIndex}. Party size: ${this.playerParty.length}/${UnitRegistry.MAX_PLAYER_PARTY_SIZE}`);
            } else {
                // Squad is full, and this wasn't a swap. Return unit to storage.
                // This case should ideally be prevented by SquadScene's logic.
                this.storageUnits.push(unit); // Add it back to storage (might change order)
                console.warn(`moveUnitToSquad: Squad is full (${this.playerParty.length}/${UnitRegistry.MAX_PLAYER_PARTY_SIZE}). ${unit.name} could not be moved from storage and was returned.`);
            }
        } else {
            console.error(`moveUnitToSquad: Unit ${unitId} not found in storage to move to squad.`);
        }
    }

    public swapUnitsBetweenSquadAndStorage(
        unitIdFromBox: string,    // The unit being dragged from the box
        unitIdFromSquad: string,  // The unit currently in the squad slot that unitIdFromBox is dropped on
        squadIndexForBoxUnit: number, // The target squad slot index for unitIdFromBox
        boxIndexForSquadUnit: number  // The original box slot index (now target for unitIdFromSquad)
    ): void {
        const unitComingFromBox = this._removeUnitFromList(this.storageUnits, unitIdFromBox);
        const unitGoingToBox = this._removeUnitFromList(this.playerParty, unitIdFromSquad);

        if (unitComingFromBox && unitGoingToBox) {
            // Add unitComingFromBox to playerParty at its target squad index
            const finalSquadIndex = Math.max(0, Math.min(squadIndexForBoxUnit, this.playerParty.length));
            this.playerParty.splice(finalSquadIndex, 0, unitComingFromBox);

            // Add unitGoingToBox to storageUnits at its target box index
            const finalBoxIndex = Math.max(0, Math.min(boxIndexForSquadUnit, this.storageUnits.length));
            this.storageUnits.splice(finalBoxIndex, 0, unitGoingToBox);
            
            console.log(`Swapped ${unitComingFromBox.name} (to squad slot ${finalSquadIndex}) with ${unitGoingToBox.name} (to box slot ${finalBoxIndex}).`);

        } else {
            // Error handling: if one or both units couldn't be removed, the transaction fails.
            // Put back any unit that was successfully removed to maintain a consistent state.
            if (unitComingFromBox && !unitGoingToBox) {
                // unitIdFromSquad was not found/removed. Put unitComingFromBox back into storage.
                // Attempt to insert at its original conceptual place, or just add it back.
                const originalInsertionIndex = Math.max(0, Math.min(boxIndexForSquadUnit, this.storageUnits.length)); // This index is tricky, should be original index of unitComingFromBox
                this.storageUnits.splice(originalInsertionIndex, 0, unitComingFromBox); 
                console.error(`Swap failed: Unit ${unitIdFromSquad} (to go to box) not found in squad. ${unitComingFromBox.name} returned to storage.`);
            } else if (!unitComingFromBox && unitGoingToBox) {
                // unitIdFromBox was not found/removed. Put unitGoingToBox back into party.
                const originalInsertionIndex = Math.max(0, Math.min(squadIndexForBoxUnit, this.playerParty.length));
                this.playerParty.splice(originalInsertionIndex, 0, unitGoingToBox);
                console.error(`Swap failed: Unit ${unitIdFromBox} (to go to squad) not found in storage. ${unitGoingToBox.name} returned to squad.`);
            } else {
                console.error(`Swap failed: Critical. Neither unit involved in the swap could be found and removed. Unit ${unitIdFromBox} (from box) or ${unitIdFromSquad} (from squad).`);
            }
        }
    }

    // Keep a generic remove if needed, or rely on specific ones. 
    // For now, let's comment out the old generic removeUnitById to encourage specific removals.
    /*
    removeUnitById(id: string): boolean {
        let foundAndRemoved = false;
        [this.playerParty, this.enemyUnits, this.shopUnits, this.storageUnits].forEach(list => {
            const index = list.findIndex(unit => unit.id === id);
            if (index > -1) {
                const unit = list[index];
                list.splice(index, 1);
                console.log(`${unit.name} (${unit.className}) removed.`);
                foundAndRemoved = true;
            }
        });
        return foundAndRemoved;
    }
    */
}

// Global instance of the registry, or it can be instantiated where needed
export const globalUnitRegistry = new UnitRegistry(); 