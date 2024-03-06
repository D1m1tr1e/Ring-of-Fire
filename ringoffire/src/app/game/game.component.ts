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
import { collectionData, Firestore, onSnapshot, doc } from '@angular/fire/firestore';
import { elementAt } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule,
    DialogAddPlayerComponent, GameInfoComponent,],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {  }

  //************VARIABLEN***************/

  firestore: Firestore = inject(Firestore);
  pickCardAnimation = false;
  game: Game = new Game();
  currentCard: string = '';
  gameId!: string;

  //***************************/

  ngOnInit(): void {
    this.newGame();
    this.addNewGameNote()
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log('zeige mir die Game ID aus Game.Component', this.gameId);
      this.loadingUpdatedDataFromSubCol();
    });
    this.collectDataFromServer();
 
  }

  // Lädt all Daten, dich sich auf der Datebank befinden
  collectDataFromServer() {
    let col = collectionData(this.getGameColRef())
    col.subscribe((list) => {
      list.forEach(element => {
        //console.log('Meine Inhalte der Datenbank', element)
      });
    });
  }

  //Lädt aktualliserte Daten vom Serven (z.B. wenn ein neuer Spieler manuell hinzugefügt worden ist)
  loadingUpdatedDataFromSubCol() {
    onSnapshot(doc(this.getGameColRef(), this.gameId), (doc) => {
      let currentGame: any = doc.data(); // Daten aus dem aktuellen Spiel das gerade offen ist
      this.game.players = currentGame.players;
      this.game.stack = currentGame.stack;
      this.game.playedCards = currentGame.playedCards;
      this.game.currentPlayer = currentGame.currentPlayer;
    });
  };


  getGameColRef() {
    return collection(this.firestore, 'games');
  }

//wandelt meine daten in einen Json um um packt es auf den Server
  async addNewGameNote() {
    await addDoc(this.getGameColRef(), this.game.toJson())
  }


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
