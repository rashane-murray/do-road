import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HomePage } from "../pages/home/home";
import { UserPage } from "../pages/userPage/userPage";
import { Geolocation } from "@ionic-native/geolocation";
import { LoadingController, ToastController } from "ionic-angular";
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from "@ionic-native/background-geolocation";
import { Storage } from "@ionic/storage";
import { NativeStorage } from "@ionic-native/native-storage";
import { Network } from "@ionic-native/network";
import { Push, PushObject, PushOptions } from "@ionic-native/push";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{ title: string; component: any }>;
  loader;
  state;
  backgroundLocation;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public load: LoadingController,
    public geolocation: Geolocation,
    public storage: Storage,
    public bkgrnd: BackgroundGeolocation,
    public toastCtrl: ToastController,
    public stg: NativeStorage,
    public network: Network,
    public push: Push,
    public alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.loading();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushsetup();
      this.internetCheck();
      this.pages = [{ title: "Logout", component: HomePage }];

      this.storage
        .get("logged")
        .then(val => {
          console.log(val);
          if (val == null) this.rootPage = HomePage;
          else {
            this.rootPage = UserPage;
            this.storage.set("locate", true);
            this.storage
              .get("autoLocate")
              .then(val => {
                if (val) {
                  this.backgroundLocation = "ON";
                  this.locate();
                } else this.backgroundLocation = "OFF";
              })
              .catch(err => {
                this.storage.set("autoLocate", true);
                this.backgroundLocation = "ON";
                this.locate;
              });

            this.storage
              .get("status")
              .then(val => {
                if (val) this.state = "Available";
                else this.state = "Unavailable";
              })
              .catch(err => {
                this.state = "Available";
                this.storage.set("status", true);
              });
          }
        })
        .catch(err => {
          console.log("Not logged in");
        });

      this.loader.dismiss();
    });
  }

  pushsetup() {
    const options: PushOptions = {
      android: {
        senderID: "552647789390"
      },
      ios: {
        alert: "true",
        badge: true,
        sound: "false"
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on("notification").subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: "DoRoad Notification",
          message: notification.message
        });
        youralert.present();
      }
    });

    pushObject.on("registration").subscribe((registration: any) => {
      // alert(registration.registrationId);
    });

    pushObject
      .on("error")
      .subscribe(error => alert("Error with Push plugin" + error));
  }

  locate() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false // enable this to clear background location settings when the app terminates
    };

    this.bkgrnd
      .configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        let f = "" + location.latitude;
        let lon = "" + location.longitude;
        this.toasting(f);

        this.stg.setItem("lat", f).then(() => this.toasting("Work")), error =>
          this.toasting("Failed");
        this.stg
          .setItem("long", lon)
          .then(() => this.toasting("Work")), error => this.toasting("Failed");
      });

    this.bkgrnd.start();
  }

  toasting(s) {
    let toast = this.toastCtrl.create({
      message: s,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.storage.remove("logged");
  }

  internetCheck() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.toasting("network was disconnected :-(");
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log("network connected!");
      setTimeout(() => {
        if (this.network.type === "wifi") {
          this.toasting("we got a wifi connection, woohoo!");
        }
      }, 3000);
    });
  }

  loading() {
    this.loader = this.load.create({
      content: "Checking for signed in account"
    });
    this.loader.present();
  }

  trackingToggle() {
    if (this.backgroundLocation == "ON") {
      this.backgroundLocation = "OFF";
      this.bkgrnd.stop();
      this.storage.set("locate", false);
    } else {
      this.backgroundLocation = "ON";
      this.storage.set("locate", true);
      this.locate();
    }
  }

  statusChange() {
    if (this.state == "Available") {
      this.state = "Unavailable";
      this.storage.set("status", false);
    } else {
      this.state = "Available";
      this.storage.set("status", true);
    }
  }
}
