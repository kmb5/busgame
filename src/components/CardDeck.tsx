import { useEffect, useState } from 'react';
import { Card } from './Card';
import { useGameStore } from '../store/gameStore';
import { ActionButtons } from './ActionButtons';
import { CardStack } from './CardStack';
import { useDeckStore } from '../store/deckStore';

export const CardDeck = () => {
  const { hand, drawnCard, activeIndex, startGame, message, showReset, resetGame } = useGameStore();

  const [showMsg, setShowMsg] = useState(false);
  const deck = useDeckStore(s => s.deck);

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
    <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      {/* Game Message Overlay */}
      {message && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div
            className={`px-8 py-6 rounded-2xl shadow-2xl bg-gray-900 bg-opacity-80 transition-all duration-500 ${
              showMsg ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="text-4xl md:text-6xl font-extrabold text-white text-center mb-8">
              {message}
            </div>
            {showReset && (
              <div className="flex justify-center">
                <button
                  className="px-8 py-4 text-2xl font-bold bg-white rounded-lg shadow-lg hover:bg-gray-100 transition"
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
      <div className="flex flex-row items-center justify-center w-full gap-8">
        {/* Deck Area */}
        <div className="relative">
          {/* Main deck stack */}
          <CardStack cards={deck} />

          {/* Drawn card stack */}
          {drawnCard && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <CardStack cards={[drawnCard]} />
            </div>
          )}
        </div>

        {/* Hand */}
        <div className="flex flex-wrap justify-center gap-4 max-w-[70vw]">
          {hand.map((stack, index) => (
            <div key={`stack-${index}`}>
              <CardStack cards={stack} offset={2} active={index === activeIndex} />
            </div>
          ))}
        </div>
      </div>

      <ActionButtons />
    </div>
  );
};
