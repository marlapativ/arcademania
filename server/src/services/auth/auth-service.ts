import { IUser, ISignInUser } from "../../types/models/user.types";
import { User } from "../../models/index";
import { comparePassword } from "../../config/crypto";
import { authSecret } from "../../config/auth-config";
import jwt from 'jsonwebtoken';

export const createUser = async (user: IUser) => {
  const newUser = new User(user);
  return newUser.save();
};

export const loginUser = async (signInUser: ISignInUser) => {
  const user =  await User.findOne({
    raw: true,
    where: {
    username: signInUser.username,
  }});
    if (!user) {
      throw new Error("User Not found");
    }

    const passwordIsValid = await comparePassword(signInUser.password, (await user).password);
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
