import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ToastController, LoadingController, AlertController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { RoadMap } from '../map/map';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  latLng;
  passengers: Array<{name:string, distance: string, time: string, id: string, status:string}>;
  people = [{name:'Yuki', distance: 5, time: '15 mins', id: '43455654', status:'body', lat: 18.004, long: -76.856},{name:'Mira', distance: 2, time: '5 mins', id: '4929433', status:'body', lat: 18.0032, long: -76.7452},{name:'Jace', distance: 13, time: '53 min', id: '3433434', status:'body', lat:18.0187, long: -76.7445},{name:'Suna', distance: '74', time: '1 hr 13 mins', id: '5342545', status:'body', lat: 17.9422, long: -77.2333},{name:'Hugh', distance: 0.7, time: '2 mins', id: '43434641', status:'body', lat: 18.0213, long: -76.7692}];
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public storage: Storage, public toastCtrl: ToastController, public load: LoadingController, public alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    menu.swipeEnable(false);
    this.people.sort(this.sortpeople);
    // Let's populate this page with some filler content for funzies
    this.passengers = [];
    this.storage.get('previous').then(val => {
      if (val){
        this.storage.get('trip').then(data => {
          this.previousTrip(data);
        })
      }
    })
    //this.storage.set('Travelling',this.passengers);
    /**for (let i = 1; i < 11; i++) {
      this.passengers.push({
        name: 'Person ' + i,
        distance: i + "km",
        time: '1hr',
        id: '0000',
        status: 'body'
      });
    }*/
  }

  personTapped(event, person) {


    if(person.status == 'body'){
      person.status = 'car';
      this.passengers.push(person);
      this.passengers.sort(this.sortpeople);
      console.log(this.passengers[0].distance);
      
      //this.alerts();
    }
    else{
      person.status = 'body';
      this.removepassenger(person);
      if (this.passengers[0] == null)
        console.log('empty')
      else{
        this.passengers.sort(this.sortpeople);
        console.log(this.passengers[0].distance);
      }
      

    }

  }

  removepassenger(person){
    var index = this.passengers.indexOf(person,0);
    if (index > -1){
      this.passengers.splice(index,1);
    }
  }

  removePerson(person){
    var index = this.people.indexOf(person,0);
    if (index > -1){
      this.people.splice(index,1);
    }
  }


  sortpeople(pass1, pass2){
    if (pass1.distance<pass2.distance)
      return -1;
    if (pass1.distance==pass2.distance)
      return 0;
    if (pass1.distance>pass2.distance)
      return 1;
  }

  confirm(){
    setTimeout(() => {
      this.toasting('Ready to go!');
      let decision = this.passengers;
      this.passengers.forEach((person) => {
        this.removePerson(person);
      })
      this.passengers = [];
      this.storage.set('previous', true);
      this.storage.set('trip', decision);
      this.navCtrl.push(RoadMap, {passengers:decision});

    },500);

  }

  toasting(content){
    let toast = this.toastCtrl.create({
      message: content,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  previousTrip(data){
    let confirm = this.alertCtrl.create({
      title: 'Previous Trip?',
      message: 'A previous trip has been detected. Would you like to continue it?',
      buttons: [
      {
        text: 'Yes',
        handler: () => {
          this.navCtrl.push(RoadMap, {passengers:data});
          console.log('Disagree clicked');
        }
      },
      {
        text: 'No',
        handler: () => {
          this.storage.set('previous',false);
          console.log('No');
        }
      }
      ]
    });
    confirm.present();

  }


}
