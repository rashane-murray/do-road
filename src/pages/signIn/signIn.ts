import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import {UserPage} from '../userPage/userPage';

@Component({
  selector: 'page-signin',
  templateUrl: 'signIn.html'
})
export class SignIn {

	email;
	password;
	loader;

  constructor(public navCtrl: NavController, public load: LoadingController) {

  }

check(){

  console.log("Checked");
	

}

loading() {
    this.loader = this.load.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loader.present();
  }

}
