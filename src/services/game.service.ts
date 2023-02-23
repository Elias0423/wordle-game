/* eslint-disable @typescript-eslint/no-this-alias */
import GameRepository from '../repositories/game.repository';
import WordRepository from '../repositories/word.repository';

export default class GameService {
  private readonly gameRepository: GameRepository;
  private readonly wordRepository: WordRepository;
  self;

  constructor(gameRepository: GameRepository, wordRepository: WordRepository) {
    this.gameRepository = gameRepository;
    this.wordRepository = wordRepository;
    this.self = this;
  }

  public async getTopWords(): Promise<any> {
    const words = await this.wordRepository.getTopWords();
    return words;
  }

  async runGame(): Promise<void> {
    const self = this;
    await self.newGame();
    setInterval(async () => {
      await self.newGame();
    }, 300000);
  }

  private async newGame(): Promise<void> {
    try {
      const word = await this.wordRepository.getRandomWord();
      await this.gameRepository.saveNewGame(word.word_id);
      await this.wordRepository.updateWordUse(word.word_id);
    } catch (error) {
      console.log(error);
    }
  }
}
