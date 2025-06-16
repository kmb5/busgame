import type { Card as CardType } from '../types/card';

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

export const Card = ({ suit, rank, active = false, faceDown = true }: CardType) => {
  const suitColor = getSuitColor(suit);
  const suitSymbol = getSuitSymbol(suit);
  const ringClass = active ? 'ring-4 ring-yellow-400' : '';

  return (
    <div className={`w-[min(20vw,120px)] h-[min(28vw,168px)] ${ringClass} relative`}
      style={{ perspective: '800px' }}>
      
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
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="absolute inset-0 w-full h-full bg-blue-600 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
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
        </div>
        
        {/* Card Front (face up) */}
        <div
          className="absolute inset-0 backface-hidden transform rotate-y-180"
          style={{ 
            background: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className={`flex flex-col p-2 w-full h-full border border-gray-200 rounded-lg`}>
            <div className={`text-[min(4vw,24px)] font-bold ${suitColor}`}>{rank}{suitSymbol}</div>
            <div className="flex-grow flex items-center justify-center">
              <span className={`text-[min(8vw,48px)] ${suitColor}`}>{suitSymbol}</span>
            </div>
            <div className={`text-[min(4vw,24px)] font-bold ${suitColor} transform rotate-180`}>{rank}{suitSymbol}</div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
