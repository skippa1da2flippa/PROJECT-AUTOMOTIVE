import {Component, OnInit} from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";


@Component({
  selector: 'app-vehicles-near-me-screen',
  templateUrl: './vehicles-near-me-screen.component.html',
  styleUrls: ['./vehicles-near-me-screen.component.css']
})
export class VehiclesNearMeScreenComponent extends ErrorHandler implements OnInit {

    constructor(
        public override router: Router,
    ) {
        super(router)
    }

    ngOnInit(): void {

    }

}
