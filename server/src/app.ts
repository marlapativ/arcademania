import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import mongoose from 'mongoose'
import logger from './config/logger';

/*
 * Port to host the server
 */
const port = 8080;

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

// Custom routing
routes(app);

// Database Connection
mongoose.connect('mongodb+srv://abhi:abhi@cluster0.pxa5l.mongodb.net/tododb?retryWrites=true&w=majority', (err) => {
    if (err) {
        logger.error(`Unable to connect to MongoDB database: ${err}`);
    }
});

// Enable Server to listen on port
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});