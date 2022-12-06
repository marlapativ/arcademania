import { CustomResponse, CustomRequest } from '../types/config/express-types';
import * as favouritesService from '../services/favourite/favourite-service';
import { setResponse, setError } from '../utils/http-utils';
import { IFavourite } from '../types/models/features.types';
import { IGameUserEntity } from '../types/models/common.types';

/**
 * It creates a user and returns the user object in the response
 * @param req - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const getFavourites = async (req: CustomRequest<IFavourite>, response: CustomResponse) => {
    try {
        const userId = req.user.userId;
        const data = await favouritesService.getFavourites(userId);
        setResponse(response, data || []);
    } catch (err) {
        setError(response, err);
    }
}

const handleFavourite = async (req: CustomRequest<IFavourite>, response: CustomResponse, isFavourite: boolean) => {
    try {
        const gameId = parseInt(req.params.id, 10);
        const userId = req.user.userId;
        const data = await favouritesService.setFavourite(gameId, userId, isFavourite);
        let result: IGameUserEntity[] = [];
        if(data) result = [data];
        setResponse(response, result);
    } catch (err) {
        setError(response, err);
    }
}

export const setFavourite = async (req: CustomRequest<IFavourite>, response: CustomResponse) => {
    handleFavourite(req, response, true);
}

export const resetFavourite = async (req: CustomRequest<IFavourite>, response: CustomResponse) => {
    handleFavourite(req, response, false);
}