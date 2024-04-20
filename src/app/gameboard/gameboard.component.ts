import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { data } from '../data';
@Component({
  selector: 'app-gameboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gameboard.component.html',
  styleUrl: './gameboard.component.css'
})
export class GameboardComponent implements OnInit {

  cards = data.cards;
  heroes = data.heroes;


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
    this.cards[index].flipped = !this.cards[index].flipped;
  }

}
