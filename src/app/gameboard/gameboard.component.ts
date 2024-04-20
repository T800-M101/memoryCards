import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { data } from '../data';

interface player {
  name: string;
  guessed: any[];
  turn: boolean
}
@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent implements OnInit, DoCheck {
  
  cards = [...data.cards];
  heroes = [...data.heroes];
  cardsToCompare: any[] = [];
  player1: player = {
    name: 'memo',
    guessed: [],
    turn: true
  }

  player2: player = {
    name: 'Ausner',
    guessed: [],
    turn: false
  }
  
  tie = false;
  gameOver = false;
  cardsGuessedCount = 0;

  get gameStatus(): string {
    if (this.gameOver && this.player1.turn && this.player1.guessed.length > this.player2.guessed.length ) {
      return 'WINNER';
    }
    if (this.gameOver && this.player2.turn &&this.player2.guessed.length > this.player1.guessed.length ) {
      return 'WINNER';
    }
    return 'NOW PLAYING';
  }
  
  ngDoCheck(): void {
    this.compareCards();
    if (this.cardsGuessedCount === 9) {
      this.gameOver = true; 
    }
    if (this.gameOver && this.player1.guessed.length === this.player2.guessed.length){
      this.tie = true;
    }
  }

  ngOnInit(): void {
    const unique = this.generateUniqueNumbers(18);
    this.heroes.forEach((hero, index) => {
      let position = unique[index];
      this.cards[position].name = hero.name as string;
      this.cards[position].url = hero.url as string;
    })
    console.log(this.cards)
  }
  
  generateUniqueNumbers(count: any): any {
    const uniqueNumbers: any[] = [];
    while (uniqueNumbers.length < count) {
      const randomNumber = this.getRandomNumber();
      if (!uniqueNumbers.includes(randomNumber)) {
        uniqueNumbers.push(randomNumber);
      }
    }
    return uniqueNumbers;
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 18);
  }

  flipCard(index: number): void {
    if(this.cards[index].guessed) return;
    this.cards[index].flipped = !this.cards[index].flipped;
    const card = {
      name: this.cards[index].name,
      flipped: this.cards[index].flipped,
      index
    }
    this.cardsToCompare.push(card);
  }

  compareCards(): void {
    if (this.cardsToCompare.length === 2 && (this.cardsToCompare[0].flipped && this.cardsToCompare[1].flipped) ) {
      if (this.cardsToCompare[0].name === this.cardsToCompare[1].name) {
        this.cardsGuessedCount++;
        this.cards[this.cardsToCompare[0].index].guessed = true;
        this.cards[this.cardsToCompare[1].index].guessed = true;
         if( this.player1.turn) {
          this.player1.guessed.push(this.cardsToCompare[0].name);
         }

         if( this.player2.turn) {
          this.player2.guessed.push(this.cardsToCompare[0].name);
         }
        this.cardsToCompare = [];
      } else {
        setTimeout(()=> {
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
    this.player1.guessed = [];
    this.player1.name = '';
    this.player1.turn = true;
    this.player2.guessed = [];
    this.player2.name = '';
    this.player2.turn = false;
    this.cards = [...data.cards];
    this.heroes = [...data.heroes];
    this.cardsToCompare = [];
    this.tie = false;
    this.gameOver = false;
    this.cardsGuessedCount = 0;
  }

}
