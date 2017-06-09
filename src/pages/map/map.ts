import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
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
  

  constructor(public navCtrl: NavController, public platform: Platform, public googleMaps: GoogleMaps, public user: UserProvider) {
  	this.platform = platform;
    
  }


  ionViewDidLoad(){
    this.initMap();
  }

  initMap(){

    

    let latLng = new google.maps.LatLng(this.user.lat, this.user.long);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mpTypeId: google.maps.MapTypeId.ROADMAP
    };


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}


