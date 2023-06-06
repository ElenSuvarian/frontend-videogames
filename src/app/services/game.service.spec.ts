import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';

describe('GameService', () => {
    let service: GameService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GameService],
        });

        service = TestBed.inject(GameService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('service should be instanced', () => {
        expect(service).toBeTruthy();
    });

    it('should get games', () => {
        const mockGames = [
            { id: 1, name: 'test game 1', platform: 'Xbox', pegi: 3 },
            { id: 2, name: 'test game 2', platform: 'PC', pegi: 20 },
            { id: 3, name: 'test game 3', platform: 'PC', pegi: 1 },
        ];

        service.getGames().subscribe((games) => {
            expect(games.length).toBe(3);
            expect(games).toEqual(mockGames);
        });

        const request = httpMock.expectOne('http://localhost:3000/games');
        request.flush(mockGames);
    });

    it('should add game', () => {
        const mockGame = { id: 22, name: 'test game', platform: 'PC', pegi: 3 };

        service.addGame(mockGame).subscribe((game) => {
            expect(game).toEqual(mockGame);
        });

        const request = httpMock.expectOne('http://localhost:3000/games');
        request.flush(mockGame);
    });

    it('should update game', () => {
        const mockGame = { id: 30, name: 'test game', platform: 'PC', pegi: 5 };

        service.updateGame(mockGame).subscribe((game) => {
            expect(game).toEqual(mockGame);
        });

        const request = httpMock.expectOne('http://localhost:3000/games/30');
        request.flush(mockGame);
    });

    it('should delete game', () => {
        const selectedGameId = 30;

        service.deleteGame(selectedGameId).subscribe((response) => {
            expect(response).toEqual({});
        });

        const request = httpMock.expectOne('http://localhost:3000/games/30');
        request.flush({});
    });
});
