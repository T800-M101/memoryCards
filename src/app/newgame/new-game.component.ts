import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../game-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent implements OnInit {
  
  player1 = '';
  player2 ='';

  constructor(private gameService: GameService, private router: Router){}

  ngOnInit(): void {
    
  }


  play(): void {
    this.gameService.setPlayers(this.player1, this.player2);
    this.router.navigate(['/game-board']);

  }

}
