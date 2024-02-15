import express, {Router} from 'express';
import userController from '../controller/user-controller'
import contactController from '../controller/contact-controller'
import addressController from '../controller/address-controller'
import { authMiddleware } from '../middleware/auth-middleware'

const router: Router = express.Router();

router.use(authMiddleware);

// user api
router.get('/api/v1/users/current', userController.get)
router.patch('/api/v1/users/current', userController.update)
router.post('/api/v1/auth/logout', userController.logout)

// contact api
router.post('/api/v1/contacts', contactController.create)
router.get('/api/v1/contacts/:id', contactController.get)
router.put('/api/v1/contacts/:id', contactController.update)
router.delete('/api/v1/contacts/:id', contactController.remove)
router.get('/api/v1/contacts', contactController.search)

// address api
router.post('/api/v1/contacts/:contactId/addresses', addressController.create)
router.put('/api/v1/contacts/:contactId/addresses/:addressId', addressController.update)
router.get('/api/v1/contacts/:contactId/addresses/:addressId', addressController.get)
router.get('/api/v1/contacts/:contactId/addresses', addressController.getAll)
router.delete('/api/v1/contacts/:contactId/addresses/:addressId', addressController.remove)

export default {
    router
}
