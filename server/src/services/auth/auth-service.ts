import { IUser, ISignINUser } from "../../types/models/user-types";
import { User } from "../../models/index";
import { comparePassword } from "../../config/crypto";
import { authSecret } from "../../config/auth-config";
import jwt from 'jsonwebtoken'
import logger from "../../config/logger";

export const createUser = async (user: IUser) => {
  const newUser = new User(user);
  return newUser.save();
};

export const loginUser = async (SignINuser: ISignINUser) => {
  const user =  await User.findOne({
    raw: true,
    where: {
    username: SignINuser.username,
  }});
    if (!user) {
      throw new Error("User Not found");
    }

    const passwordIsValid = await comparePassword(SignINuser.password, (await user).password);
    if (!passwordIsValid) {
      throw new Error("Invalid Password");
    }
    else{
    const token = jwt.sign({ id: user.id }, authSecret.secret, {
      expiresIn: 86400,
    });

    const resfreshToken = jwt.sign({ type: 'refresh' }, authSecret.secret, {
        expiresIn: '2h'
      });

    const res = {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
      refreshToken: resfreshToken
    }
    return res;
  }
};
