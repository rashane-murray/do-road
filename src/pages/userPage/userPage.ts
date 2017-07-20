import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


import { PassengerMapPage } from "../passenger-map/passenger-map";
import { ListPage } from '../list/list';
import { VehiclesPage } from '../vehicles/vehicles';
import { WaitingPage } from "../waiting/waiting";
import { CompletedTripsPage } from '../completed-trips/completed-trips'







@Component({
selector: 'page-userpage',
templateUrl: 'userPage.html',

})

export class UserPage {

sub;
params1 =  {action:"free"};
tab1 = ListPage;
tab2 = PassengerMapPage;
tab3 = VehiclesPage;
tab4 = WaitingPage;
tab5 = CompletedTripsPage;


constructor(public navCtrl: NavController, public navParams: NavParams) {

}


//<ion-tab tabIcon="settings" [root]="tab3" tabTitle="Options" [rootParams]="params"></ion-tab>

}

