// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Player from "@/lib/game/Player";
import WarGame from "@/lib/game/WarGame";
import prisma from "@/lib/prisma";
import { Game, GameHistory, GameType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
  players: string[];
  gameType: GameType;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | (Game & {
        gameHistory: GameHistory | null;
        players: Player[];
        winner: Player;
      })
    | string
  >
) {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).send("Bad Request");
  }
  switch (req.method) {
    case "GET":
      const game = await prisma.game.findUnique({
        where: { id: id as string },
        include: {
          gameHistory: true,
          players: true,
          winner: true,
        },
      });
      return res.status(200).json(game);
    default:
      res.status(501).send("Not Implemented");
  }
}
