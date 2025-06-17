import React from 'react';
import './Card.css';

const Card = ({card, onCardClick, isClickable}) => {
    const handleClick = () => {
        if(isClickable && !card.isFlipped && !card.isMatched) {
            onCardClick(card);
        }
    };

    const cardClasses = [
        'card',
        card.isFlipped ? 'card-flipped' : '',
        card.isMatched ? 'card-matched' : '',
        !isClickable ? 'card-disabled' : '',
    ]

    return(
        <div
            className={cardClasses}
            onClick={handleClick}
            role="button"
            aria-label={`Card ${card.isFlipped || card.isMatched ? card.symbol : 'hidden'}`}
            tabIndex={isClickable ? 0 : -1}
        >
            <div className="card_content">
                {card.isFlipped || card.isMatched ? card.symbol : '❓'}
            </div>
        </div>
    )
};

export default Card;