import Card from "./Card";
import Rank from "./Rank";
import Suit from "./Suit";
import _ from "lodash";

/**
 * Represents a collection of Cards.
 */
export default class Deck {
  #cards: Array<Card> = [];

  /**
   * Initializes an instance of a Deck. If a card array if provided, the contents
   * of the Deck will be the cards passed to the constructor. Otherwise, the Deck
   * will be automatically initialized to a full deck of 52 cards.
   *
   * `new Deck()` initializes to a full deck
   *
   * `new Deck([new Card("A", "spade")])` initializes to a deck with one card
   *
   * @param cards An array of Cards to initialize the Deck with
   */
  constructor(cards?: Array<Card>) {
    if (cards !== undefined) {
      cards.forEach((card) => this.#cards.push(card));
    } else {
      for (const rank of Rank) {
        for (const suit of Suit) {
          this.#cards.push(new Card(rank, suit));
        }
      }
    }
  }

  /**
   * Shuffle the cards in the deck.
   */
  shuffle() {
    this.#cards = _.shuffle(this.#cards);
  }

  /**
   * Returns the number of cards in the Deck.
   */
  size() {
    return this.#cards.length;
  }

  /**
   * Returns the next card in the Deck if it is not empty.
   * @param faceUp true if the card is dealt face up or false if face down
   * @throws Error when the Deck is empty.
   */
  deal(faceUp: boolean) {
    if (this.#cards.length === 0) {
      throw new Error("Cannot deal from empty Deck");
    }
    const card = this.#cards.pop() as Card; // Assert not undefined since length already checked
    card.setFaceUp(faceUp);
    return card;
  }

  placeUnder(cards: Array<Card>) {
    this.#cards = [...cards, ...this.#cards];
  }
}
