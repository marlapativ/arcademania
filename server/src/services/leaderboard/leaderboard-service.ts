import {
  ILeaderboardGameData,
  ILeaderboard,
} from "../../types/models/leaderboard.types";
import { Leaderboard } from "../../models/leaderboard/leaderboard";
import mongoose from "mongoose";

export const getLeaderboard = (
  gameId: number
): Promise<ILeaderboardGameData[]> => {
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

export const saveScore = (
  gameId: number,
  userId: mongoose.ObjectId,
  score: number
): Promise<ILeaderboard> => {
  const newRecord = new Leaderboard({
    gameId,
    userId,
    score,
  });
  return newRecord.save();
}
