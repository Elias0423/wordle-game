import { Request, Response } from 'express';
import GameService from '../services/game.service';
import UserGameService from '../services/userGame.service';
import ResponseDto from '../types/responseDto';
import Controller from './controller';

export default class GameController extends Controller {
  private readonly gameService: GameService;
  private readonly userGameService: UserGameService;
  constructor(gameService: GameService, userGameService: UserGameService) {
    super();
    this.gameService = gameService;
    this.userGameService = userGameService;
  }

  getTopWords = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      const topWords = await this.gameService.getTopWords();
      response = this.successResponse(topWords);
    } catch (error) {
      if (error instanceof Error) response = this.badResponse(error.message);
      else response = this.failResponse(error);
    }
    res.status(response.code).json(response);
  };

  validateWord = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      const result = await this.userGameService.validateUserAttempt(req.body.user_id, req.body.user_word);
      response = this.customResponse(200, `La palabra es ${result.userWon ? '' : 'in'}correcta`, result.response);
    } catch (error) {
      if (error instanceof Error) response = this.badResponse(error.message);
      else response = this.failResponse(error);
    }
    res.status(response.code).json(response);
  };
}
