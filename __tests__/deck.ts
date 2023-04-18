import Card from "@/lib/Card";
import Deck from "@/lib/Deck";

describe("Deck behavior", () => {
  it("should be created with 52 cards if uninitialized to cards", () => {
    const deck = new Deck();
    expect(deck.size()).toBe(52);
  });

  it("should have 52 unique cards if uninitialized to cards", () => {
    const seen = new Set();
    const deck = new Deck();
    while (deck.size() > 0) {
      const card = deck.deal(Card.FACE_DOWN);
      seen.add(card.rank() + card.suit());
    }
    expect(seen.size).toBe(52);
  });

  it("should have the same cards it was initialized to", () => {
    const cards = [
      new Card("A", "spade"),
      new Card("2", "heart"),
      new Card("10", "club"),
    ];

    const deck = new Deck(cards);

    expect(deck.size()).toBe(cards.length);

    while (deck.size() > 0) {
      const card = deck.deal(Card.FACE_DOWN);
      expect(cards.some((value) => card.equals(value))).toBe(true);
    }
  });

  it("should place cards at the back of the deck properly", () => {
    const cards = [
      new Card("A", "spade"),
      new Card("2", "heart"),
      new Card("10", "club"),
    ];

    const backCards = [
      new Card("3", "spade"),
      new Card("4", "heart"),
      new Card("6", "club"),
    ];

    const deck = new Deck(cards);
    deck.placeUnder(backCards);

    Array(3).forEach(() => {
      const card = deck.deal(Card.FACE_DOWN);
      expect(cards.some((value) => value.equals(card)));
    });

    Array(3).forEach(() => {
      const card = deck.deal(Card.FACE_DOWN);
      expect(backCards.some((value) => value.equals(card)));
    });
  });
});
