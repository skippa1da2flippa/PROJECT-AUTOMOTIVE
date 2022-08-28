import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutinesScreenComponent } from './routines-screen/routines-screen.component';
import {RoutinesRoutingModule} from "./routines-routing.module";



@NgModule({
  declarations: [
    RoutinesScreenComponent
  ],
  imports: [
    CommonModule,
    RoutinesRoutingModule
  ]
})
export class RoutinesModule { }
