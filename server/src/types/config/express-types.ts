import { Request, Response } from "express";

export interface CustomRequest<T> extends Request {
    body: T
}

// tslint:disable-next-line:no-empty-interface
export interface CustomResponse extends Response {
}