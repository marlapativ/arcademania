import SignupRouter from './auth/signup-router';
import { Express } from 'express'

const routes = (app: Express) => {
    app.use('/auth/signup', SignupRouter);
}

export default routes;
