import { Unit } from './Unit';
import { PerkDefinition, getSkillTreeForUnit, getAvailablePerks, purchasePerk } from './SkillTreeDex';

export class SkillTreeScene {
    private container: HTMLElement | null = null;
    private currentUnit: Unit | null = null;
    private onClose: (() => void) | undefined = undefined;

    constructor() {
        this.createScene();
    }

    private createScene(): void {
        this.container = document.createElement('div');
        this.container.className = 'skill-tree-scene';
        this.container.style.display = 'none';
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100vw';
        this.container.style.height = '100vh';
        this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        this.container.style.zIndex = '1000';
        this.container.style.flexDirection = 'column';
        this.container.style.alignItems = 'center';
        this.container.style.padding = '40px 20px';
        this.container.style.overflow = 'auto';

        // Add to body
        document.body.appendChild(this.container);
    }

    public openSkillTree(unit: Unit, onCloseCallback?: () => void): void {
        this.currentUnit = unit;
        this.onClose = onCloseCallback || undefined;
        
        if (!this.container) return;
        
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create header
        this.createHeader(unit);
        
        // Create skill tree
        this.createSkillTree(unit);
        
        // Create back button
        this.createBackButton();
        
        // Show the scene
        this.container.style.display = 'flex';
        
        console.log(`Opened skill tree for ${unit.name} (${unit.className}) - ${unit.perkPoints} perk points available`);
    }

    private createHeader(unit: Unit): void {
        if (!this.container) return;
        
        const header = document.createElement('div');
        header.style.textAlign = 'center';
        header.style.marginBottom = '30px';
        header.style.color = 'white';
        
        const title = document.createElement('h2');
        title.textContent = `${unit.name} - ${unit.className} Skill Tree`;
        title.style.fontSize = '2rem';
        title.style.margin = '0 0 10px 0';
        title.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        
        const subtitle = document.createElement('p');
        subtitle.textContent = `Level ${unit.level} | ${unit.perkPoints} Perk Points Available`;
        subtitle.style.fontSize = '1.2rem';
        subtitle.style.margin = '0';
        subtitle.style.color = '#ffd700';
        
        header.appendChild(title);
        header.appendChild(subtitle);
        this.container.appendChild(header);
    }

    private createSkillTree(unit: Unit): void {
        if (!this.container) return;
        
        const skillTree = getSkillTreeForUnit(unit.className);
        if (!skillTree) {
            const noSkillTree = document.createElement('p');
            noSkillTree.textContent = 'No skill tree available for this unit type.';
            noSkillTree.style.color = 'white';
            noSkillTree.style.fontSize = '1.2rem';
            this.container.appendChild(noSkillTree);
            return;
        }
        
        // Create skill tree container
        const treeContainer = document.createElement('div');
        treeContainer.className = 'skill-tree-container';
        treeContainer.style.position = 'relative';
        treeContainer.style.display = 'flex';
        treeContainer.style.flexDirection = 'column';
        treeContainer.style.alignItems = 'center';
        treeContainer.style.gap = '60px';
        treeContainer.style.flex = '1';
        treeContainer.style.justifyContent = 'center';
        treeContainer.style.minHeight = '400px';
        
        // Group perks by rows
        const perksByRow = new Map<number, PerkDefinition[]>();
        skillTree.perks.forEach(perk => {
            if (!perksByRow.has(perk.row)) {
                perksByRow.set(perk.row, []);
            }
            perksByRow.get(perk.row)!.push(perk);
        });
        
        // Sort rows by row number (top to bottom)
        const sortedRows = Array.from(perksByRow.keys()).sort((a, b) => a - b);
        
        // Create rows from top to bottom
        sortedRows.forEach(rowNum => {
            const row = document.createElement('div');
            row.className = 'perk-row';
            row.style.display = 'flex';
            row.style.justifyContent = 'center';
            row.style.gap = '80px';
            row.style.position = 'relative';
            row.dataset.row = rowNum.toString();
            
            // Sort perks in row by column
            const perks = perksByRow.get(rowNum)!.sort((a, b) => a.column - b.column);
            
            perks.forEach(perk => {
                const perkNode = this.createPerkNode(perk, unit);
                row.appendChild(perkNode);
            });
            
            treeContainer.appendChild(row);
        });
        
        this.container.appendChild(treeContainer);
        
        // Add SVG connections after DOM is rendered
        setTimeout(() => {
            this.createConnections(treeContainer, skillTree.perks, unit);
        }, 10);
    }

    private createPerkNode(perk: PerkDefinition, unit: Unit): HTMLElement {
        const node = document.createElement('div');
        node.className = 'perk-node';
        node.dataset.perkId = perk.id;
        node.style.width = '80px';
        node.style.height = '80px';
        node.style.borderRadius = '50%';
        node.style.display = 'flex';
        node.style.flexDirection = 'column';
        node.style.alignItems = 'center';
        node.style.justifyContent = 'center';
        node.style.position = 'relative';
        node.style.transition = 'all 0.3s ease';
        node.style.border = '3px solid';
        node.style.fontSize = '1.5rem';
        
        const isPurchased = unit.purchasedPerks.includes(perk.id);
        const isAvailable = getAvailablePerks(unit).some(p => p.id === perk.id);
        const canAfford = unit.perkPoints > 0;
        
        // Set appearance based on state
        if (isPurchased) {
            node.style.backgroundColor = '#00ff88';
            node.style.borderColor = '#ffffff';
            node.style.color = '#000000';
            node.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.8)';
        } else if (isAvailable && canAfford) {
            node.style.backgroundColor = '#4a90e2';
            node.style.borderColor = '#00ff88';
            node.style.color = '#ffffff';
            node.style.cursor = 'pointer';
            node.style.boxShadow = '0 0 15px rgba(74, 144, 226, 0.5)';
        } else {
            node.style.backgroundColor = '#333333';
            node.style.borderColor = '#666666';
            node.style.color = '#888888';
            node.style.cursor = 'not-allowed';
        }
        
        // Icon
        const icon = document.createElement('div');
        icon.textContent = perk.icon;
        icon.style.fontSize = '2rem';
        icon.style.marginBottom = '2px';
        
        node.appendChild(icon);
        
        // Add click handler for available perks
        if (isAvailable && canAfford && !isPurchased) {
            node.addEventListener('click', () => {
                this.purchasePerk(perk.id);
            });
            
            node.addEventListener('mouseenter', () => {
                node.style.transform = 'scale(1.1)';
                node.style.boxShadow = '0 0 25px rgba(0, 255, 136, 0.8)';
            });
            
            node.addEventListener('mouseleave', () => {
                node.style.transform = 'scale(1)';
                node.style.boxShadow = '0 0 15px rgba(74, 144, 226, 0.5)';
            });
        }
        
        // Add tooltip
        this.addTooltip(node, perk, isPurchased, isAvailable, canAfford);
        
        return node;
    }

    private addTooltip(node: HTMLElement, perk: PerkDefinition, isPurchased: boolean, isAvailable: boolean, canAfford: boolean): void {
        let tooltip: HTMLElement | null = null;
        
        const showTooltip = (e: MouseEvent) => {
            tooltip = document.createElement('div');
            tooltip.className = 'perk-tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '12px';
            tooltip.style.borderRadius = '8px';
            tooltip.style.border = '2px solid #333';
            tooltip.style.maxWidth = '250px';
            tooltip.style.zIndex = '1001';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.fontSize = '0.9rem';
            tooltip.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            
            let status = '';
            if (isPurchased) {
                status = '✅ Purchased';
            } else if (isAvailable && canAfford) {
                status = '💰 Available (Click to purchase)';
            } else if (isAvailable && !canAfford) {
                status = '❌ No perk points available';
            } else {
                status = '🔒 Requirements not met';
            }
            
            tooltip.innerHTML = `
                <div style="color: #00ff88; font-weight: bold; margin-bottom: 5px;">${perk.name}</div>
                <div style="margin-bottom: 8px;">${perk.description}</div>
                <div style="color: #ffd700; font-size: 0.8rem;">${status}</div>
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = node.getBoundingClientRect();
            tooltip.style.left = `${rect.right + 10}px`;
            tooltip.style.top = `${rect.top}px`;
            
            // Adjust if tooltip goes off screen
            const tooltipRect = tooltip.getBoundingClientRect();
            if (tooltipRect.right > window.innerWidth) {
                tooltip.style.left = `${rect.left - tooltipRect.width - 10}px`;
            }
            if (tooltipRect.bottom > window.innerHeight) {
                tooltip.style.top = `${rect.bottom - tooltipRect.height}px`;
            }
        };
        
        const hideTooltip = () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        };
        
        node.addEventListener('mouseenter', showTooltip);
        node.addEventListener('mouseleave', hideTooltip);
    }

    private createConnections(container: HTMLElement, perks: PerkDefinition[], unit: Unit): void {
        // Remove existing SVG
        const existingSvg = container.querySelector('.skill-tree-svg');
        if (existingSvg) {
            existingSvg.remove();
        }
        
        // Create SVG container
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'skill-tree-svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '1';
        
        const containerRect = container.getBoundingClientRect();
        
        // Create connections between perks
        perks.forEach(perk => {
            perk.unlockRequirements.forEach(reqId => {
                const perkNode = container.querySelector(`[data-perk-id="${perk.id}"]`) as HTMLElement;
                const reqNode = container.querySelector(`[data-perk-id="${reqId}"]`) as HTMLElement;
                
                if (perkNode && reqNode) {
                    const perkRect = perkNode.getBoundingClientRect();
                    const reqRect = reqNode.getBoundingClientRect();
                    
                    // Calculate connection points
                    const startX = reqRect.left - containerRect.left + reqRect.width / 2;
                    const startY = reqRect.top - containerRect.top + reqRect.height / 2;
                    const endX = perkRect.left - containerRect.left + perkRect.width / 2;
                    const endY = perkRect.top - containerRect.top + perkRect.height / 2;
                    
                    // Create path
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const pathData = `M ${startX} ${startY} L ${endX} ${endY}`;
                    path.setAttribute('d', pathData);
                    path.setAttribute('stroke-width', '3');
                    path.setAttribute('fill', 'none');
                    
                    // Set color based on unlock status
                    const isPerkPurchased = unit.purchasedPerks.includes(perk.id);
                    const isReqPurchased = unit.purchasedPerks.includes(reqId);
                    
                    if (isPerkPurchased && isReqPurchased) {
                        path.setAttribute('stroke', '#00ff88');
                    } else if (isReqPurchased) {
                        path.setAttribute('stroke', '#4a90e2');
                        path.setAttribute('stroke-dasharray', '5,5');
                    } else {
                        path.setAttribute('stroke', '#666666');
                        path.setAttribute('stroke-dasharray', '5,5');
                    }
                    
                    svg.appendChild(path);
                }
            });
        });
        
        container.appendChild(svg);
    }

    private purchasePerk(perkId: string): void {
        if (!this.currentUnit) return;
        
        const success = purchasePerk(this.currentUnit, perkId);
        if (success) {
            console.log(`Successfully purchased perk: ${perkId}`);
            
            // Check if unit has no more perk points
            if (this.currentUnit.perkPoints === 0) {
                // Auto-close the skill tree
                setTimeout(() => {
                    this.closeSkillTree();
                }, 1000); // Give user time to see the change
            } else {
                // Refresh the skill tree to show updated state
                this.openSkillTree(this.currentUnit, this.onClose);
            }
        } else {
            console.error(`Failed to purchase perk: ${perkId}`);
        }
    }

    private createBackButton(): void {
        if (!this.container) return;
        
        const backButton = document.createElement('button');
        backButton.textContent = 'BACK';
        backButton.style.position = 'absolute';
        backButton.style.bottom = '20px';
        backButton.style.right = '20px';
        backButton.style.padding = '15px 25px';
        backButton.style.fontSize = '1.1rem';
        backButton.style.fontWeight = 'bold';
        backButton.style.backgroundColor = '#ff6b6b';
        backButton.style.color = 'white';
        backButton.style.border = 'none';
        backButton.style.borderRadius = '10px';
        backButton.style.cursor = 'pointer';
        backButton.style.transition = 'all 0.3s ease';
        
        backButton.addEventListener('mouseenter', () => {
            backButton.style.backgroundColor = '#ff5252';
            backButton.style.transform = 'translateY(-2px)';
        });
        
        backButton.addEventListener('mouseleave', () => {
            backButton.style.backgroundColor = '#ff6b6b';
            backButton.style.transform = 'translateY(0)';
        });
        
        backButton.addEventListener('click', () => {
            this.closeSkillTree();
        });
        
        this.container.appendChild(backButton);
    }

    public closeSkillTree(): void {
        if (this.container) {
            this.container.style.display = 'none';
        }
        
        // Call the close callback if provided
        if (this.onClose) {
            this.onClose();
        }
        
        console.log('Skill tree closed');
    }

    public destroy(): void {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
        this.currentUnit = null;
        this.onClose = undefined;
    }
}

// Global instance
export const skillTreeScene = new SkillTreeScene(); 