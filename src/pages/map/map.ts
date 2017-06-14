import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { UserProvider } from '../../providers/user/user';




declare var google;


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class RoadMap {


  @ViewChild('map') mapElement;
  map: any;
  lat = 18.2;
  lon=77.3;
  

  constructor(public navCtrl: NavController, public platform: Platform, public googleMaps: GoogleMaps, public user: UserProvider, public geolocation: Geolocation) {
  	this.platform = platform;
    
  }


  ionViewDidLoad(){
    this.initMap();
  }
  

  initMap(){

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;

        });

       let latLng = new google.maps.LatLng(this.lat, this.lon);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mpTypeId: google.maps.MapTypeId.ROADMAP
    };


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  

   
  }

}


