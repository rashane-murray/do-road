import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Create } from '../pages/create/create';
import { SignIn } from '../pages/signIn/signIn';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import { Angular2SocialLoginModule } from 'C:/Users/dubze/Documents/ionic/do-road/node_modules/angular2-social-login';

let p = {
  "google": {
      "clientId": "743156431947-d6v8jfh79jrd92j6rgciti7uhln58ic4.apps.googleusercontent.com"
    },
     "facebook": {
      "clientId": "133234047245064",
      "apiVersion": "v2.9" 
    }
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Create,
    SignIn
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Angular2SocialLoginModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Create,
    SignIn
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    NativeStorage,
    Facebook
     
    
  ]
})
export class AppModule {}

Angular2SocialLoginModule.loadProvidersScripts(p);
