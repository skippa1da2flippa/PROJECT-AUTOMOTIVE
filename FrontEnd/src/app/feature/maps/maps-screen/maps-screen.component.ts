import { Component, OnInit } from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";

@Component({
  selector: 'app-maps-screen',
  templateUrl: './maps-screen.component.html',
  styleUrls: ['./maps-screen.component.css']
})
export class MapsScreenComponent extends ErrorHandler implements OnInit {

  constructor(public override router: Router) {
      super(router)
  }

  ngOnInit(): void {
  }

}
