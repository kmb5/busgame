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
    <div className="relative w-[min(20vw,120px)] h-[min(28vw,168px)] mr-6 flex items-center justify-center select-none">
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
          }}
        >
          <Card {...card} active={active && i === cards.length - 1 ? true : false} />
        </div>
      ))}
    </div>
  );
};
