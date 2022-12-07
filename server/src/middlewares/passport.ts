import { Strategy as GoogleStratergy } from "passport-google-oauth2";
import { User } from "../models/user/user";
import jwt from "jsonwebtoken";
import logger from "../config/logger";
import { PassportStatic } from "passport";
import passportenv from "../config/env-config";
import { generateAccessToken } from "./jwt";
import { CallbackError } from "mongoose";
import { IUser } from "../types/models/user.types";

const applyGoogleStrategy = (passport: PassportStatic) => {
  passport.use(
    "google",
    new GoogleStratergy(
      {
        clientID: passportenv.GoogleClientId,
        clientSecret: passportenv.GoodleClientSecret,
        callbackURL: "http://localhost:8080/api/v1/auth/google/callback",
        scope: ["email", "profile"],
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({
            email: profile.email,
          },
          (err: CallbackError, user: IUser) => {
            if (err) {
              return done(null, false);
            } else if (user) {
              return done(null, user);
            } else {
              const newUser = new User({
                email: profile.email,
                name: profile.displayName,
                username: profile.email,
                password: "Aas5dc7a@1239d",
              });
              newUser.save((err, savedUser) => {
                if (err) {
                  return done(null, false);
                } else {
                  return done(null, savedUser);
                }
              });
            }
          }
        );
      }
    )
  );
};

/**
 * Adds all the custom strategies to the PassportJS instance.
 *
 * @param passport PassportJS static instance.
 */
export const applyPassportStrategies = (passport: PassportStatic) => {
  applyGoogleStrategy(passport);
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
