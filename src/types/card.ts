export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export interface Card {
  suit: Suit;
  rank: Rank;
  active?: boolean;
  faceDown?: boolean;
}

export interface CardState {
  cards: Card[];
  drawCards: (count: number) => void;
  resetCards: () => void;
}
