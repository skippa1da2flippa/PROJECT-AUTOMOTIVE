import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyVehiclesScreenComponent } from './my-vehicles-screen/my-vehicles-screen.component';
import {MyVehiclesRoutingModule} from "./my-vehicles-routing.module";



@NgModule({
  declarations: [
    MyVehiclesScreenComponent
  ],
  imports: [
    CommonModule,
    MyVehiclesRoutingModule
  ]
})
export class MyVehiclesModule { }
