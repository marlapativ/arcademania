import { Favourites } from "../../models/favourites/favourites";
import { IGameUserEntity } from "../../types/models/common.types";
import { IFavourite } from "../../types/models/feautures.types";
import mongoose from "mongoose";

export const getFavourites = async (
  userId: mongoose.ObjectId
): Promise<IGameUserEntity[]> => {
  return Favourites.find({
    userId,
  })
    .limit(5)
    .exec();
};

export const setFavourite = async (
  gameId: number,
  userId: mongoose.ObjectId,
  isFavourite: boolean
) => {
  const filter: IFavourite = {
    userId,
    gameId,
  };
  if (isFavourite) {
    Favourites.findOneAndUpdate(
      filter,
      {
        filter,
      },
      { upsert: true, new: true }
    );
  } else {
    await Favourites.findOneAndDelete(filter);
  }
};
