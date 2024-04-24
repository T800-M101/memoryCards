import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../game-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent implements OnInit {
 
  players!: {player1: string, player2:string}

  constructor(private gameService: GameService, private router: Router){}

  ngOnInit(): void {
    this.players = {
      player1: '',
      player2: ''
    }
  }

  getButton(formStatus: boolean | null): string {
    return formStatus ? "LET'S PLAY" : "PROVIDE PLAYERS' NAMES"; 
  }

  play(): void {
   this.gameService.setPlayers(this.players);
   this.router.navigate(['/game-board']);
  }

}
