import express from 'express';
import * as authController from "../../controllers/auth-controller";

// Creating a new Router for Auth
const router = express.Router();

// Signup Route
router.route('/auth/signup').post(authController.createUser);

// Signin Route
router.route('/auth/signin').post(authController.loginUser);

// Logout Route
router.get("/auth/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
      });
    res.redirect("/logoutsuccess");
})

// Google Signin Route
router.get('/auth/google', authController.loginUserWithGoogle);


export default router;