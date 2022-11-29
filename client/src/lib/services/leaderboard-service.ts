import axios from "axios";

import { API_URL } from "lib/config/config";
import type {
  LeaderboardItemData,
  SaveScoreResponse,
} from "lib/types/components/leaderboard/leaderboard.types";

const raiseAlert = (err: Error) => {
  // eslint-disable-next-line no-console
  console.error(err);
};

export const getLeaderboard = async (id: number) => {
  const url = `${API_URL}leaderboard/${id}`;
  return axios
    .get<LeaderboardItemData[]>(url)
    .then((response) => response.data)
    .catch((error) => {
      raiseAlert(error);
      const data: LeaderboardItemData[] = [];
      return data;
    });
};

export const saveScore = async (
  gameId: number,
  userId: number,
  score: number
) => {
  return axios
    .post<SaveScoreResponse>(`${API_URL}leaderboard\${id}`, {
      userId,
      score,
    })
    .then((response) => response.data)
    .catch((error) => {
      raiseAlert(error);
      return [];
    });
};
