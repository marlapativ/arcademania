import express from 'express';
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
router.route('/auth/googleSignIn').post(authController.loginUserWithGoogle);


// getUser Route
router.route('/auth/getUser').get(authController.getUser);

export default router;
