import authRouter from './auth/auth-router';
import { Express } from 'express'

import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

const routes = (app: Express) => {
    // Setting up swagger
    setupSwagger(app);

    // Signup Routes
    app.use('/', authRouter);
}

const setupSwagger = (app: Express) => {
    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
}

export default routes;
