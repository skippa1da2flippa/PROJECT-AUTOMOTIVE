import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesNearMeScreenComponent } from './vehicles-near-me-screen/vehicles-near-me-screen.component';
import {VehiclesNearMeRoutingModule} from "./vehicles-near-me-routing.module";



@NgModule({
  declarations: [
    VehiclesNearMeScreenComponent
  ],
  imports: [
    CommonModule,
    VehiclesNearMeRoutingModule
  ]
})
export class VehiclesNearMeModule { }
