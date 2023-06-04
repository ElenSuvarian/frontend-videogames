import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GameService } from '../services/game.service';
import * as GameActions from './game.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class GameEffects {

    constructor(private actions$: Actions, private gameService: GameService) { }

    loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.loadGames),
            mergeMap(() =>
                this.gameService.getGames().pipe(
                    tap(games => console.log('games --->', games)),
                    map(games => GameActions.loadGamesSuccess({ games })),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    addGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.addGameSuccess),
            mergeMap(action =>
                this.gameService.addGame(action.game).pipe(
                    map(game => GameActions.addGameSuccess({ game })),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    updateGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.updateGame),
            mergeMap(action =>
                this.gameService.updateGame(action.game).pipe(
                    map(game => GameActions.updateGameSuccess({ game })),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    deleteGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.deleteGame),
            mergeMap(action =>
                this.gameService.deleteGame(action.gameId).pipe(
                    map(() => GameActions.deleteGame({ gameId: action.gameId })),
                    catchError(() => EMPTY)
                )
            )
        )
    );
}
