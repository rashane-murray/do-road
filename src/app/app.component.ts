import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/userPage/userPage';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController, ToastController } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;
  loader;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,  public load: LoadingController, public geolocation: Geolocation, public storage: Storage, public bkgrnd: BackgroundGeolocation, public toastCtrl: ToastController, public stg: NativeStorage, public network: Network) {
    this.initializeApp();   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.loading();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.internetCheck();
      this.pages = [
      { title: 'Logout', component: HomePage }
      ];

      this.storage.get('logged').then((val) => {
        console.log(val);
        if(val == null)
          this.rootPage=HomePage;
        else{
          this.rootPage=UserPage;
          this.storage.set('locate', true);
          this.locate();

        }
      }).catch((err) => {
        console.log("Not logged in");
      });

      this.loader.dismiss();
    });

    
  }

  locate(){

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    
    this.bkgrnd.configure(config).subscribe((location: BackgroundGeolocationResponse) => {


      let f = "" + location.latitude;
      let lon = "" + location.longitude;
      this.toasting(f);
      
      this.stg.setItem('lat', f).then(() => this.toasting('Work')), error => this.toasting("Failed");
      this.stg.setItem('long', lon).then(() => this.toasting('Work')), error => this.toasting("Failed");


    });

    this.bkgrnd.start();
  }

  toasting(s){
    let toast = this.toastCtrl.create({
      message: s,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.storage.remove('logged');
  }

  internetCheck(){

let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  this.toasting('network was disconnected :-(');
});


let connectSubscription = this.network.onConnect().subscribe(() => {
  console.log('network connected!');
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      this.toasting('we got a wifi connection, woohoo!');
    }
  }, 3000);
});

 }



  loading(){
    this.loader = this.load.create({
      content: "Checking for signed in account"
    });
    this.loader.present();
  }
}

