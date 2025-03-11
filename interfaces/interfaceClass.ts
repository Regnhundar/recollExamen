export interface Ability {
    id: string;
    icon: string;
    name: string;
    mana: number;
    cost: number;
    description: string;
    execute: () => void;
}

export interface GameClass {
    id: string;
    portrait: string;
    name: string;
    maxhp: number;
    hp: number;
    description: string;
    abilities: [Ability, Ability, Ability];
}
