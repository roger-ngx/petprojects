import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { AngularFirestore } from 'angularfire2/firestore';

export class User{
  username: string;
  password: string;

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService, private route: Router, private db: AngularFirestore) {

  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      if(this.loggedIn){
        try{
          this.db.collection(this.user.name).doc('info').set({
            name: this.user.name,
            email: this.user.email,
            photoUrl: this.user.photoUrl
          });

        }catch(e){

        }

        localStorage.setItem('user', this.user.name);
        this.route.navigate(['/chat']);
      }
    });
  }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
