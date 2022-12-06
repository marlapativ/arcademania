import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import mongoose from 'mongoose'
import logger from './config/logger';

import passport from 'passport';
import { applyPassportStrategies } from './middlewares/passport';
/*
 * Port to host the server
 */
const port = 8081;

// Database Connection
mongoose.connect('mongodb://localhost:27017/Users', (err) => {
    if (err) {
        logger.error(`Unable to connect to MongoDB database: ${err}`);
    }
});

/**
 * Creating express server
 */
const app = express();

// Express Server Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

// Passport Setup
applyPassportStrategies(passport);
app.use(passport.initialize());

// Custom routing
routes(app);

// Enable Server to listen on port
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});