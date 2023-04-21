import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export default function LeaderboardTable() {
  const { data, error, isLoading } = useSWR(
    "/api/player_stat",
    fetcher<{ wins: number; losses: number; name: string }[]>
  );
  if (error) {
    return <p>Cannot retrieve leaderboard</p>;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="relative overflow-x-auto my-5">
      <h2 className="text-xl mb-3">Leaderboard</h2>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Player
            </th>
            <th scope="col" className="px-6 py-3">
              Wins
            </th>
            <th scope="col" className="px-6 py-3">
              Losses
            </th>
            <th scope="col" className="px-6 py-3">
              W/L Ratio
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.sort((a, b) => b.wins / b.losses - a.wins / a.losses)
            .map((playerStat) => (
              <tr className="bg-white border-b" key={`game-${playerStat.name}`}>
                <td className="px-6 py-4">{playerStat.name}</td>
                <td className="px-6 py-4">{playerStat.wins}</td>
                <td className="px-6 py-4">{playerStat.losses}</td>
                <td className="px-6 py-4">
                  {(playerStat.wins / playerStat.losses).toFixed(2)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
