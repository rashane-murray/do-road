import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Create} from '../create/create';


import { RoadMap } from '../map/map';
import { ListPage } from '../list/list';








@Component({
selector: 'page-userpage',
templateUrl: 'userPage.html',

})

export class UserPage {

sub;
params =  {name:'hue', email:'emai'};
tab1 = ListPage;
tab2 = RoadMap;


constructor(public navCtrl: NavController, public navParams: NavParams) {

}


//<ion-tab tabIcon="settings" [root]="tab3" tabTitle="Options" [rootParams]="params"></ion-tab>

}