import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';
import { Position } from './NavigationManager';
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
        
        // For Bandage skill, auto-execute immediately without targeting
        if (skill.id === 'bandage') {
            console.log(`🩹 Bandage skill - auto-executing on caster`);
            
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
        if (skill.targetingType === 'non-rotational' && skill.id === 'blazing-knuckle') {
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
        } else if (skill.targetingType === 'adjacent-attack') {
            console.log(`⚔️ Adjacent attack skill - showing attack-style targeting`);
            
            // For adjacent-attack skills like Hurricane Slash, show red attack indicators around unit
            const attackCalculationService = new AttackCalculationService();
            const attackData = attackCalculationService.calculateAdjacentAttackTargets(unit, currentPosition);
            
            // Set up attack-style targeting in ActionManager (treating as skill mode)
            actionManager.setAttackMode('skill', skill);
            actionManager.setAttackData(attackData);
            actionManager.createAttackIndicators();
            
            console.log(`⚔️ Created ${attackData.validTiles.length} adjacent attack indicators for ${skill.name}`);
            
            // Show skip button for adjacent-attack skills
            uiManager.showActionSkipButton(onSkip);
        } else if (skill.targetingType === 'dual-rotational') {
            console.log(`🔄 Dual-rotational skill - allowing target selection with rotation`);
            
            // For dual-rotational skills, allow target selection within range
            const skillRange = 4; // Tera Fire has range of 4
            const validTargets = this.calculateSkillTargets(unit, currentPosition, skill, skillRange);
            
            // Set up skill targeting in ActionManager
            actionManager.setSkillTargeting(skill, validTargets);
            actionManager.createSkillTargetIndicators();
            
            console.log(`🎯 Created ${validTargets.length} skill target indicators for ${skill.name}`);
            
            // Show skip button for dual-rotational skills that need target selection
            uiManager.showActionSkipButton(onSkip);
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
            
            // For dual-rotational skills, show confirm, rotate, and cancel buttons
            uiManager.showDualRotationalSkillButtons(
                skill.name,
                onConfirm,
                onCancel,
                onRotate
            );
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