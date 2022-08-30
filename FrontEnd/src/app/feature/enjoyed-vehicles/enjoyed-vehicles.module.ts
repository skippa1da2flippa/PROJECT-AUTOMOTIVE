import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnjoyedVehiclesScreenComponent } from './enjoyed-vehicles-screen/enjoyed-vehicles-screen.component';
import {EnjoyedVehiclesRoutingModule} from "./enjoyed-vehicles-routing.module";



@NgModule({
  declarations: [
    EnjoyedVehiclesScreenComponent
  ],
  imports: [
    CommonModule,
    EnjoyedVehiclesRoutingModule
  ]
})
export class EnjoyedVehiclesModule { }
