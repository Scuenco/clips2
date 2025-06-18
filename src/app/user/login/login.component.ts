import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AlertComponent } from "../../shared/alert/alert.component";

@Component({
  selector: 'app-login',
  imports: [FormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(Auth);

  credentials = {
    email: '',
    password: ''
  }
  showAlert = signal(false); // will toggle the visibility of the alert component.
  alertMsg = signal("Please wait. We are logging you in.");
  alertColor = signal('blue');
  inSubmission = signal(false); //will toggle the button's disable attribute

  //handle requests
  async login() {
    this.showAlert.set(true);//if there are subsequent submissions, we should reset alert
    this.alertMsg.set("Please wait. We are logging you in.");
    this.alertColor.set('blue');
    this.inSubmission.set(true);
    try {
      await signInWithEmailAndPassword(
        this.auth,
        this.credentials.email,
        this.credentials.password);
    } catch(e) {
      console.log(e);
      this.alertMsg.set("An unexpected error occurred.");
      this.alertColor.set('red');
      this.inSubmission.set(false);
      return;//return this function after updating these properties
    }//we don't want to continue executing logic.
    this.alertMsg.set("You are successfully logged in.");
    this.alertColor.set('green');
  }
}
