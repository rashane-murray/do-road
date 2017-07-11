import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { UserProvider } from '../../providers/user/user';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { ListPage } from '../list/list';


declare var google, navigator;


/**
 * Generated class for the PassengerMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-passenger-map',
  templateUrl: 'passenger-map.html',
})
export class PassengerMapPage {

  @ViewChild('map') mapElement;
  map: any;
  latLng;
  currentLatLng;

  markerArray = [];
 
  marker;

  waiting = [{name:'Yuki', distance: 5, time: '15 mins', id: '43455654', status:'body', lat: 18.004, long: -76.856},{name:'Mira', distance: 2, time: '5 mins', id: '4929433', status:'body', lat: 18.0032, long: -76.7452},{name:'Jace', distance: 13, time: '53 min', id: '3433434', status:'body', lat:18.0187, long: -76.7445},{name:'Suna', distance: '74', time: '1 hr 13 mins', id: '5342545', status:'body', lat: 17.9422, long: -77.2333},{name:'Hugh', distance: 0.7, time: '2 mins', id: '43434641', status:'body', lat: 18.0213, long: -76.7692}];
  show = false;



  constructor(public navCtrl: NavController, public platform: Platform, public user: UserProvider, public geolocation: Geolocation, public tts: TextToSpeech, public toastCtrl: ToastController, public storage: Storage, public bkgrnd: BackgroundGeolocation, public alt: AlertController, public stg: NativeStorage, public params: NavParams) {

    this.platform.ready().then(() => this.onPlatformReady());
  }


  private onPlatformReady(): void {
    
    
  }


  ionViewDidLoad(){
    this.loadMap();
  }



  loadMap(){
    //setTimeout(this.testThread(),3000);
    navigator.geolocation.getCurrentPosition((position) => {

      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
      console.log(""+ position.coords.longitude+":..." + position.coords.latitude);
      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mpTypeId: google.maps.MapTypeId.ROADMAP
      }

     

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.setMarkers();


    }, (err) => {
      console.log(err);
    });
  }

  


 

addMarker(){

  this.marker = new google.maps.Marker({
    position: this.currentLatLng,
    map: this.map
  });


}

/**attachInstructionText(marker, text) {
  google.maps.event.addListener((marker) => {
    this.stepDisplay.setContent(text);
    this.stepDisplay.open(this.map, marker);
  });*/

  setMarkers(){

    for (let x = 0; x<this.waiting.length; x++){
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.waiting[x].lat, this.waiting[x].long),
        map: this.map
      });

    }

  }

 

}

