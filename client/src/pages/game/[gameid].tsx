import { useRouter } from "next/router";

import GameDashboard from "lib/components/gameDashboard/GameDashboard";

const GamePage = () => {
  const router = useRouter();
  const { gameid } = router.query;
  const id = parseInt(gameid as string, 10);
  return <GameDashboard id={id} />;
};

export default GamePage;
