import passport from 'passport';
import { CustomResponse, CustomRequest } from '../types/config/express-types';
import * as authService from '../services/auth/auth-service';
import { ISignInUser, IUser } from '../types/models/user.types';
import { setResponse, setError } from '../utils/http-utils';
import logger from '../config/logger';

/**
 * It creates a user and returns the user object in the response
 * @param req - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const createUser = async (req: CustomRequest<IUser>, response: CustomResponse) => {
    try {
        const user = await authService.createUser(req.body);
        setResponse(response, user);
    } catch (err) {
        setError(response, err);
    }
}

/**
 * It logsIn a user and returns the accesstoken in the response
 * @param req - Http Request with <ISignINUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const loginUser = async (req: CustomRequest<ISignInUser>, response: CustomResponse) => {
    try {
        const userWithToken = await authService.loginUser(req.body)
        setResponse(response, userWithToken);
    } catch (err) {
        if(err.message === 'User Not found.')
            setError(response, err, 404);
        else if(err.message === 'Invalid Password')
            setError(response, err, 401);
        else
            setError(response, err, 500);
    }
}

/**
 * It logsIn a user with google profile and returns the accesstoken in the response
 * @param req - Http Request with <ISignINUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const loginUserWithGoogle = async () => {
   const user = passport.authenticate('google', {scope:['email', 'profile']});
   logger.log(user);

}

/**
 * It updates the user details and returns the updated object
 * @param req - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const updateProfile = async (req: CustomRequest<IUser>, response: CustomResponse) => {
    try {
        const userId:number = parseInt(req.query.id as string, 10)
        const user = await authService.updateUser(userId,req.body);
        setResponse(response, user);
    } catch (err) {
        setError(response, err);
    }
}

/**
 * This is used to get the user details based on the access token
 * @param req - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const getUser = async(req: CustomRequest<IUser>, response: CustomResponse) => {
    try {
        const token = req.headers.authorization
        const user = authService.getUser(token);
        setResponse(response, user);
    } catch (err) {
        setError(response, err);
    }
}