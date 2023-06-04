import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Game } from '../models/game.model';
import * as GameActions from '../store/game.actions';
import { AgGridAngular } from 'ag-grid-angular';

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
        { field: 'name', editable: true, sortable: true, filter: true },
        { field: 'platform', editable: true, sortable: true, filter: true },
        { field: 'pegi', editable: true, sortable: true, filter: true },
    ];
    defaultColDef = { resizable: true };
    selectedGameId: number | null = null;
    searchWord: string = '';

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
}

