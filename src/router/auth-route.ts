import express, {Router} from 'express';
import userController from '../controller/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/api/v1/users/current', userController.get)

export default {
    router
}
