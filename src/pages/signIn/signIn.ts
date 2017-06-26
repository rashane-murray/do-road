import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController } from 'ionic-angular';

import {UserPage} from '../userPage/userPage';
import {HomePage} from '../home/home';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-signin',
  templateUrl: 'signIn.html'
})
export class SignIn {

	email;
	password;
	loader;
  posts: any;

  constructor(public navCtrl: NavController, public load: LoadingController, public file: File, public alrt: AlertController, public storage: Storage, public menu: MenuController, public http: Http) {

    menu.swipeEnable(false);

  }

  check(){
    
    /**let timed = 0
    while(timed < 5){
    console.log('Start');
    setTimeout(function () {
      }, 10000);
    console.log('End')
    timed++;
  }*/
    this.storage.set("logged", "name");
    this.navCtrl.setRoot(UserPage);
  /**  let timed = 0;
    while (true){
      console.log(timed)
    setTimeout(() => {}, 3000);
    timed+=1;

  }*/

/**   let headers = new Headers();
    headers.append('content-type', 'application/json');
    let dat = {email:"@had", password: "pass"};
    let coord = {
      name: "DoRoad",
      id_agent: "2",
      devicename: "18765555555",
      latitude: "18.76",
      longitude: "76.98",
      utc_timestamp: "1400000"
    };

//'http://nylon.palisadoes.org:3000/mdl/api/v1/mobile/post/drivercoordinates'
//http://posttestserver.com/post.php
//http://nylon.palisadoes.org:3000/mdl/api/v1/mobile/post/login/driver
    this.http.post('http://nylon.palisadoes.org:3000/mdl/api/v1/mobile/post/drivercoordinates',JSON.stringify(coord), {headers:headers}).subscribe(data => {
      this.posts = data;
      
      let a = this.alrt.create({
        title: "JSON",
        subTitle: this.posts
      });
      a.present();
    }, (err) => {  let a = this.alrt.create({
      title: "JSON",
      subTitle: err
    });
    a.present();});*/
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
