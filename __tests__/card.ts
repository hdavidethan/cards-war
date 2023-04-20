import Card from "@/lib/game/Card";
import Rank from "@/lib/Rank";
import Suit from "@/lib/Suit";

describe("Card behavior", () => {
  it("shoule be created with the correct rank and suit", () => {
    for (const rank of Rank) {
      for (const suit of Suit) {
        const card = new Card(rank, suit);
        expect(card.rank()).toBe(rank);
        expect(card.suit()).toBe(suit);
      }
    }
  });

  it("should be created with correct visibility (face up/face down)", () => {
    expect(new Card("A", "SPADE", Card.FACE_UP).faceUp()).toBe(Card.FACE_UP);
    expect(new Card("A", "SPADE", Card.FACE_UP).faceUp()).toBe(true);
    expect(new Card("A", "SPADE", Card.FACE_DOWN).faceUp()).toBe(
      Card.FACE_DOWN
    );
    expect(new Card("A", "SPADE", Card.FACE_DOWN).faceUp()).toBe(false);
  });

  it("should have correct visibility changing functionality", () => {
    const card1 = new Card("A", "SPADE", Card.FACE_UP);
    card1.setFaceUp(Card.FACE_DOWN);
    expect(card1.faceUp()).toBe(Card.FACE_DOWN);

    const card2 = new Card("A", "SPADE", Card.FACE_UP);
    card2.setFaceUp(Card.FACE_UP);
    expect(card2.faceUp()).toBe(Card.FACE_UP);

    const card3 = new Card("A", "SPADE", Card.FACE_DOWN);
    card3.setFaceUp(Card.FACE_UP);
    expect(card3.faceUp()).toBe(Card.FACE_UP);

    const card4 = new Card("A", "SPADE", Card.FACE_DOWN);
    card4.setFaceUp(Card.FACE_DOWN);
    expect(card4.faceUp()).toBe(Card.FACE_DOWN);
  });

  it("should be able to check if equals by rank and suit", () => {
    const card1 = new Card("A", "SPADE", Card.FACE_DOWN);
    const card2 = new Card("A", "SPADE", Card.FACE_UP);

    expect(card1.equals(card2)).toBe(true);

    const card3 = new Card("A", "SPADE", Card.FACE_DOWN);
    const card4 = new Card("TWO", "SPADE", Card.FACE_UP);

    expect(card3.equals(card4)).toBe(false);

    const card5 = new Card("A", "SPADE", Card.FACE_DOWN);
    const card6 = new Card("A", "HEART", Card.FACE_UP);

    expect(card5.equals(card6)).toBe(false);
  });
});
