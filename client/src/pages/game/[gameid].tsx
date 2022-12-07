import { useRouter } from "next/router";

import GameDashboard from "lib/components/gameDashboard/GameDashboard";

/**
 * NextJS Page to render Games.
 *
 * @returns Game Dashboard.
 */
const GamePage = () => {
  const router = useRouter();
  const { gameid } = router.query;
  const id = parseInt(gameid as string, 10);
  return <GameDashboard id={id} />;
};

export default GamePage;
