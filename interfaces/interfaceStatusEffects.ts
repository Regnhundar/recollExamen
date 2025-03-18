import { Ability } from './interfaceClass';

export interface Buff {
    id: string;
    duration: number;
    damageIncrease?: number;
    execute?: () => void;
    isTriggeringAbilityOnMatch?: boolean;
    abilityToTrigger?: Ability;
}
export interface Debuff {
    id: string;
    duration: number;
    damageDecrease?: number;
    execute?: () => void;
    isTriggeringAbilityOnMatch?: boolean;
    abilityToTrigger?: Ability;
}
