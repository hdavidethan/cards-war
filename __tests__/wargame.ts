import Player from "@/lib/Player";
import WarGame from "@/lib/WarGame";

describe("WarGame behavior", () => {
  it("should conclude correctly with a winner", () => {
    const p1 = new Player("Player 1");
    const p2 = new Player("Player 2");
    const game = new WarGame(p1, p2);
    expect(game.isGameOver()).toBe(false);
    game.run();
    expect(game.isGameOver()).toBe(true);
    expect([p1, p2]).toContain(game.winner());
  });

  it("should conclude correctly with a winner (stress test)", () => {
    Array(100000).forEach(() => {
      const p1 = new Player("Player 1");
      const p2 = new Player("Player 2");
      const game = new WarGame(p1, p2);
      expect(game.isGameOver()).toBe(false);
      game.run();
      expect(game.isGameOver()).toBe(true);
      expect([p1, p2]).toContain(game.winner());
    });
  });
});
