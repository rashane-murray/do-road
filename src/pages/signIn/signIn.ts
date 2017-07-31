import { Component } from "@angular/core";
import {
  NavController,
  LoadingController,
  AlertController,
  MenuController
} from "ionic-angular";

import { UserPage } from "../userPage/userPage";
import { HomePage } from "../home/home";
import { File } from "@ionic-native/file";
import { Storage } from "@ionic/storage";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";

@Component({
  selector: "page-signin",
  templateUrl: "signIn.html"
})
export class SignIn {
  email;
  password;
  loader;
  posts: any;

  constructor(
    public navCtrl: NavController,
    public load: LoadingController,
    public file: File,
    public alertCtrl: AlertController,
    public storage: Storage,
    public menu: MenuController,
    public http: Http
  ) {
    menu.swipeEnable(false);
  }

  signed() {
    this.storage.set("logged", "name");
    this.navCtrl.setRoot(UserPage);
  }

  //Checks databse if user credentials match with any in database
  check() {
    let headers = new Headers();
    headers.append("content-type", "application/json");
    let dat = { name: "DoRoad", email: "test@email.com", password: "hashed" };

    //'http://nylon.palisadoes.org:3000/mdl/api/v1/mobile/post/drivercoordinates'
    //http://posttestserver.com/post.php
    //http://nylon.palisadoes.org:3000/mdl/api/v1/mobile/post/login/driver
    this.http
      .post(
        "http://192.241.203.121:3000/mdl/api/v1/mobile/post/login/driver",
        JSON.stringify(dat),
        { headers: headers }
      )
      .subscribe(
        data => {
          this.posts = data;

          let alert = this.alertCtrl.create({
            title: "JSON",
            subTitle: this.posts
          });
          alert.present();
        },
        err => {
          let alert = this.alertCtrl.create({
            title: "JSON",
            subTitle: err
          });
          alert.present();
        }
      );
  }

  //test for posting driver gps coordinates to database
  gps() {
    let headers = new Headers();
    headers.append("content-type", "application/json");
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
    this.http
      .post(
        "http://192.241.203.121:3000/mdl/api/v1/mobile/post/drivercoordinates",
        JSON.stringify(coord),
        { headers: headers }
      )
      .subscribe(
        data => {
          this.posts = data;

          let alert = this.alertCtrl.create({
            title: "JSON",
            subTitle: this.posts
          });
          alert.present();
        },
        err => {
          let alert = this.alertCtrl.create({
            title: "JSON",
            subTitle: err
          });
          alert.present();
        }
      );
  }

  loopFunction(number) {
    console.log(number);
    if (number < 5) {
      setTimeout(() => {
        console.log("Worked");
        this.loopFunction(number + 1);
      }, 3000);
    }
    console.log("Time");
    console.log("Another one");
  }

  //Returns user to homepage
  cancel() {
    this.navCtrl.setRoot(HomePage);
  }

  loading() {
    this.loader = this.load.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    this.loader.present();
  }
}
