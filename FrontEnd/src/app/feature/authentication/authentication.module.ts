import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInScreenComponent } from './log-in-screen/log-in-screen.component';
import { SignUpScreenComponent } from './sign-up-screen/sign-up-screen.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    LogInScreenComponent,
    SignUpScreenComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class AuthenticationModule { }
