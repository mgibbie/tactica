import { GAME_TURN_MANAGER } from '../app/NavigationHandlers';
import { Unit } from '../units/Unit';
import { Skill } from '../units/Skill';
import { isGameEnded } from '../game';

export class UIManager {
    
    public showSkipButton(onSkip: () => void): void {
        if (isGameEnded()) {
            console.log('🚫 Blocked skip button creation - game has ended');
            return;
        }
        
        console.log(`⏭️ Creating skip button...`);
        
        this.hideMovementButtons(); // Clear any existing buttons
        
        const skipButton = document.createElement('button');
        skipButton.id = 'move-skip-button';
        skipButton.textContent = 'Skip Move';
        skipButton.style.position = 'absolute';
        skipButton.style.bottom = '10px';
        skipButton.style.left = '50%';
        skipButton.style.transform = 'translateX(-50%)';
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
        if (isGameEnded()) {
            console.log('🚫 Blocked confirm/cancel button creation - game has ended');
            return;
        }
        
        this.hideMovementButtons(); // Clear any existing buttons
        
        // Confirm button
        const confirmButton = document.createElement('button');
        confirmButton.id = 'move-confirm-button';
        confirmButton.textContent = 'Confirm';
        confirmButton.style.position = 'absolute';
        confirmButton.style.bottom = '10px';
        confirmButton.style.left = '50%';
        confirmButton.style.transform = 'translateX(-75px)';
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
        cancelButton.style.bottom = '10px';
        cancelButton.style.left = '50%';
        cancelButton.style.transform = 'translateX(35px)';
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
        if (isGameEnded()) {
            console.log('🚫 Blocked action options creation - game has ended');
            return;
        }
        
        console.log(`⚔️ Creating action options for ${unit.name}...`);
        
        this.hideActionButtons(); // Clear any existing buttons
        
        let buttonIndex = 0;
        const buttons: HTMLButtonElement[] = [];
        
        // Skip button (always available)
        const skipButton = document.createElement('button');
        skipButton.id = 'action-skip-button';
        skipButton.textContent = 'Skip Action';
        skipButton.style.position = 'absolute';
        skipButton.style.bottom = '10px';
        skipButton.style.left = '50%';
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
        
        buttons.push(skipButton);
        
        // Basic attack button (always available)
        const attackButton = document.createElement('button');
        attackButton.id = 'basic-attack-button';
        attackButton.textContent = 'Attack';
        attackButton.style.position = 'absolute';
        attackButton.style.bottom = '10px';
        attackButton.style.left = '50%';
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
        
        buttons.push(attackButton);
        
        // Skill buttons - handle based on number of skills
        if (unit.skills.length <= 3) {
            // Show individual skill buttons for 3 or fewer skills
            unit.skills.forEach((skill, index) => {
                const canUseSkill = unit.currentEnergy >= skill.energyCost;
                
                const skillButton = document.createElement('button');
                skillButton.id = `skill-button-${index}`;
                skillButton.textContent = `${skill.emoji} ${skill.name}`;
                skillButton.style.position = 'absolute';
                skillButton.style.bottom = '10px';
                skillButton.style.left = '50%';
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
                
                buttons.push(skillButton);
            });
        } else if (unit.skills.length >= 4) {
            // Show dropdown for 4+ skills
            const skillsDropdownButton = this.createSkillsDropdown(unit, onSkill);
            buttons.push(skillsDropdownButton);
        }
        
        // Now position all buttons centered as a group
        const buttonGap = 10; // Gap between buttons
        const totalWidth = buttons.reduce((total, button, index) => {
            const buttonWidth = button.textContent!.length * 8 + 32; // Approximate width
            return total + buttonWidth + (index > 0 ? buttonGap : 0);
        }, 0);
        
        let currentOffset = -totalWidth / 2; // Start from left side of center
        buttons.forEach((button, index) => {
            const buttonWidth = button.textContent!.length * 8 + 32;
            button.style.transform = `translateX(${currentOffset + buttonWidth / 2}px)`;
            document.body.appendChild(button);
            currentOffset += buttonWidth + buttonGap;
        });
        
        console.log(`✅ Action options added to document body (${buttons.length} buttons centered)`);
    }

    public showActionSkipButton(onSkip: () => void): void {
        if (isGameEnded()) {
            console.log('🚫 Blocked action skip button creation - game has ended');
            return;
        }
        
        console.log(`⏭️ Creating action skip button...`);
        
        this.hideActionButtons(); // Clear any existing buttons
        
        const skipButton = document.createElement('button');
        skipButton.id = 'action-skip-button';
        skipButton.textContent = 'Skip Action';
        skipButton.style.position = 'absolute';
        skipButton.style.bottom = '10px';
        skipButton.style.left = '50%';
        skipButton.style.transform = 'translateX(-50%)';
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
        if (isGameEnded()) {
            console.log('🚫 Blocked attack confirm/cancel button creation - game has ended');
            return;
        }
        
        console.log(`🔴 showAttackConfirmCancelButtons called`);
        
        this.hideActionButtons(); // Clear any existing buttons
        console.log(`🧹 Cleared existing action buttons`);
        
        // Confirm button
        const confirmButton = document.createElement('button');
        confirmButton.id = 'attack-confirm-button';
        confirmButton.textContent = 'Attack';
        confirmButton.style.position = 'absolute';
        confirmButton.style.bottom = '10px';
        confirmButton.style.left = '50%';
        confirmButton.style.transform = 'translateX(-75px)';
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
        cancelButton.style.bottom = '10px';
        cancelButton.style.left = '50%';
        cancelButton.style.transform = 'translateX(35px)';
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
        if (isGameEnded()) {
            console.log('🚫 Blocked skill confirm/cancel button creation - game has ended');
            return;
        }
        
        console.log(`✨ showSkillConfirmCancelButtons called for ${skillName}`);
        
        this.hideActionButtons(); // Clear any existing buttons
        console.log(`🧹 Cleared existing action buttons`);
        
        // Confirm button
        const confirmButton = document.createElement('button');
        confirmButton.id = 'skill-confirm-button';
        confirmButton.textContent = `Confirm ${skillName}`;
        confirmButton.style.position = 'absolute';
        confirmButton.style.bottom = '10px';
        confirmButton.style.left = '50%';
        confirmButton.style.transform = 'translateX(-90px)';
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
        cancelButton.style.bottom = '10px';
        cancelButton.style.left = '50%';
        cancelButton.style.transform = 'translateX(35px)';
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
        if (isGameEnded()) {
            console.log('🚫 Blocked dual rotational skill button creation - game has ended');
            return;
        }
        
        console.log(`🔄 showDualRotationalSkillButtons called for ${skillName}`);
        
        this.hideActionButtons(); // Clear any existing buttons
        console.log(`🧹 Cleared existing action buttons`);
        
        // Confirm button
        const confirmButton = document.createElement('button');
        confirmButton.id = 'skill-confirm-button';
        confirmButton.textContent = `Confirm ${skillName}`;
        confirmButton.style.position = 'absolute';
        confirmButton.style.bottom = '10px';
        confirmButton.style.left = '50%';
        confirmButton.style.transform = 'translateX(-120px)';
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
        rotateButton.style.bottom = '10px';
        rotateButton.style.left = '50%';
        rotateButton.style.transform = 'translateX(-35px)';
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
        cancelButton.style.bottom = '10px';
        cancelButton.style.left = '50%';
        cancelButton.style.transform = 'translateX(50px)';
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
        
        // Remove skills dropdown if it exists
        const skillsDropdownButton = document.getElementById('skills-dropdown-button');
        const skillsDropdownMenu = document.getElementById('skills-dropdown-menu');
        if (skillsDropdownButton) skillsDropdownButton.remove();
        if (skillsDropdownMenu) skillsDropdownMenu.remove();
    }

    private createSkillsDropdown(unit: Unit, onSkill: (skill: Skill) => void): HTMLButtonElement {
        // Create main dropdown button
        const dropdownButton = document.createElement('button');
        dropdownButton.id = 'skills-dropdown-button';
        dropdownButton.textContent = '✨ Skills ▼';
        dropdownButton.style.position = 'absolute';
        dropdownButton.style.bottom = '10px';
        dropdownButton.style.left = '50%';
        dropdownButton.style.padding = '8px 16px';
        dropdownButton.style.backgroundColor = '#8e44ad'; // Purple for skills
        dropdownButton.style.color = 'white';
        dropdownButton.style.border = 'none';
        dropdownButton.style.borderRadius = '5px';
        dropdownButton.style.cursor = 'pointer';
        dropdownButton.style.zIndex = '1000';
        dropdownButton.style.fontFamily = 'sans-serif';
        dropdownButton.style.fontWeight = 'bold';
        
        // Create dropdown menu container (initially hidden)
        const dropdownMenu = document.createElement('div');
        dropdownMenu.id = 'skills-dropdown-menu';
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.bottom = '50px'; // Above the button
        dropdownMenu.style.left = '50%';
        dropdownMenu.style.transform = 'translateX(-50%)';
        dropdownMenu.style.backgroundColor = '#2c3e50';
        dropdownMenu.style.border = '2px solid #8e44ad';
        dropdownMenu.style.borderRadius = '8px';
        dropdownMenu.style.display = 'none';
        dropdownMenu.style.zIndex = '1001';
        dropdownMenu.style.minWidth = '250px';
        dropdownMenu.style.maxWidth = '300px';
        dropdownMenu.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        
        // Create scrollable skills container
        const skillsContainer = document.createElement('div');
        skillsContainer.style.maxHeight = '300px'; // Limit to ~10 skills (30px each)
        skillsContainer.style.overflowY = 'auto';
        skillsContainer.style.padding = '5px';
        
        // Custom scrollbar styling
        skillsContainer.style.setProperty('scrollbar-width', 'thin');
        skillsContainer.style.setProperty('scrollbar-color', '#8e44ad #34495e');
        
        // Add skills to scrollable container
        unit.skills.forEach((skill, index) => {
            const canUseSkill = unit.currentEnergy >= skill.energyCost;
            
            const skillOption = document.createElement('div');
            skillOption.style.padding = '8px 12px';
            skillOption.style.margin = '2px 0';
            skillOption.style.backgroundColor = canUseSkill ? '#34495e' : '#95a5a6';
            skillOption.style.color = canUseSkill ? 'white' : '#7f8c8d';
            skillOption.style.borderRadius = '4px';
            skillOption.style.cursor = canUseSkill ? 'pointer' : 'not-allowed';
            skillOption.style.fontFamily = 'sans-serif';
            skillOption.style.fontSize = '14px';
            skillOption.style.opacity = canUseSkill ? '1' : '0.6';
            skillOption.style.transition = 'background-color 0.2s';
            skillOption.style.position = 'relative';
            skillOption.textContent = `${skill.emoji} ${skill.name} (${skill.energyCost} ⚡)`;
            
            // Add hover effects and tooltip
            if (canUseSkill) {
                skillOption.onmouseenter = (e) => {
                    skillOption.style.backgroundColor = '#8e44ad';
                    this.showSkillTooltip(e, skill);
                };
                skillOption.onmouseleave = () => {
                    skillOption.style.backgroundColor = '#34495e';
                    this.hideSkillTooltip();
                };
                skillOption.onmousemove = (e) => {
                    this.positionSkillTooltip(e);
                };
                
                skillOption.onclick = () => {
                    console.log(`✨ Dropdown skill clicked: ${skill.name}`);
                    this.hideSkillsDropdown();
                    this.hideSkillTooltip();
                    onSkill(skill);
                };
            } else {
                skillOption.onmouseenter = (e) => {
                    this.showSkillTooltip(e, skill);
                };
                skillOption.onmouseleave = () => {
                    this.hideSkillTooltip();
                };
                skillOption.onmousemove = (e) => {
                    this.positionSkillTooltip(e);
                };
            }
            
            skillsContainer.appendChild(skillOption);
        });
        
        dropdownMenu.appendChild(skillsContainer);
        
        // Toggle dropdown on button click
        let isOpen = false;
        dropdownButton.onclick = () => {
            isOpen = !isOpen;
            if (isOpen) {
                dropdownMenu.style.display = 'block';
                dropdownButton.textContent = '✨ Skills ▲';
            } else {
                dropdownMenu.style.display = 'none';
                dropdownButton.textContent = '✨ Skills ▼';
                this.hideSkillTooltip();
            }
        };
        
        // Store reference to menu for cleanup
        (dropdownButton as any).dropdownMenu = dropdownMenu;
        
        // Add menu to document body
        document.body.appendChild(dropdownMenu);
        
        return dropdownButton;
    }
    
    private hideSkillsDropdown(): void {
        const dropdownMenu = document.getElementById('skills-dropdown-menu');
        const dropdownButton = document.getElementById('skills-dropdown-button');
        if (dropdownMenu) {
            dropdownMenu.style.display = 'none';
        }
        if (dropdownButton) {
            dropdownButton.textContent = '✨ Skills ▼';
        }
    }
    
    private showSkillTooltip(event: MouseEvent, skill: Skill): void {
        let tooltip = document.getElementById('skill-tooltip');
        if (!tooltip) {
            tooltip = this.createSkillTooltip();
        }
        
        this.updateSkillTooltipContent(tooltip, skill);
        tooltip.style.display = 'block';
        this.positionSkillTooltip(event);
    }
    
    private hideSkillTooltip(): void {
        const tooltip = document.getElementById('skill-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
    
    private positionSkillTooltip(event: MouseEvent): void {
        const tooltip = document.getElementById('skill-tooltip');
        if (!tooltip) return;
        
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = mouseX + 15;
        let top = mouseY - 10;
        
        // Adjust if tooltip goes off right edge
        if (left + tooltipRect.width > windowWidth) {
            left = mouseX - tooltipRect.width - 15;
        }
        
        // Adjust if tooltip goes off bottom edge
        if (top + tooltipRect.height > windowHeight) {
            top = mouseY - tooltipRect.height - 10;
        }
        
        // Ensure tooltip doesn't go off left or top edges
        left = Math.max(5, left);
        top = Math.max(5, top);
        
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }
    
    private createSkillTooltip(): HTMLElement {
        const tooltip = document.createElement('div');
        tooltip.id = 'skill-tooltip';
        tooltip.style.position = 'fixed';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '10px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.border = '1px solid #8e44ad';
        tooltip.style.display = 'none';
        tooltip.style.zIndex = '1002';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.fontSize = '0.9em';
        tooltip.style.maxWidth = '300px';
        tooltip.style.fontFamily = 'sans-serif';
        tooltip.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        document.body.appendChild(tooltip);
        return tooltip;
    }
    
    private updateSkillTooltipContent(tooltip: HTMLElement, skill: Skill): void {
        tooltip.innerHTML = `
            <div style="text-align: center; margin-bottom: 8px;">
                <h4 style="margin: 0; color: #8e44ad; font-size: 1.1em;">${skill.emoji} ${skill.name}</h4>
            </div>
            <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #555;">
                <p style="margin: 3px 0; font-size: 0.9em; color: #3498db;">
                    <strong>Energy Cost:</strong> ${skill.energyCost} ⚡
                </p>
                <p style="margin: 3px 0; font-size: 0.9em; color: #e74c3c;">
                    <strong>Damage Bonus:</strong> +${skill.bonusDamage}
                </p>
                <p style="margin: 3px 0; font-size: 0.9em; color: #f39c12;">
                    <strong>Targeting:</strong> ${skill.targetingType.replace(/-/g, ' ')}
                </p>
            </div>
            <div style="font-size: 0.85em; line-height: 1.4; color: #ecf0f1;">
                ${skill.description}
            </div>
        `;
    }

    public cleanup(): void {
        this.hideMovementButtons();
        this.hideActionButtons();
        this.hideSkillsDropdown();
        this.hideSkillTooltip();
        
        // Clean up dropdown menu if it exists
        const dropdownMenu = document.getElementById('skills-dropdown-menu');
        if (dropdownMenu) dropdownMenu.remove();
        
        // Clean up skill tooltip if it exists
        const skillTooltip = document.getElementById('skill-tooltip');
        if (skillTooltip) skillTooltip.remove();
    }
} 