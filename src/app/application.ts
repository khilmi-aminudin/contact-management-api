import express, { Express } from 'express';
import publicRouter from '../router/public-route';
import dotenv from 'dotenv'
import { errorMiddleware } from '../middleware/error-middleware'
import authRoute from '../router/auth-route';

const app: Express = express();

app.use(express.json());

app.use(publicRouter.router)
app.use(authRoute.router)

app.use(errorMiddleware)


const start = () => {
    try{
        dotenv.config()
    
        const port = process.env.PORT || 8080
        
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
    } catch (error) {
        console.error('Error during startup:', error);
    }
}

export default {
    start
};
