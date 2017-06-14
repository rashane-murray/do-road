import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/userPage/userPage';

import { LoadingController } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  loader;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,  public load: LoadingController) {
   
    platform.ready().then(() => {
      this.loading();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.loader.dismiss();

    
    });
  }

  loading(){

    this.loader = this.load.create({
      content: "Checking for signed in account"
    });

    this.loader.present();
  }
}

