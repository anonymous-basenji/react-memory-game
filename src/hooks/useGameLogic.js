import { useState, useCallback } from 'react';
import {
    createShuffledDeck,
    doCardsMatch
} from '../utils/gameHelpers';
import { TIMING, BOARD_SIZE } from '../constants/gameConstants';

export const useGameLogic = () => {
    const [cards, setCards] = useState(() => createShuffledDeck());
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const resetGame = useCallback(() => {
        const newDeck = createShuffledDeck();
        setCards(newDeck);
        setFlippedCards([]);
        setMatchedPairs(0);
        setMoves(0);
        setGameWon(false);
        setIsProcessing(false);
    }, []);

    const flipCard = useCallback((clickedCard) => {
        if(
            isProcessing ||
            gameWon ||
            clickedCard.isFlipped ||
            clickedCard.isMatched ||
            flippedCards.length === 2
        ) {
            return;
        }

        setCards(prevCards => 
            prevCards.map(card =>
                card.id === clickedCard.id
                ? {...card, isFlipped: true}
                : card
            )
        );

        const newFlippedCards = [...flippedCards, clickedCard];
        setFlippedCards(newFlippedCards);

        if(newFlippedCards.length === 2) {
            setMoves(prev => prev + 1);
            checkForMatch(newFlippedCards);
        }
    }, [flippedCards, isProcessing, gameWon]);

    const checkForMatch = useCallback((twoCards) => {
        const [firstCard, secondCard] = twoCards;
        setIsProcessing(true);

        if(doCardsMatch(firstCard, secondCard)) {
            setTimeout(() => {
                setCards(prevCards => 
                    prevCards.map(card => 
                        card.id === firstCard.id || card.id === secondCard.id
                        ? {...card, isMatched: true, isFlipped: false}
                        : card
                    )
                );
                const newMatchedPairs = matchedPairs + 1;
                setMatchedPairs(newMatchedPairs);
                setFlippedCards([]);
                setIsProcessing(false);

                if(newMatchedPairs === BOARD_SIZE.TOTAL_CARDS / 2) {
                    setGameWon(true);
                }
            }, TIMING.ANIMATION_DURATION);
        } else {
            setTimeout(() => {
                setCards(prevCards => 
                    prevCards.map(card =>
                        card.id === firstCard.id || card.id === secondCard.id
                        ? {...card, isFlipped: false}
                        : card
                    )
                );
                setFlippedCards([]);
                setIsProcessing(false);
            }, TIMING.CARD_FLIP_DELAY);
        }
    }, [matchedPairs]);

    return {
        cards,
        moves,
        matchedPairs,
        totalPairs: BOARD_SIZE.TOTAL_CARDS / 2,
        gameWon,
        isClickable: !isProcessing && !gameWon,

        flipCard,
        resetGame
    }
}