import express from 'express';
import * as leaderboardController from "../../controllers/leaderboard-controller";

// Creating a new Router for Auth
const router = express.Router();

// Get Global Leaderboard Route
router.route('/leaderboard').get(leaderboardController.getLeaderboard);

// Get Game Leaderboard Route
router.route('/leaderboard/:id').get(leaderboardController.getLeaderboard);

export default router;