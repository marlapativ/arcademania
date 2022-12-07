import passport from "passport";
import { CustomResponse, CustomRequest } from "../types/config/express-types";
import * as authService from "../services/auth/auth-service";
import { ISignInUser, IUser } from "../types/models/user.types";
import { setResponse, setError } from "../utils/http-utils";
import logger from "../config/logger";
import { generateAccessToken } from "../middlewares/jwt";

/**
 * It creates a user and returns the user object in the response
 * @param req - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const createUser = async (
  req: CustomRequest<IUser>,
  response: CustomResponse
) => {
  try {
    const user = await authService.createUser(req.body);
    setResponse(response, user);
  } catch (err) {
    setError(response, err);
  }
};

/**
 * It logsIn a user and returns the accesstoken in the response
 * @param req - Http Request with <ISignInUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const loginUser = async (
  req: CustomRequest<ISignInUser>,
  response: CustomResponse
) => {
  try {
    const userWithToken = await authService.loginUser(req.body);
    setResponse(response, userWithToken);
  } catch (err) {
    if (err.message === "User Not found.") setError(response, err, 404);
    else if (err.message === "Invalid Password") setError(response, err, 401);
    else setError(response, err, 500);
  }
};

/**
 * It logsIn a user with google profile and returns the accesstoken in the response
 */
export const authWithGoogleRoute = passport.authenticate("google",{
    passReqToCallback: true,
    session: false,
  }
);

export const triggerGoogleLoginResponse = async (
  req: CustomRequest<ISignInUser>,
  response: CustomResponse
) => {
  try {
    const user = req.user as any;
    const token = generateAccessToken(user.id);
    // setResponse(response, token);
    response.redirect(`http://localhost:3000?token=${token}`);
  } catch (err) {
    setError(response, err, 500);
  }
};
