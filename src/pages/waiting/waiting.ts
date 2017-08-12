import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  MenuController,
  ToastController,
  LoadingController,
  IonicPage
} from "ionic-angular";
import { Storage } from "@ionic/storage";
/**
 * Generated class for the WaitingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-waiting",
  templateUrl: "waiting.html"
})
export class WaitingPage {
  show: boolean = false;
  person;
  search;
  latLng;
  searching = false;
  none = true;
  passengers: Array<{
    name: string;
    distance: string;
    time: string;
    id: string;
    status: string;
  }>;
  searches = [];
  people = [
    {
      name: "Yuki",
      distance: 5,
      time: "15 mins",
      id: "43455654",
      status: "body",
      lat: 18.004,
      long: -76.856,
      phone: "876-432-1348"
    },
    {
      name: "Mira",
      distance: 2,
      time: "5 mins",
      id: "4929433",
      status: "body",
      lat: 18.0032,
      long: -76.7452,
      phone: "876-892-4371"
    },
    {
      name: "Jace",
      distance: 13,
      time: "53 min",
      id: "3433434",
      status: "body",
      lat: 18.0187,
      long: -76.7445,
      phone: "876-398-1968"
    },
    {
      name: "Suna",
      distance: "74",
      time: "1 hr 13 mins",
      id: "5342545",
      status: "body",
      lat: 17.9422,
      long: -77.2333,
      phone: "876-239-1072"
    },
    {
      name: "Hugh",
      distance: 0.7,
      time: "2 mins",
      id: "43434641",
      status: "body",
      lat: 18.0213,
      long: -76.7692,
      phone: "876-438-9431"
    }
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public storage: Storage,
    public toastCtrl: ToastController,
    public load: LoadingController
  ) {
    menu.swipeEnable(false);

    this.empty();
    this.people.sort(this.sortpeople);
    this.passengers = [];
  }

  //Checks if there are any passengers waiting on vehicles
  empty() {
    if (this.people.length > 0) this.none = false;
    else this.none = true;
  }

  //Selects/deselects passenger when tapped
  personTapped(event, person) {
    if (person.status == "body") {
      person.status = "car";
      this.passengers.push(person);
      console.log(this.passengers[0].distance);
    } else {
      person.status = "body";
      this.removepassenger(person);
      if (this.passengers[0] == null) console.log("empty");
      else {
        this.passengers.sort(this.sortpeople);
        console.log(this.passengers[0].distance);
      }
    }
  }

  //Remove person from list of selected passengers
  removepassenger(person) {
    var index = this.passengers.indexOf(person, 0);
    if (index > -1) {
      this.passengers.splice(index, 1);
    }
  }

  //Removes selected passengers from list of people waiting
  removePerson(person) {
    var index = this.people.indexOf(person, 0);
    if (index > -1) {
      this.people.splice(index, 1);
    }
  }

  //Sorts people by distance from driver
  sortpeople(pass1, pass2) {
    if (pass1.distance < pass2.distance) return -1;
    if (pass1.distance == pass2.distance) return 0;
    if (pass1.distance > pass2.distance) return 1;
  }

  //Confirms pickup of selected people
  confirm() {
    for (let x = 0; x < this.passengers.length; x++) {
      this.removePerson(this.passengers[x]);
    }
    this.passengers = [];
    this.empty();
    this.searching = false;
  }

  toasting(content) {
    let toast = this.toastCtrl.create({
      message: content,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  //triggers when something is typed in the search box
  onInput(event) {
    this.searching = true;
    this.searches = [];
    this.people.forEach(item => this.match(item));
  }

  //Adds people matching search criterion to a list to list of results to be displayed
  match(item) {
    if (item.name.toUpperCase().indexOf(this.search.toUpperCase()) != -1)
      this.searches.push(item);
  }

  //Selects user to display information for and toggle visibilty of card showing it
  details(event, person) {
    this.show = true;
    this.person = person;
  }
  //Toggles visibilty of card showing selected eprsons info
  invisible() {
    this.show = false;
  }
}
