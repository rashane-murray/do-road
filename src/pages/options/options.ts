import { Component } from '@angular/core';

import {HomePage} from '../home/home';
import { NavController, NavParams } from 'ionic-angular';
@Component({
	selector: 'page-options',
	templateUrl: 'options.html'
})
export class Options {

	

	constructor(public navCtrl: NavController, public nav: NavParams) {
		console.log(nav.get('name'));
	}

	out(){
		
		
	}
}