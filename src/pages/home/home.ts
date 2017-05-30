import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Create} from 'C:/Users/dubze/Documents/ionic/do-road/src/pages/create/create';
import {SignIn} from 'C:/Users/dubze/Documents/ionic/do-road/src/pages/signIn/signIn';



@Component({
selector: 'page-home',
templateUrl: 'home.html'
})

export class HomePage {

constructor(public navCtrl: NavController) {

}




  register(){
  this.navCtrl.push(Create);
  }

  sign(){
  this.navCtrl.push(SignIn);
  }


	

	
	
	


}


