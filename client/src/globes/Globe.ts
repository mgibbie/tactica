import { Unit } from '../units/Unit';

export interface BattleCondition {
    name: string;
    description: string;
    effect: (playerUnits: Unit[], enemyUnits: Unit[]) => void;
}

export interface GlobeReward {
    resource: number;
    // Add other reward types as needed (items, units, etc.)
}

export class Globe {
    public readonly id: string;
    public readonly name: string;
    public readonly level: number;
    public readonly imageUrl: string;
    public readonly reward: GlobeReward;
    public readonly battleCondition: BattleCondition;
    public readonly enemies: Unit[];

    constructor(
        id: string,
        name: string,
        level: number,
        imageUrl: string,
        reward: GlobeReward,
        battleCondition: BattleCondition,
        enemies: Unit[]
    ) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.imageUrl = imageUrl;
        this.reward = reward;
        this.battleCondition = battleCondition;
        this.enemies = enemies;
    }
} 