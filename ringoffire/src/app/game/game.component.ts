import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from './../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { addDoc, collection } from '@firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { elementAt } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule,
    DialogAddPlayerComponent, GameInfoComponent,],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {

  constructor(public dialog: MatDialog) {
    this.newGame();

    this.items$ = collectionData(this.getGameColRef())
    this.item = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log('Meine Inhalte der Datenbank', element)
      });
    });
  }
  //************VARIABLEN***************/

  firestore: Firestore = inject(Firestore);
  items$;
  item;
  pickCardAnimation = false;
  game: Game = {
    players: ["Text"],
    stack: ["Text"],
    playedCards: ["Text"],
    currentPlayer: 0,
  }
  currentCard: string = '';

  //***************************/

  getGameColRef() {
    return collection(this.firestore, 'games');
  }

  async addNewGameNote() {
    await addDoc(this.getGameColRef(), this.game.toJson())
  }

  newGame() {
    this.game = new Game();
    this.addNewGameNote();

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

  nextPlayer: number = 0;

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        console.log('The dialog was closed', name);
        this.game.players.push(name);
      }
    });
  }
}
