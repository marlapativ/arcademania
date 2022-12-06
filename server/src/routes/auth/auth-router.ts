import express from 'express';
import { authRoute } from '../../middlewares/authRoute';
import * as authController from "../../controllers/auth-controller";
import * as userController from "../../controllers/user-controller";

// Creating a new Router for Auth
const router = express.Router();

// Signup Route
router.route('/auth/signup').post(authController.createUser);

// Signin Route
router.route('/auth/signin').post(authController.loginUser);

// UpdateProfile Route
router.route('/auth/updateProfile').post(userController.updateProfile)

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


// getUser Route
router.route('/auth/getUser').get(authRoute, userController.getUser);

export default router;