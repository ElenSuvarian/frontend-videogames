import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';
import { Game } from '../models/game.model';

export const initialState: ReadonlyArray<Game> = [];

export const gameReducer = createReducer(
  initialState,
  on(GameActions.loadGames, state => {
    return state;
  }),
  on(GameActions.loadGamesSuccess, (state, action) => {
    return [...state, ...action.games];
  }),
  on(GameActions.addGameSuccess, (state, action) => {
    return [...state, action.game];
  }),
  on(GameActions.updateGameSuccess, (state, action) => {
    return state.map(game => game.id === action.game.id ? { ...game, ...action.game } : game);
  }),
  on(GameActions.deleteGame, (state, action) => {
    return state.filter(game => game.id !== action.gameId);
  })
);

