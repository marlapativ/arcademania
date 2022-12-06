import { Request, Response } from "express";
import { IUserInfo } from "../models/user.types";

export interface CustomRequest<T> extends Request {
    user?: IUserInfo
    body: T
}

// tslint:disable-next-line:no-empty-interface
export interface CustomResponse extends Response {
}