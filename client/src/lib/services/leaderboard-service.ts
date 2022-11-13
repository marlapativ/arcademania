import type { LeaderboardItemData } from "lib/types/components/Leaderboard/leaderboard";

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
      icon: "https://s.gravatar.com/avatar/0fd4415ee5dca68c65ee8171cbeb4d24?s=80",
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
      icon: "https://i.pravatar.cc/200",
    },
    {
      id: 4,
      name: "Vello",
      score: 1400,
      icon: "https://i.pravatar.cc/300",
    },
    {
      id: 5,
      name: "Vello",
      score: 1400,
      icon: "https://i.pravatar.cc/400",
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
