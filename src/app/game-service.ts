import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private players = {
    player1: '',
    player2: ''
  } 

  private cards = [
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false},
    {name: '', url: '', active: false, flipped: false, guessed: false}
  ]



private heroes = [
    {
      name: 'cap',
      url: '../../assets/cap.png',
    },
    {
      name: 'cap',
      url: '../../assets/cap.png'
    },

    {
      name: 'spidy',
      url: '../../assets/spidy.png'
    },
    {
      name: 'spidy',
      url: '../../assets/spidy.png'
    },
    {
      name: 'xavier',
      url: '../../assets/xavier.png'
    },
    {
      name: 'xavier',
      url: '../../assets/xavier.png'
    },
    {
      name: 'hulk',
      url: '../../assets/hulk2.png'
    },
    {
      name: 'hulk',
      url: '../../assets/hulk2.png'
    },
    {
      name: 'ironman',
      url: '../../assets/ironman.png'
    },
    {
      name: 'ironman',
      url: '../../assets/ironman.png'
    },
    {
      name: 'thor',
      url: '../../assets/thor.png'
    },
    {
      name: 'thor',
      url: '../../assets/thor.png'
    },
    {
      name: 'vision',
      url: '../../assets/vision.png'
    },
    {
      name: 'vision',
      url: '../../assets/vision.png'
    },
    {
      name: 'marvel',
      url: '../../assets/marvel.png'
    },
    {
      name: 'marvel',
      url: '../../assets/marvel.png'
    },
    {
      name: 'panther',
      url: '../../assets/panther.png'
    },
    {
      name: 'panther',
      url: '../../assets/panther.png'
    }
  ]

  constructor() { }

  setPlayers(player1:string, player2: string): void {
    this.players.player1 = player1.substring(0,10);
    this.players.player2 = player2.substring(0,10);
  }

  getPlayers(): any {
    if (this.players.player1 !== '' && this.players.player1 !== '') {
      return this.players;
    }
     return undefined;
  }

  getCards():any[] {
    return JSON.parse(JSON.stringify(this.cards));
  }

  getHeroes():any[] {
    return this.heroes
  }
}
