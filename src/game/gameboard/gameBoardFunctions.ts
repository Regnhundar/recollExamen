import { Ability, Card, GameClass } from '@/interfaces';
import { fisherYatesShuffle } from '@/src/utility/general';

export const createCards = (array: Ability[]): Card[] => {
    const doubledCards = array.concat(array);
    const cards: Card[] = [];

    for (let i = 0; i < doubledCards.length; i++) {
        const newCard: Card = {
            id: cards.length + 1,
            name: doubledCards[i].id,
            icon: doubledCards[i].icon,
            isFlipped: false,
        };

        cards.push(newCard);
    }
    const shuffledCards = fisherYatesShuffle(cards);

    return shuffledCards;
};
export const matchCards = (
    flippedCards: Card[],
    player: GameClass
): { success: boolean; cards: Card[]; player: GameClass } => {
    const cardOne = flippedCards[flippedCards.length - 2].name;
    const cardTwo = flippedCards[flippedCards.length - 1].name;

    if (cardOne === cardTwo) {
        let updatedPlayer = { ...player };
        const updatedSkills = awardMana(updatedPlayer, cardTwo, flippedCards);
        const triggerAbility = triggerOnMatch(cardTwo, player);
        if (triggerAbility) {
            triggerAbility.abilityToTrigger?.execute();
        }
        updatedPlayer.abilities = updatedSkills;

        return { success: true, cards: flippedCards, player: updatedPlayer };
    } else {
        flippedCards = [];
        return { success: false, cards: flippedCards, player: player };
    }
};

export const awardMana = (player: GameClass, abilityID: string, flippedCards: Card[]): [Ability, Ability, Ability] => {
    const amountToReward = flippedCards.length / 2;
    const abilities: [Ability, Ability, Ability] = [...player.abilities];
    const abilityIndex = abilities.findIndex((ability) => ability.id === abilityID);

    const abilityToReward = { ...abilities[abilityIndex] };
    const newMana = Math.min(abilityToReward.mana + amountToReward, abilityToReward.cost);

    abilityToReward.mana = newMana;
    abilities[abilityIndex] = abilityToReward;

    return abilities;
};

const triggerOnMatch = (matchingCard: string, player: GameClass) => {
    const triggeringBuff = player.buffs.find(
        (buff) => buff.isTriggeringAbilityOnMatch && buff.abilityToTrigger?.id === matchingCard
    );
    if (triggeringBuff) {
        return triggeringBuff;
    }
    return null;
};
