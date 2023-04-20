import Player from "@/lib/game/Player";
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
    for (let i = 0; i < 10000; i++) {
      const p1 = new Player("Player 1");
      const p2 = new Player("Player 2");
      const game = new WarGame(p1, p2);
      expect(game.isGameOver()).toBe(false);
      game.run();
      expect(game.isGameOver()).toBe(true);
      expect([p1, p2]).toContain(game.winner());
    }
  });

  it("should have an non-empty history when the game ends", () => {
    const p1 = new Player("Player 1");
    const p2 = new Player("Player 2");
    const game = new WarGame(p1, p2);
    game.run();
    expect(game.isGameOver()).toBe(true);
    expect([p1, p2]).toContain(game.winner());
    expect(game.history().length).toBeGreaterThan(1);
  });
});
