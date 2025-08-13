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
        
        // For Bandage, Outburst, Star Song, Symphony, and Staccato skills, auto-execute immediately without targeting
        if (skill.id === 'bandage' || skill.id === 'outburst' || skill.id === 'star-song' || skill.id === 'symphony' || skill.id === 'staccato') {
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
        if (skill.targetingType === 'non-rotational' && (skill.id === 'blazing-knuckle' || skill.id === 'healing-circle' || skill.id === 'flash-of-sun' || skill.id === 'tidal-lock')) {
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
        } else if (skill.targetingType === 'non-rotational' && skill.id === 'dizzy-slam') {
            // Dizzy Slam: leap 3 (any direction), then AoE around landing
            console.log(`💫 Dizzy Slam - showing leap destinations (range 3)`);
            const occupiedTiles = new Map<string, Unit>();
            unitRenderer.getUnitPositions().forEach((pos: Position, otherUnit: Unit) => {
                if (otherUnit.id !== unit.id) {
                    occupiedTiles.set(`${pos.x},${pos.y}`, otherUnit);
                }
            });
            const leapDestinations = this.calculateLeapDestinations(unit, currentPosition, 3, occupiedTiles, movementManager);
            actionManager.setSkillTargeting(skill, leapDestinations);
            actionManager.createSkillTargetIndicators();
            uiManager.showActionSkipButton(onSkip);
            return;
        } else if (skill.targetingType === 'non-rotational' && skill.id === 'bounce') {
            // Handle Bounce skill targeting (first leap) - leap 2 in cardinal directions
            console.log(`🦘 Bounce skill - showing first leap targeting (range 2, cardinal only)`);
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
                2, // Leap range for Bounce
                occupiedTiles,
                movementManager
            );
            // Filter to only cardinal directions (N, S, E, W)
            const cardinalDestinations = leapDestinations.filter((dest: Position) => {
                const deltaX = Math.abs(dest.x - currentPosition.x);
                const deltaY = Math.abs(dest.y - currentPosition.y);
                // Must be exactly in one cardinal direction
                return (deltaX > 0 && deltaY === 0) || (deltaX === 0 && deltaY > 0);
            });
            
            // Use the same targeting system as teleport/leap
            actionManager.setSkillTargeting(skill, cardinalDestinations);
            actionManager.createSkillTargetIndicators();
            
            // Show skip button for leap skill
            uiManager.showActionSkipButton(onSkip);
            
            return; // Exit early, bounce targeting is handled
        } else if (skill.targetingType === 'non-rotational' && skill.id === 'backflip') {
            // Backflip: leap 3 in cardinal directions
            console.log(`🤸 Backflip - showing leap destinations (range 3, cardinal)`);
            const occupiedTiles = new Map<string, Unit>();
            unitRenderer.getUnitPositions().forEach((pos: Position, otherUnit: Unit) => {
                if (otherUnit.id !== unit.id) {
                    occupiedTiles.set(`${pos.x},${pos.y}`, otherUnit);
                }
            });
            const leapDestinations = this.calculateLeapDestinations(unit, currentPosition, 3, occupiedTiles, movementManager);
            const cardinalDestinations = leapDestinations.filter((dest: Position) => {
                const dx = Math.abs(dest.x - currentPosition.x);
                const dy = Math.abs(dest.y - currentPosition.y);
                return (dx > 0 && dy === 0) || (dx === 0 && dy > 0);
            });
            actionManager.setSkillTargeting(skill, cardinalDestinations);
            actionManager.createSkillTargetIndicators();
            uiManager.showActionSkipButton(onSkip);
            return;
        } else if (skill.targetingType === 'non-rotational' && skill.id === 'spring-slash') {
            // Spring Slash: first select a leap-2 destination (any direction)
            console.log(`🌸 Spring Slash - showing leap destinations (range 2)`);
            const occupiedTiles = new Map<string, Unit>();
            // Build occupied tiles map (exclude the leaping unit itself)
            unitRenderer.getUnitPositions().forEach((pos: Position, otherUnit: Unit) => {
                if (otherUnit.id !== unit.id) {
                    const key = `${pos.x},${pos.y}`;
                    occupiedTiles.set(key, otherUnit);
                }
            });
            // Compute leap-2 destinations using navigation manager
            const allLeapDestinations = this.calculateLeapDestinations(
                unit,
                currentPosition,
                2, // Leap range
                occupiedTiles,
                movementManager
            );
            // Restrict to exactly 2 tiles in a cardinal direction (N, S, E, W)
            const leapDestinations = allLeapDestinations.filter((dest: Position) => {
                const dx = Math.abs(dest.x - currentPosition.x);
                const dy = Math.abs(dest.y - currentPosition.y);
                return (dx === 2 && dy === 0) || (dx === 0 && dy === 2);
            });
            // Use the same targeting system as other leap skills
            actionManager.setSkillTargeting(skill, leapDestinations);
            actionManager.createSkillTargetIndicators();
            uiManager.showActionSkipButton(onSkip);
            return;
        } else if (skill.id === 'teleport-slash') {
            // Teleport Slash: teleport up to range 3, any tile (like teleport)
            console.log(`🌟 Teleport Slash - showing teleport destinations (range 3)`);
            const teleportRange = 3;
            const occupiedTiles = new Map<string, Unit>();
            unitRenderer.getUnitPositions().forEach((pos: Position, otherUnit: Unit) => {
                if (otherUnit.id !== unit.id) {
                    occupiedTiles.set(`${pos.x},${pos.y}`, otherUnit);
                }
            });
            const cardinalDestinations = movementManager.getValidTeleportDestinations(
                unit,
                currentPosition,
                teleportRange,
                occupiedTiles
            );
            actionManager.setSkillTargeting(skill, cardinalDestinations);
            actionManager.createSkillTargetIndicators();
            uiManager.showActionSkipButton(onSkip);
            return;
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
        } else if (skill.id === 'reflect') {
            // Safety: ensure Reflect always targets allies within range 4 without rotation
            console.log(`🪞 Reflect - enforcing range 4 ally targeting (no rotation)`);
            let validTargets = this.calculateSkillTargets(unit, currentPosition, skill, 4);
            validTargets = validTargets.filter(pos => !(pos.x === currentPosition.x && pos.y === currentPosition.y));
            actionManager.setSkillTargeting(skill, validTargets);
            actionManager.createSkillTargetIndicators();
            uiManager.showSkillConfirmCancelButtons(
                skill.name,
                onConfirm,
                onCancel
            );
            uiManager.showActionSkipButton(onSkip);
            return;
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
        } else if (skill.id === 'box-drop' || skill.id === 'create-turret' || skill.id === 'deployable-spring' || skill.id === 'plant-the-flag' || skill.id === 'barricade') {
            // Special handling for placement skills
            const skillRange = (skill.id === 'deployable-spring') ? 2 : (skill.id === 'plant-the-flag' ? 1 : 4);
            console.log(`${skill.id === 'box-drop' ? '📦' : (skill.id === 'create-turret' ? '🛡️' : (skill.id === 'plant-the-flag' ? '🏴' : (skill.id === 'barricade' ? '🧱' : '🌀')))} ${skill.name} - showing valid empty tiles within range ${skillRange}`);
            const validTargets: Position[] = [];
            // Build occupancy map
            const occupied = new Set<string>();
            unitRenderer.getUnitPositions().forEach((pos: Position) => {
                occupied.add(`${pos.x},${pos.y}`);
            });
            for (let dx = -skillRange; dx <= skillRange; dx++) {
                for (let dy = -skillRange; dy <= skillRange; dy++) {
                    const dist = Math.abs(dx) + Math.abs(dy);
                    if (dist > 0 && dist <= skillRange) {
                        const tx = currentPosition.x + dx;
                        const ty = currentPosition.y + dy;
                        if (tx >= 0 && tx < 8 && ty >= 0 && ty < 8) {
                            const key = `${tx},${ty}`;
                            if (!occupied.has(key)) {
                                validTargets.push({ x: tx, y: ty });
                            }
                        }
                    }
                }
            }
            actionManager.setSkillTargeting(skill, validTargets);
            actionManager.createSkillTargetIndicators();
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
            } else if (skill.id === 'inspire-violence') {
                skillRange = 2; // Inspire Violence: range 2
            } else if (skill.id === 'steady-beat') {
                skillRange = 4; // Steady Beat has range of 4
            } else if (skill.id === 'mirror-aegis') {
                skillRange = 1; // Mirror Aegis: range 1
            } else if (skill.id === 'peace-sign') {
                skillRange = 4; // Peace Sign: range 4
            } else if (skill.id === 'idolize') {
                skillRange = 12; // Idolize: effectively global
            } else if (skill.id === 'slip-counter') {
                skillRange = 2; // Slip Counter: range 2
            } else if (skill.id === 'smoke-grenade') {
                skillRange = 3; // Smoke Grenade: any tile within range 3
            } else if (skill.id === 'stars-blessing') {
                skillRange = 2; // Star's Blessing range 2 (can target self)
            } else if (skill.id === 'aethers-grace') {
                skillRange = 4; // Aether's Grace range 4
            } else if (skill.id === 'distraction') {
                skillRange = 3; // Distraction has range of 3
            } else if (skill.id === 'toxic-king') {
                skillRange = 12; // Toxic King: effectively global
            } else if (skill.id === 'psyche-break') {
                skillRange = 2; // Psyche Break range 2
            } else if (skill.id === 'flare-up') {
                skillRange = 4; // Flare Up: range 4
            } else if (skill.id === 'cauterize') {
                skillRange = 2; // Cauterize: range 2
            } else if (skill.id === 'anthem') {
                skillRange = 2; // Anthem: range 2
            } else if (skill.id === 'rock-solid') {
                skillRange = 3; // Rock Solid: range 3
            } else if (skill.id === 'primal-mark') {
                skillRange = 2; // Primal Mark: range 2
            } else if (skill.id === 'reflect') {
                skillRange = 4; // Reflect: range 4
            }
            let validTargets = this.calculateSkillTargets(unit, currentPosition, skill, skillRange);
            // For Reflect, exclude self from valid targets
            if (skill.id === 'reflect') {
                validTargets = validTargets.filter(pos => !(pos.x === currentPosition.x && pos.y === currentPosition.y));
            }

            // Explicit: Inspire Violence, Idolize, Barricade, and Swap have no rotate button
            if (skill.id === 'inspire-violence' || skill.id === 'idolize' || skill.id === 'barricade' || skill.id === 'swap') {
                actionManager.setSkillTargeting(skill, validTargets);
                actionManager.createSkillTargetIndicators();
                uiManager.showSkillConfirmCancelButtons(
                    skill.name,
                    onConfirm,
                    onCancel
                );
                uiManager.showActionSkipButton(onSkip);
                return;
            }
            // Allow self-target for Star's Blessing
            if (skill.id === 'stars-blessing') {
                validTargets.push({ x: currentPosition.x, y: currentPosition.y });
            }
            
            // Set up skill targeting in ActionManager
            actionManager.setSkillTargeting(skill, validTargets);
            actionManager.createSkillTargetIndicators();
            // Hide rotate for non-rotating dual-rotational skills like Star's Blessing, Aether's Grace, Jeer/Exhaust/Distraction, Toxic King, Psyche Break, Cauterize, etc.
            if (skill.id === 'stars-blessing' || skill.id === 'aethers-grace' || skill.id === 'exhaust' || skill.id === 'jeer' || skill.id === 'hype-up' || skill.id === 'inspire-violence' || skill.id === 'mirror-aegis' || skill.id === 'steady-beat' || skill.id === 'peace-sign' || skill.id === 'idolize' || skill.id === 'slip-counter' || skill.id === 'switcheroo' || skill.id === 'smoke-grenade' || skill.id === 'distraction' || skill.id === 'toxic-king' || skill.id === 'psyche-break' || skill.id === 'flare-up' || skill.id === 'cauterize' || skill.id === 'anthem' || skill.id === 'barricade' || skill.id === 'swap' || skill.id === 'rock-solid' || skill.id === 'reflect' || skill.id === 'primal-mark') {
                uiManager.showSkillConfirmCancelButtons(
                    skill.name,
                    onConfirm,
                    onCancel
                );
            }
            
            console.log(`🎯 Created ${validTargets.length} skill target indicators for ${skill.name}`);
            
            // Show skip button for dual-rotational skills that need target selection
            uiManager.showActionSkipButton(onSkip);
        } else if (skill.id === 'rescue' || skill.id === 'swap') {
            // Special handling for Rescue/Swap - range 3, no rotation
            const label = skill.id === 'swap' ? 'Swap' : 'Rescue';
            console.log(`🔁 Setting up ${label} skill targeting - range 3, no rotation`);

            const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
            const allUnits: Unit[] = gameSceneInstance?.unitRenderer?.getAllUnits ? [...gameSceneInstance.unitRenderer.getAllUnits()] : [];

            const skillRange = 3;
            let validTargets = this.calculateSkillTargets(unit, currentPosition, skill, skillRange);
            if (skill.id === 'swap') {
                // Only allied units and structures
                const allies = allUnits.filter(u => u.team === unit.team);
                const allyPositions = new Set(
                    allies.map(u => {
                        const pos = gameSceneInstance?.unitRenderer?.getUnitPosition(u);
                        return pos ? `${pos.x},${pos.y}` : '';
                    })
                );
                validTargets = validTargets.filter(pos => allyPositions.has(`${pos.x},${pos.y}`));
            }

            actionManager.setSkillTargeting(skill, validTargets);
            actionManager.createSkillTargetIndicators();

            console.log(`🎯 Created ${validTargets.length} skill target indicators for ${label}`);
            uiManager.showActionSkipButton(onSkip);
        } else if (skill.id === 'solar-ray') {
            // Solar Ray: range 3, target any tile; confirm logic enforces enemy
            console.log(`☀️ Setting up Solar Ray targeting - range 3, no rotation`);
            const skillRange = 3;
            const validTargets = this.calculateSkillTargets(unit, currentPosition, skill, skillRange);
            actionManager.setSkillTargeting(skill, validTargets);
            actionManager.createSkillTargetIndicators();
            uiManager.showActionSkipButton(onSkip);
        } else if (skill.id === 'taunt') {
            // Special handling for Taunt skill - range 3, no rotation
            console.log(`😡 Setting up Taunt skill targeting - range 3, no rotation`);
            
            const skillRange = 3; // Taunt has range of 3
            const validTargets = this.calculateSkillTargets(unit, currentPosition, skill, skillRange);
            
            // Set up skill targeting in ActionManager
            actionManager.setSkillTargeting(skill, validTargets);
            actionManager.createSkillTargetIndicators();
            
            console.log(`🎯 Created ${validTargets.length} skill target indicators for Taunt`);
            
            // Show skip button for Taunt skill
            uiManager.showActionSkipButton(onSkip);
        } else if (skill.id === 'get-sturdy') {
            // Special handling for Get Sturdy skill - conditional targeting based on nearby allies
            console.log(`🛡️ Setting up Get Sturdy skill targeting - checking for allies in range 1`);
            console.log(`🛡️ Caster position: (${currentPosition.x}, ${currentPosition.y}), Team: ${unit.team}`);
            
            // Check for ally units within range 1 (adjacent tiles)
            const adjacentPositions = [
                { x: currentPosition.x - 1, y: currentPosition.y },     // West
                { x: currentPosition.x + 1, y: currentPosition.y },     // East
                { x: currentPosition.x, y: currentPosition.y - 1 },     // North
                { x: currentPosition.x, y: currentPosition.y + 1 },     // South
            ];
            
            const adjacentAllies: { x: number; y: number }[] = [];
            
            // Debug: Log all unit positions
            console.log(`🛡️ Checking all unit positions for allies:`);
            unitRenderer.getUnitPositions().forEach((unitPos: any, otherUnit: Unit) => {
                console.log(`🛡️ Unit ${otherUnit.name} at (${unitPos.x}, ${unitPos.y}), Team: ${otherUnit.team}, ID: ${otherUnit.id}`);
            });
            
            // Check each adjacent position for ally units
            adjacentPositions.forEach(pos => {
                console.log(`🛡️ Checking position (${pos.x}, ${pos.y})`);
                
                // Check if position is within map bounds
                if (pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8) {
                    // Check if there's an ally unit at this position
                    unitRenderer.getUnitPositions().forEach((unitPos: any, otherUnit: Unit) => {
                        if (unitPos.x === pos.x && unitPos.y === pos.y) {
                            console.log(`🛡️ Found unit ${otherUnit.name} at (${pos.x}, ${pos.y}) - Team: ${otherUnit.team}, Caster Team: ${unit.team}, Same team: ${otherUnit.team === unit.team}, Different ID: ${otherUnit.id !== unit.id}`);
                            
                            if (otherUnit.team === unit.team && otherUnit.id !== unit.id) {
                                adjacentAllies.push(pos);
                                console.log(`🛡️ Added ally position (${pos.x}, ${pos.y}) to targets`);
                            }
                        }
                    });
                } else {
                    console.log(`🛡️ Position (${pos.x}, ${pos.y}) is out of bounds`);
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
        // Special handling: During Bounce's second phase, auto-confirm immediately on selection.
        try {
            const isBounceSecondPhase = (window as any).BOUNCE_SECOND_PHASE === true;
            if (skill?.id === 'bounce' && isBounceSecondPhase) {
                actionManager.setSkillTarget(skill, { x, y });
                // Immediately call onConfirm so GameScene handles the second leap without UI
                onConfirm();
                return;
            }
        } catch {}

        if (skill?.targetingType === 'dual-rotational') {
            // Show skill preview at selected target
            actionManager.showSkillPreview(x, y);
            
            // Special handling for skills that don't need rotation (e.g., Exhaust, Jeer, Distraction, Hype Up, Inspire Violence, Mirror Aegis, Peace Sign, Idolize, Slip Counter, Steady Beat, Switcheroo, Star's Blessing, Toxic King, Psyche Break, Flare Up, Cauterize) and Barricade/Swap
            if (skill.id === 'exhaust' || skill.id === 'jeer' || skill.id === 'distraction' || skill.id === 'hype-up' || skill.id === 'inspire-violence' || skill.id === 'mirror-aegis' || skill.id === 'peace-sign' || skill.id === 'idolize' || skill.id === 'slip-counter' || skill.id === 'steady-beat' || skill.id === 'switcheroo' || skill.id === 'smoke-grenade' || skill.id === 'stars-blessing' || skill.id === 'toxic-king' || skill.id === 'psyche-break' || skill.id === 'flare-up' || skill.id === 'cauterize' || skill.id === 'barricade' || skill.id === 'swap' || skill.id === 'rock-solid' || skill.id === 'reflect' || skill.id === 'primal-mark') {
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
        } else if (skill?.id === 'deployable-spring') {
            // After selecting tile for spring, allow rotation before confirming
            actionManager.setSkillTarget(skill, { x, y });
            // Optional: show a simple preview marker at the tile
            actionManager.showSkillPreview(x, y);
            // Show confirm, rotate, cancel buttons; rotate updates stored rotation
            uiManager.showDualRotationalSkillButtons(
                skill.name,
                onConfirm,
                onCancel,
                onRotate
            );
        } else if (skill?.id === 'spring-slash') {
            // If we're in the second phase (after leaping), clicking a valid enemy should immediately confirm and execute
            try {
                const awaitingTarget = (window as any).SPRING_SLASH_AWAITING_TARGET === true;
                if (awaitingTarget) {
                    actionManager.setSkillTarget(skill, { x, y });
                    // Immediately confirm to execute the strike without extra buttons
                    onConfirm();
                    return;
                }
            } catch {}
            // Otherwise it's the first phase: record leap destination and immediately confirm (no buttons)
            actionManager.setSkillTarget(skill, { x, y });
            onConfirm();
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