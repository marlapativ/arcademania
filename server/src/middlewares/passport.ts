import { Strategy as GoogleStratergy } from "passport-google-oauth2";
import { User } from "../models/user/user";
import jwt from "jsonwebtoken";
import logger from "../config/logger";
import { PassportStatic } from "passport";

const applyGoogleStrategy = (passport: PassportStatic) => {
  passport.use(
    "google",
    new GoogleStratergy(
      {
        clientID:
          "22014990618-hd5bkqr2r4mida0ou8s7ginjbtikjnok.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const obj = await User.findOne({ email: profile.email });
          if (!obj) {
            const newUser = new User({
              email: profile.email,
              name: profile.displayName,
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

