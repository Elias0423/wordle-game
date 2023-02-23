export interface ITopWord {
  word_id: number;
  word: string;
  wins: number;
}

export interface IGame {
  game_id: number;
  word: string;
}

export interface ILetterCheck {
  letter: string;
  value: number;
}

export interface IValidateResponse {
  response: ILetterCheck[];
  userWon: boolean;
}

export type Word = Omit<TopWord, 'wins'>;
