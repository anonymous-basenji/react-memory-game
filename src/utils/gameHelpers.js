import { GAME_SYMBOLS } from '../constants/gameConstants';

export const createShuffledDeck = () => {
    const cardPairs = [...GAME_SYMBOLS, ...GAME_SYMBOLS];

    const shuffled = [...cardPairs];
    for(let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
    }));
}

// Check if two cards have matching symbols

export const doCardsMatch = (card1, card2) => {
    return card1.symbol === card2.symbol;
}

// Checks if game should end due to collision or boundary hti
export const checkGameOver = (cards) => {
    return false;
}