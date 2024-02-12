import express, {Router} from 'express';
import userController from '../controller/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/api/v1/users/current', userController.get)
router.patch('/api/v1/users/current', userController.update)

router.post('/api/v1/auth/logout', userController.logout)

export default {
    router
}
