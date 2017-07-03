import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  people: Array<{name:string, distance: string, time: string, id: string, status:string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('person');
    menu.swipeEnable(false);

    // Let's populate this page with some filler content for funzies
    this.people = [];
    for (let i = 1; i < 11; i++) {
      this.people.push({
        name: 'Person ' + i,
        distance: i + "km",
        time: '1hr',
        id: '0000',
        status: 'body'
      });
    }
  }

  itemTapped(event, person) {
    // That's right, we're pushing to ourselves!
    if(person.status == 'body')
      person.status = 'car';
    else
      person.status = 'body';
    //this.navCtrl.push(ListPage, {
      //  item: item
      //});
    }
  }
