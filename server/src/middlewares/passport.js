import passport from 'passport';
import {Strategy as GoogleStratergy} from "passport-google-oauth2";
import { User } from "../../models/index";
import jwt from 'jsonwebtoken'

passport.use('google', new GoogleStratergy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/googleSignIn"
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
            const token = await jwt.sign({id: newUser._id, created: Date.now().toString()}, process.env.SECRET);
            newUser.token.push(token);
            await newUser.save();
            done(null, newUser, {message: "Auth successful", token})
        }else{
            const token = await jwt.sign({id: obj._id, created: Date.now().toString()}, process.env.SECRET);
            obj.token.push(token);
            await obj.save();
            done(null, obj, {message: "Auth Successful", token})
        }
    }catch(err){
        console.error(err);
        done(err, false, {message: "Internal Server Error"})
    }
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());