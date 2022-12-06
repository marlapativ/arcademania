import { Favourites } from "../../models/favourites/favourites";
import { IGameUserEntity } from "../../types/models/common.types";
import { IFavourite } from "../../types/models/features.types";
import mongoose from "mongoose";

export const getFavourites = async (
  userId: mongoose.ObjectId
): Promise<IGameUserEntity[]> => {
  return Favourites.find(
    {
      userId,
    },
    { _id: 0, gameId: 1, createdDate: 1 }
  )
    .limit(5)
    .exec();
};

export const setFavourite = (
  gameId: number,
  userId: mongoose.ObjectId,
  isFavourite: boolean
): Promise<IGameUserEntity> => {
  const filter: IFavourite = {
    userId,
    gameId,
  };
  if (isFavourite) {
    return Favourites.findOneAndUpdate(
      filter,
      {
        filter,
      },
      {
        upsert: true,
        new: true,
        projection: { _id: 0, gameId: 1, createdDate: 1 },
      }
    ).exec();
  } else {
    return Favourites.findOneAndDelete(filter, { new: true }).exec();
  }
};
