import express from 'express';
import * as favouritesController from "../../controllers/favourites-controller";

// Creating a new Router for Favourites
const router = express.Router();

// Get Favourites
router.route('/favourites').get(favouritesController.getFavourites);

// Set Favourites
router.route('/favourites/:id').post(favouritesController.setFavourite);

// Reset Favourites
router.route('/favourites/:id').delete(favouritesController.resetFavourite);


export default router;