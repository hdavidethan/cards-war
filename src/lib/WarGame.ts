import Card from "./Card";
import Deck from "./Deck";
import Player from "./Player";

export default class WarGame {
  #gameOver: boolean = false;
  #winner: Player | null = null;

  #player1Deck: Deck;
  #player2Deck: Deck;

  constructor(player1: Player, player2: Player) {
    if (player1.name() === player2.name()) {
      throw new Error("Must start game with 2 unique players");
    }

    const fullDeck = new Deck();
    fullDeck.shuffle();

    const halfDeckCards: Array<Card> = [];
    Array(fullDeck.size() / 2).forEach(() =>
      halfDeckCards.push(fullDeck.deal())
    );

    this.#player1Deck = fullDeck;
    this.#player2Deck = new Deck(halfDeckCards);
  }

  isGameOver(): boolean {
    return this.#gameOver;
  }

  winner(): Player {
    if (this.#winner === null) {
      throw new Error("No winner to return");
    }
    return this.#winner;
  }

  run() {}
}
