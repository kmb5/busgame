import { Card } from './Card';
import type { Card as CardType } from '../types/card';
import { useGameStore } from '../store/gameStore';

interface CardStackProps {
  cards: CardType[];
  offset?: number;
  active?: boolean;
}

export const CardStack = ({ cards, offset = 2, active = false }: CardStackProps) => {
  const guess = useGameStore(s => s.guess);
  // Limit the number of visible cards for performance/clarity
  const visible = Math.min(cards.length, 12);

  return (
    <div className="relative w-[min(20vw,min(160px,25vh))] h-[min(28vw,min(224px,35vh))] mr-4 flex items-center justify-center select-none">
      {cards.slice(0, visible).map((card, i) => (
        <div
          key={`${card.rank}-${card.suit}-${i}`}
          className="absolute"
          style={{
            top: `${-i * offset}px`,
            left: `${-i * offset}px`,
            zIndex: i,
            width: '100%',
            height: '100%',
            filter:
              active && i === cards.length - 1
                ? 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))'
                : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
            transform: active && i === cards.length - 1 ? 'translateY(-4px)' : 'none',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {/* Only highlight the topmost card from the active stack with yellow border */}
          <div className="relative">
            <Card {...card} active={active && i === cards.length - 1 ? true : false} />
            {active && i === cards.length - 1 && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg transition-opacity duration-200">
                <button
                  className="w-10 h-10  bg-black/75 rounded-full shadow-lg flex items-center justify-center text-xl text-white font-bold transition hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Up"
                  onClick={() => guess('up')}
                >
                  ▲
                </button>
                <button
                  className="w-10 h-10  bg-black/75 rounded-full shadow-lg flex items-center justify-center text-xl text-white font-bold transition hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Equal"
                  onClick={() => guess('equal')}
                >
                  =
                </button>
                <button
                  className="w-10 h-10  bg-black/75 rounded-full shadow-lg flex items-center justify-center text-xl text-white font-bold transition hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Down"
                  onClick={() => guess('down')}
                >
                  ▼
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
