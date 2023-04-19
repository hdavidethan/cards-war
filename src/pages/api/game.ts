// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Player from "@/lib/Player";
import WarGame from "@/lib/WarGame";
import { Game, GameType, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface RequestBody {
  players: string[];
  gameType: GameType;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game | string>
) {
  const { players, gameType } = req.body as RequestBody;

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

  switch (req.method) {
    case "POST":
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

      const gameDocument = await prisma.game.create({
        data: {
          type: GameType.WAR,
          playersId: playerDocuments.map((player) => player.id),
          winnerId:
            playerDocuments.find(
              (player) => player.name === game.winner().name()
            )?.id ?? null,
          gameOver: true,
          gameHistoryId: history.id,
        },
      });
      res.status(200).json(gameDocument);
      break;
    default:
      res.status(501).send("Not Implemented");
  }
}
