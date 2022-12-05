import { raiseError } from "../utils/toastUtils";
import axios from "lib/config/axios.config";
import { API_URL } from "lib/config/config";
import type {
  LeaderboardItemData,
  SaveScoreResponse,
} from "lib/types/components/leaderboard/leaderboard.types";

export const getLeaderboard = async (id: number) => {
  const url = `${API_URL}leaderboard/${id}`;
  return axios
    .get<LeaderboardItemData[]>(url)
    .then((response) => response.data)
    .catch((error) => {
      raiseError(error);
      const data: LeaderboardItemData[] = [];
      return data;
    });
};

export const saveScore = async (gameId: number, score: number) => {
  return axios
    .post<SaveScoreResponse>(`${API_URL}leaderboard/${gameId}`, {
      score,
    })
    .then((response) => response.data)
    .catch((error) => {
      raiseError(error);
      return [];
    });
};
