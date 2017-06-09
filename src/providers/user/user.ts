import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

	lat;
  long;

  constructor(public geolocation: Geolocation) {
  	this.geolocation.getCurrentPosition().then((resp) => {

      this.lat = resp.coords.latitude;
      this.long =  resp.coords.longitude;

    }).catch((error) => {
      console.log(error);
    });

  
    console.log('Hello UserProvider Provider');
}
  



}
