import { Routes } from '@angular/router';
import { NewGameComponent } from './newgame/new-game.component';
import { GameboardComponent } from './gameboard/gameboard.component';

export const routes: Routes = [
    {
        path: '',
        component: NewGameComponent
    },
    {
        path:'game-board',
        component:GameboardComponent 
    }
];
