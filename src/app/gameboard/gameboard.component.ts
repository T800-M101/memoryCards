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
  player1Counter: string[] = [];
  player2Counter: string[] = [];

  private heroes: any[] = [];
  private cardsFlippedIndexes: any[] = [];
  private gameOver = false;
  private cardsFlipped = 0;

  get gameStatus(): string {
    if (this.gameOver && this.player1.turn && this.player1Counter.length > this.player2Counter.length) {
      return 'WINNER';
    }
    if (this.gameOver && this.player2.turn && this.player2Counter.length > this.player2Counter.length) {
      return 'WINNER';
    }
    return 'NOW PLAYING';
  }

  constructor(private gameService: GameService, private router: Router) { }

  ngDoCheck(): void {
    if (this.player1Counter.length + this.player2Counter.length  === 9) {
      this.gameOver = true;
    }

    if (this.gameOver && this.player1Counter.length === this.player2Counter.length) {
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
    // Avoid card already guessed being clicked twice
    if (!this.cards[index].flipped) {
      this.cardsFlipped++;
    } else {
      return
    }

    // Prevent a third card being clicked before compare the first 2 or pick when the game is over
    if (this.cardsFlipped > 2 || this.gameOver) return;

    // Flip card
    this.cards[index].flipped = !this.cards[index].flipped;

    // Pick up 2 cards to compare
    if ( this.cards[index].flipped) {
      this.cardsFlippedIndexes.push(index);
    }

    if(this.cardsFlippedIndexes.length === 2) {
      this.compareCards();
    }
   
  }

  private compareCards(): void {
    // Cars are compared once 2 have been clicked
    if (this.cards[this.cardsFlippedIndexes[0]].name === this.cards[this.cardsFlippedIndexes[1]].name) {

      this.cards[this.cardsFlippedIndexes[0]].guessed = true;
      this.cards[this.cardsFlippedIndexes[1]].guessed = true;
      // Count of cards guessed by either player
      if (this.player1.turn) {
        this.player1Counter.push(this.cards[this.cardsFlippedIndexes[0]].name);
      }
      
      if (this.player2.turn) {
        this.player2Counter.push(this.cards[this.cardsFlippedIndexes[0]].name);
      }
      
      this.cardsFlippedIndexes = [];
      this.cardsFlipped = 0;
      
      
    } else {
      // Reset cards for next turn
      setTimeout(() => {
        this.cards[this.cardsFlippedIndexes[0]].flipped = false;
        this.cards[this.cardsFlippedIndexes[1]].flipped = false;
        this.player1.turn = !this.player1.turn;
        this.player2.turn = !this.player2.turn;
        this.cardsFlippedIndexes = [];
        this.cardsFlipped = 0;
        }, 1000)
      }

  }

  startOver(): void {
    this.router.navigate(['']);
  }

}
