// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Player from "@/lib/game/Player";
import WarGame from "@/lib/game/WarGame";
import prisma from "@/lib/prisma";
import { Game, GameType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
  players: string[];
  gameType: GameType;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | Game
    | Game[]
    | (Game & { turns: number; winner: Player; players: Player[] })[]
    | string
  >
) {
  switch (req.method) {
    case "GET":
      const games = await prisma.game.findMany({
        include: {
          players: true,
          winner: true,
        },
      });
      const withCounts = await Promise.all(
        games.map((game) =>
          prisma.gameHistory
            .findUnique({ where: { id: game.gameHistoryId } })
            .then((value) => ({ ...game, turns: value?.moves.length }))
        )
      );

      return res.status(200).json(withCounts);
    case "POST":
      const { players, gameType } = JSON.parse(req.body);

      if (!Array.isArray(players) || players.length !== 2 || !gameType) {
        return res.status(400).send("Bad Request");
      }

      if (gameType !== GameType.WAR) {
        return res.status(501).send("Not Implemented");
      }

      const playerDocuments = await Promise.all(
        players.map((player) =>
          prisma.player.upsert({
            where: { name: player },
            create: { name: player },
            update: {},
          })
        )
      );
      const game = new WarGame(new Player(players[0]), new Player(players[1]));
      game.run();

      const history = await prisma.gameHistory.create({
        data: {
          moves: game.history().map((turn) => ({
            playerOneMoves: turn[0],
            playerTwoMoves: turn[1],
          })),
        },
      });

      const winner = await prisma.player.findUnique({
        where: { name: game.winner().name() },
      });
      if (winner === null) {
        return res.status(500).send("Internal Server Error");
      }

      try {
        await prisma.game.create({
          data: {
            type: GameType.WAR,
            players: {
              connect: playerDocuments.map((player) => ({ id: player.id })),
            },
            winner: {
              connect: {
                id: winner.id,
              },
            },
            gameOver: true,
            gameHistory: {
              connect: { id: history.id },
            },
          },
        });
      } catch (err) {
        console.error(err);
      }
      res.status(200).send("Success");
      break;
    default:
      res.status(501).send("Not Implemented");
  }
}
