import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile,
  authState, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, setDoc } from '@angular/fire/firestore';
import IUser from '../models/user.model';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #auth = inject(Auth);
  #fireStore = inject(Firestore);
  authState$ = authState(this.#auth);
  authStateWithDelay$ = this.authState$.pipe(delay(1000));
  router = inject(Router);
  route = inject(ActivatedRoute); //
  redirect = false;

  constructor() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd ),
      map((event) => {
        let currentRoute = this.route; //store the current route

        while(currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild
        }

        return currentRoute;
      }),
      switchMap((route) => route.data )
    )
    .subscribe((data) => {
      this.redirect = data['authOnly'] ?? false;
    });
  }

  async createUser(userData: IUser) {
    const userCred = await createUserWithEmailAndPassword(
        this.#auth, userData.email, userData.password
      );
      //request to insert form data to DB; the sequence is important
      await setDoc(doc(this.#fireStore, 'users', userCred.user.uid ), {
          name: userData.name,
          email: userData.email,
          age: userData.age,
          phoneNumber: userData.phoneNumber,
        }
      );
      // store displayname in the service
      await updateProfile(userCred.user, {
        displayName: userData.name
      })
      console.log(userCred);
  }

  async logout($event?: Event) {
    $event?.preventDefault();
    await signOut(this.#auth);

    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
