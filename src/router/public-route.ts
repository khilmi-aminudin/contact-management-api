import express, {Router, Request, Response} from 'express';
import userController from '../controller/user-controller'

const router: Router = express.Router();

router.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).json({
        "message" : "hello, i am okay!",
    })
})

router.post('/api/v1/auth/register', userController.register)
router.post('/api/v1/auth/login', userController.login)


export default {
    router
}