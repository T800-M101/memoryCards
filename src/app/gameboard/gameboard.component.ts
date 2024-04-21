import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { GameService } from '../game-service';
import { Player } from '../player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent implements OnInit, DoCheck {

  cards: any[] = [];
  player1!: Player;
  player2!: Player;
  tie = false;

  private heroes: any[] = [];
  private cardsToCompare: any[] = [];
  private gameOver = false;
  private cardsGuessedCount = 0;




  get gameStatus(): string {
    if (this.gameOver && this.player1.turn && this.player1.guessed.length > this.player2.guessed.length) {
      return 'WINNER';
    }
    if (this.gameOver && this.player2.turn && this.player2.guessed.length > this.player1.guessed.length) {
      return 'WINNER';
    }
    return 'NOW PLAYING';
  }

  constructor(private gameService: GameService, private router: Router) { }

  ngDoCheck(): void {
    this.compareCards();

    if (this.cardsGuessedCount === 9) {
      this.gameOver = true;
    }

    if (this.gameOver && this.player1.guessed.length === this.player2.guessed.length) {
      this.tie = true;
    }
  }

  ngOnInit(): void {
    const players = this.gameService.getPlayers();

    this.player1 = new Player(players.player1, true);
    this.player2 = new Player(players.player2, false);

    this.cards = this.gameService.getCards();
    this.heroes = this.gameService.getHeroes();

    const uniqueNumbers = this.generateUniqueNumbers(18);
    this.heroes.forEach((hero, i) => {
      // Based on unique numbers it is set an index where data is going to be assigns to the cards
      let index = uniqueNumbers[i];

      this.cards[index].name = hero.name as string;
      this.cards[index].url = hero.url as string;
    })

  }

  // Get unique index to render new card position in new games
  private generateUniqueNumbers(count: any): any {
    const uniqueNumbers: any[] = [];
    while (uniqueNumbers.length < count) {
      const randomNumber = this.getRandomNumber(count);
      if (!uniqueNumbers.includes(randomNumber)) {
        uniqueNumbers.push(randomNumber);
      }
    }
    return uniqueNumbers;
  }

  private getRandomNumber(count: number): number {
    return Math.floor(Math.random() * count);
  }

  flipCard(index: number): void {
    if (this.cards[index].guessed) return;
    this.cards[index].flipped = !this.cards[index].flipped;
    const card = {
      name: this.cards[index].name,
      flipped: this.cards[index].flipped,
      index
    }
    this.cardsToCompare.push(card);
  }

  private compareCards(): void {
    // Cars are compared until 2 have been clicked
    if (this.cardsToCompare.length === 2 && (this.cardsToCompare[0].flipped && this.cardsToCompare[1].flipped)) {
      if (this.cardsToCompare[0].name === this.cardsToCompare[1].name) {
        // Count of cards guessed by either player
        this.cardsGuessedCount++;

        this.cards[this.cardsToCompare[0].index].guessed = true;
        this.cards[this.cardsToCompare[1].index].guessed = true;

        // Store the name of the card guessed by each player
        if (this.player1.turn) {
          this.player1.guessed.push(this.cardsToCompare[0].name);
        }

        if (this.player2.turn) {
          this.player2.guessed.push(this.cardsToCompare[0].name);
        }
        // It is reset to start again each attempt
        this.cardsToCompare = [];
      } else {
        setTimeout(() => {
          this.cards[this.cardsToCompare[0].index].flipped = false;
          this.cards[this.cardsToCompare[1].index].flipped = false;
          this.player1.turn = !this.player1.turn;
          this.player2.turn = !this.player2.turn;
          this.cardsToCompare = [];
        }, 1000)
      }

    }

  }

  startOver(): void {
    this.router.navigate(['']);
  }

}
