import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import * as CryptoJS from "crypto-js";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Geolocation } from "@ionic-native/geolocation";

declare var navigator;
@Component({
  selector: "page-create",
  templateUrl: "create.html"
})
export class Create {
  // variables linked to input fields
  fName: string;
  lName: string;
  pass: string;
  email: string;
  number: string;
  govID: string;
  user: Observable<firebase.User>;
  route: string;

  lat;
  long;
  // variables for colour of text of labels of input fields
  fCol: string;
  lCol: string;
  pCol: string;
  eCol: string;
  nCol: string;
  iCol: string;
  rCol: string;
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;

  missing: number[] = [];
  posts;

  errorTitle: string = "SignUp Could Not Be Completed!";

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public http: Http,
    public db: AngularFireDatabase,
    public authF: AngularFireAuth,
    public geolocation: Geolocation
  ) {
    this.locate();
  }

  signUp() {
    //uses Firebase
    // A post entry.

    //data to be stored in database
    var postData = {
      driverId: "",
      driverProfile: {
        firstname: this.fName,
        lastname: this.lName,
        route: this.route,
        number: this.number,
        govID: this.govID,
        status: "Unavailable"
        //vehicle_type: "Dragon"
      },
      latitude: this.lat,
      longitude: this.long
    };

    //Tries to create user
    this.authF.auth
      .createUserWithEmailAndPassword(this.email, this.pass)
      .then(data => {
        //User created
        postData.driverId = data.uid;

        let id = postData.driverId;
        this.db.list("/drivers").update(id, postData); //Adds data to database
        let alert = this.alertCtrl.create({
          title: "JSON",
          subTitle: "Registered Succesfully!"
        });
        alert.present();
      })
      .catch(err => {
        // Handle Errors here.
        console.log(err);
        let alert = this.alertCtrl.create({
          title: "JSON",
          subTitle: err.message
        });
        alert.present();
        // ...
      });
  }

  createUser() {
    //usess mdl
    if (this.check()) {
      console.log("Worked");
      this.iCol = "#999";
      //this.register(); //Add new user to database
      this.signUp();
    } else {
      this.mark();
      let alert = this.alertCtrl.create({
        title: this.errorTitle,
        subTitle: "Please fill in highlighted fields"
      });
      alert.present();
    }
  }

  register() {
    let headers = new Headers();
    headers.append("content-type", "application/json");
    //let dat = {email:"@had", password: "pass"};
    let info = {
      name: "DoRoad",
      firstName: this.fName,
      lastName: this.lName,
      email: this.email,
      password: this.pass,
      phone: this.number,
      utc_timestamp: "14000000"
    };

    this.http
      .post(
        "http://nylon.palisadoes.org:3000/mdl/api/v1/mobile/post/register/driver",
        JSON.stringify(info),
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

  //Checks if any field is not filled in
  check() {
    this.fix();
    if (!this.fName) this.missing.push(1);
    if (!this.lName) this.missing.push(2);
    if (!this.pass) this.missing.push(3);
    if (!this.email) this.missing.push(4);
    if (!this.number) this.missing.push(5);
    if (!this.govID) this.missing.push(6);
    if (!this.route) this.missing.push(7);
    console.log(this.missing);
    if (this.missing.length == 0) return true;
    else return false;
  }

  //Goes through list of missing fields to highlight
  mark() {
    while (this.missing.length != 0) this.colored(this.missing.pop());
  }

  //Highlights required fields not filled in
  colored(n: number) {
    if (n == 1) this.fCol = "#f53d3d";
    else if (n == 2) this.lCol = "#f53d3d";
    else if (n == 3) this.pCol = "#f53d3d";
    else if (n == 4) this.eCol = "#f53d3d";
    else if (n == 5) this.nCol = "#f53d3d";
    else if (n == 6) this.iCol = "#f53d3d";
    else if (n == 7) this.rCol = "#f53d3d";
  }

  //Revert highlighted field to normal color when filled in correctly
  fix() {
    this.fCol = "#999";
    this.lCol = "#999";
    this.pCol = "#999";
    this.eCol = "#999";
    this.nCol = "#999";
    this.iCol = "#999";
    this.rCol = "#999";
  }

  //encrypts password
  encrypty(word) {
    var words = CryptoJS.enc.Utf8.parse("Testing"); // WordArray object
    var obj = CryptoJS.enc.Base64.stringify(words);
    return obj;
    /**console.log(obj);
    var words2 = CryptoJS.enc.Base64.parse(obj);
    var textString = CryptoJS.enc.Utf8.stringify(words2);
    console.log(textString);*/
  }

  locate() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
      },
      err => {
        console.log(err);
      }
    );
  }
}
