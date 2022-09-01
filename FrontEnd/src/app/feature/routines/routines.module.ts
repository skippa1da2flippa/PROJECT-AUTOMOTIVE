import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutinesScreenComponent } from './routines-screen/routines-screen.component';
import {RoutinesRoutingModule} from "./routines-routing.module";
import { RoutineCreationScreenComponent } from './routine-creation-screen/routine-creation-screen.component';



@NgModule({
  declarations: [
    RoutinesScreenComponent,
    RoutineCreationScreenComponent
  ],
  imports: [
    CommonModule,
    RoutinesRoutingModule
  ]
})
export class RoutinesModule { }
