import { Unit } from '../units/Unit';
import { ModifierService } from './ModifierService';
import { PassiveService } from './PassiveService';
import { SCENE_GLOBAL } from '../game';

export interface BasicAttackOutcome {
  finalDamage: number;
  targetDied: boolean;
}

/**
 * Perform a universal basic attack sequence so all systems (e.g. Spotlight) behave the same
 */
export function performBasicAttack(attacker: Unit, defender: Unit): BasicAttackOutcome {
  // 1) Attacker damage modifiers
  const baseDamage = attacker.basicDamage;
  const attackResult = ModifierService.processBasicAttackDamageModifiers(attacker, baseDamage);

  // Handle deaths caused on attacker by their own modifiers (e.g., BURN)
  if (attackResult.unitsThatDied.length > 0) {
    const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
    if (gameSceneInstance) {
      attackResult.unitsThatDied.forEach((dead: Unit) => gameSceneInstance.handleUnitDeath(dead));
    }
  }

  // 2) Defender defense modifiers
  const defenseResult = ModifierService.processBasicAttackDefenseModifiers(
    defender,
    attackResult.finalDamage,
    attacker
  );
  let finalDamage = defenseResult.finalDamage;

  // 3) Apply damage
  const oldHealth = defender.currentHealth;
  defender.currentHealth = Math.max(0, defender.currentHealth - finalDamage);

  // Lucky Rabbit Foot prevention
  if (defender.currentHealth <= 0) {
    const prevented = PassiveService.tryPreventLethalWithLuckyFoot(defender);
    if (prevented) {
      // Kept alive at 1 HP
    }
  }

  const targetDied = defender.currentHealth <= 0;

  // 4) Energy adjustments (match normal basic attack behavior)
  if (attacker.energyType.toLowerCase() === 'kinetic') {
    attacker.currentEnergy = Math.min(attacker.maxEnergy, attacker.currentEnergy + 5);
  }

  // 5) Action modifiers on attacker after attack (e.g., SHOCKED/HEADACHE)
  const actionMods = ModifierService.processActionModifiers(attacker);
  if (actionMods.unitsThatDied.length > 0) {
    const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
    if (gameSceneInstance) {
      actionMods.unitsThatDied.forEach((dead: Unit) => gameSceneInstance.handleUnitDeath(dead));
    }
  }

  // 6) Target receive-basic-attack passives
  PassiveService.processReceiveBasicAttackPassives(defender);

  // 7) Post-damage modifiers (e.g., ANGER) if damage dealt
  if (finalDamage > 0) {
    const post = ModifierService.processPostDamageModifiers(attacker, defender);
    if (post.unitsThatDied.length > 0) {
      const gameSceneInstance = (window as any).GAME_SCENE_INSTANCE;
      if (gameSceneInstance) {
        post.unitsThatDied.forEach((dead: Unit) => gameSceneInstance.handleUnitDeath(dead));
      }
    }
  }

  return { finalDamage, targetDied };
}


