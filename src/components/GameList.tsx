import fetcher from "@/lib/fetcher";
import { Player } from "@prisma/client";
import Link from "next/link";
import useSWR from "swr";

export default function GameList() {
  const { data } = useSWR("/api/game", fetcher);
  console.log(data);
  return (
    <div className="relative overflow-x-auto my-5">
      <h2 className="text-xl mb-3">Game History</h2>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Game ID
            </th>
            <th scope="col" className="px-6 py-3">
              Player 1
            </th>
            <th scope="col" className="px-6 py-3">
              Player 2
            </th>
            <th scope="col" className="px-6 py-3">
              Winner
            </th>
            <th scope="col" className="px-6 py-3">
              Turns
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((game) => {
            return (
              <tr className="bg-white border-b" key={`game-${game.id}`}>
                <td className="px-6 py-4 underline">
                  <Link href={`/game/${game.id}`}>{game.id}</Link>
                </td>
                <td className="px-6 py-4">
                  {
                    game.players?.find(
                      (player: Player) => player.id === game.playersId?.[0]
                    ).name
                  }
                </td>
                <td className="px-6 py-4">
                  {
                    game.players?.find(
                      (player: Player) => player.id === game.playersId?.[1]
                    ).name
                  }
                </td>
                <td className="px-6 py-4">{game.winner?.name}</td>
                <td className="px-6 py-4">{game.gameHistory?.moves.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
