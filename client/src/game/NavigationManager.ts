import { Unit } from '../units/Unit';
import { ModifierService } from './ModifierService';

export interface Position {
    x: number;
    y: number;
}

export interface MovementData {
    validTiles: Position[];
    paths: Map<string, Position[]>; // Key is "x,y", value is path to that position
}

export class NavigationManager {
    private mapWidth: number;
    private mapHeight: number;
    private occupiedTiles: Map<string, Unit> = new Map(); // Key is "x,y"

    constructor(mapWidth: number = 8, mapHeight: number = 8) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }

    /**
     * Update the occupied tiles map with current unit positions
     */
    public updateOccupiedTiles(unitPositions: Map<Unit, Position>): void {
        this.occupiedTiles.clear();
        for (const [unit, position] of unitPositions) {
            const key = `${position.x},${position.y}`;
            this.occupiedTiles.set(key, unit);
        }
    }

    /**
     * Calculate all valid movement tiles for a unit from its current position
     */
    public calculateValidMovement(unit: Unit, currentPosition: Position): MovementData {
        const validTiles: Position[] = [];
        const paths = new Map<string, Position[]>();
        const baseMoveRange = unit.move || 3; // Use 'move' property, not 'range'
        
        // Calculate modified movement range (SLOW/HASTE) without consuming modifiers
        const moveRange = ModifierService.calculateMovementRange(unit, baseMoveRange);
        
        console.log(`🗺️ Calculating movement for ${unit.name} with base range ${baseMoveRange}, modified range ${moveRange} from (${currentPosition.x}, ${currentPosition.y})`);
        if (moveRange !== baseMoveRange) {
            console.log(`🔥 Movement range modified by ${moveRange - baseMoveRange} (SLOW/HASTE effects)`);
        }
        console.log(`🔍 Unit properties:`, { name: unit.name, range: unit.range, move: unit.move, className: unit.className });

        // Use breadth-first search to find all reachable tiles within range
        const queue: { pos: Position; distance: number; path: Position[] }[] = [];
        const visited = new Set<string>();
        
        // Start from current position
        queue.push({ 
            pos: currentPosition, 
            distance: 0, 
            path: [currentPosition] 
        });
        visited.add(`${currentPosition.x},${currentPosition.y}`);

        while (queue.length > 0) {
            const { pos, distance, path } = queue.shift()!;

            // If we're within range and not at the starting position, this is a valid tile
            if (distance > 0 && distance <= moveRange) {
                // Check if tile is not occupied by another unit
                const tileKey = `${pos.x},${pos.y}`;
                if (!this.occupiedTiles.has(tileKey)) {
                    validTiles.push({ x: pos.x, y: pos.y });
                    paths.set(tileKey, [...path]);
                    console.log(`✅ Valid tile at distance ${distance}: (${pos.x}, ${pos.y})`);
                } else {
                    console.log(`❌ Occupied tile at distance ${distance}: (${pos.x}, ${pos.y}) - occupied by ${this.occupiedTiles.get(tileKey)?.name}`);
                }
            }

            // Continue exploring if we haven't reached max range
            if (distance < moveRange) {
                // Check all 4 directions (up, down, left, right)
                const directions = [
                    { x: 0, y: -1 }, // up
                    { x: 0, y: 1 },  // down
                    { x: -1, y: 0 }, // left
                    { x: 1, y: 0 }   // right
                ];

                for (const dir of directions) {
                    const newPos = { x: pos.x + dir.x, y: pos.y + dir.y };
                    const newKey = `${newPos.x},${newPos.y}`;

                    // Check bounds and if we've already visited
                    if (newPos.x >= 0 && newPos.x < this.mapWidth && 
                        newPos.y >= 0 && newPos.y < this.mapHeight && 
                        !visited.has(newKey)) {
                        
                        visited.add(newKey);
                        queue.push({
                            pos: newPos,
                            distance: distance + 1,
                            path: [...path, newPos]
                        });
                        console.log(`🔍 Exploring: (${newPos.x}, ${newPos.y}) at distance ${distance + 1}`);
                    }
                }
            }
        }

        console.log(`🎯 Found ${validTiles.length} valid movement tiles with range ${moveRange}`);
        console.log(`📋 Valid tiles by distance:`);
        
        // Group tiles by distance for easier debugging
        const tilesByDistance: { [key: number]: Position[] } = {};
        for (const tile of validTiles) {
            const distance = Math.abs(tile.x - currentPosition.x) + Math.abs(tile.y - currentPosition.y);
            if (!tilesByDistance[distance]) {
                tilesByDistance[distance] = [];
            }
            tilesByDistance[distance].push(tile);
        }
        
        for (let d = 1; d <= moveRange; d++) {
            const tilesAtDistance = tilesByDistance[d] || [];
            console.log(`  Distance ${d}: ${tilesAtDistance.length} tiles`, tilesAtDistance);
        }
        
        return { validTiles, paths };
    }

    /**
     * Calculate the step-by-step path from origin to destination (X-axis first, then Y-axis)
     */
    public calculateStepPath(origin: Position, destination: Position): Position[] {
        const path: Position[] = [origin];
        const current = { x: origin.x, y: origin.y };

        // Move along X-axis first
        while (current.x !== destination.x) {
            if (current.x < destination.x) {
                current.x++;
            } else {
                current.x--;
            }
            path.push({ x: current.x, y: current.y });
        }

        // Then move along Y-axis
        while (current.y !== destination.y) {
            if (current.y < destination.y) {
                current.y++;
            } else {
                current.y--;
            }
            path.push({ x: current.x, y: current.y });
        }

        console.log(`🛤️ Step path from (${origin.x},${origin.y}) to (${destination.x},${destination.y}):`, path);
        return path;
    }

    /**
     * Check if a tile is within movement range and not occupied
     */
    public isValidMovementTile(unit: Unit, currentPosition: Position, targetPosition: Position): boolean {
        const moveRange = unit.move || 3;
        const distance = Math.abs(targetPosition.x - currentPosition.x) + Math.abs(targetPosition.y - currentPosition.y);
        const tileKey = `${targetPosition.x},${targetPosition.y}`;
        
        return distance <= moveRange && 
               !this.occupiedTiles.has(tileKey) && 
               targetPosition.x >= 0 && targetPosition.x < this.mapWidth &&
               targetPosition.y >= 0 && targetPosition.y < this.mapHeight;
    }

    /**
     * Calculate valid leap destinations for a unit, considering tall unit obstacles
     */
    public calculateValidLeapDestinations(unit: Unit, currentPosition: Position, leapRange: number): Position[] {
        const validDestinations: Position[] = [];
        
        console.log(`🦘 Calculating leap destinations for ${unit.name} with range ${leapRange} from (${currentPosition.x}, ${currentPosition.y})`);
        
        // Check all tiles within leap range
        for (let x = 0; x < this.mapWidth; x++) {
            for (let y = 0; y < this.mapHeight; y++) {
                const targetPosition = { x, y };
                const distance = Math.abs(targetPosition.x - currentPosition.x) + Math.abs(targetPosition.y - currentPosition.y);
                
                if (distance === leapRange) {
                    // Find the actual reachable position (may be shorter if blocked by tall units)
                    const reachablePosition = this.findReachableLeapDestination(currentPosition, targetPosition);
                    
                    if (reachablePosition) {
                        const tileKey = `${reachablePosition.x},${reachablePosition.y}`;
                        // Check if final destination is not occupied and not already added
                        if (!this.occupiedTiles.has(tileKey)) {
                            // Check if we haven't already added this position
                            const alreadyAdded = validDestinations.some(pos => 
                                pos.x === reachablePosition.x && pos.y === reachablePosition.y
                            );
                            if (!alreadyAdded) {
                                validDestinations.push(reachablePosition);
                                if (reachablePosition.x === targetPosition.x && reachablePosition.y === targetPosition.y) {
                                    console.log(`✅ Valid leap destination: (${reachablePosition.x}, ${reachablePosition.y}) at distance ${distance}`);
                                } else {
                                    const actualDistance = Math.abs(reachablePosition.x - currentPosition.x) + Math.abs(reachablePosition.y - currentPosition.y);
                                    console.log(`🔄 Leap shortened to: (${reachablePosition.x}, ${reachablePosition.y}) at distance ${actualDistance} (blocked by tall unit)`);
                                }
                            }
                        }
                    }
                }
            }
        }
        
        console.log(`🎯 Found ${validDestinations.length} valid leap destinations`);
        return validDestinations;
    }

    /**
     * Find the furthest reachable position along a leap path before hitting a tall unit
     */
    private findReachableLeapDestination(origin: Position, intendedDestination: Position): Position | null {
        // Get all tiles in the leap path including destination
        const pathTiles = this.getFullLeapPathTiles(origin, intendedDestination);
        
        // Start from the origin and check each tile until we hit a tall unit or reach the end
        let lastValidPosition = origin;
        
        for (const tile of pathTiles) {
            const tileKey = `${tile.x},${tile.y}`;
            const unitAtTile = this.occupiedTiles.get(tileKey);
            
            if (unitAtTile && unitAtTile.isTall) {
                // Found a tall unit - stop here and return the last valid position
                console.log(`🚫 Leap stopped by tall unit ${unitAtTile.name} at (${tile.x}, ${tile.y}), landing at (${lastValidPosition.x}, ${lastValidPosition.y})`);
                break;
            } else {
                // This tile is clear, update last valid position
                lastValidPosition = tile;
            }
        }
        
        // Don't return the origin as a valid destination
        if (lastValidPosition.x === origin.x && lastValidPosition.y === origin.y) {
            return null;
        }
        
        return lastValidPosition;
    }

    /**
     * Get all tiles in the leap path including the destination
     */
    private getFullLeapPathTiles(origin: Position, destination: Position): Position[] {
        const pathTiles: Position[] = [];
        
        // Calculate the direct line path using Bresenham-like algorithm
        const dx = Math.abs(destination.x - origin.x);
        const dy = Math.abs(destination.y - origin.y);
        const sx = origin.x < destination.x ? 1 : -1;
        const sy = origin.y < destination.y ? 1 : -1;
        
        let err = dx - dy;
        let x = origin.x;
        let y = origin.y;
        
        while (true) {
            // Include all tiles except origin
            if (!(x === origin.x && y === origin.y)) {
                pathTiles.push({ x, y });
            }
            
            // Check if we've reached the destination
            if (x === destination.x && y === destination.y) {
                break;
            }
            
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x += sx;
            }
            if (e2 < dx) {
                err += dx;
                y += sy;
            }
        }
        
        return pathTiles;
    }

    /**
     * Check if a leap path from origin to destination is blocked by tall units
     * @deprecated Use findReachableLeapDestination instead for partial leap behavior
     */
    private isValidLeapPath(origin: Position, destination: Position): boolean {
        // Get all tiles in the direct line from origin to destination (excluding origin and destination)
        const pathTiles = this.getLeapPathTiles(origin, destination);
        
        // Check if any tile in the path has a tall unit
        for (const tile of pathTiles) {
            const tileKey = `${tile.x},${tile.y}`;
            const unitAtTile = this.occupiedTiles.get(tileKey);
            if (unitAtTile && unitAtTile.isTall) {
                console.log(`🚫 Leap blocked by tall unit ${unitAtTile.name} at (${tile.x}, ${tile.y})`);
                return false;
            }
        }
        
        return true;
    }

    /**
     * Get all tiles in the leap path (excluding origin and destination)
     */
    private getLeapPathTiles(origin: Position, destination: Position): Position[] {
        const pathTiles: Position[] = [];
        
        // Calculate the direct line path using Bresenham-like algorithm
        const dx = Math.abs(destination.x - origin.x);
        const dy = Math.abs(destination.y - origin.y);
        const sx = origin.x < destination.x ? 1 : -1;
        const sy = origin.y < destination.y ? 1 : -1;
        
        let err = dx - dy;
        let x = origin.x;
        let y = origin.y;
        
        while (true) {
            // Don't include origin and destination
            if (!(x === origin.x && y === origin.y) && !(x === destination.x && y === destination.y)) {
                pathTiles.push({ x, y });
            }
            
            // Check if we've reached the destination
            if (x === destination.x && y === destination.y) {
                break;
            }
            
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x += sx;
            }
            if (e2 < dx) {
                err += dx;
                y += sy;
            }
        }
        
        return pathTiles;
    }

    /**
     * Set map dimensions
     */
    public setMapDimensions(width: number, height: number): void {
        this.mapWidth = width;
        this.mapHeight = height;
        console.log(`🗺️ NavigationManager map dimensions set to ${width}x${height}`);
    }
}

// Global navigation manager instance
export const globalNavigationManager = new NavigationManager(); 