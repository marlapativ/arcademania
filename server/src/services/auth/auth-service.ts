import { IUser, ISignInUser } from "../../types/models/user.types";
import { User } from "../../models/index";
import { generateAccessToken, generateRefreshAccessToken } from "../../middlewares/jwt";
import passport from "passport";

/**
 * This method used to create a new user
 * @param user - user object of type IUser with the details of user 
 */
export const createUser = async (user: IUser) => {
  const newUser = new User(user);
  newUser.save();
  const userSignIN = {
    username: newUser.username,
    password: newUser.password,
  }
  return loginUser(userSignIN);
};

/**
 * This method is used to generate the accesstoken for the valid users
 * @param signInUser - user object with username and password
 */
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
