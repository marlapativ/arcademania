import { IUser, ISignInUser } from "../../types/models/user.types";
import { User } from "../../models/index";
import { generateAccessToken, getUserFromJWT, generateRefreshAccessToken } from "../../middlewares/jwt";
import mongoose from "mongoose";

export const createUser = async (user: IUser) => {
  const newUser = new User(user);
  return newUser.save();
};

export const updateUser = async (id:number, user: IUser) => {
  return User.findByIdAndUpdate(id, user)
}

export const getUser = async (userId:mongoose.ObjectId) => {
  const user =  await User.findById(userId);
  if (!user) {
    throw new Error("User Not found");
  }
  return user;
}

export const loginUser = async (signInUser: ISignInUser) => {
  const user =  await User.findOne({
    username: signInUser.username
  });
    if (!user) {
      throw new Error("User Not found");
    }

    const passwordIsValid = await user.comparePassword(signInUser.password);
    if (!passwordIsValid) {
      throw new Error("Invalid Password");
    }
    else{
    const aToken: string =  generateAccessToken(user.id);

    const refreshToken = generateRefreshAccessToken(user.id);

    const res = {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: aToken,
      refreshToken
    }
    return res;
  }
};
