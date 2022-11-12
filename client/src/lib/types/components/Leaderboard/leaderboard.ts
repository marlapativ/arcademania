import type { UserInfo } from "../common";

export type LeaderboardItemProps = UserInfo & {
  index?: number;
  score: number;
};

export type LeaderboardItemContainerProps = {
  users: LeaderboardItemProps[];
};
