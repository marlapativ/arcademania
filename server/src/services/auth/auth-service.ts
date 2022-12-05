import { IUser, ISignInUser } from "../../types/models/user.types";
import { User } from "../../models/index";
import { authSecret } from "../../config/auth-config";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const createUser = async (user: IUser) => {
  const newUser = new User(user);
  return newUser.save();
};

export const updateUser = async (id:number, user: IUser) => {
  return User.findByIdAndUpdate(id, user)
}

export const getUser = async (token:string) => {
  const user = jwt.verify(token, authSecret.secret);
  return User.findById(JSON.parse(user.toString()).id);
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
    const aToken: string = jwt.sign({ id: user.id }, authSecret.secret, {
      expiresIn: 86400,
    });
    user.accesstoken = aToken;
    user.token.push(aToken);
    user.save();

    const refreshToken = jwt.sign({ type: 'refresh' }, authSecret.secret, {
        expiresIn: '2h'
      });

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
