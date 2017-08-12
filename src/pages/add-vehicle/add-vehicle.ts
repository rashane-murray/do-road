import { Component } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	AlertController,
	ToastController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { VehiclesPage } from "../vehicles/vehicles";
/**
 * Generated class for the AddVehiclePage page.
 *

 */
@IonicPage()
@Component({
	selector: "page-add-vehicle",
	templateUrl: "add-vehicle.html"
})
export class AddVehiclePage {
	// variables linked to input fields
	brand: string;
	model: string;
	capacity: string;
	colour: string;
	license: string;

	// variables for colour of text of labels of input fields
	bCol: string;
	mCol: string;
	cCol: string;
	colCol: string;
	lCol: string;
	vehicles = [];

	errorTitle: string = "Could Not Be Completed!";
	missing: number[] = [];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public storage: Storage,
		public toastCtrl: ToastController
	) {
		this.storage
			.get("car")
			.then(data => {
				if (data[0].name == "No vehicles added") {
					this.vehicles = [];
				} else {
					this.vehicles = data;
				}
			})
			.catch(err => this.toasting(err));
	}

	ionViewDidLoad() {
		console.log("ionViewDidLoad AddVehiclePage");
	}

	create() {
		if (this.check()) {
			//Stores new vehicle to database
			this.vehicles.push({
				brand: this.brand,
				model: this.model,
				capacity: this.capacity,
				colour: this.colour,
				license: this.license
			});
			this.storage
				.set("car", this.vehicles)
				.then(data => this.toasting(data))
				.catch(err => this.toasting(err));
			console.log("Worked");
			this.navCtrl.setRoot(VehiclesPage);
		} else {
			//Notifies if fields not filled correctly or incomplete
			this.mark();
			let alert = this.alertCtrl.create({
				title: this.errorTitle,
				subTitle: "Please fill in highlighted fields"
			});
			alert.present();
		}
	}

	//Goes through list of missing fields to highlight
	mark() {
		while (this.missing.length != 0) this.colored(this.missing.pop());
	}

	//Highlights required fields not filled in
	colored(n: number) {
		if (n == 1) this.bCol = "#f53d3d";
		else if (n == 2) this.mCol = "#f53d3d";
		else if (n == 3) this.cCol = "#f53d3d";
		else if (n == 4) this.colCol = "#f53d3d";
		else if (n == 5) this.lCol = "#f53d3d";
	}

	//Checks if any field is not filled in
	check() {
		this.fix();
		if (!this.brand) this.missing.push(1);
		if (!this.model) this.missing.push(2);
		if (!this.capacity) this.missing.push(3);
		if (!this.colour) this.missing.push(4);
		if (!this.license) this.missing.push(5);

		console.log(this.missing);
		if (this.missing.length == 0) return true;
		else return false;
	}

	//Revert highlighted field to normal color when filled in correctly
	fix() {
		this.bCol = "#999";
		this.mCol = "#999";
		this.cCol = "#999";
		this.colCol = "#999";
		this.lCol = "#999";
	}

	toasting(s) {
		let toast = this.toastCtrl.create({
			message: s,
			duration: 3000,
			position: "top"
		});
		toast.present();
	}
}
