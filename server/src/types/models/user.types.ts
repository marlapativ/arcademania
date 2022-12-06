import mongoose from "mongoose";

export interface IUser {
    name: string,
    email: string,
    username: string,
    password: string,
    comparePassword: (password: string) => Promise<boolean>;
}

export interface ISignInUser{
    username: string,
    password: string
}

export interface IUserInfo {
    userId: mongoose.ObjectId;
    name: string;
    icon?: string;
};