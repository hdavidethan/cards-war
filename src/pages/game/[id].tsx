import { useRouter } from "next/router";

export default function GamePage() {
  const router = useRouter();
  const { id: gameId } = router.query;

  return <></>;
}
