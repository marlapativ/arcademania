export type LeaderboardItemProps = {
  icon?: string;
  index?: number;
  id: number;
  name: string;
  score: number;
};

export type LeaderboardItemContainerProps = {
  users: LeaderboardItemProps[];
};
