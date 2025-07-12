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

    public calculateAdjacentAttackTargets(unit: Unit, currentPosition: Position, skillId?: string): AttackData {
        const validTiles: Position[] = [];
        const paths = new Map<string, Position[]>();
        
        // Determine range based on skill
        const range = skillId === 'beam' ? 2 : 1;
        console.log(`⚔️ Calculating adjacent attack targets for ${unit.name} with range ${range}`);
        
        // Calculate the 4 cardinal direction tiles at specified range
        const cardinalOffsets = [
            { x: 0, y: -range }, // North
            { x: range, y: 0 },  // East
            { x: 0, y: range },  // South
            { x: -range, y: 0 }  // West
        ];
        
        for (const offset of cardinalOffsets) {
            const targetX = currentPosition.x + offset.x;
            const targetY = currentPosition.y + offset.y;
            
            // Check if position is within map bounds
            if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
                validTiles.push({ x: targetX, y: targetY });
                paths.set(`${targetX},${targetY}`, [currentPosition, { x: targetX, y: targetY }]);
            }
        }
        
        console.log(`⚔️ Found ${validTiles.length} adjacent attack tiles at range ${range}`);
        return { validTiles, paths };
    }
} 