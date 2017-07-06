import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleViewPage } from './vehicle-view';

@NgModule({
  declarations: [
    VehicleViewPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleViewPage),
  ],
  exports: [
    VehicleViewPage
  ]
})
export class VehicleViewPageModule {}
