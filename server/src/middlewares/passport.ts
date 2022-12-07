import { Strategy as GoogleStratergy } from "passport-google-oauth2";
import { User } from "../models/user/user";
import { PassportStatic } from "passport";
import passportenv from "../config/env-config";
import { generateAccessToken } from "./jwt";
import { CallbackError } from "mongoose";
import { ISavedUser, IUser } from "../types/models/user.types";

const applyGoogleStrategy = (passport: PassportStatic) => {
  passport.use(
    "google",
    new GoogleStratergy(
      {
        clientID: passportenv.GoogleClientId,
        clientSecret: passportenv.GoodleClientSecret,
        callbackURL: "http://localhost:8080/api/v1/auth/google/callback",
        scope: ["email", "profile"],
        passReqToCallback: true,
      },
      (
        req: any,
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) => {
        User.findOne(
          {
            email: profile.email,
          },
          (err: CallbackError, user: any) => {
            if (err) {
              return done(null, false);
            } else if (user) {
              req.user = { userId: user._id };
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
                  req.user = { userId: user._id };
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
