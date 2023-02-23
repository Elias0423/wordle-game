import dbConnection from '../db/pg';
import { Word, ITopWord } from '../types/game';

export default class WordRepository {
  async getRandomWord(): Promise<Word> {
    const query = 'SELECT id word_id, word FROM words TABLESAMPLE BERNOULLI(0.1) where used is false and length(word)=5 limit 1';
    const result = await dbConnection.query(query);
    return result.rows[0];
  }

  async getTopWords(): Promise<ITopWord[]> {
    const query = `SELECT g.word_id, ug.user_word word, count(word_id) wins FROM user_games ug 
    INNER JOIN games g on ug.game_id = g.id where win is true group by 1,2 order by wins DESC LIMIT 10`;
    const result = await dbConnection.query(query);
    return result.rows;
  }

  async updateWordUse(wordId: number): Promise<void> {
    const query = `UPDATE words SET used = true WHERE id = ${wordId};`;
    await dbConnection.query(query);
  }
}
