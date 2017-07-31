import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { VehiclesPage } from "../vehicles/vehicles";
/**
 * Generated class for the VehicleViewPage page.
 * Displays info on vehicle which can be edited
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: "page-vehicle-view",
	templateUrl: "vehicle-view.html"
})
export class VehicleViewPage {
	brand: string;
	model: string;
	capacity: string;
	colour: string;
	license: string;
	cars;
	car;
	index;
	read;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storage: Storage
	) {
		this.read = this.navParams.get("read");
	}

	ionViewDidLoad() {
		console.log("ionViewDidLoad VehicleViewPage");
		this.car = this.navParams.get("vehicle");
		console.log(JSON.stringify(this.car));
		this.brand = this.car.brand;
		this.model = this.car.model;
		this.capacity = this.car.capacity;
		this.colour = this.car.colour;
		this.license = this.car.license;
		this.storage
			.get("car")
			.then(data => {
				this.cars = data;
				console.log(data);
				console.log(JSON.stringify(data[0]));
			})
			.catch(err => console.log(err));
	}

	indexed() {
		for (let x = 0; x < this.cars.length; x++) {
			if (this.model == this.cars[x].model) {
				console.log(x);
				this.index = x;
				break;
			}
		}
		console.log("Done");
	}

	//Confirms edits if any
	confirm() {
		this.indexed();
		this.cars.splice(this.index, 1);
		//this.remove();
		this.car = {
			brand: this.brand,
			model: this.model,
			capacity: this.capacity,
			colour: this.colour,
			license: this.license
		};
		this.cars.push(this.car);
		this.storage.remove("car");
		console.log(this.cars);
		this.storage
			.set("car", this.cars)
			.then(data => console.log(data))
			.catch(err => console.log(err));
		this.navCtrl.setRoot(VehiclesPage);
	}

	//Deletes a car from the inventory
	remove() {
		var index = this.cars.indexOf(this.car, 0);
		console.log("Index:" + index);
		if (index > -1) {
			this.cars.splice(this.index, 1);
		}
	}
}
