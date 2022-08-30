import {Component, OnInit} from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";
import {ProjectVehicleApi} from "../../../core/api/handlers/project-vehicle-api";
import {ProjectVehicle} from "../../../core/model/response-data/project-vehicle";
import {UserApi} from "../../../core/api/handlers/user-api";
import {User} from "../../../core/model/response-data/user";
import {EnjoyerRequestListener} from "../../../core/events/listeners/enjoyer-request";
import {NotificationApi} from "../../../core/api/handlers/notification-api";
import {NotTypes} from "../../../core/model/response-data/notification-data";

@Component({
  selector: 'app-vehicles-near-me-screen',
  templateUrl: './vehicles-near-me-screen.component.html',
  styleUrls: ['./vehicles-near-me-screen.component.css']
})
export class VehiclesNearMeScreenComponent extends ErrorHandler implements OnInit {

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
    }

    ngOnDestroy(): void {
        this.enjoyerRequestListener.unListen()
    }

    public findVehicles() {
        this.vehicleApi.getAllVehicles().subscribe({
          next: (data: ProjectVehicle[]) => {
              this.cookieVehicle = data[0]
          },

          error: super.errorHandler
        })
    }

    public takeOverTheVehicle(){
        this.vehicleApi.addVehicleEnjoyer(
            this.cookieVehicle.vehicleId,
            this.meh.userId, this.meh.name,
            this.meh.surname
        ). subscribe({
            next:() => {
                // TODO add a pop up to let the client know the positive response
            },

            error: super.errorHandler // TODO add a different function to handle 403 in another way
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
