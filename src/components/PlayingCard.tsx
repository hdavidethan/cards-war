import { Rank, Suit } from "@prisma/client";

interface Props {
  rank: Rank;
  suit: Suit;
  faceUp: boolean;
}

export default function PlayingCard({ rank, suit, faceUp }: Props) {
  const spadeCodePoint = 0x1f0a1; // Ace of Spades
  const heartCodePoint = 0x1f0b1; // Ace of Hearts
  const diamondCodePoint = 0x1f0c1; // Ace of Diamonds
  const clubCodePoint = 0x1f0d1; // Ace of Clubs

  const rankMap = {
    A: 0,
    TWO: 1,
    THREE: 2,
    FOUR: 3,
    FIVE: 4,
    SIX: 5,
    SEVEN: 6,
    EIGHT: 7,
    NINE: 8,
    TEN: 9,
    J: 10,
    Q: 12,
    K: 13,
  };

  if (!faceUp) {
    return (
      <span className="text-blue-800 text-9xl">
        {String.fromCodePoint(0x1f0a0)}
      </span>
    );
  }
  switch (suit) {
    case "SPADE":
      return (
        <span className="text-9xl">
          {String.fromCodePoint(spadeCodePoint + rankMap[rank])}
        </span>
      );
    case "HEART":
      return (
        <span className="text-9xl text-red-600">
          {String.fromCodePoint(heartCodePoint + rankMap[rank])}
        </span>
      );
    case "DIAMOND":
      return (
        <span className="text-9xl text-red-600">
          {String.fromCodePoint(diamondCodePoint + rankMap[rank])}
        </span>
      );
    case "CLUB":
      return (
        <span className="text-9xl">
          {String.fromCodePoint(clubCodePoint + rankMap[rank])}
        </span>
      );
  }
}
