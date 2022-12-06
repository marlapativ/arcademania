import { authSecret } from "../config/auth-config";
import jwt from 'jsonwebtoken'

export const getUserFromJWT = (token: string) => {
    return jwt.verify(token, authSecret.secret)
}

export const generateAccessToken = (userId: number) => {
   return jwt.sign({ id: userId }, authSecret.secret, {
        expiresIn: 86400,
      });
}

export const generateRefreshAccessToken = (userId: number) => {
    return jwt.sign({ id: userId, type:"refresh"}, authSecret.secret, {
         expiresIn: 86400,
       });
 }