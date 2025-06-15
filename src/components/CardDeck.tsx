import { useEffect } from 'react';
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
  } = useCardStore();

  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100 p-4">
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
