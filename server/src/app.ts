import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import mongoose from 'mongoose'
import logger from './config/logger';

import passport from 'passport';
import { applyPassportStrategies } from './middlewares/passport';
import * as dotenv from 'dotenv';
import session from 'express-session';
/*
 * Port to host the server
 */
const port = 8080;

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
dotenv.config();

// Express Server Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

// Passport Setup
app.use(session({ secret: 'SECRET' }));
applyPassportStrategies(passport);
app.use(passport.initialize());
app.use(passport.session());


// Custom routing
routes(app);

// Enable Server to listen on port
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});