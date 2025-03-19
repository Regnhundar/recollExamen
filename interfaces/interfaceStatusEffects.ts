import { ImageSourcePropType } from 'react-native';
import { Ability } from './interfaceClass';

export interface Buff {
    id: string;
    icon: ImageSourcePropType;
    duration: number;
    damageIncrease?: number;
    execute?: () => void;
    isTriggeringAbilityOnMatch?: boolean;
    abilityToTrigger?: Ability;
}
export interface Debuff {
    id: string;
    icon: ImageSourcePropType;
    duration: number;
    damageDecrease?: number;
    execute?: () => void;
    isTriggeringAbilityOnMatch?: boolean;
    abilityToTrigger?: Ability;
}
