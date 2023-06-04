import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  private gamesUrl = 'http://localhost:3000/games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl);
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.gamesUrl, game);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(this.gamesUrl + `/${game.id}`, game);
  }

  deleteGame(id: number): Observable<{}> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.delete(url);
  }
}
