import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController } from 'ionic-angular';

import {UserPage} from '../userPage/userPage';
import {HomePage} from '../home/home';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-signin',
  templateUrl: 'signIn.html'
})
export class SignIn {

	email;
	password;
	loader;

  constructor(public navCtrl: NavController, public load: LoadingController, public file: File, public alrt: AlertController, public storage: Storage, public menu: MenuController) {

    menu.swipeEnable(false);

  }

check(){
  this.storage.set("logged", 'name');
   this.navCtrl.setRoot(UserPage);

}

cancel(){
  this.navCtrl.setRoot(HomePage);
}

loading() {
    this.loader = this.load.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loader.present();
  }

}
