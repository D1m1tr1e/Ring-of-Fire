import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Game } from '../models/game';
import { addDoc, collection } from '@firebase/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  game!: Game;
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {
  }

  async newGame() {
    this.game = new Game();
    await addDoc(this.getGameColRef(), this.game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
      console.log('Zeige mir die Game ID aus Start Sceen', gameInfo.id);
      console.log('Zeige mir die GameInfo');
    });
  }

  /*async newGame() {
    this.game = new Game();
    try {
      const gameInfo = await addDoc(this.getGameColRef(), this.game.toJson());
      this.router.navigateByUrl('/game/' + gameInfo.id);
      console.log('Zeige mir die Game ID', gameInfo.id);
      console.log('Zeige mir die GameInfo');
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Spiels:', error);
    }
  }*/

  getGameColRef() {
    return collection(this.firestore, 'games');
  }
}
