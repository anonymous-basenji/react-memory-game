import React from 'react';
import './GameStats.css';

// Shows current game stats
const GameStats = ({moves, matches, totalPairs, gameWon}) => {
    return(
        <div className="game-stats">
            <div className="game-stats_item">
                <span className="game-stats_label">Moves: </span>
                <span className="game-stats_value">{moves}</span>
            </div>

            <div className="game-stats_item">
                <span className="game-stats_label">Matches: </span>
                <span className="game-stats_value">{matches}/{totalPairs}</span>
            </div>

            {gameWon && (
                <div className="game-stats_victory">
                    Congratulations! You won in {moves} moves!
                </div>
            )}
        </div>
    );
};

export default GameStats;