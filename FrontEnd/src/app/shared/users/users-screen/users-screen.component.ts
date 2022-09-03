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
    public id: string = ""

    constructor(public override router: Router, private userApi: UserApi, private vehicleApi: ProjectVehicleApi) {
        super(router)
    }

    ngOnInit(): void {
        let data = localStorage.getItem(environment.localStorageUsersData) || ""
        let type = data.split("/")[0]
        this.id = data.split("/")[1]
        if (type === "v") {
            this.vehicleApi.getVehicleEnjoyers(this.id).subscribe({
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

    protected removeEnjoyer(enjoyerId: string) {
        this.vehicleApi.removeVehicleEnjoyer(this.id, enjoyerId).subscribe({
            next: () => {
                this.users = this.users.filter((elem) => {
                    return elem.userId !== enjoyerId
                })
            },
            error: super.errorHandler
        })
    }

}
