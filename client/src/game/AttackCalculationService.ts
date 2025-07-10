import { Unit } from '../units/Unit';
import { Position } from './NavigationManager';
import { AttackData } from './ActionState';

export class AttackCalculationService {
    
    public calculateValidAttackTargets(unit: Unit, currentPosition: Position): AttackData {
        const validTiles: Position[] = [];
        const paths = new Map<string, Position[]>();
        const attackRange = unit.range || 1;
        
        console.log(`⚔️ Calculating attack targets for ${unit.name} with attack range ${attackRange}`);
        
        // Calculate all tiles within attack range
        for (let dx = -attackRange; dx <= attackRange; dx++) {
            for (let dy = -attackRange; dy <= attackRange; dy++) {
                const distance = Math.abs(dx) + Math.abs(dy); // Manhattan distance
                
                if (distance > 0 && distance <= attackRange) {
                    const targetX = currentPosition.x + dx;
                    const targetY = currentPosition.y + dy;
                    
                    // Check if position is within map bounds
                    if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
                        validTiles.push({ x: targetX, y: targetY });
                        paths.set(`${targetX},${targetY}`, [currentPosition, { x: targetX, y: targetY }]);
                    }
                }
            }
        }
        
        console.log(`🎯 Found ${validTiles.length} valid attack tiles`);
        return { validTiles, paths };
    }

    public calculateAdjacentAttackTargets(unit: Unit, currentPosition: Position): AttackData {
        const validTiles: Position[] = [];
        const paths = new Map<string, Position[]>();
        
        console.log(`⚔️ Calculating adjacent attack targets for ${unit.name}`);
        
        // Calculate the 4 adjacent tiles (up, down, left, right)
        const adjacentOffsets = [
            { x: 0, y: -1 }, // North
            { x: 1, y: 0 },  // East
            { x: 0, y: 1 },  // South
            { x: -1, y: 0 }  // West
        ];
        
        for (const offset of adjacentOffsets) {
            const targetX = currentPosition.x + offset.x;
            const targetY = currentPosition.y + offset.y;
            
            // Check if position is within map bounds
            if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
                validTiles.push({ x: targetX, y: targetY });
                paths.set(`${targetX},${targetY}`, [currentPosition, { x: targetX, y: targetY }]);
            }
        }
        
        console.log(`⚔️ Found ${validTiles.length} adjacent attack tiles`);
        return { validTiles, paths };
    }
} 