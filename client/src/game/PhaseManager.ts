import { logDebugInfo, debugAlert } from './DebugMode';
import { TurnPhase } from './TurnManager';

export class PhaseManager {
    private currentPhase: TurnPhase;
    private phaseSkipped: { move: boolean; action: boolean };

    constructor() {
        this.currentPhase = TurnPhase.SELECT;
        this.phaseSkipped = { move: false, action: false };
    }

    /**
     * Gets the current turn phase
     */
    public getCurrentPhase(): TurnPhase {
        return this.currentPhase;
    }

    /**
     * Gets the phase skip status
     */
    public getPhaseSkipped(): { move: boolean; action: boolean } {
        return { ...this.phaseSkipped };
    }

    /**
     * Advances to the next phase in the sequence
     */
    public advancePhase(): TurnPhase {
        const previousPhase = this.currentPhase;
        
        switch (this.currentPhase) {
            case TurnPhase.SELECT:
                this.currentPhase = TurnPhase.MOVE;
                this.phaseSkipped.move = false;
                break;
            case TurnPhase.MOVE:
                this.currentPhase = TurnPhase.ACTION;
                this.phaseSkipped.action = false;
                break;
            case TurnPhase.ACTION:
                // Phase advancement is handled by endTurn, not here
                break;
        }
        
        console.log(`➡️ Phase: ${this.getPhaseDisplayName(previousPhase)} → ${this.getPhaseDisplayName(this.currentPhase)}`);
        
        logDebugInfo('Phase advanced', {
            previousPhase,
            currentPhase: this.currentPhase,
            phaseSkipped: this.phaseSkipped
        });

        return this.currentPhase;
    }

    /**
     * Skips the current phase
     */
    public skipPhase(): TurnPhase {
        const previousPhase = this.currentPhase;
        
        switch (this.currentPhase) {
            case TurnPhase.SELECT:
                console.warn('❌ Cannot skip SELECT phase');
                return this.currentPhase;
            case TurnPhase.MOVE:
                this.phaseSkipped.move = true;
                this.currentPhase = TurnPhase.ACTION;
                console.log('⏭️ MOVE phase skipped');
                break;
            case TurnPhase.ACTION:
                this.phaseSkipped.action = true;
                console.log('⏭️ ACTION phase skipped');
                // Don't change phase here - endTurn will handle the transition
                break;
        }
        
        logDebugInfo('Phase skipped', {
            previousPhase,
            currentPhase: this.currentPhase,
            phaseSkipped: this.phaseSkipped
        });

        return this.currentPhase;
    }

    /**
     * Resets to SELECT phase for a new turn
     */
    public resetToSelect(): void {
        this.currentPhase = TurnPhase.SELECT;
        this.phaseSkipped = { move: false, action: false };
        
        logDebugInfo('Phase reset to SELECT', {
            currentPhase: this.currentPhase,
            phaseSkipped: this.phaseSkipped
        });
    }

    /**
     * Validation methods for phase capabilities
     */
    public canMove(): boolean {
        return this.currentPhase === TurnPhase.MOVE;
    }

    public canAct(): boolean {
        return this.currentPhase === TurnPhase.ACTION;
    }

    public canSelect(): boolean {
        return this.currentPhase === TurnPhase.SELECT;
    }

    /**
     * Gets a human-readable display name for a phase
     */
    public getPhaseDisplayName(phase: TurnPhase): string {
        const phaseNames = {
            [TurnPhase.SELECT]: 'Unit Selection',
            [TurnPhase.MOVE]: 'Movement',
            [TurnPhase.ACTION]: 'Action'
        };
        
        return phaseNames[phase] || 'Unknown';
    }

    /**
     * Force set the current phase (for debugging or special scenarios)
     */
    public forceSetPhase(phase: TurnPhase): void {
        debugAlert(`Forcing phase change from ${this.currentPhase} to ${phase}`);
        const previousPhase = this.currentPhase;
        this.currentPhase = phase;
        
        console.log(`🔧 Phase forced: ${this.getPhaseDisplayName(previousPhase)} → ${this.getPhaseDisplayName(this.currentPhase)}`);
        
        logDebugInfo('Phase forced', {
            previousPhase,
            currentPhase: this.currentPhase
        });
    }

    /**
     * Reset the phase manager
     */
    public reset(): void {
        this.currentPhase = TurnPhase.SELECT;
        this.phaseSkipped = { move: false, action: false };
    }
} 