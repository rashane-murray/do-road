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
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import * as CryptoJS from "crypto-js";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Component({
  selector: "page-signin",
  templateUrl: "signIn.html"
})
export class SignIn {
  email;
  password;
  loader;
  posts: any;
  items: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;

  constructor(
    public navCtrl: NavController,
    public load: LoadingController,
    public file: File,
    public alertCtrl: AlertController,
    public storage: Storage,
    public menu: MenuController,
    public http: Http,
    public db: AngularFireDatabase,
    public auth: AngularFireAuth
  ) {
    menu.swipeEnable(false);
    this.items = db.list("/drivers");
    this.user = auth.authState;
  }

  login() {
    if (!this.email || !this.password) {
      let alert = this.alertCtrl.create({
        title: "JSON",
        subTitle: "Blank Field"
      });
      alert.present();
    } else {
      this.auth.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.storage.set("logged", "name");
          this.navCtrl.setRoot(UserPage);
        })
        .catch(err => {
          console.log(err);
          let alert = this.alertCtrl.create({
            title: "JSON",
            subTitle: err.message
          });
          alert.present();
        });
    }
  }

  //For testing
  current() {
    let user = this.auth.auth.currentUser;
    if (user != null) {
      console.log(user.email);
      let alert = this.alertCtrl.create({
        title: "JSON",
        subTitle: user.email
      });
      alert.present();
    } else {
      console.log("No user");
      let alert = this.alertCtrl.create({
        title: "JSON",
        subTitle: "No user"
      });
      alert.present();
    }
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
        "http://nylon.palisadoes.org:3000/mdl/api/v1/mobile/post/login/driver",
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
    //192.241.203.121:3000
    this.http
      .post(
        "http://nylon.palisadoes.org:3000/mdl/api/v1/mobile/post/drivercoordinates",
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
