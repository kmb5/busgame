import { create } from "zustand";
import type { Card, Rank, Suit } from "../types/card";

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
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }

  return deck;
};

const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const rankOrder: Rank[] = [
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
  "A",
];
const getRankValue = (rank: Rank) => rankOrder.indexOf(rank);

export interface HandCard {
  card: Card;
  faceUp: boolean;
}

export interface GameState {
  hand: HandCard[];
  deck: Card[];
  drawnCard: Card | null;
  activeIndex: number;
  revealedIndices: number[];
  message: string | null;
  showReset: boolean;
  isTransitioning: boolean;
  startGame: () => void;
  guess: (type: "up" | "down" | "equal") => Promise<void>;
  resetGame: () => void;
}

export const useCardStore = create<GameState>((set, get) => ({
  hand: [],
  deck: [],
  drawnCard: null,
  activeIndex: 0,
  revealedIndices: [],
  message: null,
  showReset: false,
  isTransitioning: false,
  startGame: () => {
    const deck = shuffleDeck(createDeck());
    // Hand alternates up, down, up, down, up
    const hand: HandCard[] = deck.slice(0, 5).map((card, i) => ({
      card,
      faceUp: i % 2 === 0,
    }));
    set({
      hand,
      deck: deck.slice(5),
      drawnCard: null,
      activeIndex: 0,
      revealedIndices: [],
      message: null,
      showReset: false,
      isTransitioning: false,
    });
  },
  resetGame: () => {
    get().startGame();
  },
  guess: async (type) => {
    const { hand, deck, activeIndex } = get();
    if (!deck.length) return;
    set({ isTransitioning: true });
    // 1. Reveal top card from deck
    const drawnCard = deck[0];
    set({ drawnCard });
    await new Promise((res) => setTimeout(res, 350));
    // 2. If active card is face down, reveal it
    let revealedIndices: number[] = [];
    if (!hand[activeIndex].faceUp) {
      set({
        hand: hand.map((h, i) =>
          i === activeIndex ? { ...h, faceUp: true } : h
        ),
        revealedIndices: [activeIndex],
      });
      revealedIndices = [activeIndex];
      await new Promise((res) => setTimeout(res, 350));
    }
    // 3. Compare
    const activeCard = hand[activeIndex].card;
    const drawnValue = getRankValue(drawnCard.rank);
    const activeValue = getRankValue(activeCard.rank);
    let correct = false;
    if (type === "up") correct = drawnValue > activeValue;
    if (type === "down") correct = drawnValue < activeValue;
    if (type === "equal") correct = drawnValue === activeValue;
    // 4. If win: drawn card replaces active, move active forward
    if (correct) {
      // If this was the last card, show win message
      if (activeIndex === hand.length - 1) {
        set({
          hand: hand.map((h, i) =>
            i === activeIndex ? { card: drawnCard, faceUp: true } : h
          ),
          drawnCard: null,
          deck: deck.slice(1),
          message: "YOU GOT OFF THE BUS!!",
          showReset: true,
          isTransitioning: true,
        });
      } else {
        set({
          hand: hand.map((h, i) =>
            i === activeIndex ? { card: drawnCard, faceUp: true } : h
          ),
          drawnCard: null,
          deck: deck.slice(1),
          activeIndex:
            activeIndex + 1 < hand.length ? activeIndex + 1 : activeIndex,
          revealedIndices: [],
          isTransitioning: false,
        });
      }
    } else {
      // 5. If lose: reset active, and for any revealed face-down card, replace with new face-down card from deck
      let newHand = [...hand];
      let newDeck = deck.slice(1);
      // Replace all odd-indexed (2nd, 4th) face-up cards with new face-down cards from the deck
      for (let idx = 1; idx < newHand.length; idx += 2) {
        if (newHand[idx].faceUp && newDeck.length) {
          newHand[idx] = { card: newDeck[0], faceUp: false };
          newDeck = newDeck.slice(1);
        }
      }
      set({
        hand: newHand,
        drawnCard: null,
        deck: newDeck,
        activeIndex: 0,
        revealedIndices: [],
        message: "THE BUS GOES ON",
        isTransitioning: true,
      });
      setTimeout(() => {
        set({ message: null, isTransitioning: false });
      }, 2000);
    }
  },
}));
