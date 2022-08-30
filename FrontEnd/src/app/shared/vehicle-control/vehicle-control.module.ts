import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleControlScreenComponent } from './vehicle-control-screen/vehicle-control-screen.component';
import {VehiclesControlRoutingModule} from "./vehicle-control-routing.module";



@NgModule({
  declarations: [
    VehicleControlScreenComponent
  ],
  imports: [
    CommonModule,
    VehiclesControlRoutingModule
  ]
})
export class VehicleControlModule { }
