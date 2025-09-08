# AI System for Tactica69

## Overview

The AI system provides intelligent enemy unit control in Tactica69, automatically managing enemy turns when not in debug mode. The system integrates seamlessly with existing game managers and provides sophisticated decision-making based on unit types, battlefield conditions, and strategic priorities.

## Architecture

### Core Components

1. **AIService** (`AIService.ts`)
   - Core decision-making engine
   - Generates and evaluates AI thoughts
   - Implements weighted randomization for action selection
   - Handles unit behavior specializations

2. **AITurnManager** (`AITurnManager.ts`)
   - Manages AI turn execution
   - Integrates with existing game flow
   - Handles phase transitions and action execution
   - Provides debugging interface

3. **Integration Points**
   - `TurnManager`: AI initialization and turn control
   - `GameScene`: System initialization and dependency injection
   - `TurnManagerUI`: Automatic AI turn execution in SELECT phase

## AI Behavior System

### Unit Behavior Types

The AI categorizes units into behavioral archetypes based on class names and available skills:

#### 1. **Healer** 🩹
- **Triggers**: Class contains "healer" or has healing skills
- **Priority Actions**:
  - Self-heal when critically injured (HP < 30%)
  - Heal injured allies (priority by lowest HP%)
  - Fall back to offensive actions if no healing needed
- **Skills Detected**: heal, bandage, whisper, blessing

#### 2. **Buffer** 💪
- **Triggers**: Class contains "hype" or has buff skills  
- **Priority Actions**:
  - Apply buffs to maximize ally coverage
  - Target groups of allies for AoE buffs
  - Support offensive actions when buffs applied
- **Skills Detected**: hype, rally, inspire, prepare

#### 3. **Debuffer** 😈
- **Triggers**: Class contains "hater" or has debuff skills
- **Priority Actions**:
  - Apply debuffs to enemy groups
  - Target strongest enemies
  - Combine with offensive actions
- **Skills Detected**: exhaust, jeer, toxic, distraction

#### 4. **Defensive** 🛡️
- **Triggers**: Has protective/defensive skills
- **Priority Actions**:
  - Protect critical allies (HP < 50%)
  - Position to block enemy advancement
  - Use protective skills on vulnerable units
- **Skills Detected**: rescue, sturdy, taunt, barrier

#### 5. **Offensive** ⚔️ (Default)
- **Priority Actions**:
  - High-damage skills on vulnerable targets
  - Basic attacks for finishing kills
  - Move into optimal attack positions
- **Target Priority**: Killable > High threat > Low HP

## Decision-Making Process

### Phase 1: Thought Generation
Each unit generates multiple "thoughts" (possible actions) based on:
- Current battlefield state
- Unit's behavioral archetype  
- Available skills and energy
- Enemy and ally positions
- Environmental factors

### Phase 2: Priority Calculation
Each thought receives a numeric priority based on:
- **Base Action Value**: Damage potential, healing amount, buff effectiveness
- **Situational Modifiers**: 
  - Kill potential (+25-30 priority)
  - Critical health situations (+20-50 priority)
  - AoE effectiveness (+10-15 per additional target)
  - Energy efficiency
- **Safety Considerations**: Avoid dangerous positions

### Phase 3: Weighted Selection
- Total priority pool calculated from all thoughts
- Random selection weighted by priority values
- Higher priority = higher chance of selection
- Prevents completely predictable behavior

### Phase 4: Execution Planning
Selected thought converted to execution plan:
- Movement phase (if required)
- Action phase (attack/skill/skip)
- Target selection and validation

## Integration with Game Systems

### Turn Manager Integration
```typescript
// AI initialization
turnManager.initializeAI(
    actionManager, skillHandler, skillTargetingService,
    navigationManager, movementManager, 
    attackCalculationService, basicAttackService
);

// Turn execution check
if (turnManager.shouldUseAIForCurrentTurn()) {
    await turnManager.executeAITurnIfNeeded(gameScene);
}
```

### Debug Mode Behavior
- **Debug Mode ON**: AI disabled, manual control for all units
- **Debug Mode OFF**: AI controls enemy units automatically
- Toggle with F1 key or debug commands

## Debug Commands

Access via browser console when debug mode is enabled:

### `aiAnalyze("unitName")`
Analyzes AI decision-making for a specific unit:
```javascript
aiAnalyze("Goblin Warrior")
// Shows all AI thoughts, priorities, and selected action
```

### `aiCurrent()`
Displays currently active AI decision:
```javascript
aiCurrent()
// Shows execution plan for current AI turn
```

### `aiBehaviors()`
Lists all enemy units and their detected behavior types:
```javascript
aiBehaviors()
// Shows: UnitName (ClassName): BEHAVIOR_TYPE
```

### `aiToggle()`
Shows current AI status and how to toggle:
```javascript
aiToggle()
// Explains debug mode relationship to AI
```

## Performance Considerations

### Optimization Features
- **Lazy Loading**: AI system only initializes when needed
- **Async Execution**: Non-blocking turn execution
- **Caching**: Unit position and state caching during decision-making
- **Limited Scope**: Only considers top 2-3 options for complex decisions

### Memory Management
- Decisions cleaned up after execution
- No persistent AI state between turns
- Minimal memory footprint

## Extensibility

### Adding New Behaviors
1. Add behavior type to `determineBehaviorType()`
2. Implement `generate[Behavior]Thoughts()` method
3. Add skill detection patterns
4. Update debug commands

### Customizing Priorities
Modify priority calculations in behavior-specific thought generation methods:
```typescript
const priority = basePriority + situationalModifiers + randomVariation;
```

### Adding New Decision Factors
Extend thought generation to consider:
- Tile effects and environmental hazards
- Unit synergies and combinations
- Long-term strategic positioning
- Resource management

## Testing

### Validation Checklist
- [ ] AI activates only when debug mode is OFF
- [ ] Each unit behavior type makes appropriate decisions
- [ ] Priority system produces varied but sensible choices
- [ ] Movement and targeting work correctly
- [ ] Turn progression continues normally after AI actions
- [ ] Debug commands provide useful information

### Common Issues
1. **AI not activating**: Check debug mode status
2. **Poor decisions**: Verify behavior type detection
3. **Execution failures**: Check action manager integration
4. **Performance issues**: Monitor thought generation complexity

## Future Enhancements

### Potential Improvements
- **Team Coordination**: Multi-unit strategic planning
- **Learning System**: Adapt to player strategies
- **Difficulty Scaling**: Adjust AI intelligence by game level
- **Advanced Positioning**: Consider multi-turn positioning strategies
- **Resource Management**: Long-term energy and cooldown planning

### Integration Opportunities
- **Passive System**: AI awareness of passive abilities
- **Tile Effects**: Advanced environmental interaction
- **Item Usage**: Intelligent item and equipment decisions
- **Formation Tactics**: Coordinated unit positioning

---

*The AI system is designed to provide challenging, varied, and entertaining enemy behavior while maintaining the tactical depth that makes Tactica69 engaging.*
