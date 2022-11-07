import { CustomResponse, CustomRequest } from '../types/config/express-types';
import * as signupService from '../services/auth/signup-service';
import { IUser } from '../types/models/user-types';
import { setResponse, setError } from '../utils/http-utils';

/**
 * It creates a user and returns the user object in the response
 * @param request - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const createUser = async (request: CustomRequest<IUser>, response: CustomResponse) => {
    try {
        const user = await signupService.createUser(request.body);
        setResponse(response, user);
    } catch (err) {
        setError(response, err);
    }
}