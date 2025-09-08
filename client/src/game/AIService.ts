import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';
import { ActionManager } from './ActionManager';
import { SkillHandler } from './SkillHandler';
import { SkillTargetingService } from './SkillTargetingService';
import { NavigationManager, Position } from './NavigationManager';
import { MovementManager } from './MovementManager';
import { AttackCalculationService } from './AttackCalculationService';
import * as BasicAttackService from './BasicAttackService';
import { ModifierService } from './ModifierService';
import { globalTileEffectManager } from './TileEffect';
import { globalUnitRegistry } from '../units/UnitRegistry';
import { isDebugModeEnabled } from './DebugMode';

export interface AIThought {
    type: 'basic_attack' | 'skill' | 'move_only' | 'skip';
    priority: number;
    targetPosition?: Position;
    targetUnit?: Unit;
    skill?: Skill;
    moveToPosition?: Position;
    reasoning: string;
}

export interface AIDecision {
    unit: Unit;
    thoughts: AIThought[];
    selectedThought: AIThought;
    executionPlan: {
        moveFirst?: Position;
        action: 'basic_attack' | 'skill' | 'skip';
        target?: Position;
        skill?: Skill;
    };
}

export class AIService {
    private actionManager: ActionManager;
    private skillHandler: SkillHandler;
    private skillTargetingService: SkillTargetingService;
    private navigationManager: NavigationManager;
    private movementManager: MovementManager;
    private attackCalculationService: AttackCalculationService;
    private basicAttackService: typeof BasicAttackService;

    constructor(
        actionManager: ActionManager,
        skillHandler: SkillHandler,
        skillTargetingService: SkillTargetingService,
        navigationManager: NavigationManager,
        movementManager: MovementManager,
        attackCalculationService: AttackCalculationService,
        basicAttackService: typeof BasicAttackService
    ) {
        this.actionManager = actionManager;
        this.skillHandler = skillHandler;
        this.skillTargetingService = skillTargetingService;
        this.navigationManager = navigationManager;
        this.movementManager = movementManager;
        this.attackCalculationService = attackCalculationService;
        this.basicAttackService = basicAttackService;
    }

    /**
     * Main AI decision-making entry point
     */
    public async makeDecision(
        unit: Unit, 
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        getUnitPosition: (unit: Unit) => Position | null,
        getAllUnits: () => Unit[]
    ): Promise<AIDecision> {
        console.log(`🤖 AI making decision for ${unit.name} (${unit.className})`);

        // Phase 1: Generate all possible thoughts
        const thoughts = await this.generateThoughts(unit, getUnitAtPosition, getUnitPosition, getAllUnits);
        
        // Phase 2: Select best thought using weighted randomization
        const selectedThought = this.selectThoughtWithWeightedRandomization(thoughts);
        
        // Phase 3: Create execution plan
        const executionPlan = this.createExecutionPlan(selectedThought, unit, getUnitPosition);

        console.log(`🎯 AI selected: ${selectedThought.type} (priority: ${selectedThought.priority}) - ${selectedThought.reasoning}`);

        return {
            unit,
            thoughts,
            selectedThought,
            executionPlan
        };
    }

    /**
     * Generate all possible AI thoughts for a unit
     */
    private async generateThoughts(
        unit: Unit,
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        getUnitPosition: (unit: Unit) => Position | null,
        getAllUnits: () => Unit[]
    ): Promise<AIThought[]> {
        const thoughts: AIThought[] = [];
        const unitPosition = getUnitPosition(unit);
        if (!unitPosition) return [this.createSkipThought("Unit position unknown")];

        const allUnits = getAllUnits();
        const allies = allUnits.filter(u => u.team === unit.team && u.currentHealth > 0);
        const enemies = allUnits.filter(u => u.team !== unit.team && u.currentHealth > 0);

        // Determine unit behavior type
        const behaviorType = this.determineBehaviorType(unit);
        console.log(`🧠 ${unit.name} behavior type: ${behaviorType}`);

        // Generate thoughts based on behavior type
        switch (behaviorType) {
            case 'healer':
                thoughts.push(...await this.generateHealerThoughts(unit, allies, enemies, unitPosition, getUnitAtPosition, getUnitPosition));
                break;
            case 'buffer':
                thoughts.push(...await this.generateBufferThoughts(unit, allies, enemies, unitPosition, getUnitAtPosition, getUnitPosition));
                break;
            case 'debuffer':
                thoughts.push(...await this.generateDebufferThoughts(unit, allies, enemies, unitPosition, getUnitAtPosition, getUnitPosition));
                break;
            case 'defensive':
                thoughts.push(...await this.generateDefensiveThoughts(unit, allies, enemies, unitPosition, getUnitAtPosition, getUnitPosition));
                break;
            case 'offensive':
            default:
                thoughts.push(...await this.generateOffensiveThoughts(unit, allies, enemies, unitPosition, getUnitAtPosition, getUnitPosition));
                break;
        }

        // Always consider basic movement if no better options
        if (thoughts.length === 0 || thoughts.every(t => t.priority < 10)) {
            thoughts.push(...this.generateMovementThoughts(unit, enemies, unitPosition, getUnitAtPosition, getUnitPosition));
        }

        // Always include a skip option as fallback
        thoughts.push(this.createSkipThought("Skip turn if other actions fail"));

        // Fallback: skip turn if nothing else makes sense
        if (thoughts.length === 0) {
            thoughts.push(this.createSkipThought("No viable actions available"));
        }

        return thoughts.filter(t => t.priority > 0);
    }

    /**
     * Determine the behavioral archetype of a unit
     */
    private determineBehaviorType(unit: Unit): 'healer' | 'buffer' | 'debuffer' | 'defensive' | 'offensive' {
        // Check class name first
        // Note: Healers are set to offensive behavior for more aggressive AI
        // if (unit.className.toLowerCase().includes('healer')) return 'healer';
        if (unit.className.toLowerCase().includes('hype')) return 'buffer';
        if (unit.className.toLowerCase().includes('hater')) return 'debuffer';

        // Check skills for behavior patterns
        // Note: Healing skills detection disabled - healers use offensive behavior
        // const hasHealingSkills = unit.skills.some(skill => 
        //     skill.id.includes('heal') || skill.id.includes('bandage') || 
        //     skill.id.includes('whisper') || skill.id.includes('blessing')
        // );
        // if (hasHealingSkills) return 'healer';

        const hasBuffSkills = unit.skills.some(skill =>
            skill.id.includes('hype') || skill.id.includes('rally') || 
            skill.id.includes('inspire') || skill.id.includes('prepare')
        );
        if (hasBuffSkills) return 'buffer';

        const hasDebuffSkills = unit.skills.some(skill =>
            skill.id.includes('exhaust') || skill.id.includes('jeer') || 
            skill.id.includes('toxic') || skill.id.includes('distraction')
        );
        if (hasDebuffSkills) return 'debuffer';

        const hasDefensiveSkills = unit.skills.some(skill =>
            skill.id.includes('rescue') || skill.id.includes('sturdy') || 
            skill.id.includes('taunt') || skill.id.includes('barrier')
        );
        if (hasDefensiveSkills) return 'defensive';

        // Default to offensive
        return 'offensive';
    }

    /**
     * Generate thoughts for healer-type units
     */
    private async generateHealerThoughts(
        unit: Unit,
        allies: Unit[],
        enemies: Unit[],
        unitPosition: Position,
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        getUnitPosition: (unit: Unit) => Position | null
    ): Promise<AIThought[]> {
        const thoughts: AIThought[] = [];

        // Self-heal if critically injured
        const healthPercent = unit.currentHealth / unit.health;
        if (healthPercent < 0.3) {
            const selfHealSkills = unit.skills.filter(skill => 
                skill.id.includes('heal') || skill.id.includes('bandage')
            );
            for (const skill of selfHealSkills) {
                if (unit.currentEnergy >= skill.energyCost) {
                    thoughts.push({
                        type: 'skill',
                        priority: 85 + (1 - healthPercent) * 20, // 85-105 priority
                        targetPosition: unitPosition,
                        skill,
                        reasoning: `Critical self-heal at ${Math.round(healthPercent * 100)}% HP`
                    });
                }
            }
        }

        // Heal injured allies
        const injuredAllies = allies.filter(ally => ally.currentHealth < ally.health).sort((a, b) => 
            (a.currentHealth / a.health) - (b.currentHealth / b.health)
        );

        for (const ally of injuredAllies) {
            const allyPosition = getUnitPosition(ally);
            if (!allyPosition) continue;

            const healingSkills = unit.skills.filter(skill => 
                skill.id.includes('heal') || skill.id.includes('whisper') || skill.id.includes('blessing')
            );

            for (const skill of healingSkills) {
                if (unit.currentEnergy >= skill.energyCost) {
                    const distance = Math.abs(unitPosition.x - allyPosition.x) + Math.abs(unitPosition.y - allyPosition.y);
                    const inRange = distance <= unit.range;
                    
                    const allyHealthPercent = ally.currentHealth / ally.health;
                    const urgency = (1 - allyHealthPercent) * 50;
                    const basePriority = inRange ? 60 : 30;
                    
                    thoughts.push({
                        type: 'skill',
                        priority: basePriority + urgency,
                        targetPosition: allyPosition,
                        targetUnit: ally,
                        skill,
                        moveToPosition: inRange ? undefined : this.findOptimalPosition(unitPosition, allyPosition, unit.range, getUnitAtPosition),
                        reasoning: `Heal ${ally.name} at ${Math.round(allyHealthPercent * 100)}% HP`
                    });
                }
            }
        }

        // Consider offensive actions if no healing needed
        if (injuredAllies.length === 0 && healthPercent > 0.7) {
            thoughts.push(...await this.generateOffensiveThoughts(unit, allies, enemies, unitPosition, getUnitAtPosition, getUnitPosition));
        }

        return thoughts;
    }

    /**
     * Generate thoughts for buffer-type units
     */
    private async generateBufferThoughts(
        unit: Unit,
        allies: Unit[],
        enemies: Unit[],
        unitPosition: Position,
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        getUnitPosition: (unit: Unit) => Position | null
    ): Promise<AIThought[]> {
        const thoughts: AIThought[] = [];

        // Prioritize buffing allies
        const buffSkills = unit.skills.filter(skill =>
            skill.id.includes('hype') || skill.id.includes('rally') || 
            skill.id.includes('inspire') || skill.id.includes('prepare')
        );

        for (const skill of buffSkills) {
            if (unit.currentEnergy >= skill.energyCost) {
                // Try to find position that affects most allies
                const bestTargets = this.findBestAoETargets(unitPosition, allies, skill, getUnitPosition);
                
                if (bestTargets.length > 0) {
                    const priority = 50 + (bestTargets.length * 15); // More allies = higher priority
                    thoughts.push({
                        type: 'skill',
                        priority,
                        targetPosition: bestTargets[0].position,
                        skill,
                        reasoning: `Buff ${bestTargets.length} allies with ${skill.name}`
                    });
                }
            }
        }

        // Fall back to offensive actions
        thoughts.push(...await this.generateOffensiveThoughts(unit, allies, enemies, unitPosition, getUnitAtPosition, getUnitPosition));

        return thoughts;
    }

    /**
     * Generate thoughts for debuffer-type units
     */
    private async generateDebufferThoughts(
        unit: Unit,
        allies: Unit[],
        enemies: Unit[],
        unitPosition: Position,
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        getUnitPosition: (unit: Unit) => Position | null
    ): Promise<AIThought[]> {
        const thoughts: AIThought[] = [];

        const debuffSkills = unit.skills.filter(skill =>
            skill.id.includes('exhaust') || skill.id.includes('jeer') || 
            skill.id.includes('toxic') || skill.id.includes('distraction')
        );

        for (const skill of debuffSkills) {
            if (unit.currentEnergy >= skill.energyCost) {
                // Target strongest enemies or groups
                const bestTargets = this.findBestAoETargets(unitPosition, enemies, skill, getUnitPosition);
                
                if (bestTargets.length > 0) {
                    const priority = 45 + (bestTargets.length * 10);
                    thoughts.push({
                        type: 'skill',
                        priority,
                        targetPosition: bestTargets[0].position,
                        skill,
                        reasoning: `Debuff ${bestTargets.length} enemies with ${skill.name}`
                    });
                }
            }
        }

        // Include offensive actions
        thoughts.push(...await this.generateOffensiveThoughts(unit, allies, enemies, unitPosition, getUnitAtPosition, getUnitPosition));

        return thoughts;
    }

    /**
     * Generate thoughts for defensive-type units
     */
    private async generateDefensiveThoughts(
        unit: Unit,
        allies: Unit[],
        enemies: Unit[],
        unitPosition: Position,
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        getUnitPosition: (unit: Unit) => Position | null
    ): Promise<AIThought[]> {
        const thoughts: AIThought[] = [];

        // Prioritize protecting critical allies
        const criticalAllies = allies.filter(ally => ally.currentHealth / ally.health < 0.5);
        
        const protectiveSkills = unit.skills.filter(skill =>
            skill.id.includes('rescue') || skill.id.includes('taunt') || 
            skill.id.includes('sturdy') || skill.id.includes('barrier')
        );

        for (const skill of protectiveSkills) {
            if (unit.currentEnergy >= skill.energyCost) {
                for (const ally of criticalAllies) {
                    const allyPosition = getUnitPosition(ally);
                    if (!allyPosition) continue;

                    const priority = 70 - (ally.currentHealth / ally.health) * 20;
                    thoughts.push({
                        type: 'skill',
                        priority,
                        targetPosition: allyPosition,
                        targetUnit: ally,
                        skill,
                        reasoning: `Protect critical ally ${ally.name}`
                    });
                }
            }
        }

        // Consider positioning to block enemies
        const blockingPositions = this.findBlockingPositions(unitPosition, allies, enemies, getUnitAtPosition, getUnitPosition);
        for (const pos of blockingPositions) {
            thoughts.push({
                type: 'move_only',
                priority: 25,
                moveToPosition: pos,
                reasoning: `Block enemy advancement`
            });
        }

        return thoughts;
    }

    /**
     * Generate thoughts for offensive-type units
     */
    private async generateOffensiveThoughts(
        unit: Unit,
        allies: Unit[],
        enemies: Unit[],
        unitPosition: Position,
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        getUnitPosition: (unit: Unit) => Position | null
    ): Promise<AIThought[]> {
        const thoughts: AIThought[] = [];

        // Prioritize high-damage skills
        const damageSkills = unit.skills.filter(skill => skill.bonusDamage > 0);
        damageSkills.sort((a, b) => (b.bonusDamage + (b.energyCost * -2)) - (a.bonusDamage + (a.energyCost * -2)));

        for (const skill of damageSkills) {
            if (unit.currentEnergy >= skill.energyCost) {
                const targets = this.findBestSkillTargets(unitPosition, enemies, skill, getUnitPosition, getUnitAtPosition);
                
                for (const target of targets.slice(0, 3)) { // Consider top 3 targets
                    const damage = unit.skillDamage + skill.bonusDamage;
                    const canKill = target.unit.currentHealth <= damage;
                    const priority = 40 + damage + (canKill ? 30 : 0);
                    
                    thoughts.push({
                        type: 'skill',
                        priority,
                        targetPosition: target.position,
                        targetUnit: target.unit,
                        skill,
                        moveToPosition: target.needsMovement ? target.moveToPosition : undefined,
                        reasoning: `${skill.name} on ${target.unit.name} for ${damage} damage${canKill ? ' (KILL)' : ''}`
                    });
                }
            }
        }

        // Basic attacks on vulnerable targets
        const basicAttackTargets = this.findBasicAttackTargets(unitPosition, enemies, unit, getUnitPosition, getUnitAtPosition);
        for (const target of basicAttackTargets.slice(0, 2)) {
            const canKill = target.unit.currentHealth <= unit.basicDamage;
            const priority = 30 + unit.basicDamage + (canKill ? 25 : 0);
            
            thoughts.push({
                type: 'basic_attack',
                priority,
                targetPosition: target.position,
                targetUnit: target.unit,
                moveToPosition: target.needsMovement ? target.moveToPosition : undefined,
                reasoning: `Basic attack ${target.unit.name} for ${unit.basicDamage} damage${canKill ? ' (KILL)' : ''}`
            });
        }

        return thoughts;
    }

    /**
     * Generate movement-only thoughts
     */
    private generateMovementThoughts(
        unit: Unit,
        enemies: Unit[],
        unitPosition: Position,
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        getUnitPosition: (unit: Unit) => Position | null
    ): AIThought[] {
        const thoughts: AIThought[] = [];

        // Move toward nearest enemy
        if (enemies.length > 0) {
            const nearestEnemy = this.findNearestEnemy(unitPosition, enemies, getUnitPosition);
            if (nearestEnemy) {
                const movePosition = this.findOptimalPosition(unitPosition, nearestEnemy.position, unit.range, getUnitAtPosition);
                if (movePosition && (movePosition.x !== unitPosition.x || movePosition.y !== unitPosition.y)) {
                    thoughts.push({
                        type: 'move_only',
                        priority: 15,
                        moveToPosition: movePosition,
                        reasoning: `Move toward nearest enemy ${nearestEnemy.unit.name}`
                    });
                }
            }
        }

        return thoughts;
    }

    /**
     * Select thought using weighted randomization
     */
    private selectThoughtWithWeightedRandomization(thoughts: AIThought[]): AIThought {
        if (thoughts.length === 0) {
            return this.createSkipThought("No thoughts available");
        }

        if (thoughts.length === 1) {
            return thoughts[0];
        }

        // Calculate total weight
        const totalWeight = thoughts.reduce((sum, thought) => sum + Math.max(1, thought.priority), 0);
        
        // Random selection
        let randomValue = Math.random() * totalWeight;
        
        for (const thought of thoughts) {
            randomValue -= Math.max(1, thought.priority);
            if (randomValue <= 0) {
                return thought;
            }
        }

        // Fallback to highest priority
        return thoughts.reduce((best, current) => 
            current.priority > best.priority ? current : best
        );
    }

    /**
     * Create execution plan from selected thought
     */
    private createExecutionPlan(thought: AIThought, unit: Unit, getUnitPosition: (unit: Unit) => Position | null): AIDecision['executionPlan'] {
        const plan: AIDecision['executionPlan'] = {
            action: thought.type === 'move_only' ? 'skip' : thought.type
        };

        if (thought.moveToPosition) {
            plan.moveFirst = thought.moveToPosition;
        }

        if (thought.targetPosition) {
            plan.target = thought.targetPosition;
        }

        if (thought.skill) {
            plan.skill = thought.skill;
        }

        return plan;
    }

    // === UTILITY METHODS ===

    private createSkipThought(reasoning: string): AIThought {
        return {
            type: 'skip',
            priority: 1,
            reasoning
        };
    }

    private findOptimalPosition(from: Position, to: Position, range: number, getUnitAtPosition: (x: number, y: number) => Unit | null): Position | undefined {
        // Find position within range of target
        const candidates: Position[] = [];
        
        for (let x = Math.max(0, to.x - range); x <= Math.min(7, to.x + range); x++) {
            for (let y = Math.max(0, to.y - range); y <= Math.min(7, to.y + range); y++) {
                const distance = Math.abs(x - to.x) + Math.abs(y - to.y);
                if (distance <= range && !getUnitAtPosition(x, y) && (x !== from.x || y !== from.y)) {
                    candidates.push({ x, y });
                }
            }
        }

        if (candidates.length === 0) return undefined;

        // Choose closest to current position that's also reachable
        const sortedCandidates = candidates
            .map(pos => ({
                position: pos,
                distance: Math.abs(pos.x - from.x) + Math.abs(pos.y - from.y)
            }))
            .filter(candidate => candidate.distance <= 3) // Assume max movement of 3
            .sort((a, b) => a.distance - b.distance);

        return sortedCandidates.length > 0 ? sortedCandidates[0].position : undefined;
    }

    private findBestAoETargets(
        unitPosition: Position, 
        targets: Unit[], 
        skill: Skill, 
        getUnitPosition: (unit: Unit) => Position | null
    ): Array<{ unit: Unit; position: Position; affectedCount: number }> {
        const results: Array<{ unit: Unit; position: Position; affectedCount: number }> = [];

        for (const target of targets) {
            const targetPosition = getUnitPosition(target);
            if (!targetPosition) continue;

            // Get skill pattern to count affected units
            const pattern = skill.getTargetPattern(targetPosition.x, targetPosition.y);
            const affectedCount = pattern.filter(pos => {
                const unitAtPos = targets.find(u => {
                    const uPos = getUnitPosition(u);
                    return uPos && uPos.x === pos.x && uPos.y === pos.y;
                });
                return unitAtPos !== undefined;
            }).length;

            results.push({
                unit: target,
                position: targetPosition,
                affectedCount
            });
        }

        return results.sort((a, b) => b.affectedCount - a.affectedCount);
    }

    private findBestSkillTargets(
        unitPosition: Position,
        enemies: Unit[],
        skill: Skill,
        getUnitPosition: (unit: Unit) => Position | null,
        getUnitAtPosition: (x: number, y: number) => Unit | null
    ): Array<{ unit: Unit; position: Position; needsMovement: boolean; moveToPosition?: Position }> {
        const results: Array<{ unit: Unit; position: Position; needsMovement: boolean; moveToPosition?: Position }> = [];

        for (const enemy of enemies) {
            const enemyPosition = getUnitPosition(enemy);
            if (!enemyPosition) continue;

            const distance = Math.abs(unitPosition.x - enemyPosition.x) + Math.abs(unitPosition.y - enemyPosition.y);
            const inRange = distance <= 3; // Assume max skill range of 3

            let moveToPosition: Position | undefined;
            let needsMovement = false;

            if (!inRange) {
                moveToPosition = this.findOptimalPosition(unitPosition, enemyPosition, 3, getUnitAtPosition);
                needsMovement = !!moveToPosition;
            }

            if (inRange || needsMovement) {
                results.push({
                    unit: enemy,
                    position: enemyPosition,
                    needsMovement,
                    moveToPosition
                });
            }
        }

        // Sort by priority: killable targets first, then by damage potential
        return results.sort((a, b) => {
            const aKillable = a.unit.currentHealth <= (skill.bonusDamage + 5) ? 1 : 0;
            const bKillable = b.unit.currentHealth <= (skill.bonusDamage + 5) ? 1 : 0;
            if (aKillable !== bKillable) return bKillable - aKillable;
            
            return b.unit.currentHealth - a.unit.currentHealth; // Target higher HP units
        });
    }

    private findBasicAttackTargets(
        unitPosition: Position,
        enemies: Unit[],
        unit: Unit,
        getUnitPosition: (unit: Unit) => Position | null,
        getUnitAtPosition: (x: number, y: number) => Unit | null
    ): Array<{ unit: Unit; position: Position; needsMovement: boolean; moveToPosition?: Position }> {
        const results: Array<{ unit: Unit; position: Position; needsMovement: boolean; moveToPosition?: Position }> = [];

        for (const enemy of enemies) {
            const enemyPosition = getUnitPosition(enemy);
            if (!enemyPosition) continue;

            const distance = Math.abs(unitPosition.x - enemyPosition.x) + Math.abs(unitPosition.y - enemyPosition.y);
            const inRange = distance <= unit.range;

            let moveToPosition: Position | undefined;
            let needsMovement = false;

            if (!inRange) {
                moveToPosition = this.findOptimalPosition(unitPosition, enemyPosition, unit.range, getUnitAtPosition);
                needsMovement = !!moveToPosition;
            }

            if (inRange || needsMovement) {
                results.push({
                    unit: enemy,
                    position: enemyPosition,
                    needsMovement,
                    moveToPosition
                });
            }
        }

        // Sort by killability and threat level
        return results.sort((a, b) => {
            const aKillable = a.unit.currentHealth <= unit.basicDamage ? 1 : 0;
            const bKillable = b.unit.currentHealth <= unit.basicDamage ? 1 : 0;
            if (aKillable !== bKillable) return bKillable - aKillable;
            
            // Target higher damage enemies first
            return b.unit.basicDamage - a.unit.basicDamage;
        });
    }

    private findNearestEnemy(
        unitPosition: Position,
        enemies: Unit[],
        getUnitPosition: (unit: Unit) => Position | null
    ): { unit: Unit; position: Position } | null {
        let nearest: { unit: Unit; position: Position; distance: number } | null = null;

        for (const enemy of enemies) {
            const enemyPosition = getUnitPosition(enemy);
            if (!enemyPosition) continue;

            const distance = Math.abs(unitPosition.x - enemyPosition.x) + Math.abs(unitPosition.y - enemyPosition.y);
            
            if (!nearest || distance < nearest.distance) {
                nearest = { unit: enemy, position: enemyPosition, distance };
            }
        }

        return nearest ? { unit: nearest.unit, position: nearest.position } : null;
    }

    private findBlockingPositions(
        unitPosition: Position,
        allies: Unit[],
        enemies: Unit[],
        getUnitAtPosition: (x: number, y: number) => Unit | null,
        getUnitPosition: (unit: Unit) => Position | null
    ): Position[] {
        const positions: Position[] = [];

        // Find positions between enemies and vulnerable allies
        const vulnerableAllies = allies.filter(ally => ally.currentHealth / ally.health < 0.6);
        
        for (const ally of vulnerableAllies) {
            const allyPosition = getUnitPosition(ally);
            if (!allyPosition) continue;

            for (const enemy of enemies) {
                const enemyPosition = getUnitPosition(enemy);
                if (!enemyPosition) continue;

                // Find midpoint positions
                const midX = Math.floor((allyPosition.x + enemyPosition.x) / 2);
                const midY = Math.floor((allyPosition.y + enemyPosition.y) / 2);

                if (midX >= 0 && midX < 8 && midY >= 0 && midY < 8 && !getUnitAtPosition(midX, midY)) {
                    positions.push({ x: midX, y: midY });
                }
            }
        }

        return positions;
    }

    /**
     * Check if AI should be active (not in debug mode)
     */
    public static shouldUseAI(): boolean {
        return !isDebugModeEnabled();
    }
}
