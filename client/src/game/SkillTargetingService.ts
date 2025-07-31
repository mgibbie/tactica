import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';
import { Position, globalNavigationManager } from './NavigationManager';
import { AttackCalculationService } from './AttackCalculationService';

export class SkillTargetingService {

    public calculateSkillTargets(unit: Unit, currentPosition: Position, skill: Skill, range: number): Position[] {
        const validTargets: Position[] = [];
        
        // For most skills, allow targeting within unit's range
        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                const distance = Math.abs(dx) + Math.abs(dy); // Manhattan distance
                
                if (distance > 0 && distance <= range) {
                    const targetX = currentPosition.x + dx;
                    const targetY = currentPosition.y + dy;
                    
                    // Special exclusion for Rescue skill - cannot target the destination tile (1 south of caster)
                    if (skill.id === 'rescue') {
                        const excludedTileX = currentPosition.x;
                        const excludedTileY = currentPosition.y + 1;
                        if (targetX === excludedTileX && targetY === excludedTileY) {
                            continue; // Skip this tile
                        }
                    }
                    
                    // Check if position is within map bounds
                    if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
                        // For skills like Blazing Knuckle, we want to ensure the skill pattern
                        // doesn't go out of bounds when centered on this position
                        if (this.isValidSkillCenter(targetX, targetY, skill)) {
                            validTargets.push({ x: targetX, y: targetY });
                        }
                    }
                }
            }
        }
        
        return validTargets;
    }

    private isValidSkillCenter(centerX: number, centerY: number, skill: Skill): boolean {
        // Get the skill pattern to check if all affected tiles are in bounds
        const pattern = skill.getTargetPattern(centerX, centerY);
        
        return pattern.every(target => 
            target.x >= 0 && target.x < 8 && target.y >= 0 && target.y < 8
        );
    }

    public calculateTeleportDestinations(
        unit: Unit, 
        currentPosition: Position, 
        teleportRange: number, 
        occupiedTiles: Map<string, Unit>,
        movementManager: any
    ): Position[] {
        // Get valid teleport destinations using MovementManager
        const validDestinations = movementManager.getValidTeleportDestinations(
            unit, 
            currentPosition, 
            teleportRange, 
            occupiedTiles
        );
        
        // Filter to only cardinal directions (N, S, E, W)
        const cardinalDestinations = validDestinations.filter((dest: Position) => {
            const deltaX = Math.abs(dest.x - currentPosition.x);
            const deltaY = Math.abs(dest.y - currentPosition.y);
            // Must be exactly 3 squares away in exactly one direction
            return (deltaX === teleportRange && deltaY === 0) || (deltaX === 0 && deltaY === teleportRange);
        });
        
        console.log(`⚡ Found ${cardinalDestinations.length} valid teleport destinations`);
        return cardinalDestinations;
    }

    public calculateLeapDestinations(
        unit: Unit, 
        currentPosition: Position, 
        leapRange: number, 
        occupiedTiles: Map<string, Unit>,
        movementManager: any
    ): Position[] {
        // Get valid leap destinations using global NavigationManager
        // Update navigation manager with occupied tiles first
        const unitPositions = new Map<Unit, Position>();
        occupiedTiles.forEach((unit, key) => {
            const [x, y] = key.split(',').map(Number);
            unitPositions.set(unit, { x, y });
        });
        globalNavigationManager.updateOccupiedTiles(unitPositions);
        
        const validDestinations = globalNavigationManager.calculateValidLeapDestinations(
            unit, 
            currentPosition, 
            leapRange
        );
        
        console.log(`🦘 Found ${validDestinations.length} valid leap destinations`);
        return validDestinations;
    }

    public setupSkillTargeting(
        skill: Skill,
        unit: Unit,
        currentPosition: Position,
        actionManager: any,
        uiManager: any,
        movementManager: any,
        unitRenderer: any,
        onConfirm: () => void,
        onCancel: () => void,
        onSkip: () => void
    ): void {
        console.log(`✨ Setting up targeting for ${skill.name}`);
        console.log(`🎯 Skill targeting type: ${skill.targetingType}`);
        
        // For Bandage and Outburst skills, auto-execute immediately without targeting
        if (skill.id === 'bandage' || skill.id === 'outburst') {
            console.log(`🎯 ${skill.name} skill - auto-executing on caster`);
            
            // Set the skill target to the caster's position and immediately execute
            actionManager.setSkillTarget(skill, currentPosition);
            onConfirm(); // Auto-execute the skill
            return; // Exit early, no targeting needed
        }
        
        // For Teleport skill, show valid teleport destinations
        if (skill.id === 'teleport') {
            console.log(`⚡ Teleport skill - showing valid teleport destinations`);
            
            // Calculate teleport destinations (3 squares in cardinal directions)
            const teleportRange = 3;
            const occupiedTiles = new Map<string, Unit>();
            
            // Build occupied tiles map
            unitRenderer.getUnitPositions().forEach((pos: Position, otherUnit: Unit) => {
                if (otherUnit.id !== unit.id) { // Exclude the teleporting unit itself
                    const key = `${pos.x},${pos.y}`;
                    occupiedTiles.set(key, otherUnit);
                }
            });
            
            const cardinalDestinations = this.calculateTeleportDestinations(
                unit,
                currentPosition,
                teleportRange,
                occupiedTiles,
                movementManager
            );
            
            // Set up teleport targeting in ActionManager
            actionManager.setSkillTargeting(skill, cardinalDestinations);
            actionManager.createSkillTargetIndicators();
            
            // Show skip button for teleport skill
            uiManager.showActionSkipButton(onSkip);
            
            return; // Exit early, teleport targeting is handled
        }
        
        // For Blazing Knuckle and similar self-centered skills, show immediate preview
        if (skill.targetingType === 'non-rotational' && (skill.id === 'blazing-knuckle' || skill.id === 'healing-circle')) {
            console.log(`🔥 Self-centered skill - showing immediate preview around caster`);
            
            // Set the skill target to the caster's position
            actionManager.setSkillTarget(skill, currentPosition);
            actionManager.showSkillPreview(currentPosition.x, currentPosition.y);
            
            // Show immediate confirmation buttons
            uiManager.showSkillConfirmCancelButtons(
                skill.name,
                onConfirm,
                onCancel
            );
        } else if (skill.targetingType === 'non-rotational' && skill.id === 'lead-the-charge') {
            // Handle Lead The Charge skill targeting (leap movement) - similar to teleport
            console.log(`🏃 Lead The Charge skill - showing leap targeting`);
            const occupiedTiles = new Map<string, Unit>();
            
            // Build occupied tiles map
            unitRenderer.getUnitPositions().forEach((pos: Position, otherUnit: Unit) => {
                if (otherUnit.id !== unit.id) { // Exclude the leaping unit itself
                    const key = `${pos.x},${pos.y}`;
                    occupiedTiles.set(key, otherUnit);
                }
            });
            
            const leapDestinations = this.calculateLeapDestinations(
                unit, 
                currentPosition, 
                3, // Leap range
                occupiedTiles,
                movementManager
            );
            // Filter to only cardinal directions (N, S, E, W) like teleport
            const cardinalDestinations = leapDestinations.filter((dest: Position) => {
                const deltaX = Math.abs(dest.x - currentPosition.x);
                const deltaY = Math.abs(dest.y - currentPosition.y);
                // Must be exactly in one cardinal direction
                return (deltaX > 0 && deltaY === 0) || (deltaX === 0 && deltaY > 0);
            });
            
            // Use the same targeting system as teleport
            actionManager.setSkillTargeting(skill, cardinalDestinations);
            actionManager.createSkillTargetIndicators();
            
            // Show skip button for leap skill
            uiManager.showActionSkipButton(onSkip);
            
            return; // Exit early, leap targeting is handled
        } else if (skill.targetingType === 'unit-rotational') {
            console.log(`🔄 Unit-rotational skill - showing rotatable preview around caster`);
            
            // Set the skill target to the caster's position
            actionManager.setSkillTarget(skill, currentPosition);
            
            // Show rotatable skill buttons (confirm, rotate, cancel)
            uiManager.showDualRotationalSkillButtons(
                skill.name,
                onConfirm,
                onCancel,
                () => {
                    // Rotate the skill and update the preview
                    actionManager.rotateSkillTargets();
                }
            );
            
            // Show the initial preview after setting up the skill and rotation
            actionManager.showSkillPreview(currentPosition.x, currentPosition.y);
        } else if (skill.targetingType === 'adjacent-attack') {
            console.log(`⚔️ Adjacent attack skill - showing attack-style targeting`);
            
            // For adjacent-attack skills like Hurricane Slash and Beam, show red attack indicators around unit
            const attackCalculationService = new AttackCalculationService();
            const attackData = attackCalculationService.calculateAdjacentAttackTargets(unit, currentPosition, skill.id);
            
            // Set up attack-style targeting in ActionManager (treating as skill mode)
            actionManager.setAttackMode('skill', skill);
            actionManager.setAttackData(attackData);
            actionManager.createAttackIndicators();
            
            console.log(`⚔️ Created ${attackData.validTiles.length} adjacent attack indicators for ${skill.name}`);
            console.log(`⚔️ Adjacent attack skill set up - player can now click on red indicators to target`);
            
            // Show skip button for adjacent-attack skills (but players can also click indicators to target)
            uiManager.showActionSkipButton(onSkip);
        } else if (skill.targetingType === 'dual-rotational') {
            console.log(`🔄 Dual-rotational skill - allowing target selection with rotation`);
            
            // For dual-rotational skills, allow target selection within range
            let skillRange = 4; // Default for Tera Fire
            if (skill.id === 'universal-whisper') {
                skillRange = 3; // Universal Whisper has range of 3
            } else if (skill.id === 'exhaust') {
                skillRange = 4; // Exhaust has range of 4
            } else if (skill.id === 'jeer') {
                skillRange = 3; // Jeer has range of 3
            } else if (skill.id === 'hype-up') {
                skillRange = 4; // Hype Up has range of 4
            } else if (skill.id === 'steady-beat') {
                skillRange = 4; // Steady Beat has range of 4
            }
            const validTargets = this.calculateSkillTargets(unit, currentPosition, skill, skillRange);
            
            // Set up skill targeting in ActionManager
            actionManager.setSkillTargeting(skill, validTargets);
            actionManager.createSkillTargetIndicators();
            
            console.log(`🎯 Created ${validTargets.length} skill target indicators for ${skill.name}`);
            
            // Show skip button for dual-rotational skills that need target selection
            uiManager.showActionSkipButton(onSkip);
        } else if (skill.id === 'rescue') {
            // Special handling for Rescue skill - range 3, no rotation
            console.log(`🚑 Setting up Rescue skill targeting - range 3, no rotation`);
            
            const skillRange = 3; // Rescue has range of 3
            const validTargets = this.calculateSkillTargets(unit, currentPosition, skill, skillRange);
            
            // Set up skill targeting in ActionManager
            actionManager.setSkillTargeting(skill, validTargets);
            actionManager.createSkillTargetIndicators();
            
            console.log(`🎯 Created ${validTargets.length} skill target indicators for Rescue`);
            
            // Show skip button for Rescue skill
            uiManager.showActionSkipButton(onSkip);
        } else if (skill.id === 'get-sturdy') {
            // Special handling for Get Sturdy skill - conditional targeting based on nearby allies
            console.log(`🛡️ Setting up Get Sturdy skill targeting - checking for allies in range 1`);
            
            // Check for ally units within range 1 (adjacent tiles)
            const adjacentPositions = [
                { x: currentPosition.x - 1, y: currentPosition.y },     // West
                { x: currentPosition.x + 1, y: currentPosition.y },     // East
                { x: currentPosition.x, y: currentPosition.y - 1 },     // North
                { x: currentPosition.x, y: currentPosition.y + 1 },     // South
            ];
            
            const adjacentAllies: { x: number; y: number }[] = [];
            
            // Check each adjacent position for ally units
            adjacentPositions.forEach(pos => {
                // Check if position is within map bounds
                if (pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8) {
                    // Check if there's an ally unit at this position
                    unitRenderer.getUnitPositions().forEach((unitPos: any, otherUnit: Unit) => {
                        if (unitPos.x === pos.x && unitPos.y === pos.y && 
                            otherUnit.team === unit.team && otherUnit.id !== unit.id) {
                            adjacentAllies.push(pos);
                        }
                    });
                }
            });
            
            console.log(`🛡️ Found ${adjacentAllies.length} adjacent allies for Get Sturdy`);
            
            if (adjacentAllies.length === 0) {
                // No allies in range 1 - auto-execute on self only
                console.log(`🛡️ No allies in range - auto-executing Get Sturdy on self`);
                actionManager.setSkillTarget(skill, currentPosition);
                onConfirm(); // Auto-execute the skill
                return; // Exit early, no targeting needed
            } else {
                // Allies found - show targeting for adjacent positions
                console.log(`🛡️ ${adjacentAllies.length} allies in range - showing targeting for Get Sturdy`);
                
                // Set up skill targeting for adjacent allies
                actionManager.setSkillTargeting(skill, adjacentAllies);
                actionManager.createSkillTargetIndicators();
                
                console.log(`🎯 Created ${adjacentAllies.length} skill target indicators for Get Sturdy`);
                
                // Show skip button for Get Sturdy skill
                uiManager.showActionSkipButton(onSkip);
            }
        } else {
            // For other skills that need target selection
            const skillRange = unit.range || 1;
            const validTargets = this.calculateSkillTargets(unit, currentPosition, skill, skillRange);
            
            // Set up skill targeting in ActionManager
            actionManager.setSkillTargeting(skill, validTargets);
            actionManager.createSkillTargetIndicators();
            
            console.log(`🎯 Created ${validTargets.length} skill target indicators for ${skill.name}`);
            
            // Show skip button for skills that need target selection
            uiManager.showActionSkipButton(onSkip);
        }
    }

    public handleSkillTargetSelection(
        x: number,
        y: number,
        skill: Skill,
        actionManager: any,
        uiManager: any,
        onConfirm: () => void,
        onCancel: () => void,
        onRotate: () => void
    ): void {
        if (skill?.targetingType === 'dual-rotational') {
            // Show skill preview at selected target
            actionManager.showSkillPreview(x, y);
            
            // Special handling for skills that don't need rotation (like Exhaust, Jeer, Hype Up, and Steady Beat)
            if (skill.id === 'exhaust' || skill.id === 'jeer' || skill.id === 'hype-up' || skill.id === 'steady-beat') {
                // Set the skill target
                actionManager.setSkillTarget(skill, { x, y });
                
                // Show simple confirm/cancel buttons for Exhaust (no rotate button)
                uiManager.showSkillConfirmCancelButtons(
                    skill.name,
                    onConfirm,
                    onCancel
                );
            } else {
                // For other dual-rotational skills, show confirm, rotate, and cancel buttons
                uiManager.showDualRotationalSkillButtons(
                    skill.name,
                    onConfirm,
                    onCancel,
                    onRotate
                );
            }
        } else if (skill?.targetingType === 'adjacent-attack') {
            // Set skill target for adjacent-attack skills
            actionManager.setSkillTarget(skill, { x, y });
            
            // For adjacent-attack skills, show skill confirmation (but they target like basic attacks)
            uiManager.showSkillConfirmCancelButtons(
                skill.name,
                onConfirm,
                onCancel
            );
        } else if (skill?.id === 'teleport') {
            // Special handling for teleport skill
            actionManager.setSkillTarget(skill, { x, y });
            
            // Show teleport skill confirmation
            uiManager.showSkillConfirmCancelButtons(
                skill.name,
                onConfirm,
                onCancel
            );
        } else {
            // For other skills, show normal confirmation
            uiManager.showSkillConfirmCancelButtons(
                skill?.name || 'Skill',
                onConfirm,
                onCancel
            );
        }
    }
} 