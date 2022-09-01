import {Component, Input, OnInit} from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {UserApi} from "../../../core/api/handlers/user-api";
import {ProjectVehicleApi} from "../../../core/api/handlers/project-vehicle-api";
import {User} from "../../../core/model/response-data/user";

@Component({
  selector: 'app-users-screen',
  templateUrl: './users-screen.component.html',
  styleUrls: ['./users-screen.component.css']
})
export class UsersScreenComponent extends ErrorHandler implements OnInit {

    public users: User[] = []
    public data: string = localStorage.getItem(environment.localStorageUsersData) || ""

    constructor(public override router: Router, private userApi: UserApi, private vehicleApi: ProjectVehicleApi) {
        super(router)
    }

    ngOnInit(): void {
        if (this.data.split("/")[0] === "v") {
            this.vehicleApi.getVehicleEnjoyers(this.data.split("/")[1]).subscribe({
                next: (data: User[]) => {
                    this.users = data
                },
                error: super.errorHandler
            })
        } else {
            this.userApi.getFriends().subscribe({
                next: (data: User[]) => {
                    this.users = data
                },
                error: super.errorHandler
            })
        }
    }

}
