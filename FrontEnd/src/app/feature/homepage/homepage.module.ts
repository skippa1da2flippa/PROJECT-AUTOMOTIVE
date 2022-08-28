import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageScreenComponent } from './homepage-screen/homepage-screen.component';
import {HomePageRoutingModule} from "./homepage-routing.module";



@NgModule({
  declarations: [
    HomepageScreenComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ]
})
export class HomepageModule { }
