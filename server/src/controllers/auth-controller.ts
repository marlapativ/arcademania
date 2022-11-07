import { CustomResponse, CustomRequest } from '../types/config/express-types';
import * as signupService from '../services/auth/signup-service';
import { IUser } from '../types/models/user-types';

/**
 * Sets the response status code to 200, and then sends the object as a JSON response
 * @param obj - The object to be returned to the client.
 * @param response - The response object that will be sent back to the client.
 */
const setResponse = (obj: any, response: CustomResponse) => {
    response.status(200);
    response.json(obj);
}

/**
 * Sets the response status to 500, and then sends the error as a JSON object
 * @param err - The error object that was thrown.
 * @param response - the response object that we're going to use to send back a response to the client
 */
const setError = (err: Error, response: CustomResponse) => {
    response.status(500);
    response.json(err);
}
/**
 * It creates a user and returns the user object in the response
 * @param request - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */

export const createUser = async (request: CustomRequest<IUser>, response: CustomResponse) => {
    try {
        const user = await signupService.createUser(request.body);
        setResponse(user, response);
    } catch (err) {
        setError(err, response);
    }
}