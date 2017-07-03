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
  currentLatLng;
  direct;
  lat = "Place";
  lon;
  markerArray = [];
  stepDisplay;
  there = false;
  numberOfSteps;
  next;
  marker;
  myRoute;
  anonRoute;
  num;
  passengers = [];



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
      this.currentLatLng = this.latLng;
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

  passenger(){
    this.storage.get('Travelling').then(data => this.passengers = data).catch( err => this.toasting(err));

    if(this.passengers == null)
      this.toasting('No passengers selected');
    else{
      console.log(this.passengers[0]);
      if (this.passengers[0] == null)
         this.toasting("No passengers selected");
      else{
      setTimeout(() => {
      this.storage.remove('Travelling');
      this.toasting('Rooad!');
    },2000);
      console.log(this.passengers)
      this.calcRoute();
    }
  }
  }

  calcRoute() {
     
    

    this.stg.getItem('lat').then(data => this.toasting(data), error => this.toasting("Fail"));
    this.storage.get('logged').then((val) => this.toasting(val));
    let start = document.getElementById('start');
    let end = document.getElementById('end');
    let request = {
      origin: this.latLng,
      destination: new google.maps.LatLng(18.0159, -76.7424),
      waypoints: [{location:new google.maps.LatLng(18.0032, -76.7452), stopover:true}],
      provideRouteAlternatives: true,
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
      destinations: [new google.maps.LatLng(18.0159, -76.7424)],
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
    this.numberOfSteps= this.myRoute.steps.length;
     
    this.next = this.numberOfSteps -1;
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
      console.log("1st" + this.removeHTML(this.myRoute.steps[0].instructions));
      let sentence = this.removeHTML(this.myRoute.steps[0].instructions);
      this.tts.speak(sentence);
      //this.tts.speak(this.myRoute.steps[0].instructions)
      //.then(() => console.log('Success'))
      //.catch((reason: any) => console.log(reason));
      this.track();

/**attachInstructionText(marker, text) {
  google.maps.event.addListener((marker) => {
    this.stepDisplay.setContent(text);
    this.stepDisplay.open(this.map, marker);
  });*/

}

addMarker(){

  this.marker = new google.maps.Marker({
          position: this.currentLatLng,
          map: this.map
         });


}

removeHTML(sentence){
  return sentence.replace(/<(?:.|\n)*?>/gm, '');

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
    this.addMarker();
    this.pos();
    this.directions();
    
}

directions(){

  let request = {
    origin: this.currentLatLng,
    destination: new google.maps.LatLng(18.0159, -76.7424),
    travelMode: 'DRIVING',
    drivingOptions: {
      departureTime: new Date(),
      trafficModel: 'pessimistic'
    },
    unitSystem: google.maps.UnitSystem.METRIC
  };
  this.dServe.route(request, (result, status) => {
    if (status == 'OK') {
      this.steps(result);
    }
    else console.log(status);
    //else return c;
  });

}

pos(){
  navigator.geolocation.getCurrentPosition((position) => {

    this.currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  }, (err) => {
    console.log(err);
  });
}

steps(results){
  if (!results)
    console.log("No results");
  else{
    let routeSteps = results.routes[0].legs[0];
    let length = routeSteps.steps.length;
    if (length <= 1){
      this.there = true;
      let stepInfo = routeSteps.steps[0].instructions;
      console.log(stepInfo);
      this.tts.speak(stepInfo);
    }
    else if (length<=this.next){
      this.next = length-1;
      let stepInfo = routeSteps.steps[0].instructions;
      console.log(stepInfo);
      this.tts.speak(stepInfo);
        setTimeout(() => {
      if(!this.there)
        this.track();      
    },5000);

    }

    else{
      setTimeout(() => {
      if(!this.there){
        //this.track(); 
        console.log("Checked");     
      }
    },5000);
    }
    
  }
}

createTimeout(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null),timeout)
  })

}

}

