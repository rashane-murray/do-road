import { Component, ViewChild, ElementRef } from "@angular/core";
import { IonicPage } from "ionic-angular";
import {
  Navbar,
  NavController,
  ToastController,
  AlertController,
  NavParams
} from "ionic-angular";
import { Platform } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { TextToSpeech } from "@ionic-native/text-to-speech";
import { Storage } from "@ionic/storage";

declare var google, navigator;

@IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class RoadMap {
  @ViewChild("map") mapElement;
  @ViewChild("navbar") navBar: Navbar;
  map: any;
  directionsDisplay;
  directionsService = new google.maps.DirectionsService();
  dServe = new google.maps.DirectionsService();
  latLng;
  currentLatLng;
  direct;
  lat = "Place";
  lon;
  destination;
  waypoints = [];
  markerArray = [];
  stepDisplay;
  there = false;
  numberOfSteps;
  next;
  marker;
  myRoute;
  anonRoute;
  num;
  passengers;
  directResults;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public geolocation: Geolocation,
    public tts: TextToSpeech,
    public toastCtrl: ToastController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public params: NavParams
  ) {
    this.platform.ready().then(() => this.onPlatformReady());
  }

  private onPlatformReady(): void {}

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.back();
    };
    this.loadMap();
  }

  loadMap() {
    //setTimeout(this.testThread(),3000);
    navigator.geolocation.getCurrentPosition(
      position => {
        this.latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        this.currentLatLng = this.latLng;
        console.log(
          "" + position.coords.longitude + ":..." + position.coords.latitude
        );
        let mapOptions = {
          center: this.latLng,
          zoom: 15,
          mpTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.directionsDisplay = new google.maps.DirectionsRenderer();

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setPanel(
          document.getElementById("directionsPanel")
        );
        this.stepDisplay = new google.maps.InfoWindow();
        let p = this.params.get("passengers");
        console.log(JSON.stringify(p[0]));
      },
      err => {
        console.log(err);
      }
    );
  }

  passenger() {
    this.passengers = this.params.get("passengers");
    let last = this.passengers.length - 1;
    this.destination = new google.maps.LatLng(
      this.passengers[last].lat,
      this.passengers[last].long
    );

    for (let x = 0; x < last; x++) {
      this.waypoints.push({
        location: new google.maps.LatLng(
          this.passengers[x].lat,
          this.passengers[x].long
        ),
        stopover: true
      });
    }

    this.calcRoute();
  }

  calcRoute() {
    // let start = document.getElementById('start');
    // let end = document.getElementById('end');
    let request = {
      origin: this.latLng,
      destination: this.destination,
      waypoints: this.waypoints,
      provideRouteAlternatives: true,
      travelMode: "DRIVING",
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: "pessimistic"
      },
      unitSystem: google.maps.UnitSystem.METRIC
    };
    this.directionsService.route(request, (result, status) => {
      if (status == "OK") {
        this.directionsDisplay.setDirections(result);
        this.directResults = result;
        this.showSteps(0);
      }
    });
  }

  distTime(passenger) {
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.latLng],
        destinations: [new google.maps.LatLng(this.passengers[passenger].lat,
        this.passengers[passenger].long)],
        travelMode: "DRIVING"
      },
      this.callback
    );
  }

  callback(response, status) {
    console.log(response.rows[0].elements[0].distance.text);
    console.log(response.rows[0].elements[0].duration.text);
  }

  showSteps(passenger) {
    if (passenger >= this.passengers.length) console.log("Finished");
    else {
      // For each step, place a marker, and add the text to the marker's
      // info window. Also attach the marker to an array so we
      // can keep track of it and remove it when calculating new
      // routes.

      this.there = false;

      this.myRoute = this.directResults.routes[0].legs[passenger];
      this.numberOfSteps = this.myRoute.steps.length;

      this.next = this.numberOfSteps - 1;
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

      this.distTime(passenger);
      console.log(
        passenger + "Number" + this.removeHTML(this.myRoute.steps[0].instructions)
      );
      let sentence = this.removeHTML(this.myRoute.steps[0].instructions);
      this.tts.speak(sentence);
      //this.tts.speak(this.myRoute.steps[0].instructions)
      //.then(() => console.log('Success'))
      //.catch((reason: any) => console.log(reason));
      this.track(passenger);
    }
    /**attachInstructionText(marker, text) {
  google.maps.event.addListener((marker) => {
    this.stepDisplay.setContent(text);
    this.stepDisplay.open(this.map, marker);
  });*/
  }

  addMarker() {
    this.marker = new google.maps.Marker({
      position: this.currentLatLng,
      map: this.map
    });
  }

  removeHTML(sentence) {
    return sentence.replace(/<(?:.|\n)*?>/gm, "");
  }

  toasting(content) {
    let toast = this.toastCtrl.create({
      message: content,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  //Code below to track driver during pickup

  track(passenger) {
    this.addMarker();
    this.pos();
    this.directions(passenger);
  }

  directions(passenger) {
    let request = {
      origin: this.currentLatLng,
      destination: new google.maps.LatLng(
        this.passengers[passenger].lat,
        this.passengers[passenger].long
      ),
      travelMode: "DRIVING",
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: "pessimistic"
      },
      unitSystem: google.maps.UnitSystem.METRIC
    };
    this.dServe.route(request, (result, status) => {
      if (status == "OK") {
        this.steps(result, passenger);
      } else console.log(status);
      //else return c;
    });
  }

  pos() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.currentLatLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  steps(results, passenger) {
    if (!results) console.log("No results");
    else {
      let routeSteps = results.routes[0].legs[0];
      let length = routeSteps.steps.length;
      if (length <= 1) {
        let stepInfo = this.removeHTML(routeSteps.steps[0].instructions);
        console.log(stepInfo);
        this.tts.speak(stepInfo);
        let n = passenger + 1;
        this.toasting("Stop number " + n);
        this.endOfLeg(passenger);
      } else if (length <= this.next) {
        this.next = length - 1;
        let stepInfo = this.removeHTML(routeSteps.steps[0].instructions);
        console.log(stepInfo);
        this.tts.speak(stepInfo);
        setTimeout(() => {
          if (!this.there) this.track(passenger);
        }, 5000);
      } else {
        setTimeout(() => {
          if (!this.there) {
            this.track(passenger);
            console.log("Checked");
          }
        }, 5000);
      }
    }
  }

  endOfLeg(passenger) {
    let confirm = this.alertCtrl.create({
      title: "Pick up confirmation",
      message: "Confirm when passenger has been pickd up",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.there = true;
            this.showSteps(passenger+1);
          }
        },
        {
          text: "No",
          handler: () => {
            console.log("No");
          }
        }
      ]
    });
    confirm.present();
  }

  back() {
    let confirm = this.alertCtrl.create({
      title: "End Trip?",
      message: "Are you sure you would like to end this unfinished trip?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.storage.set("previous", false);
            console.log("Left");
            this.navCtrl.pop();
          }
        },
        {
          text: "No",
          handler: () => {
            console.log("Right");
          }
        }
      ]
    });
    confirm.present();
  }
}
