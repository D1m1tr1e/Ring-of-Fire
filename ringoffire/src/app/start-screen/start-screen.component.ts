import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Game } from '../models/game';
import { addDoc, collection } from '@firebase/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
      console.log(gameInfo);
    });

  }

  getGameColRef() {
    return collection(this.firestore, 'games');
  }

}
