import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ActionSheetController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AddVehiclePage } from "../add-vehicle/add-vehicle";
import { VehicleViewPage } from "../vehicle-view/vehicle-view";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the VehiclesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-vehicles",
  templateUrl: "vehicles.html"
})
export class VehiclesPage {
  cars;
  show: boolean = false;
  info = "";
  car;
  user;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public toastCtrl: ToastController,
    public action: ActionSheetController,
    public angularDB: AngularFireDatabase,
    public auth: AngularFireAuth
  ) {
    let status = this.storage.get("car");
    this.storage
      .get("car")
      .then(data => {
        this.cars = data; //Loads stored cars
        console.log(data);
      })
      .catch(err => console.log(err));
    if (this.cars == null) {
      this.cars = [];
      this.cars.push({ brand: "No vehicles added" });
      console.log(this.cars[0].brand);
      console.log("pushed");
    }
    this.auth.auth.onAuthStateChanged(user => {
      if (user != null) this.user = user;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad VehiclesPage");
  }

  //Goes to page for adding a new car
  add() {
    this.navCtrl.push(AddVehiclePage);
  }

  //Deletes car from inventory
  remove(car) {
    var index = this.cars.indexOf(car, 0);
    if (index > -1) {
      this.cars.splice(index, 1);
    }
  }

  //Display option when a car is tapped
  options(event, car) {
    let actionSheet = this.action.create({
      title: "Options",
      buttons: [
        {
          text: "Edit",
          handler: () => {
            this.navCtrl.setRoot(VehicleViewPage, {
              vehicle: car,
              read: false
            }); //Goes to page to edit cars information
          }
        },
        {
          text: "View Details",
          handler: () => {
            this.car = car; //Selects car to show info for
            this.show = true; //Makes card displaying car info visible
          }
        },
        {
          text: "Delete",
          role: "destructive",
          handler: () => {
            this.remove(car);
            this.storage.set("car", this.cars).catch(err => console.log(err));
          }
        },
        {
          text: "Set as current vehicle",
          handler: () => {
            this.setCurrentVehicle(car);
          }
        }
      ]
    });
    actionSheet.present();
  }

  //toggles visibilty of card shwoing car info
  invisible() {
    this.show = false;
  }

  setCurrentVehicle(car) {
    car.current = true;
    this.storage.set("primary", car).catch(err => console.log(err));
    this.storage.set("car", this.cars).catch(err => console.log(err));
    let data = {
      vehicle: {
        brand: car.brand,
        model: car.model,
        type: car.type,
        colour: car.colour,
        capacity: car.capacity,
        "license plate": car.license
      }
    };
    this.angularDB.object("/drivers/" + this.user.uid).update(data);
  }
}
