import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileScreenComponent } from './profile-screen/profile-screen.component';
import {ProfileRoutingModule} from "./profile-routing.module";



@NgModule({
  declarations: [
    ProfileScreenComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
