import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ErrorHandler} from "../../../core/model/errors/error-handler";

@Component({
  selector: 'app-my-vehicles-screen',
  templateUrl: './my-vehicles-screen.component.html',
  styleUrls: ['./my-vehicles-screen.component.css']
})
export class MyVehiclesScreenComponent extends ErrorHandler implements OnInit {

    constructor(public override router: Router) {
        super(router)
    }

    ngOnInit(): void {
    }

}
