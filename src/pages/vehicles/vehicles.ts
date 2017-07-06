import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AddVehiclePage } from '../add-vehicle/add-vehicle';
import { VehicleViewPage } from '../vehicle-view/vehicle-view';

/**
 * Generated class for the VehiclesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-vehicles',
 	templateUrl: 'vehicles.html',
 })
 export class VehiclesPage {

   cars;
   show: boolean = false;
   info = "";
   car;

   constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public toastCtrl:ToastController, public action: ActionSheetController) {
     let status = this.storage.get('car');
     console.log(status + ";State");
     this.storage.get('car').then(data => {this.cars = data
       console.log(data);
     }).catch(err => this.toasting(err));
     if (this.cars == null){
       this.cars = [];
       this.cars.push({brand:'No vehicles added'});
       console.log(this.cars[0].brand);
       console.log('pushed');
     }
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad VehiclesPage');
   }

   carTapped(event, car){

   }

   add(){
     this.navCtrl.setRoot(AddVehiclePage);
   }

   toasting(s){
     let toast = this.toastCtrl.create({
       message: s,
       duration: 3000,
       position: 'top'
     });
     toast.present();
   }

   remove(car){
     var index = this.cars.indexOf(car,0);
     if (index > -1){
       this.cars.splice(index,1);
     }
   }


   options(event, car) {
     let actionSheet = this.action.create({
       title: 'Options',
       buttons: [
       {
         text: 'Delete',
         role: 'destructive',
         handler: () => {
           this.remove(car);
           this.storage.set('car', this.cars).then(data => this.toasting(data)).catch(err => this.toasting(err));
         }
       },{
         text: 'Edit',
         handler: () => {
           this.navCtrl.setRoot(VehicleViewPage,{vehicle:car, read:false});
         }
       },
       {
         text: 'View Details',
         handler: () => {
           this.car =car;
           this.show=true;
         }
       }
       ]
     });
     actionSheet.present();
   }

   invisible(){
     this.show = false;
   }

 }
