import dbConnection from '../db/pg';
import { ISaveUser, IUser, IUserGames, IUserReponse, LoginUser } from '../types/users';

export default class UserRepository {
  async getTopUsers(): Promise<IUser[]> {
    const query = `SELECT ug.user_id, u.name user_name, count(*) games_won FROM user_games ug 
    INNER JOIN users u on ug.user_id = u.id where win is true group by 1,2 order by games_won DESC LIMIT 10`;
    const result = await dbConnection.query(query);
    return result.rows;
  }

  async getUserGames(userId: number): Promise<IUserGames> {
    const query = `SELECT count(distinct game_id) games_played, wn.games_won  FROM public.user_games, 
    (SELECT count(*) games_won FROM public.user_games where user_id = ${userId} and win is true) wn where user_id = ${userId} group by 2 LIMIT 1`;
    const result = await dbConnection.query(query);
    return result.rows[0];
  }

  async saveUser(user: ISaveUser): Promise<any> {
    const query = `INSERT INTO users (name,email,password) VALUES ('${user.name}','${user.email}',MD5('${user.password}'))`;
    const result = await dbConnection.query(query);
    return result;
  }

  async loginUser(user: LoginUser): Promise<IUserReponse> {
    const query = `select id,name from users where email = '${user.email}' and password = MD5('${user.password}')`;
    const result = await dbConnection.query(query);
    return result.rows[0];
  }
}
