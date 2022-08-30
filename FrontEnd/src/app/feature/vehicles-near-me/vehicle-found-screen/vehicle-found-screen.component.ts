import { Component, OnInit } from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";
import {User} from "../../../core/model/response-data/user";
import {ProjectVehicle} from "../../../core/model/response-data/project-vehicle";
import {ProjectVehicleApi} from "../../../core/api/handlers/project-vehicle-api";
import {UserApi} from "../../../core/api/handlers/user-api";
import {EnjoyerRequestListener} from "../../../core/events/listeners/enjoyer-request";
import {NotificationApi} from "../../../core/api/handlers/notification-api";
import {NotTypes} from "../../../core/model/response-data/notification-data";

@Component({
  selector: 'app-vehicle-found-screen',
  templateUrl: './vehicle-found-screen.component.html',
  styleUrls: ['./vehicle-found-screen.component.css']
})
export class VehicleFoundScreenComponent extends ErrorHandler implements OnInit {

    public meh: User = new User()
    public cookieVehicle: ProjectVehicle = new ProjectVehicle()

    constructor(
        public override router: Router,
        private vehicleApi: ProjectVehicleApi,
        private userApi: UserApi,
        private enjoyerRequestListener: EnjoyerRequestListener,
        private notificationApi: NotificationApi
    ) {
        super(router)
    }

    ngOnInit(): void {
        this.userApi.getMeh().subscribe({
            next: (data: User) => {
                this.meh = data
            },
            error: super.errorHandler
        })

        this.vehicleApi.getAllVehicles().subscribe({
            next: (data: ProjectVehicle[]) => {
                this.cookieVehicle = data[0]
            },

            error: super.errorHandler
        })
    }

    ngOnDestroy(): void {
        this.enjoyerRequestListener.unListen()
    }


    public takeOverTheVehicle() {
        this.vehicleApi.addVehicleEnjoyer(
            this.cookieVehicle.vehicleId,
            this.meh.userId, this.meh.name,
            this.meh.surname
        ). subscribe({
            next: async () => {
                await this.router.navigate(["/enjoyedVehicles"])
            },

            error: async (err: any) => {
                this.userMessage.error = true;
                if (err.error === 'Unauthorized') {
                    this.userMessage.errorMessage = 'session expired';
                } else this.userMessage.errorMessage = JSON.stringify(err.error.errorMessage);
                await this.router.navigate(["/vehiclesNearMe"])
            }
        })
    }

    public getFriend(userId: string) {
        this.notificationApi.addNotification(userId, NotTypes.friendRequest).subscribe({
            next: (data) => {
                //I dont know maybe put a pop up like writing something like "sent"
            },

            error: super.errorHandler
        })
    }
}
