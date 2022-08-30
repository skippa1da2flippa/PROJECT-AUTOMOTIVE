import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {EnjoyerRequestListener} from "../../../core/events/listeners/enjoyer-request";
import {OwnerResponseEmitter} from "../../../core/events/emitters/owner-response";

@Component({
  selector: 'app-homepage-screen',
  templateUrl: './homepage-screen.component.html',
  styleUrls: ['./homepage-screen.component.css']
})
export class HomepageScreenComponent extends ErrorHandler implements OnInit {

    constructor(
        public override router: Router,
        private enjoyerRequest: EnjoyerRequestListener,
        private ownerResponseEmitter: OwnerResponseEmitter
    ) {
        super(router)
    }

    ngOnInit(): void {
        this.enjoyerRequest.listen(super.addPopUpInfo)
    }

    ngOnDestroy(): void {
        this.enjoyerRequest.unListen()
    }

}
