import jwt from 'jsonwebtoken';

export default class AuthService {
  public validateToken(userId: number, token: string): boolean {
    try {
      const user: any = jwt.verify(token, 'WORDLE');
      if (user.id === userId) return true;
      return false;
    } catch (error) {
      return false;
    }
  }
}
