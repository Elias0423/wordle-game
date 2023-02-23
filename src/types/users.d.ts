export interface IUser {
  user_id: number;
  user_name: string;
  games_won: number;
}

export interface IUserGames {
  games_played: number;
  games_won: number;
}

export interface ISaveUserGame {
  user: number;
  game: number;
  user_word: string;
  win: boolean;
}

export interface ISaveUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserReponse {
  id: number;
  name: string;
  token: string;
}

type LoginUser = Omit<ISaveUser, 'name'>;
