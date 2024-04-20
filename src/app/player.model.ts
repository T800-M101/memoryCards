export class Player {
    name: string;
    guessed: any[];
    turn: boolean
      
    constructor(name: string, turn: boolean){
        this.name = name;
        this.guessed = [];
        this.turn = turn;
        
    }
} 