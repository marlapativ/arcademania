import { CustomResponse, CustomRequest } from '../types/config/express-types';
import * as favouritesService from '../services/favourite/favourite-service';
import { setResponse, setError } from '../utils/http-utils';
import { IFavouriteRequest } from '../types/models/feautures.types';
import { IFavourite } from '../types/models/feautures.types';

/**
 * It creates a user and returns the user object in the response
 * @param req - Http Request with <IUser> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const getFavourites = async (req: CustomRequest<IFavourite>, response: CustomResponse) => {
    try {
        const userId = req.user.userId;
        const data = favouritesService.getFavourites(userId);
        setResponse(response, data);
    } catch (err) {
        setError(response, err);
    }
}

export const setFavourite = async (req: CustomRequest<IFavouriteRequest>, response: CustomResponse) => {
    try {
        const gameId = parseInt(req.params.id);
        const userId = req.user.userId;
        const isFav = req.body.isFavourite;
        const data = await favouritesService.setFavourite(gameId, userId, isFav);
        setResponse(response, data);
    } catch (err) {
        setError(response, err);
    }
}
