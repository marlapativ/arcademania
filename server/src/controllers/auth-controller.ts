import { CustomResponse, CustomRequest } from '../types/config/express-types';
import * as authService from '../services/auth/auth-service';
import { ISignINUser, IUser } from '../types/models/user-types';
import { setResponse, setError } from '../utils/http-utils';
import { request } from 'express';
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
export const loginUser = async (req: CustomRequest<ISignINUser>, response: CustomResponse) => {
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