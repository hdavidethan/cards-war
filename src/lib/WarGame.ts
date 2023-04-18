import _ from "lodash";
import Card from "./Card";
import Deck from "./Deck";
import Player from "./Player";

export default class WarGame {
  #gameOver: boolean = false;
  #winner: Player | null = null;

  static readonly RANK_ORDER = [
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
  ] as const;

  #player1: Player;
  #player2: Player;
  #player1Deck: Deck;
  #player2Deck: Deck;

  #history: Array<[Array<Card>, Array<Card>]>;

  constructor(player1: Player, player2: Player) {
    if (player1.name() === player2.name()) {
      throw new Error("Must start game with 2 unique players");
    }

    const fullDeck = new Deck();
    fullDeck.shuffle();

    const halfDeckCards: Array<Card> = [];
    for (let i = 0; i < fullDeck.size() / 2; i++) {
      halfDeckCards.push(fullDeck.deal(Card.FACE_DOWN));
    }
    this.#player1 = player1;
    this.#player2 = player2;
    this.#player1Deck = fullDeck;
    this.#player2Deck = new Deck(halfDeckCards);
    this.#history = [];
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

  #endGame(winner: Player) {
    this.#gameOver = true;
    this.#winner = winner;
  }

  #compareCards(a: Card, b: Card) {
    const aRanking = WarGame.RANK_ORDER.indexOf(a.rank());
    const bRanking = WarGame.RANK_ORDER.indexOf(b.rank());

    if (aRanking === -1 || bRanking === -1) {
      throw new Error("Invalid Card type in War");
    }
    return aRanking - bRanking;
  }

  #dealBoth(
    player1Stack: Array<Card>,
    player2Stack: Array<Card>,
    faceUp: boolean
  ) {
    player1Stack.push(this.#player1Deck.deal(faceUp));
    player2Stack.push(this.#player2Deck.deal(faceUp));
  }

  #runWar(player1Stack: Array<Card>, player2Stack: Array<Card>): Player {
    if (this.#player1Deck.size() < 2) {
      this.#endGame(this.#player2);
      return this.#player2;
    }
    if (this.#player2Deck.size() < 2) {
      this.#endGame(this.#player1);
      return this.#player2;
    }

    this.#dealBoth(player1Stack, player2Stack, Card.FACE_DOWN);
    this.#dealBoth(player1Stack, player2Stack, Card.FACE_UP);

    const comparison = this.#compareCards(
      player1Stack[player1Stack.length - 1],
      player2Stack[player2Stack.length - 1]
    );

    if (comparison > 0) {
      // Player 1 wins the war
      return this.#player1;
    } else if (comparison < 0) {
      // Player 2 wins the war
      return this.#player2;
    } else {
      // Recurse until a war winner appears
      return this.#runWar(player1Stack, player2Stack);
    }
  }

  #runRound() {
    const player1Stack: Array<Card> = [];
    const player2Stack: Array<Card> = [];

    if (this.#player1Deck.size() === 0) {
      return this.#endGame(this.#player2);
    }
    if (this.#player2Deck.size() === 0) {
      return this.#endGame(this.#player1);
    }

    this.#dealBoth(player1Stack, player2Stack, Card.FACE_UP);

    const comparison = this.#compareCards(
      player1Stack[player1Stack.length - 1],
      player2Stack[player2Stack.length - 1]
    );

    const claimCards = (deck: Deck) => {
      // Defensive copy
      this.#history.push([
        [
          ...player1Stack.map(
            (value) => new Card(value.rank(), value.suit(), value.faceUp())
          ),
        ],
        [
          ...player2Stack.map(
            (value) => new Card(value.rank(), value.suit(), value.faceUp())
          ),
        ],
      ]);
      const newCards = _.shuffle([...player1Stack, ...player2Stack]);
      newCards.forEach((card) => card.setFaceUp(Card.FACE_DOWN));
      deck.placeUnder(newCards);
    };

    if (comparison > 0) {
      // Player 1 wins the battle
      claimCards(this.#player1Deck);
    } else if (comparison < 0) {
      // Player 2 wins the battle
      claimCards(this.#player2Deck);
    } else {
      // Players go to war
      const warWinner = this.#runWar(player1Stack, player2Stack);
      if (warWinner === this.#player1) {
        claimCards(this.#player1Deck);
      } else if (warWinner === this.#player2) {
        claimCards(this.#player2Deck);
      } else {
        throw new Error("War ended without a winner");
      }
    }
  }

  run() {
    while (!this.#gameOver) {
      this.#runRound();
    }
  }

  history() {
    // Defensive copy
    return JSON.parse(JSON.stringify(this.#history));
  }
}
