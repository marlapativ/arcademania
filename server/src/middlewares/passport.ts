import { Strategy as GoogleStratergy } from "passport-google-oauth2";
import { User } from "../models/user/user";
import jwt from "jsonwebtoken";
import logger from "../config/logger";
import { PassportStatic } from "passport";
import passportenv from '../config/env-config';

const applyGoogleStrategy = (passport: PassportStatic) => {
  passport.use(
    "google",
    new GoogleStratergy(
      {
        clientID: passportenv.GoogleClientId,
        clientSecret: passportenv.GoodleClientSecret,
        callbackURL: "http://localhost:8080/auth/google/callback",
        scope: ['email', 'profile']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const obj = await User.findOne({ email: profile.email });
          if (!obj) {
            const newUser = new User({
              email: profile.email,
              name: profile.displayName,
              username: profile.email,
              password: 'password'
            });
            await newUser.save();
            const token = await jwt.sign(
              { id: newUser._id, created: Date.now().toString() },
              "32c32774b99cc4bda1da32f3a096be03"
            );
            done(null, newUser, { message: "Auth successful" });
          } else {
            const token = await jwt.sign(
              { id: obj._id, created: Date.now().toString() },
              "32c32774b99cc4bda1da32f3a096be03"
            );
            done(null, obj, { message: "Auth Successful" });
          }
        } catch (err) {
          logger.error(err);
          done(err, false, { message: "Internal Server Error" });
        }
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

  passport.deserializeUser((user, done) =>{
    done(null, user);
  });
};

