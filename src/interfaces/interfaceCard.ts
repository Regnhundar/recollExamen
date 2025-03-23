import { ImageSourcePropType } from 'react-native';
export interface Card {
    id: number;
    name: string;
    icon: ImageSourcePropType;
    isFlipped: boolean;
}
