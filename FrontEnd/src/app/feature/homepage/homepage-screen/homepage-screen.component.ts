import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ErrorHandler} from "../../../core/model/errors/error-handler";

@Component({
  selector: 'app-homepage-screen',
  templateUrl: './homepage-screen.component.html',
  styleUrls: ['./homepage-screen.component.css']
})
export class HomepageScreenComponent extends ErrorHandler implements OnInit {

    constructor(
        public override router: Router,
    ) {
        super(router)
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {

    }

}
