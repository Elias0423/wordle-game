import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository';
import { ISaveUser, IUser, IUserGames, IUserReponse, LoginUser } from '../types/users';

export default class UserService {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getTopUsers(): Promise<IUser[]> {
    const games = await this.userRepository.getTopUsers();
    return games;
  }

  public async getUserGames(userId: number): Promise<IUserGames> {
    const games = await this.userRepository.getUserGames(userId);
    return games;
  }

  public async saveUser(user: ISaveUser): Promise<any> {
    if (!user.name) throw new Error('No se envió un nombre');
    if (!user.email) throw new Error('No se envió un correo');
    if (!user.password) throw new Error('No se envió una contraseña');

    const newUser = await this.userRepository.saveUser(user);
    return newUser;
  }

  public async loginUser(user: LoginUser): Promise<IUserReponse> {
    if (!user.email) throw new Error('No se envió un correo');
    if (!user.password) throw new Error('No se envió una contraseña');

    const newUser = await this.userRepository.loginUser(user);
    newUser.token = this.generateToken(newUser);
    return newUser;
  }

  private generateToken(user: IUserReponse): string {
    return jwt.sign(user, 'WORDLE', { expiresIn: '1d' }).toString();
  }
}
