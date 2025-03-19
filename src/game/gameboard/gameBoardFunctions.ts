import { Ability, Card, GameClass } from '@/interfaces';
import { fisherYatesShuffle } from '@/src/utility/general';

//* description: Skapar kortlek bestående av spelarens valda klass. Abilities dupliceras och sätts i en array som blandas och returneras.
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

//* description: Hanterar logik vid kortmatchning. Uppdaterar mana för abilities via awardMana och ifall något ska triggas vid kortmatchning görs det via triggerOnMatch.
export const matchCards = (
    flippedCards: Card[],
    player: GameClass
): { success: boolean; cards: Card[]; player: GameClass } => {
    // Då manan man får är baserad på antal kort man flippat på sin turn jämförs de två sista korten i arrayen.
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

// *description: Hanterar mana vid kortmatchning. Ju fler kort du matchat på din turn ju mer mana får du vid en matchning.
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

// *description: Söker efter en buff på aktiv spelare som ska triggas av matchat kort.
const triggerOnMatch = (matchingCard: string, player: GameClass) => {
    const triggeringBuff = player.buffs.find(
        (buff) => buff.isTriggeringAbilityOnMatch && buff.abilityToTrigger?.id === matchingCard
    );
    if (triggeringBuff) {
        return triggeringBuff;
    }
    return null;
};
