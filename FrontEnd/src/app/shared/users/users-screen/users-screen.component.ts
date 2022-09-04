import {Component, Input, OnInit} from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";
import {UserApi} from "../../../core/api/handlers/user-api";
import {ProjectVehicleApi} from "../../../core/api/handlers/project-vehicle-api";
import {User} from "../../../core/model/response-data/user";
import {UsersInfoProvider} from "../../../core/api/users-info/users-info-provider";
import {UserInfoStorage} from "../../../core/api/users-info/users-info-storer";

@Component({
  selector: 'app-users-screen',
  templateUrl: './users-screen.component.html',
  styleUrls: ['./users-screen.component.css']
})
export class UsersScreenComponent extends ErrorHandler implements OnInit {

    public users: User[] = []
    private vehicleId: string = ""

    constructor(
        public override router: Router,
        private userApi: UserApi,
        private vehicleApi: ProjectVehicleApi,
        private usersInfoProvider: UsersInfoProvider
    ) {
        super(router)
    }


    ngOnInit(): void {
        this.vehicleId = this.usersInfoProvider.getUsersInfo()

        this.vehicleApi.getVehicleEnjoyers(this.vehicleId).subscribe({
            next: (data: User[]) => {
                this.users = data
            },
            error: super.errorHandler
        })
    }

    ngOnDestroy(): void {
        UserInfoStorage.drop()
    }

    removeEnjoyer(enjoyerId: string) {
        this.vehicleApi.removeVehicleEnjoyer(this.vehicleId, enjoyerId).subscribe({
            next: () => {
                this.users = this.users.filter((elem) => {
                    return elem.userId !== enjoyerId
                })
            },
            error: super.errorHandler
        })
    }

}
