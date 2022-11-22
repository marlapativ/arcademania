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
  User.findOne({
    username: SignINuser.username,
  }).exec((err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      err.message = "User Not found.";
      throw err;
    }

    const passwordIsValid = comparePassword(SignINuser.password, user.password);

    if (!passwordIsValid) {
      err.message = "Invalid Password";
      throw err;
    }

    const token = jwt.sign({ id: user.id }, authSecret.secret, {
      expiresIn: 86400,
    });

    const response = {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    }
    logger.info(response)

    return response;
  });
};
