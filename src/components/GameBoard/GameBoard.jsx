import React from 'react';
import Card from '../Card/Card';
import './GameBoard.css'

const GameBoard = ({cards, onCardClick, isClickable}) => {
    return(
        <div className="game-board">
            {cards.map(card => (
                <Card
                    key={card.id}
                    card={card}
                    onCardClick={onCardClick}
                    isClickable={isClickable}
                />
            ))}
        </div>
    );
}

export default GameBoard;