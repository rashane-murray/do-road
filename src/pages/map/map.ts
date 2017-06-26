import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { UserProvider } from '../../providers/user/user';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { NativeStorage } from '@ionic-native/native-storage';


declare var google, navigator;


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class RoadMap {


  @ViewChild('map') mapElement;
  map: any;
  directionsDisplay;
  directionsService = new google.maps.DirectionsService();
  dServe = new google.maps.DirectionsService();
  latLng;
  CurrentLatLng;
  direct;
  lat = "Place";
  lon;
  markerArray = [];
  stepDisplay;
  there = false;

  myRoute;
  anonRoute;
  num;



  constructor(public navCtrl: NavController, public platform: Platform, public user: UserProvider, public geolocation: Geolocation, public tts: TextToSpeech, public toastCtrl: ToastController, public storage: Storage, public bkgrnd: BackgroundGeolocation, public alt: AlertController, public stg: NativeStorage) {
    this.platform.ready().then(() => this.onPlatformReady());
  }


  private onPlatformReady(): void {}


  ionViewDidLoad(){
    this.loadMap();
  }

  testThread(){
    while(true){
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        console.log(this.lat);

      });
    }

  }

  loadMap(){
    //setTimeout(this.testThread(),3000);
    navigator.geolocation.getCurrentPosition((position) => {

      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.CurrentLatLng = this.latLng;
      console.log(""+ position.coords.longitude+":..." + position.coords.latitude);
      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mpTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.directionsDisplay = new google.maps.DirectionsRenderer();

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.directionsDisplay.setMap(this.map);
      this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
      this.stepDisplay = new google.maps.InfoWindow();

    }, (err) => {
      console.log(err);
    });
  }

  calcRoute() {

    this.stg.getItem('lat').then(data => this.toasting(data), error => this.toasting("Fail"));
    this.storage.get('logged').then((val) => this.toasting(val));
    let start = document.getElementById('start');
    let end = document.getElementById('end');
    let request = {
      origin: this.latLng,
      destination: new google.maps.LatLng(18, -76.78),
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: 'pessimistic'
      },
      unitSystem: google.maps.UnitSystem.METRIC
    };
    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {

        this.directionsDisplay.setDirections(result);
        this.showSteps(result);
      }
    });
  }


  distTime(){
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
      origins: [this.latLng],
      destinations: [new google.maps.LatLng(18, -76.78)],
      travelMode: 'DRIVING'
    }, this.callback);
  }


  callback(response, status) {
    console.log(response.rows[0].elements[0].distance.text);
    console.log(response.rows[0].elements[0].duration.text);
  }



  showSteps(directionResult) {
    // For each step, place a marker, and add the text to the marker's
    // info window. Also attach the marker to an array so we
    // can keep track of it and remove it when calculating new
    // routes.
    this.myRoute = directionResult.routes[0].legs[0];

   /** for (let i = 0; i < this.myRoute.steps.length; i++) {
    

       console.log(myRoute.steps[i].instructions)
       var marker = new google.maps.Marker({
          position: myRoute.steps[i].start_point,
          map: this.map
         });
         this.attachInstructionText(marker, myRoute.steps[i].instructions);
          this.markerArray[i] = marker;
      }
     }*/

      this.distTime();
      console.log("1st" + this.myRoute.steps[0].instructions.replace(/<(?:.|\n)*?>/gm, ''));

      //this.tts.speak(this.myRoute.steps[0].instructions)
      //.then(() => console.log('Success'))
      //.catch((reason: any) => console.log(reason));
      //this.track();

/**attachInstructionText(marker, text) {
  google.maps.event.addListener((marker) => {
    this.stepDisplay.setContent(text);
    this.stepDisplay.open(this.map, marker);
  });*/
}

toasting(content){
  let toast = this.toastCtrl.create({
    message: content,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

//Code below to track driver during pickup

track(){
  let numberOfSteps = this.myRoute.steps.length;
  let stepsLeft = numberOfSteps;
  while(!this.there){
    this.pos();
    let result = this.dir(numberOfSteps);
    let steps = this.steps(result);
    if (steps == 1){
      let l = numberOfSteps-1;
      console.log("2nd" + this.myRoute.steps[l].instructons)
      this.tts.speak(this.myRoute.steps[l].instructons);
      this.there = true;
    }

    else if (steps < stepsLeft)
    {
      let diff = numberOfSteps - steps;
      console.log("3rd" + this.myRoute.steps[diff].instructons)
      this.tts.speak(this.myRoute.steps[diff].instructons);
      stepsLeft = steps;
    }
    this.createTimeout(30000)
    .then(() => {
      console.log(`done after 300ms delay`);
    });


  }
}

dir(c){

  let request = {
    origin: this.CurrentLatLng,
    destination: new google.maps.LatLng(18, -76.78),
    travelMode: 'DRIVING',
    drivingOptions: {
      departureTime: new Date(),
      trafficModel: 'pessimistic'
    },
    unitSystem: google.maps.UnitSystem.METRIC
  };
  this.dServe.route(request, (result, status) => {
    if (status == 'OK') {
      return this.steps(result);
    }
    else console.log(status);
    //else return c;
  });

}

pos(){
  navigator.geolocation.getCurrentPosition((position) => {

    this.CurrentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  }, (err) => {
    console.log(err);
  });
}

steps(results){
  if (!results)
    console.log("No results");
  else{
    let routeSteps = results.routes[0].legs[0];
    let numberOfSteps = routeSteps.steps.length
    return numberOfSteps;
  }
}

createTimeout(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null),timeout)
  })

}
}

