import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { UserProvider } from '../../providers/user/user';




declare var google, navigator;


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class RoadMap {


  @ViewChild('map') mapElement;
  map: any;
 

  constructor(public navCtrl: NavController, public platform: Platform, public googleMaps: GoogleMaps, public user: UserProvider, public geolocation: Geolocation) {
   this.platform.ready().then(() => this.onPlatformReady());
  
  }


  private onPlatformReady(): void {

}


  ionViewDidLoad(){
    this.loadMap();
  }
  

  loadMap(){

    navigator.geolocation.getCurrentPosition((position) => {
  
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mpTypeId: google.maps.MapTypeId.ROADMAP
    }


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        }, (err) => {
          console.log(err);
        });

    

  

   
  }

}


