import type { Card as CardType, Suit } from '../types/card';
import { CardBackWrapper } from './CardBack';

const getSuitColor = (suit: Suit) => {
  return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-black';
};

const getSuitSymbol = (suit: Suit) => {
  switch (suit) {
    case 'hearts':
      return '♥';
    case 'diamonds':
      return '♦';
    case 'clubs':
      return '♣';
    case 'spades':
      return '♠';
  }
};

export const Card = ({ suit, rank, active = false, faceDown = true }: CardType) => {
  const suitColor = getSuitColor(suit);
  const suitSymbol = getSuitSymbol(suit);
  const activeHighlighClass = active ? 'ring-4 ring-yellow-400 rounded-lg' : '';

  return (
    <div
      className={`w-[min(20vw,min(160px,25vh))] h-[min(28vw,min(224px,35vh))] ${activeHighlighClass} relative`}
      style={{ perspective: '800px' }}
    >
      {/* Card container that flips */}
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          faceDown ? '' : 'rotate-y-180'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back (face down) */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{
            borderRadius: '0.75rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            backfaceVisibility: 'hidden',
          }}
        >
          <CardBackWrapper />
        </div>

        {/* Card Front (face up) */}
        <div
          className="absolute inset-0 backface-hidden transform rotate-y-180"
          style={{
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className={`flex flex-col p-3 w-full h-full border border-black/30 rounded-lg`}>
            <div className={`text-[min(4vw,min(24px,3vh))] font-bold ${suitColor}`}>
              {rank}
              {suitSymbol}
            </div>
            <div className="flex-grow flex items-center justify-center">
              <span className={`text-[min(8vw,min(48px,6vh))] ${suitColor}`}>{suitSymbol}</span>
            </div>
            <div
              className={`text-[min(4vw,min(24px,3vh))] font-bold ${suitColor} transform rotate-180`}
            >
              {rank}
              {suitSymbol}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
