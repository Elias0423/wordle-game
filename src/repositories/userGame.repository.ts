/* eslint-disable @typescript-eslint/restrict-template-expressions */
import dbConnection from '../db/pg';
import { ISaveUserGame } from '../types/users';

export default class UserGameRepository {
  async getUserGameAttempts(userId: number, gameId: number): Promise<number> {
    const query = `SELECT count(*) total FROM public.user_games where game_id = ${gameId} and user_id = ${userId}`;
    const result = await dbConnection.query(query);
    return result.rows[0].total;
  }

  async saveUserGame(userGame: ISaveUserGame): Promise<void> {
    const query = `INSERT INTO user_games (user_id,game_id,user_word,win) 
    VALUES (${userGame.user},${userGame.game},'${userGame.user_word}',${userGame.win})`;
    await dbConnection.query(query);
  }
}
