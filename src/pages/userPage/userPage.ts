import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Create} from '../create/create';
import {SignIn} from '../signIn/signIn';
import {GooglePlus } from '@ionic-native/google-plus';
import { RoadMap } from '../map/map';
import { Options } from '../options/options';
import { RoadMapPage } from '../road-map/road-map';






@Component({
selector: 'page-userpage',
templateUrl: 'UserPage.html',

})

export class UserPage {

sub;
params =  {name:'hue', email:'emai'};
tab1 = Create;
tab2 = RoadMap;
tab3 = (Options);

constructor(public navCtrl: NavController, public navParams: NavParams, public googlePlus: GooglePlus) {

}




}