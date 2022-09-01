import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {EnjoyerRequestListener} from "../../../core/events/listeners/enjoyer-request";
import {EnjoyerMessage} from "../../../core/model/events-data/enjoyer-message";
import {EnjoyerRequestStorage} from "../../../core/api/enjoyer-request/enjoyer-request-storer";

@Component({
  selector: 'app-homepage-screen',
  templateUrl: './homepage-screen.component.html',
  styleUrls: ['./homepage-screen.component.css']
})
export class HomepageScreenComponent extends ErrorHandler implements OnInit {

    constructor(
        public override router: Router,
        private enjoyerRequestListener: EnjoyerRequestListener,
        private enjoyerRequestStorage: EnjoyerRequestStorage
    ) {
        super(router)
    }

    ngOnInit(): void {
        const enjoyerRequestPolling = async (data: EnjoyerMessage) => {
            this.enjoyerRequestStorage.store(
                data.enjoyerSurname,
                data.enjoyerName,
                data.enjoyerId,
                data.vehicleId,
                data.vehicleModel
            )

            await this.router.navigate(['connectionRequest'])
        }

        enjoyerRequestPolling.bind(this)

        this.enjoyerRequestListener.listen(enjoyerRequestPolling)
    }

    ngOnDestroy(): void {
    }

}
