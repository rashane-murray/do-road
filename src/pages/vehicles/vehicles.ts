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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public toastCtrl: ToastController,
    public action: ActionSheetController
  ) {
    let status = this.storage.get("car");
    this.storage
      .get("car")
      .then(data => {
        this.cars = data; //Loads stored cars
        console.log(data);
      })
      .catch(err => this.toasting(err));
    if (this.cars == null) {
      this.cars = [];
      this.cars.push({ brand: "No vehicles added" });
      console.log(this.cars[0].brand);
      console.log("pushed");
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad VehiclesPage");
  }

  //Goes to page for adding a new car
  add() {
    this.navCtrl.push(AddVehiclePage);
  }

  toasting(s) {
    let toast = this.toastCtrl.create({
      message: s,
      duration: 3000,
      position: "top"
    });
    toast.present();
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
          text: "Delete",
          role: "destructive",
          handler: () => {
            this.remove(car);
            this.storage
              .set("car", this.cars)
              .then(data => this.toasting(data))
              .catch(err => this.toasting(err));
          }
        },
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
        }
      ]
    });
    actionSheet.present();
  }

  //toggles visibilty of card shwoing car info
  invisible() {
    this.show = false;
  }
}
