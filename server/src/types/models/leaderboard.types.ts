import { IUserInfo } from "./user.types";
import mongoose from 'mongoose';
import { IGameUserEntity } from "./common.types";

export interface ILeaderboard extends IGameUserEntity {
    score: number;
}

export interface ILeaderboardGameData extends IUserInfo {
    gameId: number,
    score: number;
}
