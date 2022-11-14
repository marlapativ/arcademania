import type { UserInfo } from "../common";

export type LeaderboardItemData = UserInfo & {
  index?: number;
  score: number;
};

export type ScoreData = {
  id: number;
  gameId: number;
  userId: number;
  score: number;
};

export type LeaderboardItemContainerProps = {
  users: LeaderboardItemData[];
};

export type SaveScoreResponse = {
  score: ScoreData;
  leaderboard: LeaderboardItemData[];
};
