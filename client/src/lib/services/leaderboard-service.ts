import type {
  LeaderboardItemData,
  SaveScoreResponse,
} from "lib/types/components/leaderboard/leaderboard.types";

const getMockLeaderboardData = (gameId: number): LeaderboardItemData[] => {
  if (gameId === 1) {
    return [
      {
        id: 1,
        name: "Teja",
        score: 3400,
      },
      {
        id: 2,
        name: "Sai",
        score: 2400,
      },
      {
        id: 3,
        name: "Veronica",
        score: 1400,
      },
      {
        id: 4,
        name: "Vello",
        score: 1400,
      },
      {
        id: 5,
        name: "Vello",
        score: 1400,
      },
      {
        id: 6,
        name: "Vello",
        score: 1400,
      },
      {
        id: 7,
        name: "Vello",
        score: 1400,
      },
      {
        id: 8,
        name: "Vello",
        score: 1400,
      },
    ];
  }
  return [];
};

const getMockSaveScoreData = (
  gameId: number,
  userId: number,
  score: number
): SaveScoreResponse => {
  return {
    score: {
      id: 1,
      gameId,
      score,
      userId,
    },
  };
};

export const getLeaderboard = async (id: number) => {
  //   function raiseAlert(err: Error) {
  //     // eslint-disable-next-line no-console
  //     console.error(err);
  //   }
  //   return axios
  //     .get<LeaderboardItemData[]>(`${API_URL}leaderboard\${id}`)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       raiseAlert(error);
  //       const data: LeaderboardItemData[] = [];
  //       return data;
  //     });

  return Promise.resolve<LeaderboardItemData[]>(getMockLeaderboardData(id));
};

export const saveScore = async (
  gameId: number,
  userId: number,
  score: number
) => {
  // return axios
  //   .post<SaveScoreResponse>(`${API_URL}leaderboard\${id}`, {
  //     userId,
  //     score,
  //   })
  //   .then((response) => response.data)
  //   .catch((error) => {
  //     raiseAlert(error);
  //     const data: LeaderboardItemData[] = [];
  //     return data;
  //   });

  return Promise.resolve<SaveScoreResponse>(
    getMockSaveScoreData(gameId, userId, score)
  );
};
