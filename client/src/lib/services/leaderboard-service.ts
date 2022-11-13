import type { LeaderboardItemData } from "lib/types/components/leaderboard/leaderboard.types";

export const getLeaderboard = async () => {
  //   function raiseAlert(err: Error) {
  //     // eslint-disable-next-line no-console
  //     console.error(err);
  //   }
  //   return axios
  //     .get<LeaderboardItemData[]>(`${API_URL}leaderboard`)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       raiseAlert(error);
  //       const data: LeaderboardItemData[] = [];
  //       return data;
  //     });

  return Promise.resolve<LeaderboardItemData[]>([
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
  ]);
};
