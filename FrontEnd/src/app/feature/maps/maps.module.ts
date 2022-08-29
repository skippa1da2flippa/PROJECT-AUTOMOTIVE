import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsScreenComponent } from './maps-screen/maps-screen.component';
import {MapsRoutingModule} from "./maps-routing.module";



@NgModule({
  declarations: [
    MapsScreenComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
