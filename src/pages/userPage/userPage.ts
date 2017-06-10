import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Create} from '../create/create';
import {SignIn} from '../signIn/signIn';
import {GooglePlus } from '@ionic-native/google-plus';
import { RoadMap } from '../map/map';





@Component({
selector: 'page-userpage',
templateUrl: 'userPage.html',

})

export class UserPage {

sub;
tab1 = Create;
tab2 = RoadMap;

constructor(public navCtrl: NavController, public navParams: NavParams, public googlePlus: GooglePlus) {

}



}