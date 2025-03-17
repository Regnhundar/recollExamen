export interface Buff {
    id: string;
    duration: number;
    damageIncrease?: number;
    execute?: () => void;
}
export interface Debuff {
    id: string;
    duration: number;
    damageDecrease?: number;
    execute?: () => void;
}
