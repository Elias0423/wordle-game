import { Router } from 'express';
import GameController from '../controllers/game.controller';
import GameRepository from '../repositories/game.repository';
import UserGameRepository from '../repositories/userGame.repository';
import WordRepository from '../repositories/word.repository';
import GameService from '../services/game.service';
import UserGameService from '../services/userGame.service';

const gameRepository = new GameRepository();
const wordRepository = new WordRepository();
const userGameRepository = new UserGameRepository();
const gameService = new GameService(gameRepository, wordRepository);
const userGameService = new UserGameService(userGameRepository, gameRepository, wordRepository);
const gameController = new GameController(gameService, userGameService);

gameService.runGame();

const router = Router();

router.get('/top/words/', gameController.getTopWords());
router.post('/play/', gameController.validateWord());

export default router;
