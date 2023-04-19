// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  playerName: string;
  wins: number;
  losses: number;
};

interface RequestBody {
  playerName: string;
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  const { playerName } = req.query as RequestBody;
  if (!playerName) {
    return res.status(400).send("Bad Request");
  }

  const playerDocument = await prisma.player.findUnique({
    where: {
      name: playerName,
    },
  });

  if (playerDocument === null) {
    return res.status(404).send("Player Not Found");
  }

  switch (req.method) {
    case "GET":
      const winningGames = await prisma.game.findMany({
        where: { winnerId: playerDocument.id },
      });

      const totalGames = await prisma.game.count({});
      res.status(200).json({
        playerName: playerDocument.name,
        wins: winningGames.length,
        losses: totalGames - winningGames.length,
      });
      break;
    default:
      res.status(501).send("Not Implemented");
  }
}
