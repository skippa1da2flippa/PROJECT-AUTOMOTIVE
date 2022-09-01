import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersScreenComponent } from './users-screen/users-screen.component';
import {UsersRoutingModule} from "./user-routing.module";



@NgModule({
  declarations: [
    UsersScreenComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
