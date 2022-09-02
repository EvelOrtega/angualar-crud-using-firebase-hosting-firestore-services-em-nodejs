import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedin: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedin = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedin = true;
      } else {
        this.userLoggedin = false;
      }
    });
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('autenticado com sucesso!');
      })
      .catch((error) => {
        console.log(
          'erro no login ',
          'erro codigo ',
          error.code,
          ' erro ',
          error
        );
      });
  }
}
