import Rank from "./Rank";
import Suit from "./Suit";

/**
 * An immutable object representing a Card in a deck.
 */
export default class Card {
  #rank: typeof Rank[number];
  #suit: typeof Suit[number];

  constructor(rank: typeof Rank[number], suit: typeof Suit[number]) {
    this.#rank = rank;
    this.#suit = suit;
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
}
