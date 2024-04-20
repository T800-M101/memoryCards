import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { data } from '../data';
@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent implements OnInit, DoCheck {
  
  cards = data.cards;
  heroes = data.heroes;
  cardsToCompare: any[] = [];
  
  ngDoCheck(): void {
    this.compareCards();
  }

  ngOnInit(): void {
    const unique = this.generateUniqueNumbers(18);
    this.heroes.forEach((hero, index) => {
      const x: number[] = [];
      let position = unique[index];
      this.cards[position].name = hero.name as string;
      this.cards[position].url = hero.url as string;
    })
    
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
        this.cards[this.cardsToCompare[0].index].guessed = true;
        this.cards[this.cardsToCompare[1].index].guessed = true;
        this.cardsToCompare = [];
      } else {
        setTimeout(()=> {
          this.cards[this.cardsToCompare[0].index].flipped = false;
          this.cards[this.cardsToCompare[1].index].flipped = false;
          this.cardsToCompare = [];
        }, 1000)
      }
     
    }
   
  }

}
