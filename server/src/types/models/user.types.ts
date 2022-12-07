import mongoose from "mongoose";

/**
 * User Entity.
 */
export interface IUser {
    name: string,
    email: string,
    username: string,
    password: string,
    comparePassword: (password: string) => Promise<boolean>;
}

/**
 * SignIn User Entity.
 */
export interface ISignInUser{
    username: string,
    password: string
}

/**
 * User Info Entity.
 */
export interface IUserInfo {
    userId: mongoose.ObjectId;
    name: string;
    icon?: string;
};