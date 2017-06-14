import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import {Create} from '../create/create';
import {SignIn} from '../signIn/signIn';
import {GooglePlus } from '@ionic-native/google-plus';
import { RoadMap } from '../map/map';
import { UserPage } from '../userPage/userPage';
import { Geolocation } from '@ionic-native/geolocation'
import { UserProvider } from '../../providers/user/user';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})

export class HomePage {

  sub;
 // user: User;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public googlePlus: GooglePlus, public geolocation: Geolocation, public user: UserProvider) {
   
  }




  register(){
    this.navCtrl.push(Create);

  }

  sign(){
    this.navCtrl.push(SignIn);
  }

  mapped(){
    
    this.navCtrl.push(UserPage);
  }

  doGoogleLogin(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.googlePlus.login({})
    .then( res => {
      loading.dismiss();
      this.navCtrl.push(Create);

    });
  }








}
