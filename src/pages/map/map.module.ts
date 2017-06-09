import { NgModule } from '@angular/core';
import { RoadMap} from './map';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [RoadMap],
  imports: [IonicPageModule.forChild(RoadMap)],
  entryComponents: [RoadMap]
})
export class RoadMapModule { }