// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  wins: number;
  losses: number;
}[];

interface RequestBody {
  playerName: string;
}

const allStatsPipeline = [
  {
    $group:
      /**
       * _id: The id of the group.
       * fieldN: The first field name.
       */
      {
        _id: "$winnerId",
        wins: {
          $count: {},
        },
      },
  },
  {
    $lookup:
      /**
       * from: The target collection.
       * localField: The local join field.
       * foreignField: The target join field.
       * as: The name for the results.
       * pipeline: Optional pipeline to run on the foreign collection.
       * let: Optional variables to use in the pipeline field stages.
       */
      {
        from: "Player",
        localField: "_id",
        foreignField: "_id",
        as: "winner",
      },
  },
  {
    $unwind:
      /**
       * path: Path to the array field.
       * includeArrayIndex: Optional name for index.
       * preserveNullAndEmptyArrays: Optional
       *   toggle to unwind null and empty values.
       */
      {
        path: "$winner",
        preserveNullAndEmptyArrays: true,
      },
  },
  {
    $addFields:
      /**
       * newField: The new field name.
       * expression: The new field expression.
       */
      {
        name: "$winner.name",
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _id: 0,
        winner: 0,
      },
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  const { playerName } = req.query as unknown as RequestBody;

  if (req.method !== "GET") {
    return res.status(501).send("Not Implemented");
  }

  if (playerName !== undefined) {
    const playerDocument = await prisma.player.findUnique({
      where: {
        name: playerName,
      },
    });

    if (playerDocument === null) {
      return res.status(404).send("Player Not Found");
    }

    const winningGames = await prisma.game.findMany({
      where: { winnerId: playerDocument.id },
    });

    const totalGames = await prisma.game.count({});
    res.status(200).json([
      {
        name: playerDocument.name,
        wins: winningGames.length,
        losses: totalGames - winningGames.length,
      },
    ]);
  } else {
    const totalGames = await prisma.game.count({});
    const winners = await prisma.game.aggregateRaw({
      pipeline: allStatsPipeline,
    });
    const result = Object(winners).map(
      (winner: { name: string; wins: number }) => ({
        ...winner,
        losses: totalGames - winner.wins,
      })
    );

    res.status(200).json(result);
  }
}
