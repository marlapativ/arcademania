import express from "express";
import * as authController from "../../controllers/auth-controller";

// Creating a new Router for signup
const router = express.Router();

// POST
router.route('/').post(authController.createUser);

export default router;