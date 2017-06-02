import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import {Create} from '../create/create';
import {SignIn} from '../signIn/signIn';
import {GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';


@Component({
selector: 'page-home',
templateUrl: 'home.html',

})

export class HomePage {

sub;

constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public googlePlus: GooglePlus, public nativeStorage: NativeStorage, public fb: Facebook) {

}




  register(){
  this.navCtrl.push(Create);
  }

  sign(){
  this.navCtrl.push(SignIn);
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

  })
 ;
}



	
	
	


}


