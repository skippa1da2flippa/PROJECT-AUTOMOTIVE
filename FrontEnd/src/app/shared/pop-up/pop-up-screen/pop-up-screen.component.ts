import { Component, OnInit } from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";
import {EnjoyerRequestDataProvider} from "../../../core/api/enjoyer-request/enjoyer-request-provider";
import {OwnerResponseEmitter} from "../../../core/events/emitters/owner-response";
import {EnjoyerMessage} from "../../../core/model/events-data/enjoyer-message";
import {User} from "../../../core/model/response-data/user";
import {UserApi} from "../../../core/api/handlers/user-api";

@Component({
  selector: 'app-pop-up-screen',
  templateUrl: './pop-up-screen.component.html',
  styleUrls: ['./pop-up-screen.component.css']
})
export class PopUpScreenComponent extends ErrorHandler implements OnInit {
    private meh: User = new User()
    public enjoyerId: string = ""
    public enjoyerName: string = ""
    public enjoyerSurname: string = ""
    public vehicleId: string = ""
    public vehicleModel: string = ""

    constructor(
        public override router: Router,
        private enjoyerRequestProvider: EnjoyerRequestDataProvider,
        private ownerResponseEmitter: OwnerResponseEmitter,
        private userApi: UserApi
    ) {
        super(router)
        this.userApi.getMeh().subscribe({
            next: (data: User) => {
                this.meh = data
            },
            error: super.errorHandler
        })
    }

    ngOnInit() {
        const data: EnjoyerMessage = this.enjoyerRequestProvider.getEnjoyerRequestData()
        this.enjoyerName = data.enjoyerName
        this.enjoyerSurname = data.enjoyerName
        this.enjoyerId = data.enjoyerId
        this.vehicleId = data.vehicleId
        this.vehicleModel = data.vehicleModel

        setTimeout(async () => {
            this.ownerResponseEmitter.emit({
                res: false,
                ownerId: this.meh.userId,
                name: this.meh.name,
                enjoyerId: this.enjoyerId
            })

            await this.router.navigate(["/homepage"])
        }, 60000)
    }

    public async ownerResponse(res: boolean = false) {
        this.ownerResponseEmitter.emit({
            res: res,
            ownerId: this.meh.userId,
            name: this.meh.name,
            enjoyerId: this.enjoyerId
        })

        await this.router.navigate(["/homepage"])
    }

}
