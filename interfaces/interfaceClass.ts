import { ImageSourcePropType } from 'react-native';
import { Buff, Debuff } from './interfaceStatusEffects';
export interface Ability {
    id: string;
    icon: ImageSourcePropType;
    name: string;
    mana: number;
    cost: number;
    baseDamage: number;
    description: string;
    execute: () => void;
}

export interface GameClass {
    id: string;
    portrait: ImageSourcePropType;
    fullPicture: ImageSourcePropType;
    classColor: string;
    name: string;
    maxhp: number;
    hp: number;
    buffs: Buff[];
    debuffs: Debuff[];
    description: string;
    abilities: [Ability, Ability, Ability];
}
