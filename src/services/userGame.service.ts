import { IGame, ILetterCheck, IValidateResponse } from '../types/game';
import GameRepository from '../repositories/game.repository';
import UserGameRepository from '../repositories/userGame.repository';
import WordRepository from '../repositories/word.repository';

export default class UserGameService {
  private readonly userGameRepository: UserGameRepository;
  private readonly gameRepository: GameRepository;
  private readonly wordRepository: WordRepository;

  constructor(userGameRepository: UserGameRepository, gameRepository: GameRepository, wordRepository: WordRepository) {
    this.userGameRepository = userGameRepository;
    this.gameRepository = gameRepository;
    this.wordRepository = wordRepository;
  }

  public async validateUserAttempt(userId: number, userWord: string): Promise<IValidateResponse> {
    if (userWord.length !== 5) throw new Error('La palabra no tiene 5 letras');

    const game: IGame | null = await this.gameRepository.getActiveGame();
    if (game == null) throw new Error('No hay un juego activo');

    const attempts = await this.userGameRepository.getUserGameAttempts(userId, game.game_id);
    if (attempts >= 5) throw new Error('EL usuario ya alcanzó el límite de intentos');

    const result = this.validateWords(userWord, game.word);

    const userGame = { user: userId, game: game.game_id, user_word: userWord, win: result.userWon };
    await this.userGameRepository.saveUserGame(userGame);

    return result;
  }

  private validateWords(userWord: string, gameWord: string): IValidateResponse {
    const userWordList = userWord.split('');
    const gameWordList = gameWord.split('');
    const responseList: ILetterCheck[] = [];

    let userWon = true;
    for (let i = 0; i < userWordList.length; i++) {
      const validation: ILetterCheck = { letter: userWordList[i], value: 3 };
      if (userWordList[i] === gameWordList[i]) validation.value = 1;
      else if (gameWordList.includes(userWordList[i])) {
        validation.value = 2;
        userWon = false;
      } else userWon = false;
      responseList.push(validation);
    }
    return { response: responseList, userWon };
  }
}
