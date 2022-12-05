import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import mongoose from 'mongoose'
import logger from './config/logger';
import session from 'express-session';

import passport from 'passport';
import {Strategy as GoogleStratergy} from "passport-google-oauth2";
import { User } from "./models/user/user";
import jwt from 'jsonwebtoken'

/*
 * Port to host the server
 */
const port = 8080;

// Database Connection
mongoose.connect('mongodb://localhost:27017/Users', (err) => {
    if (err) {
        logger.error(`Unable to connect to MongoDB database: ${err}`);
    }
});

/**
 * Creating express server
 */
const app = express();

// Express Server Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use('google', new GoogleStratergy({
    clientID: '22014990618-hd5bkqr2r4mida0ou8s7ginjbtikjnok.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8080/auth/google/callback"
}, async(accessToken, refreshToken, profile, done) => {
    try{
        const obj = await User.findOne({email: profile.email});
        if(!obj){
            const newUser = new User({
                email: profile.email,
                name: profile.displayName,
                accessToken
            })
            await newUser.save();
            const token = await jwt.sign({id: newUser._id, created: Date.now().toString()}, '32c32774b99cc4bda1da32f3a096be03');
            newUser.token.push(token);
            await newUser.save();
            done(null, newUser, {message: "Auth successful"})
        }else{
            const token = await jwt.sign({id: obj._id, created: Date.now().toString()}, '32c32774b99cc4bda1da32f3a096be03');
            obj.token.push(token);
            await obj.save();
            done(null, obj, {message: "Auth Successful"})
        }
    }catch(err){
        logger.error(err);
        done(err, false, {message: "Internal Server Error"})
    }
}));

app.get('/auth/google/callback',
passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/error'
}))

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Custom routing
routes(app);

// Enable Server to listen on port
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});