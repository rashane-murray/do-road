import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerMapPage } from './passenger-map';

@NgModule({
  declarations: [
    PassengerMapPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerMapPage),
  ],
  exports: [
    PassengerMapPage
  ]
})
export class PassengerMapPageModule {}
