import mongoose from "mongoose";
import { User } from "../../models";
import { IUser } from "../../types/models/user.types";

/**
 * This method finds the user with the help of id and updates it with the given details
 * @param id - id value of type mongoose.ObjectId
 * @param user - user object of type IUser with the details of users that needs to be updated
 */
export const updateUser = async (id:mongoose.ObjectId, user: IUser) => {
    const updatedUser =  await User.findByIdAndUpdate(id, user);
    updatedUser.save();
    if (!updatedUser) {
      throw new Error("User Update failed ");
    }
    return updatedUser;
  }

/**
 * This method returns the user identified with the help of userId
 * @param userId - id value of type mongoose.ObjectId
 */
  export const getUser = async (userId:mongoose.ObjectId) => {
    const user =  await User.findById(userId);
    if (!user) {
      throw new Error("User Not found");
    }
    return user;
  }