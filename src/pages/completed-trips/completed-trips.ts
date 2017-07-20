import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ActionSheetController } from "ionic-angular";
import { ReviewPage } from '../review/review';

/**
 * Generated class for the CompletedTripsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: "page-completed-trips",
	templateUrl: "completed-trips.html"
})
export class CompletedTripsPage {
	users = [
		{
			name: "Yuki",
			distance: 5,
			time: "15 mins",
			id: "43455654",
			status: "body",
			lat: 18.004,
			long: -76.856,
			phone: "876-432-1348",
			date: "2017-03-09 T00:45"
		},
		{
			name: "Mira",
			distance: 2,
			time: "5 mins",
			id: "4929433",
			status: "body",
			lat: 18.0032,
			long: -76.7452,
			phone: "876-892-4371",
			date: "2017-06-09 T11:27"
		},
		{
			name: "Jace",
			distance: 13,
			time: "53 min",
			id: "3433434",
			status: "body",
			lat: 18.0187,
			long: -76.7445,
			phone: "876-398-1968",
			date: "2017-27-08 T17:03"
		},
		{
			name: "Suna",
			distance: "74",
			time: "1 hr 13 mins",
			id: "5342545",
			status: "body",
			lat: 17.9422,
			long: -77.2333,
			phone: "876-239-1072",
			date: "2017-30-09 T21:38"
		},
		{
			name: "Hugh",
			distance: 0.7,
			time: "2 mins",
			id: "43434641",
			status: "body",
			lat: 18.0213,
			long: -76.7692,
			phone: "876-438-9431",
			date: "2017-29-06 T20:01"
		}
	];

	constructor(public navCtrl: NavController, public navParams: NavParams, public action: ActionSheetController) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad CompletedTripsPage");
	}

	tapped(event, user) {
     let actionSheet = this.action.create({
       title: 'Options',
       buttons: [
       {
         text: 'Delete',
         role: 'destructive',
         handler: () => {
           this.remove(user);
         }
       },{
         text: 'Review',
         handler: () => {
         	this.navCtrl.push(ReviewPage, {'user': user})
         }
       },
       
       
       ]
     });
     actionSheet.present();
   }

   remove(user){
     var index = this.users.indexOf(user,0);
     if (index > -1){
       this.users.splice(index,1);
     }
   }

  

}
