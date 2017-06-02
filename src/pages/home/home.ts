import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import {Create} from 'C:/Users/dubze/Documents/ionic/do-road/src/pages/create/create';
import {SignIn} from 'C:/Users/dubze/Documents/ionic/do-road/src/pages/signIn/signIn';
import {GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import { AuthService } from 'C:/Users/dubze/Documents/ionic/do-road/node_modules/angular2-social-login';



@Component({
selector: 'page-home',
templateUrl: 'home.html',

})

export class HomePage {

sub;

constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public googlePlus: GooglePlus, public nativeStorage: NativeStorage, public fb: Facebook, public auth: AuthService) {

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


facebookLog(){
  
this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));



}

loginSign(p: string){

this.sub= this.auth.login(p).subscribe((data) =>{
  this.navCtrl.push(Create);
})

}

  logout(){
    this.auth.logout().subscribe((data)=>{console.log(data);} 
    )
  }
	
	
	


}


