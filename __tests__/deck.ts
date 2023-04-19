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
      new Card("A", "SPADE"),
      new Card("TWO", "HEART"),
      new Card("TEN", "CLUB"),
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
      new Card("A", "SPADE"),
      new Card("TWO", "HEART"),
      new Card("TEN", "CLUB"),
    ];

    const backCards = [
      new Card("THREE", "SPADE"),
      new Card("FOUR", "HEART"),
      new Card("SIX", "CLUB"),
    ];

    const deck = new Deck(cards);
    deck.placeUnder(backCards);

    for (let i = 0; i < 3; i++) {
      const card = deck.deal(Card.FACE_DOWN);
      expect(cards.some((value) => value.equals(card)));
    }

    for (let i = 0; i < 3; i++) {
      const card = deck.deal(Card.FACE_DOWN);
      expect(backCards.some((value) => value.equals(card)));
    }
  });
});
