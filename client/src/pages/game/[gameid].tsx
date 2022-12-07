import { useRouter } from "next/router";

import ErrorPage404 from "lib/components/404/ErrorPage404";
import GameDashboard from "lib/components/gameDashboard/GameDashboard";
import { isValidGameId } from "lib/components/games";

/**
 * NextJS Page to render Games.
 *
 * @returns Game Dashboard.
 */
const GamePage = () => {
  const router = useRouter();
  const { gameid } = router.query;
  const id = parseInt(gameid as string, 10);
  return isValidGameId(id) ? <GameDashboard id={id} /> : <ErrorPage404 />;
};

export default GamePage;
