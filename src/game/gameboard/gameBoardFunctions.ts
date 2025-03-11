import { Ability, Card } from '@/interfaces';
import { fisherYatesShuffle } from '@/src/utility/general';

export const createCards = (array: Ability[]): Card[] => {
    const doubledCards = array.concat(array);
    const cards: Card[] = [];

    for (let i = 0; i < doubledCards.length; i++) {
        const newCard: Card = {
            id: cards.length + 1,
            name: doubledCards[i].name,
            icon: doubledCards[i].icon,
            isFlipped: false,
        };
        cards.push(newCard);
    }
    const shuffledCards = fisherYatesShuffle(cards);

    return shuffledCards;
};
