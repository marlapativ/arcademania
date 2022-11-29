import { ILeaderboardGameData } from "../../types/models/leaderboard.types";
import { Leaderboard } from "../../models/leaderboard/leaderboard";

export const getLeaderboard = (
  gameId: number
): Promise<ILeaderboardGameData[]> => {
  if(gameId === 0){
    // TODO: Fill this
    // 1. Need to sum all the scores by user
    // 2. Sort by score and get the top 10.
    // 3. Cast to response object. Refer below.
    return Promise.resolve([]);
  }


  const data = Leaderboard.aggregate<ILeaderboardGameData>([
    {
      $match: {
        gameId,
      },
    },
    {
      $sort: {
        score: -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $addFields: {
        userObjectId: {
          $toObjectId: "$userId",
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userObjectId",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $set: {
        userData: {
          $first: "$userData",
        },
      },
    },
    {
      $project: {
        gameId: 1,
        userId: 1,
        score: 1,
        name: "$userData.name",
        icon: "$userData.icon",
      },
    },
  ]).exec();

  return data;
};
