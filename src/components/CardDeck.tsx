import { useEffect, useState } from 'react';
import { Card } from './Card';
import { useCardStore } from '../store/cardStore';
import { ActionButtons } from './ActionButtons';
import { DeckStack } from './DeckStack';

export const CardDeck = () => {
  const {
    hand,
    deck,
    drawnCard,
    activeIndex,
    startGame,
    message,
    showReset,
    resetGame,
  } = useCardStore();

  // For fade in/out animation
  const [showMsg, setShowMsg] = useState(false);
  useEffect(() => {
    if (message) {
      setShowMsg(true);
      // Hide after 2.1s if not a win (to allow fade out)
      if (!showReset) {
        const t = setTimeout(() => setShowMsg(false), 1900);
        return () => clearTimeout(t);
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
      {/* Overlay for message */}
      {message && (
        <div className="absolute left-1/2 top-1/2 z-50 flex flex-col items-center justify-center" style={{ transform: 'translate(-50%, -50%)' }}>
          <div
            className={`px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 transition-all duration-500 ${showMsg ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-8 text-center">
              {message}
            </div>
            {showReset && (
              <button
                className="px-8 py-4 text-2xl font-bold bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-100 transition"
                onClick={resetGame}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-row items-center justify-center w-full">
        <div className="relative flex items-center justify-center">
          <DeckStack count={deck.length} />
          {drawnCard && (
            <div className="absolute left-1/2 top-1/2 z-30" style={{ transform: 'translate(-50%, -50%)' }}>
              <Card card={drawnCard} flipped={true} />
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-[min(2vw,1rem)] max-w-[95vw]">
          {hand.map(({ card, faceUp }, index) => (
            <Card
              key={`${card.rank}-${card.suit}-${index}`}
              card={card}
              flipped={faceUp}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>
      <ActionButtons />
    </div>
  );
}; 
