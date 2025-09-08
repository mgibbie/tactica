# AI System Testing Guide

## Recent Fixes Applied

### 1. **Turn Flow Integration** 
- Fixed AI triggering to happen after `endTurn()` calls
- Added AI trigger to `startGame()` for first turn
- Fixed circular dependency in turn management

### 2. **Phase Management**
- AI now properly advances through SELECT → MOVE → ACTION phases
- Removed recursive `endTurn()` calls from AI execution
- AI directly calls `GAME_TURN_MANAGER.advancePhase()` and `endTurn()`

### 3. **Debugging Enhanced**
- Added comprehensive console logging for AI decisions
- Shows current player, AI eligibility, and unit selection
- Detailed execution logging for movement and actions

## How to Test the AI System

### Step 1: Start the Game
1. Run `npm run dev` in the client directory
2. Navigate to the game and start a battle
3. **Make sure Debug Mode is OFF** (press F1 to toggle if needed)

### Step 2: Check Console Logs
Open browser developer tools and look for these logs:
```
🔍 Checking AI turn: currentPlayer=Player Two, shouldUseAI=true, gameScene=true
🤖 AI should take this turn, attempting to execute...
🔍 Selectable units: X, Enemy units: Y
🤖 AI auto-selected [UnitName] ([ClassName])
🤖 Executing AI decision for [UnitName]: [execution plan]
```

### Step 3: Use Debug Commands
In the browser console, run:
```javascript
// Test overall AI system
testAI()

// Analyze specific unit's AI thoughts
aiAnalyze("Enemy Unit Name")

// Check current AI status
aiToggle()

// List all enemy behaviors
aiBehaviors()
```

### Step 4: Verify AI Actions
Watch for:
- ✅ AI automatically selects an enemy unit when it's Player Two's turn
- ✅ AI moves the unit (if needed) 
- ✅ AI performs an attack or skill
- ✅ Turn switches back to Player One after AI completes

## Expected Behavior

### When Debug Mode is OFF:
- Player One turn: Manual control (you select and control units)
- Player Two turn: AI automatically takes control of enemy units

### When Debug Mode is ON:
- Both Player One and Player Two turns: Manual control
- You must manually select and control both player and enemy units

## Troubleshooting

### If AI is Not Working:

1. **Check Debug Mode Status:**
   ```javascript
   aiToggle() // Shows current status
   ```

2. **Verify Turn Manager:**
   ```javascript
   testAI() // Shows system status
   ```

3. **Check for Errors:**
   - Look for red errors in console
   - Check if units are available for selection

### Common Issues:

1. **"No enemy units available"**: 
   - Verify enemy units exist on battlefield
   - Check if units are selectable (not already used this round)

2. **"AI Turn Manager not available"**:
   - Game scene may not have initialized AI system
   - Check console for initialization errors

3. **AI selects but doesn't act**:
   - Check phase management logs
   - Verify action execution in console

## Debug Commands Reference

| Command | Description |
|---------|-------------|
| `testAI()` | Overall system status check |
| `aiAnalyze("name")` | Detailed AI analysis for specific unit |
| `aiCurrent()` | Current AI decision (if active) |
| `aiBehaviors()` | List unit behavior types |
| `aiToggle()` | AI status and control info |

## Expected Console Output

### Successful AI Turn:
```
🔍 Checking AI turn: currentPlayer=Player Two, shouldUseAI=true, gameScene=true
🤖 AI should take this turn, attempting to execute...
🔍 Selectable units: 3, Enemy units: 2
🤖 AI auto-selected Goblin Warrior (Swordsman)
🤖 Executing AI decision for Goblin Warrior: {moveFirst: {x:3, y:4}, action: "basic_attack", target: {x:2, y:3}}
🚶 AI moving Goblin Warrior to (3, 4)
⚔️ AI executing basic_attack with Goblin Warrior
✅ AI turn completed for Goblin Warrior
🔚 Turn X ended for Player Two
🎯 Turn Y - Player One's turn
```

### When AI is Disabled (Debug Mode ON):
```
🔍 Checking AI turn: currentPlayer=Player Two, shouldUseAI=false, gameScene=true
🎮 Player turn - no AI needed (current player: Player Two)
```

---

**If the AI system is still not working after these fixes, check the console logs and compare them to the expected output above.**
