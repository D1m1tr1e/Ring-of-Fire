import { Component, Input, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})

export class GameInfoComponent implements OnChanges {

  @Input() card: string = '';
  cardTitle: string = '';
  cardDecription: string = '';

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.card) {
      console.log('Current Card Name:', this.card.split('_')[0]);
      console.log('Current Card Number:', this.card.split('_')[1]);
      let cardNumber = + this.card.split('_')[1];
      this.cardTitle = this.cardAction[cardNumber - 1].title;
      this.cardDecription = this.cardAction[cardNumber - 1].description;

    } else {
      console.log('Es wurde noch keine Karte gezogen');
      this.cardTitle = ('Ziehe die erste Karte, um die Tirnkaufgaben anzuziegen!');
    }
  }

  cardAction: Array<{ title: string; description: string }> = [
    {
      title: "Pizzaliebhaber",
      description: "Trinke einen Shot, wenn du in den letzten 24 Stunden Pizza gegessen hast."
    },
    {
      title: "Witzemacher",
      description: "Wähle einen Spieler aus, der einen Witz erzählen muss. Wenn niemand lacht, trinkt er."
    },
    {
      title: "Telefonvergesser",
      description: "Trinke zwei Schlucke, wenn du jemals vergessen hast, wo du dein Telefon hingelegt hast."
    },
    {
      title: "Drink-Taucher",
      description: "Tauche einen Finger in deinen Drink und lecke ihn ab, ohne zu erröten. Wenn du errötest, trinke."
    },
    {
      title: "Sozialer Entdecker",
      description: "Trinke einen Schluck für jede Person im Raum, die du nicht persönlich kennst."
    },
    {
      title: "Akrobatenmeister",
      description: "Mache einen Handstand für 10 Sekunden. Wenn du es nicht schaffst, trinke."
    },
    {
      title: "Platztauscher",
      description: "Wähle einen Spieler aus. Du und dieser Spieler tauschen Plätze. Die Person, die jetzt deine vorherige Position hat, trinkt."
    },
    {
      title: "Selfie-Enthusiast",
      description: "Trinke, wenn du jemals ein Selfie gemacht hast."
    },
    {
      title: "Kaugummi-Künstler",
      description: "Wenn du einen Kaugummi hast, lege ihn für den Rest des Spiels auf deine Nase. Trinke, wenn er herunterfällt."
    },
    {
      title: "Tierischer Geräuschmacher",
      description: "Mache eine Tiergeräuschnachahmung. Wenn jemand errät, welches Tier es ist, trinkst du nicht. Andernfalls trinke."
    },
    {
      title: "Social-Media-Abenteurer",
      description: "Trinke für jede Social-Media-Plattform, auf der du angemeldet bist."
    },
    {
      title: "Wissensdurstiger",
      description: "Trinke einen Shot für jede falsche Antwort auf eine einfache Wissensfrage."
    },
    {
      title: "Peinlichkeits-Teiler",
      description: "Wähle einen Spieler aus. Dieser Spieler muss eine peinliche Geschichte über sich selbst teilen. Wenn niemand lacht, trinkt er."
    }
  ];
}
