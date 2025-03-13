import { GameClass, Ability } from '../../../../interfaces/index';
import zerkerPortrait from '../../../../assets/images/characters/zerker/zerker.png';
import zerkerFull from '../../../../assets/images/characters/zerker/zerker-full.png';
import zerkerMadSwing from '../../../../assets/images/abilities/zerker/mad-swing.png';
import zerkerIgnorePain from '../../../../assets/images/abilities/zerker/ignore-pain.png';
import zerkerEnrage from '../../../../assets/images/abilities/zerker/enrage.png';

const madSwing: Ability = {
    id: 'wildSwing',
    name: 'Wild swing',
    icon: zerkerMadSwing,
    mana: 0,
    cost: 5,
    description: 'Swing wildly dealing big damage. Sometimes hitting yourself instead!',
    execute: () => {
        console.log('Wild swing pressed!');
    },
};

const ignorePain: Ability = {
    id: 'ignorePain',
    name: 'Ignore pain',
    icon: zerkerIgnorePain,
    mana: 0,
    cost: 8,
    description: 'Focus your mind and ignore some incoming damage. This ability stacks',
    execute: () => {
        console.log('Ignore pain pressed!');
    },
};

const bloodyNine: Ability = {
    id: 'bloodyNine',
    name: 'Bloody nine!',
    icon: zerkerEnrage,
    mana: 0,
    cost: 12,
    description: 'Enrage and become posessed by a nine fingered demon! Deal double damage!',
    execute: () => {
        console.log('Bloody nine pressed!');
    },
};

export const zerkerClass: GameClass = {
    id: 'zerker',
    name: 'Zerker',
    portrait: zerkerPortrait,
    fullPicture: zerkerFull,
    maxhp: 120,
    hp: 120,
    description: 'Hard hitting lunatic that can take a punch. Sometimes from himself!',
    abilities: [madSwing, ignorePain, bloodyNine],
};
