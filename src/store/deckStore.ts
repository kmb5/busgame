import { create } from "zustand";
import type { Card, Suit, Rank } from "../types/card";

const createDeck = (): Card[] => {
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
  const ranks: Rank[] = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  return suits.flatMap((suit) => ranks.map((rank) => ({ suit, rank })));
};

const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface DeckState {
  deck: Card[];
  initialize: () => void;
  draw: (count: number) => Card[];
  remaining: () => number;
}

export const useDeckStore = create<DeckState>((set, get) => ({
  deck: [],
  initialize: () => {
    const newDeck = shuffleDeck(createDeck());
    set({ deck: newDeck });
  },
  draw: (count: number) => {
    const { deck } = get();
    const drawn = deck.slice(0, count);
    set({ deck: deck.slice(count) });
    return drawn;
  },
  remaining: () => get().deck.length,
}));
