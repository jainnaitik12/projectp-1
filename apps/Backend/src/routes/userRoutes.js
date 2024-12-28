import { Router } from 'express';
import UserController from '../controllers/user/userController.js';
import auth from '../middlewares/auth.middlewares.js';

const router = Router();
const userController = new UserController();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.post('/refresh-token', userController.refreshToken);
router.post('/verify-email', userController.verifyEmailByToken);

// Protected routes
router.use(auth); // Apply authentication middleware to all routes below
router.get('/me', userController.getCurrentUser);
router.post('/logout', userController.logout);
router.patch('/profile', userController.updateProfile);
router.post('/verify-email', userController.verifyEmail);

export default router;