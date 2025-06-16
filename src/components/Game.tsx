import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { CardStack } from './CardStack';
import { Card } from './Card';
import { useDeckStore } from '../store/deckStore';

export const Game = () => {
  const {
    hand,
    drawnCard,
    activeIndex,
    startGame,
    message,
    showReset,
    resetGame,
    handSize,
    setHandSize,
  } = useGameStore();
  const deck = useDeckStore(s => s.deck);

  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMsg(true);
      if (!showReset) {
        const timer = setTimeout(() => setShowMsg(false), 1900);
        return () => clearTimeout(timer);
      }
    } else {
      setShowMsg(false);
    }
  }, [message, showReset]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100 p-2 md:p-4 relative">
      {/* Hand Size Control */}
      <div className="absolute top-4 left-4 flex items-center gap-4 bg-white p-2 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Hand Size:</span>
          <div className="flex items-center gap-1">
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition"
              onClick={() => setHandSize(Math.max(3, handSize - 1))}
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{handSize}</span>
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition"
              onClick={() => setHandSize(Math.min(9, handSize + 1))}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm font-medium"
          onClick={resetGame}
        >
          New Game
        </button>
      </div>

      {/* Game Message Overlay */}
      {message && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div
            className={`px-4 md:px-8 py-3 md:py-6 rounded-2xl shadow-2xl bg-gray-900 bg-opacity-80 transition-all duration-500 ${
              showMsg ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-white text-center mb-4 md:mb-8">
              {message}
            </div>
            {showReset && (
              <div className="flex justify-center">
                <button
                  className="px-4 md:px-8 py-2 md:py-4 text-xl md:text-2xl font-bold bg-white rounded-lg shadow-lg hover:bg-gray-100 transition"
                  onClick={resetGame}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="flex flex-row items-center justify-center w-full gap-2 md:gap-8">
        {/* Deck Area */}
        <div className="relative">
          {/* Main deck stack */}
          <CardStack cards={deck} />

          {/* The card the user draws when pressing the button */}
          {drawnCard && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <Card {...drawnCard} />
            </div>
          )}
        </div>

        {/* Hand */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-[70vw]">
          {hand.map((stack, index) => (
            <div key={`stack-${index}`}>
              <CardStack cards={stack} active={index === activeIndex} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
