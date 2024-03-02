import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-7d340","appId":"1:965007499464:web:07a245d77a836dcebc85fd","storageBucket":"ring-of-fire-7d340.appspot.com","apiKey":"AIzaSyCGxLckXgKukS69UHU--jSwBSX4a5fcrIY","authDomain":"ring-of-fire-7d340.firebaseapp.com","messagingSenderId":"965007499464"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
