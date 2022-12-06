import mongoose from 'mongoose';

export interface IEntity {
    id: mongoose.ObjectId;
};

export interface IGameUserEntity {
    gameId: number;
    userId: mongoose.ObjectId;
}