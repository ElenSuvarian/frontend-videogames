import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Game } from '../models/game.model';
import * as GameActions from '../store/game.actions';
import { AgGridAngular } from 'ag-grid-angular';
import { HostListener } from '@angular/core';

@Component({
    selector: 'game-table',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
    @ViewChild('agGrid') agGrid!: AgGridAngular;
    games$: Observable<Game[]>;
    columnDefs = [
        { field: 'id', editable: false, sortable: true, filter: true },
        { field: 'name', editable: true, sortable: true, filter: true, tooltipField: 'name' },
        { field: 'platform', editable: true, sortable: true, filter: true, tooltipField: 'platform' },
        { field: 'pegi', editable: true, sortable: true, filter: true, tooltipField: 'pegi' },
    ];    
    defaultColDef = { resizable: true };
    selectedGameId: number | null = null;
    searchWord: string = '';
    newGame: Game = { id: 0, name: '', platform: '', pegi: 0 };

    constructor(private store: Store<{ games: Game[] }>) {
        this.games$ = this.store.select('games').pipe(
            map(games => games.map(game => ({ ...game })))
        );
    }

    ngOnInit() {
        this.store.dispatch(GameActions.loadGames());
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.sizeColumnsToFit();
        });
    }

    sizeColumnsToFit() {
        this.agGrid.api.sizeColumnsToFit();
    }

    onCellValueChanged(event: any) {
        const updatedGame = { ...event.data, [event.colDef.field]: event.newValue };
        this.store.dispatch(GameActions.updateGame({ game: updatedGame }));
    }

    onRowClicked(event: any) {
        this.selectedGameId = event.data.id;
    }

    applyFilter() {
        this.agGrid.api.setQuickFilter(this.searchWord);
    }

    getSelectedGame(): Game | undefined {
        let selectedGame: Game | undefined;
        this.games$.subscribe(games => {
            selectedGame = games.find(game => game.id === this.selectedGameId);
        });
        return selectedGame;
    }

    addGame() {
        if (this.newGame.name && this.newGame.platform && this.newGame.pegi) {
            const newGameWithId: Game = { ...this.newGame, id: this.generateNewId() };
            this.store.dispatch(GameActions.addGameSuccess({ game: newGameWithId }));
            this.newGame = { id: 0, name: '', platform: '', pegi: 0 };
        }
    }

    cancelAdd() {
        this.newGame = { id: 0, name: '', platform: '', pegi: 0 };
    }

    generateNewId(): number {
        let maxId = 0;
        this.games$.subscribe(games => {
            const existingIds = games.map(game => game.id);
            maxId = Math.max(...existingIds);
        });
        return maxId + 1;
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.agGrid.api.sizeColumnsToFit();
    }
}

