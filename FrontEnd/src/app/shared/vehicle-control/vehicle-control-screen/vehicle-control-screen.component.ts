import { Component, OnInit } from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicle-control-screen',
  templateUrl: './vehicle-control-screen.component.html',
  styleUrls: ['./vehicle-control-screen.component.css']
})
export class VehicleControlScreenComponent extends ErrorHandler implements OnInit {

  constructor(public override router: Router) {
      super(router)
  }

  ngOnInit(): void {
  }

}
