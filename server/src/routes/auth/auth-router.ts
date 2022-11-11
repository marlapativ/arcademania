import express from 'express';
import * as authController from "../../controllers/auth-controller";

// Creating a new Router for Auth
const router = express.Router();

// Singup Route
router.route('/auth/signup').post(authController.createUser);;


export default router;