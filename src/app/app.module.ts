import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../app/environment/environment';
import { gameReducer } from '../app/store/game.reducer';
import { GameEffects } from '../app/store/game.effects';
import { GameService } from '../app/services/game.service';

import { AppComponent } from './app.component';
import { GameComponent } from './games-table/game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ games: gameReducer }),
    EffectsModule.forRoot([GameEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
