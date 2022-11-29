import { IUserInfo } from "./user.types";
import mongoose from 'mongoose';

export interface ILeaderboard {
    gameId: mongoose.ObjectId,
    userId: mongoose.ObjectId,
    score: number;
}

export interface ILeaderboardGameData extends IUserInfo {
    gameId: mongoose.ObjectId,
    score: number;
}
