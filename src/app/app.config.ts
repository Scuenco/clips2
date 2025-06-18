import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth"
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(
      {
        apiKey: "AIzaSyCIiYGwNoujzRIgxT9SSJiK4Dnxf8umQ1k",
        authDomain: "clips-b87d9.firebaseapp.com",
        projectId: "clips-b87d9",
        storageBucket: "clips-b87d9.appspot.com",
        messagingSenderId: "11488334541",
        appId: "1:11488334541:web:1e39f780eff3ba218b0f84"
      }
    )),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ]
};
