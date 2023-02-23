import { Request, Response } from 'express';
import UserService from '../services/user.service';
import ResponseDto from '../types/responseDto';
import Controller from './controller';

export default class UserController extends Controller {
  userService: UserService;
  constructor(userService: UserService) {
    super();
    this.userService = userService;
  }

  registerUser = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      await this.userService.saveUser(req.body);
      response = this.customResponse(200, 'Usuario guardado exitosamente', null);
    } catch (error) {
      if (error instanceof Error) response = this.badResponse(error.message);
      else response = this.failResponse(error);
    }
    res.status(response.code).json(response);
  };

  loginUser = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      const userGames = await this.userService.loginUser(req.body);
      response = this.successResponse(userGames);
    } catch (error) {
      if (error instanceof Error) response = this.badResponse(error.message);
      else response = this.failResponse(error);
    }
    res.status(response.code).json(response);
  };

  getGamesPlayed = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      const userGames = await this.userService.getUserGames(Number(req.params.userId));
      response = this.successResponse(userGames);
    } catch (error) {
      if (error instanceof Error) response = this.badResponse(error.message);
      else response = this.failResponse(error);
    }
    res.status(response.code).json(response);
  };

  getTopUsers = () => async (req: Request, res: Response): Promise<void> => {
    let response: ResponseDto;
    try {
      const topUsers = await this.userService.getTopUsers();
      response = this.successResponse(topUsers);
    } catch (error) {
      if (error instanceof Error) response = this.badResponse(error.message);
      else response = this.failResponse(error);
    }
    res.status(response.code).json(response);
  };
}
