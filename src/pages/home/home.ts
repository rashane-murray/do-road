import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {Create} from 'C:/Users/dubze/Documents/ionic/do-road/src/pages/create/create';
import {SignIn} from 'C:/Users/dubze/Documents/ionic/do-road/src/pages/signIn/signIn';



@Component({
selector: 'page-home',
templateUrl: 'home.html'
})

export class HomePage {


name = '';
passwo ='';
email ='';
output: JSON;
obj: any = {};

constructor(private alertCtrl: AlertController, public navCtrl: NavController) {

}

check(){
if(this.name=='' || this.email=='' || this.passwo ==''){
	let alert = this.alertCtrl.create({
	title: "Complete Form",
	subTitle:'One or more fields are empty',
	buttons:['Continue']
	});
	alert.present();

}
else{
let alert = this.alertCtrl.create({
	title: "Thank You",
	subTitle:'Your account has been created',
	buttons: [{
	text:'Dismiss',
	handler: data =>{
	this.obj = { name:{"names": this.name, "emails": this.email, "passes":this.passwo}}
	this.output = <JSON>this.obj;
	let s = JSON.stringify(this.output);
	let al = this.alertCtrl.create({
	title: "JSON",
	subTitle: s
	});
	
	al.present();

	}
	}]
	
});

alert.present();
}
}

test(){
	let alert = this.alertCtrl.create({
	title: "Complete Form",
	subTitle:'One or more fields are empty',
	buttons: ['Dismiss']
	});
	alert.present();
}

  goToNext(){
  this.navCtrl.push(Create);
  }

  sign(){
  this.navCtrl.push(SignIn);
  }


	

	
	
	


}


