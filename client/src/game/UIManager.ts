import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';

export class UIManager {
    
    public showSkipButton(onSkip: () => void): void {
        console.log(`⏭️ Creating skip button...`);
        
        this.hideMovementButtons(); // Clear any existing buttons
        
        const skipButton = document.createElement('button');
        skipButton.id = 'move-skip-button';
        skipButton.textContent = 'Skip Move';
        skipButton.style.position = 'absolute';
        skipButton.style.top = '10px';
        skipButton.style.right = '10px';
        skipButton.style.padding = '8px 16px';
        skipButton.style.backgroundColor = '#95a5a6';
        skipButton.style.color = 'white';
        skipButton.style.border = 'none';
        skipButton.style.borderRadius = '5px';
        skipButton.style.cursor = 'pointer';
        skipButton.style.zIndex = '1000';
        skipButton.style.fontFamily = 'sans-serif';
        skipButton.style.fontWeight = 'bold';
        
        skipButton.onclick = () => {
            console.log(`⏭️ Skip button clicked`);
            onSkip();
        };
        
        document.body.appendChild(skipButton);
        console.log(`✅ Skip button added to document body`);
    }

    public showConfirmCancelButtons(onConfirm: () => void, onCancel: () => void): void {
        this.hideMovementButtons(); // Clear any existing buttons
        
        // Confirm button
        const confirmButton = document.createElement('button');
        confirmButton.id = 'move-confirm-button';
        confirmButton.textContent = 'Confirm';
        confirmButton.style.position = 'absolute';
        confirmButton.style.top = '10px';
        confirmButton.style.right = '10px';
        confirmButton.style.padding = '8px 16px';
        confirmButton.style.backgroundColor = '#27ae60';
        confirmButton.style.color = 'white';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.zIndex = '1000';
        confirmButton.style.fontFamily = 'sans-serif';
        confirmButton.style.fontWeight = 'bold';
        confirmButton.onclick = () => onConfirm();
        
        // Cancel button
        const cancelButton = document.createElement('button');
        cancelButton.id = 'move-cancel-button';
        cancelButton.textContent = 'Cancel';
        cancelButton.style.position = 'absolute';
        cancelButton.style.top = '10px';
        cancelButton.style.right = '90px'; // Next to confirm button
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.backgroundColor = '#e74c3c';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '5px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.zIndex = '1000';
        cancelButton.style.fontFamily = 'sans-serif';
        cancelButton.style.fontWeight = 'bold';
        cancelButton.onclick = () => onCancel();
        
        document.body.appendChild(confirmButton);
        document.body.appendChild(cancelButton);
    }

    public hideMovementButtons(): void {
        const skipButton = document.getElementById('move-skip-button');
        const confirmButton = document.getElementById('move-confirm-button');
        const cancelButton = document.getElementById('move-cancel-button');
        
        if (skipButton) skipButton.remove();
        if (confirmButton) confirmButton.remove();
        if (cancelButton) cancelButton.remove();
    }

    public showActionOptions(unit: Unit, onAttack: () => void, onSkill: (skill: Skill) => void, onSkip: () => void): void {
        console.log(`⚔️ Creating action options for ${unit.name}...`);
        
        this.hideActionButtons(); // Clear any existing buttons
        
        let rightOffset = 10;
        
        // Skip button (always available)
        const skipButton = document.createElement('button');
        skipButton.id = 'action-skip-button';
        skipButton.textContent = 'Skip Action';
        skipButton.style.position = 'absolute';
        skipButton.style.top = '10px';
        skipButton.style.right = `${rightOffset}px`;
        skipButton.style.padding = '8px 16px';
        skipButton.style.backgroundColor = '#e67e22'; // Orange for action phase
        skipButton.style.color = 'white';
        skipButton.style.border = 'none';
        skipButton.style.borderRadius = '5px';
        skipButton.style.cursor = 'pointer';
        skipButton.style.zIndex = '1000';
        skipButton.style.fontFamily = 'sans-serif';
        skipButton.style.fontWeight = 'bold';
        
        skipButton.onclick = () => {
            console.log(`⏭️ Action skip button clicked`);
            onSkip();
        };
        
        document.body.appendChild(skipButton);
        rightOffset += 120; // Space for next button
        
        // Basic attack button (always available)
        const attackButton = document.createElement('button');
        attackButton.id = 'basic-attack-button';
        attackButton.textContent = 'Attack';
        attackButton.style.position = 'absolute';
        attackButton.style.top = '10px';
        attackButton.style.right = `${rightOffset}px`;
        attackButton.style.padding = '8px 16px';
        attackButton.style.backgroundColor = '#c0392b'; // Dark red for attack
        attackButton.style.color = 'white';
        attackButton.style.border = 'none';
        attackButton.style.borderRadius = '5px';
        attackButton.style.cursor = 'pointer';
        attackButton.style.zIndex = '1000';
        attackButton.style.fontFamily = 'sans-serif';
        attackButton.style.fontWeight = 'bold';
        
        attackButton.onclick = () => {
            console.log(`⚔️ Basic attack button clicked`);
            onAttack();
        };
        
        document.body.appendChild(attackButton);
        rightOffset += 80; // Space for next button
        
        // Skill buttons (if unit has skills and energy)
        unit.skills.forEach((skill, index) => {
            const canUseSkill = unit.currentEnergy >= skill.energyCost;
            
            const skillButton = document.createElement('button');
            skillButton.id = `skill-button-${index}`;
            skillButton.textContent = `${skill.emoji} ${skill.name}`;
            skillButton.style.position = 'absolute';
            skillButton.style.top = '10px';
            skillButton.style.right = `${rightOffset}px`;
            skillButton.style.padding = '8px 16px';
            skillButton.style.backgroundColor = canUseSkill ? '#8e44ad' : '#7f8c8d'; // Purple if usable, gray if not
            skillButton.style.color = 'white';
            skillButton.style.border = 'none';
            skillButton.style.borderRadius = '5px';
            skillButton.style.cursor = canUseSkill ? 'pointer' : 'not-allowed';
            skillButton.style.zIndex = '1000';
            skillButton.style.fontFamily = 'sans-serif';
            skillButton.style.fontWeight = 'bold';
            skillButton.style.opacity = canUseSkill ? '1' : '0.5';
            
            if (canUseSkill) {
                skillButton.onclick = () => {
                    console.log(`✨ Skill button clicked: ${skill.name}`);
                    onSkill(skill);
                };
            }
            
            // Add tooltip
            skillButton.title = `${skill.name} (${skill.energyCost} energy)\n${skill.description}`;
            
            document.body.appendChild(skillButton);
            rightOffset += skillButton.textContent.length * 8 + 32; // Dynamic spacing based on button width
        });
        
        console.log(`✅ Action options added to document body`);
    }

    public showActionSkipButton(onSkip: () => void): void {
        console.log(`⏭️ Creating action skip button...`);
        
        this.hideActionButtons(); // Clear any existing buttons
        
        const skipButton = document.createElement('button');
        skipButton.id = 'action-skip-button';
        skipButton.textContent = 'Skip Action';
        skipButton.style.position = 'absolute';
        skipButton.style.top = '10px';
        skipButton.style.right = '10px';
        skipButton.style.padding = '8px 16px';
        skipButton.style.backgroundColor = '#e67e22'; // Orange for action phase
        skipButton.style.color = 'white';
        skipButton.style.border = 'none';
        skipButton.style.borderRadius = '5px';
        skipButton.style.cursor = 'pointer';
        skipButton.style.zIndex = '1000';
        skipButton.style.fontFamily = 'sans-serif';
        skipButton.style.fontWeight = 'bold';
        
        skipButton.onclick = () => {
            console.log(`⏭️ Action skip button clicked`);
            onSkip();
        };
        
        document.body.appendChild(skipButton);
        console.log(`✅ Action skip button added to document body`);
    }

    public showAttackConfirmCancelButtons(onConfirm: () => void, onCancel: () => void): void {
        console.log(`🔴 showAttackConfirmCancelButtons called`);
        
        this.hideActionButtons(); // Clear any existing buttons
        console.log(`🧹 Cleared existing action buttons`);
        
        // Confirm button
        const confirmButton = document.createElement('button');
        confirmButton.id = 'attack-confirm-button';
        confirmButton.textContent = 'Attack';
        confirmButton.style.position = 'absolute';
        confirmButton.style.top = '10px';
        confirmButton.style.right = '10px';
        confirmButton.style.padding = '8px 16px';
        confirmButton.style.backgroundColor = '#c0392b'; // Dark red for attack
        confirmButton.style.color = 'white';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.zIndex = '1000';
        confirmButton.style.fontFamily = 'sans-serif';
        confirmButton.style.fontWeight = 'bold';
        confirmButton.onclick = () => onConfirm();
        
        // Cancel button
        const cancelButton = document.createElement('button');
        cancelButton.id = 'attack-cancel-button';
        cancelButton.textContent = 'Cancel';
        cancelButton.style.position = 'absolute';
        cancelButton.style.top = '10px';
        cancelButton.style.right = '80px'; // Next to confirm button
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.backgroundColor = '#95a5a6'; // Gray for cancel
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '5px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.zIndex = '1000';
        cancelButton.style.fontFamily = 'sans-serif';
        cancelButton.style.fontWeight = 'bold';
        cancelButton.onclick = () => onCancel();
        
        document.body.appendChild(confirmButton);
        document.body.appendChild(cancelButton);
        
        console.log(`✅ Added Attack and Cancel buttons to document body`);
    }

    public showSkillConfirmCancelButtons(skillName: string, onConfirm: () => void, onCancel: () => void): void {
        console.log(`✨ showSkillConfirmCancelButtons called for ${skillName}`);
        
        this.hideActionButtons(); // Clear any existing buttons
        console.log(`🧹 Cleared existing action buttons`);
        
        // Confirm button
        const confirmButton = document.createElement('button');
        confirmButton.id = 'skill-confirm-button';
        confirmButton.textContent = `Confirm ${skillName}`;
        confirmButton.style.position = 'absolute';
        confirmButton.style.top = '10px';
        confirmButton.style.right = '10px';
        confirmButton.style.padding = '8px 16px';
        confirmButton.style.backgroundColor = '#8e44ad'; // Purple for skills
        confirmButton.style.color = 'white';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.zIndex = '1000';
        confirmButton.style.fontFamily = 'sans-serif';
        confirmButton.style.fontWeight = 'bold';
        confirmButton.onclick = () => onConfirm();
        
        // Cancel button  
        const cancelButton = document.createElement('button');
        cancelButton.id = 'skill-cancel-button';
        cancelButton.textContent = 'Cancel';
        cancelButton.style.position = 'absolute';
        cancelButton.style.top = '10px';
        cancelButton.style.right = `${confirmButton.textContent.length * 8 + 32 + 10}px`; // Dynamic spacing based on confirm button width
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.backgroundColor = '#95a5a6'; // Gray for cancel
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '5px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.zIndex = '1000';
        cancelButton.style.fontFamily = 'sans-serif';
        cancelButton.style.fontWeight = 'bold';
        cancelButton.onclick = () => onCancel();
        
        document.body.appendChild(confirmButton);
        document.body.appendChild(cancelButton);
        
        console.log(`✅ Added ${skillName} Confirm and Cancel buttons to document body`);
    }

    public showDualRotationalSkillButtons(skillName: string, onConfirm: () => void, onCancel: () => void, onRotate: () => void): void {
        console.log(`🔄 showDualRotationalSkillButtons called for ${skillName}`);
        
        this.hideActionButtons(); // Clear any existing buttons
        console.log(`🧹 Cleared existing action buttons`);
        
        // Confirm button
        const confirmButton = document.createElement('button');
        confirmButton.id = 'skill-confirm-button';
        confirmButton.textContent = `Confirm ${skillName}`;
        confirmButton.style.position = 'absolute';
        confirmButton.style.top = '10px';
        confirmButton.style.right = '10px';
        confirmButton.style.padding = '8px 16px';
        confirmButton.style.backgroundColor = '#8e44ad'; // Purple for skills
        confirmButton.style.color = 'white';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '5px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.zIndex = '1000';
        confirmButton.style.fontFamily = 'sans-serif';
        confirmButton.style.fontWeight = 'bold';
        confirmButton.onclick = () => onConfirm();
        
        // Rotate button
        const rotateButton = document.createElement('button');
        rotateButton.id = 'skill-rotate-button';
        rotateButton.textContent = '🔄 Rotate';
        rotateButton.style.position = 'absolute';
        rotateButton.style.top = '10px';
        rotateButton.style.right = `${confirmButton.textContent.length * 8 + 32 + 10}px`;
        rotateButton.style.padding = '8px 16px';
        rotateButton.style.backgroundColor = '#3498db'; // Blue for rotate
        rotateButton.style.color = 'white';
        rotateButton.style.border = 'none';
        rotateButton.style.borderRadius = '5px';
        rotateButton.style.cursor = 'pointer';
        rotateButton.style.zIndex = '1000';
        rotateButton.style.fontFamily = 'sans-serif';
        rotateButton.style.fontWeight = 'bold';
        rotateButton.onclick = () => onRotate();
        
        // Cancel button  
        const cancelButton = document.createElement('button');
        cancelButton.id = 'skill-cancel-button';
        cancelButton.textContent = 'Cancel';
        cancelButton.style.position = 'absolute';
        cancelButton.style.top = '10px';
        cancelButton.style.right = `${(confirmButton.textContent.length + rotateButton.textContent.length) * 8 + 64 + 20}px`;
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.backgroundColor = '#95a5a6'; // Gray for cancel
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '5px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.zIndex = '1000';
        cancelButton.style.fontFamily = 'sans-serif';
        cancelButton.style.fontWeight = 'bold';
        cancelButton.onclick = () => onCancel();
        
        document.body.appendChild(confirmButton);
        document.body.appendChild(rotateButton);
        document.body.appendChild(cancelButton);
        
        console.log(`✅ Added ${skillName} Confirm, Rotate, and Cancel buttons to document body`);
    }

    public hideActionButtons(): void {
        const skipButton = document.getElementById('action-skip-button');
        const attackButton = document.getElementById('basic-attack-button');
        const confirmButton = document.getElementById('attack-confirm-button');
        const cancelButton = document.getElementById('attack-cancel-button');
        const skillConfirmButton = document.getElementById('skill-confirm-button');
        const skillCancelButton = document.getElementById('skill-cancel-button');
        const rotateButton = document.getElementById('skill-rotate-button');
        
        if (skipButton) skipButton.remove();
        if (attackButton) attackButton.remove();
        if (confirmButton) confirmButton.remove();
        if (cancelButton) cancelButton.remove();
        if (skillConfirmButton) skillConfirmButton.remove();
        if (skillCancelButton) skillCancelButton.remove();
        if (rotateButton) rotateButton.remove();
        
        // Remove all skill buttons
        for (let i = 0; i < 10; i++) { // Assume max 10 skills
            const skillButton = document.getElementById(`skill-button-${i}`);
            if (skillButton) skillButton.remove();
        }
    }

    public cleanup(): void {
        this.hideMovementButtons();
        this.hideActionButtons();
    }
} 