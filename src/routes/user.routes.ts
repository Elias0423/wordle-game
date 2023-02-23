import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserRepository from '../repositories/user.repository';
import UserService from '../services/user.service';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();

router.get('/:userId/games/', userController.getGamesPlayed());
router.get('/top/', userController.getTopUsers());
router.post('/singup/', userController.registerUser());
router.post('/login/', userController.loginUser());

export default router;
