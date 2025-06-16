import { Card } from './Card';
import type { Card as CardType } from '../types/card';

interface CardStackProps {
  cards: CardType[];
  offset?: number;
  active?: boolean;
}

export const CardStack = ({ cards, offset = 3, active = false }: CardStackProps) => {
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
          <Card {...card} active={active && i === cards.length - 1 ? true : false} />
        </div>
      ))}
    </div>
  );
};
