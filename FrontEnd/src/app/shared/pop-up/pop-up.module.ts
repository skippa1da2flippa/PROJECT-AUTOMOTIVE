import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpScreenComponent } from './pop-up-screen/pop-up-screen.component';
import {PopUpRoutingModule} from "./pop-up-routing.module";



@NgModule({
  declarations: [
    PopUpScreenComponent
  ],
  imports: [
    CommonModule,
    PopUpRoutingModule
  ]
})
export class PopUpModule { }
