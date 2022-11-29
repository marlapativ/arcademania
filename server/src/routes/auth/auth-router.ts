import express from 'express';
import * as authController from "../../controllers/auth-controller";

// Creating a new Router for Auth
const router = express.Router();

// Signup Route
router.route('/auth/signup').post(authController.createUser);

// Signin Route
router.route('/auth/signin').post(authController.loginUser)


export default router;