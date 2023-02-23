import dbConnection from '../db/pg';
import { IGame } from '../types/game';

export default class GameRepository {
  async getActiveGame(): Promise<IGame> {
    const query = `SELECT g.id game_id,w.word FROM games g INNER JOIN words w ON g.word_id = w.id 
                  WHERE end_date > now() order by g.start_date desc limit 1;`;
    const result = await dbConnection.query(query);
    return result.rows[0];
  }

  async saveNewGame(wordId: number): Promise<void> {
    const query = `INSERT INTO games (word_id,end_date) VALUES (${wordId}, CURRENT_TIMESTAMP + INTERVAL '5 minute')`;
    await dbConnection.query(query);
  }
}
