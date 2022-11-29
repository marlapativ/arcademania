import { CustomResponse, CustomRequest } from '../types/config/express-types';
import * as leaderboardService from '../services/leaderboard/leaderboard-service';
import { setResponse, setError } from '../utils/http-utils';
import { request } from 'express';
import logger from '../config/logger';
import { isValid } from '../config/validators';

/**
 * It creates a user and returns the user object in the response
 * @param req - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const getLeaderboard = async (req: CustomRequest<any>, response: CustomResponse) => {
    try {
        const gameId = req.params.id;
        const id = isValid(gameId) ? parseInt(gameId, 10) : 0;
        const data = await leaderboardService.getLeaderboard(id);
        setResponse(response, data);
    } catch (err) {
        setError(response, err);
    }
}
