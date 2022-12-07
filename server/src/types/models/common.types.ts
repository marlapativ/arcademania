import mongoose from 'mongoose';

/**
 * Mongoose Entity.
 */
export interface IEntity {
    id: mongoose.ObjectId;
};

/**
 * Game User Entity.
 */
export interface IGameUserEntity {
    gameId: number;
    userId: mongoose.ObjectId;
}