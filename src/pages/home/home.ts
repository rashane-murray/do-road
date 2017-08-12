import { Component } from "@angular/core";

import {
  NavController,
  LoadingController,
  MenuController
} from "ionic-angular";
import { Create } from "../create/create";
import { SignIn } from "../signIn/signIn";
import { GooglePlus } from "@ionic-native/google-plus";
import { Geolocation } from "@ionic-native/geolocation";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  sub;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public googlePlus: GooglePlus,
    public geolocation: Geolocation,
    public menu: MenuController
  ) {
    menu.swipeEnable(false);
  }

  //Goes to page for a user to register
  register() {
    this.navCtrl.push(Create);
  }

  //Goes to in-app sign page
  sign() {
    this.navCtrl.setRoot(SignIn);
  }

  //Signs user in using their google credentials
  doGoogleLogin() {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loading.present();

    this.googlePlus.login({}).then(res => {
      loading.dismiss();
      this.navCtrl.push(Create);
    });
  }
}
