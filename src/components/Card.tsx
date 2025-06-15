import type { Card as CardType } from '../types/card';

interface CardProps {
  card: CardType;
  faceDown?: boolean;
  isActive?: boolean;
  flipped?: boolean;
  animateMove?: boolean;
}

const getSuitColor = (suit: CardType['suit']) => {
  return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-black';
};

const getSuitSymbol = (suit: CardType['suit']) => {
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

export const Card = ({ card, isActive = false, flipped = true, animateMove = false }: CardProps) => {
  const suitColor = getSuitColor(card.suit);
  const suitSymbol = getSuitSymbol(card.suit);
  const ringClass = isActive ? 'ring-4 ring-yellow-400' : '';

  return (
    <div className={`w-[min(20vw,120px)] h-[min(28vw,168px)] ${ringClass} ${animateMove ? 'transition-transform duration-500' : ''} relative`}
      style={{ perspective: '800px' }}>
      {/* Card Back (face down) */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${flipped ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} z-10`}
        style={{ borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="140" rx="12" fill="#2563eb" />
          <pattern id="pattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <circle cx="10" cy="10" r="6" fill="#fff" fillOpacity="0.25" />
          </pattern>
          <rect width="100" height="140" rx="12" fill="url(#pattern)" />
        </svg>
      </div>
      {/* Card Front (face up) */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${flipped ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} z-20`}
        style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      >
        <div className={`flex flex-col p-2 w-full h-full border border-gray-200 rounded-lg`}>
          <div className={`text-[min(4vw,24px)] font-bold ${suitColor}`}>{card.rank}{suitSymbol}</div>
          <div className="flex-grow flex items-center justify-center">
            <span className={`text-[min(8vw,48px)] ${suitColor}`}>{suitSymbol}</span>
          </div>
          <div className={`text-[min(4vw,24px)] font-bold ${suitColor} transform rotate-180`}>{card.rank}{suitSymbol}</div>
        </div>
      </div>
    </div>
  );
}; 
