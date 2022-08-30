import { Component, OnInit } from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";

@Component({
  selector: 'app-enjoyed-vehicles-screen',
  templateUrl: './enjoyed-vehicles-screen.component.html',
  styleUrls: ['./enjoyed-vehicles-screen.component.css']
})
export class EnjoyedVehiclesScreenComponent extends ErrorHandler implements OnInit {

  constructor(public override router: Router) {
      super(router)
  }

  ngOnInit(): void {
  }

}
