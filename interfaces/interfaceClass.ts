import { ImageSourcePropType } from 'react-native';
export interface Ability {
    id: string;
    icon: ImageSourcePropType;
    name: string;
    mana: number;
    cost: number;
    description: string;
    execute: () => void;
}

export interface GameClass {
    id: string;
    portrait: ImageSourcePropType;
    fullPicture: ImageSourcePropType;
    name: string;
    maxhp: number;
    hp: number;
    description: string;
    abilities: [Ability, Ability, Ability];
}
