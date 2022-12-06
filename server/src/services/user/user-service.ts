import mongoose from "mongoose";
import { User } from "../../models";
import { IUser } from "../../types/models/user.types";

export const updateUser = async (id:number, user: IUser) => {
    const updatedUser =  await User.findByIdAndUpdate(id, user);
    if (!updatedUser) {
      throw new Error("User Update failed ");
    }
    return updatedUser;
  }
  
  export const getUser = async (userId:mongoose.ObjectId) => {
    const user =  await User.findById(userId);
    if (!user) {
      throw new Error("User Not found");
    }
    return user;
  }