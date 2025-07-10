import { Unit } from '../units/Unit';
import { ModifierService } from './ModifierService';

export class ModifierRenderer {
    private modifierIndicators: Map<string, HTMLElement[]> = new Map();

    /**
     * Create or update modifier indicators for a unit
     */
    public updateModifierIndicators(unit: Unit, unitElement: HTMLElement): void {
        // Remove existing indicators
        this.removeModifierIndicators(unit.id);

        if (!unit.activeModifiers || unit.activeModifiers.length === 0) {
            return;
        }

        const indicators: HTMLElement[] = [];
        
        unit.activeModifiers.forEach((modifier, index) => {
            const indicator = this.createModifierIndicator(modifier.modifierKey, modifier.stacks);
            
            // Position indicators in a small grid above the unit
            const offsetX = (index % 3) * 25; // 3 indicators per row, 25px apart
            const offsetY = Math.floor(index / 3) * 15; // 15px between rows
            
            indicator.style.left = `${offsetX}px`;
            indicator.style.top = `${-30 - offsetY}px`; // Above the unit

            unitElement.appendChild(indicator);
            indicators.push(indicator);
        });

        this.modifierIndicators.set(unit.id, indicators);
    }

    /**
     * Create a single modifier indicator element
     */
    private createModifierIndicator(modifierKey: string, stacks: number): HTMLElement {
        const indicator = document.createElement('div');
        const abbreviation = ModifierService.getModifierAbbreviation(modifierKey);
        const color = ModifierService.getModifierColor(modifierKey);
        
        indicator.textContent = `${abbreviation}x${stacks}`;
        indicator.className = 'modifier-indicator';
        
        // Style the indicator
        Object.assign(indicator.style, {
            position: 'absolute',
            backgroundColor: color,
            color: 'white',
            fontSize: '10px',
            fontWeight: 'bold',
            padding: '1px 4px',
            borderRadius: '3px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: '1000',
            textShadow: '0 0 2px rgba(0,0,0,0.8)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.2)',
            minWidth: '20px',
            textAlign: 'center'
        });

        return indicator;
    }

    /**
     * Remove all modifier indicators for a unit
     */
    public removeModifierIndicators(unitId: string): void {
        const indicators = this.modifierIndicators.get(unitId);
        if (indicators) {
            indicators.forEach(indicator => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            });
            this.modifierIndicators.delete(unitId);
        }
    }

    /**
     * Remove all modifier indicators
     */
    public clearAllIndicators(): void {
        for (const [unitId, indicators] of this.modifierIndicators.entries()) {
            indicators.forEach(indicator => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            });
        }
        this.modifierIndicators.clear();
    }

    /**
     * Update indicators for all units in a list
     */
    public updateAllUnitIndicators(units: Unit[], getUnitElement: (unit: Unit) => HTMLElement | null): void {
        units.forEach(unit => {
            const unitElement = getUnitElement(unit);
            if (unitElement) {
                this.updateModifierIndicators(unit, unitElement);
            }
        });
    }
} 