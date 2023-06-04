import { createAction, props } from '@ngrx/store';
import { Game } from '../models/game.model';

export const loadGames = createAction('[Game] Load Games');
export const loadGamesSuccess = createAction('[Game] Load Games Success', props<{ games: Game[] }>());
export const addGameSuccess = createAction('[Game] Add Game Success', props<{ game: Game }>());
export const updateGame = createAction('[Game] Update Game', props<{ game: Game }>());
export const deleteGame = createAction('[Game] Delete Game', props<{ gameId: number }>());
