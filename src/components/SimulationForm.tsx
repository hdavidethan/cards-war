import { GameType } from "@prisma/client";
import { useState } from "react";
import { mutate } from "swr";

export default function SimulationForm() {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const disabled =
    playerOne.length === 0 || playerTwo.length === 0 || playerOne === playerTwo;
  return (
    <div className="border border-1 rounded-md p-3">
      <h2 className="text-lg">Run a new simulation</h2>
      <p className="font-light">
        Players must not have empty names or have the same name.
      </p>
      <div className="my-5">
        <label
          htmlFor="helper-text"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Player 1
        </label>
        <input
          id="helper-text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
          placeholder="Alice"
          value={playerOne}
          onChange={(e) => setPlayerOne(e.target.value)}
        />
        <label
          htmlFor="helper-text"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Player 2
        </label>
        <input
          id="helper-text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Bob"
          value={playerTwo}
          onChange={(e) => setPlayerTwo(e.target.value)}
        />
      </div>
      <button
        className={
          disabled
            ? "bg-slate-300 px-2 py-1 text-white rounded-lg pointer-events-none"
            : "bg-slate-500 px-2 py-1 text-white rounded-lg hover:bg-slate-600"
        }
        onClick={() => {
          fetch("/api/game", {
            method: "POST",
            body: JSON.stringify({
              players: [playerOne, playerTwo],
              gameType: GameType.WAR,
            }),
          }).then(() => {
            mutate("/api/game");
          });
        }}
      >
        Run
      </button>
    </div>
  );
}
