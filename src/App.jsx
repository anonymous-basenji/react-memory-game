import React from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import GameStats from './components/GameStats/GameStats';
import { useGameLogic } from './hooks/useGameLogic';
import './App.css'

function App() {
  const {
    cards,
    moves,
    matchedPairs,
    totalPairs,
    gameWon,
    isClickable,
    flipCard,
    resetGame
  } = useGameLogic();

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">🧠 React Memory Game</h1>
        <p className="app-subtitle">
          Built with React
        </p>
      </header>

      <main className="app-main">
        <GameStats
          moves={moves}
          matches={matchedPairs}
          totalPairs={totalPairs}
          gameWon={gameWon}
        />

        <GameBoard 
          cards={cards}
          onCardClick={flipCard}
          isClickable={isClickable}
        />

        <button
          className="reset-button"
          onClick={resetGame}
          aria-label="Start a new game"
        >
          🔁 New Game
        </button>
      </main>

      <footer className="app-footer">
        <p>
          Powered by React
        </p>
      </footer>
    </div>
  );
}

export default App;
