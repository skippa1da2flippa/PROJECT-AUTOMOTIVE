import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsScreenComponent } from './notifications-screen/notifications-screen.component';
import {NotificationsRoutingModule} from "./notification-routing.module";



@NgModule({
  declarations: [
    NotificationsScreenComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
