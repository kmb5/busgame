import { create } from 'zustand';
import type { Card, Rank } from '../types/card';
import { useDeckStore } from './deckStore';

const rankOrder: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const getRankValue = (rank: Rank) => rankOrder.indexOf(rank);

interface GameState {
  hand: Card[][]; // Array of card stacks
  drawnCard: Card | null;
  activeIndex: number;
  message: string | null;
  showReset: boolean;
  startGame: () => void;
  resetGame: () => void;
  guess: (type: 'up' | 'down' | 'equal') => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  hand: [],
  drawnCard: null,
  activeIndex: 0,
  message: null,
  showReset: false,

  startGame: () => {
    const deck = useDeckStore.getState();
    deck.initialize();

    // Create 5 stacks, each starting with one card
    // Odd-indexed cards start face down
    const hand = deck.draw(5).map((card, index) => [
      {
        ...card,
        faceDown: index % 2 === 1,
      },
    ]);

    set({
      hand,
      drawnCard: null,
      activeIndex: 0,
      message: null,
      showReset: false,
    });
  },

  resetGame: () => {
    get().startGame();
  },

  guess: (type: 'up' | 'down' | 'equal') => {
    const { hand, activeIndex } = get();
    const deck = useDeckStore.getState();

    if (deck.remaining() === 0) return;

    const [drawnCard] = deck.draw(1);
    drawnCard.faceDown = false;

    set({ drawnCard });

    const newHand = [...hand];
    const activeStack = newHand[activeIndex];
    const topCard = activeStack[activeStack.length - 1];

    // First, flip the top card if it's face down
    if (topCard.faceDown) {
      newHand[activeIndex] = [...activeStack.slice(0, -1), { ...topCard, faceDown: false }];
      set({ hand: newHand });
    }

    // Then proceed with comparison after short delay (to show flip visually)
    setTimeout(() => {
      const drawnValue = getRankValue(drawnCard.rank);
      const activeValue = getRankValue(topCard.rank);

      let correct = false;
      if (type === 'up') correct = drawnValue > activeValue;
      if (type === 'down') correct = drawnValue < activeValue;
      if (type === 'equal') correct = drawnValue === activeValue;

      if (correct) {
        // Add the drawn card to the active stack, preserving the face-up state of the previous card
        newHand[activeIndex] = [
          ...activeStack.slice(0, -1),
          { ...topCard, faceDown: false }, // Ensure the previous card stays face up
          drawnCard,
        ];

        if (activeIndex === newHand.length - 1) {
          set({
            hand: newHand,
            drawnCard: null,
            message: 'YOU GOT OFF THE BUS!!',
            showReset: true,
          });
        } else {
          set({
            hand: newHand,
            drawnCard: null,
            activeIndex: activeIndex + 1,
          });
        }
      } else {
        // Incorrect guess: add a face-down card to every other stack
        for (let i = 1; i < newHand.length; i += 2) {
          const stack = newHand[i];
          const topCard = stack[stack.length - 1];

          // Only draw a new card if the top card is face up
          if (!topCard.faceDown) {
            const [replacement] = deck.draw(1);
            if (replacement) {
              newHand[i] = [...stack, { ...replacement, faceDown: true }];
            }
          }
        }

        set({
          hand: newHand,
          drawnCard: null,
          activeIndex: 0,
          message: 'THE BUS GOES ON',
          showReset: false,
        });

        setTimeout(() => {
          set({ message: null });
        }, 1000);
      }
    }, 1000); // adjust to match your card flip animation timing
  },
}));
