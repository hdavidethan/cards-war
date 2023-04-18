import Rank from "./Rank";
import Suit from "./Suit";

/**
 * An immutable object representing a Card in a deck.
 */
export default class Card {
  #rank: typeof Rank[number];
  #suit: typeof Suit[number];

  static readonly FACE_UP = true;
  static readonly FACE_DOWN = false;

  #faceUp: boolean;

  constructor(
    rank: typeof Rank[number],
    suit: typeof Suit[number],
    faceUp: boolean = false
  ) {
    this.#rank = rank;
    this.#suit = suit;

    this.#faceUp = faceUp;
  }

  /**
   * Returns the rank of this Card.
   */
  rank() {
    return this.#rank;
  }

  /**
   * Returns the suit of this Card.
   */
  suit() {
    return this.#suit;
  }

  /**
   * Check if this Card is equal to another.
   * @param card The other Card to compare
   * @returns true if the Cards are equal.
   */
  equals(card: Card) {
    return this.#rank === card.rank() && this.#suit === card.suit();
  }

  /**
   * Change if the card is face up or face down.
   * @param faceUp true if the card is face up
   */
  setFaceUp(faceUp: boolean) {
    this.#faceUp = faceUp;
  }

  /**
   * Returns true if the card is face up and false if the card is face down.
   */
  faceUp() {
    return this.#faceUp;
  }
}
