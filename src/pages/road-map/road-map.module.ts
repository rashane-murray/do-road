import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoadMapPage } from './road-map';
import { GoogleMaps } from '@ionic-native/google-maps'
@NgModule({
  declarations: [
    RoadMapPage,
  ],
  imports: [
    IonicPageModule.forChild(RoadMapPage),
  ],
  exports: [
    RoadMapPage
  ],
  providers: [
  GoogleMaps
  ]
})
export class RoadMapPageModule {}
