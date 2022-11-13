import type { UserInfo } from "../common";

export type LeaderboardItemData = UserInfo & {
  index?: number;
  score: number;
};

export type LeaderboardItemContainerProps = {
  users: LeaderboardItemData[];
};
