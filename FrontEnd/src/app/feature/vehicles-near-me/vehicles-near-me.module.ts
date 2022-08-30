import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesNearMeScreenComponent } from './vehicles-near-me-screen/vehicles-near-me-screen.component';
import {VehiclesNearMeRoutingModule} from "./vehicles-near-me-routing.module";
import { VehicleFoundScreenComponent } from './vehicle-found-screen/vehicle-found-screen.component';



@NgModule({
  declarations: [
    VehiclesNearMeScreenComponent,
    VehicleFoundScreenComponent
  ],
  imports: [
    CommonModule,
    VehiclesNearMeRoutingModule
  ]
})
export class VehiclesNearMeModule { }
