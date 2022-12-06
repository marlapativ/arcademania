import mongoose from 'mongoose';
import { IGameUserEntity } from './common.types';

export interface IFavourite extends IGameUserEntity {
}

export interface IFavouriteRequest extends IFavourite {
    isFavourite: boolean;
}