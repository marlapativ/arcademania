import { CustomResponse, CustomRequest } from '../types/config/express-types';
import * as userService from '../services/user/user-service';
import { setResponse, setError } from '../utils/http-utils';
import { IUser } from '../types/models/user.types';

/**
 * It updates the user details and returns the updated object
 * @param req - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const updateProfile = async (req: CustomRequest<IUser>, response: CustomResponse) => {
    try {
        const userId = req.user.userId;
        const user = await userService.updateUser(userId,req.body);
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
        const userId = req.user.userId;
        const user = await userService.getUser(userId);
        setResponse(response, user);
    } catch (err) {
        setError(response, err);
    }
}