import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from './../models/game';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {

  constructor() {
    this.newGame();
  }
  //************VARIABLEN***************/

  pickCardAnimation = false;
  game: Game = {
    players: ["Text"],
    stack: ["Text"],
    playedCards: ["Text"],
    currentPlayer: 0
  }
  currentCard: string = '';
  
  //***************************/


  newGame() {
    this.game = new Game();
    console.log(this.game);
    for (let i = 1; i < 14; i++) {
      this.game.stack.push('spade_' + i);
      this.game.stack.push('hearts_' + i);
      this.game.stack.push('clubs_' + i);
      this.game.stack.push('diamonds_' + i);
    }
    this.shuffle(this.game.stack);
  }


  shuffle(array: string[]) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex > 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1500);
    }
  }
}
