import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthenticationModule} from "./feature/authentication/authentication.module";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import { RoutinesComponent } from './feature/routines/routines.component';

const sIoConfig: SocketIoConfig = {
    url: environment.serverBaseUrl,
    options: {
        withCredentials: false,
    },
};


@NgModule({
  declarations: [
    AppComponent,
    RoutinesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    HttpClientModule,
    SocketIoModule.forRoot(sIoConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
