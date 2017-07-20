import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompletedTripsPage } from './completed-trips';

@NgModule({
  declarations: [
    CompletedTripsPage,
  ],
  imports: [
    IonicPageModule.forChild(CompletedTripsPage),
  ],
  exports: [
    CompletedTripsPage
  ]
})
export class CompletedTripsPageModule {}
