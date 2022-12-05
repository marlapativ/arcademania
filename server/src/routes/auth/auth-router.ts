import express from 'express';
import passport from 'passport';
import * as authController from "../../controllers/auth-controller";

// Creating a new Router for Auth
const router = express.Router();

// Signup Route
router.route('/auth/signup').post(authController.createUser);

// Signin Route
router.route('/auth/signin').post(authController.loginUser);

// UpdateProfile Route
router.route('/auth/updateProfile').post(authController.updateProfile)

// Logout Route
router.get("/auth/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
      });
    res.redirect("/logoutsuccess");
})

// Google Signin Route
router.get('/auth/google', async (req, res) => {
    passport.authenticate('google', {scope:['email', 'profile']})(req, res);
});


// getUser Route
router.route('/auth/getUser').get(authController.getUser);

export default router;