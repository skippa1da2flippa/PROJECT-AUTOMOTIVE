import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {ProjectVehicle} from "../../../core/model/response-data/project-vehicle";
import {UserApi} from "../../../core/api/handlers/user-api";
import {environment} from "../../../../environments/environment";
import {UserInfoStorage} from "../../../core/api/users-info/users-info-storer";


@Component({
  selector: 'app-my-vehicles-screen',
  templateUrl: './my-vehicles-screen.component.html',
  styleUrls: ['./my-vehicles-screen.component.css']
})
export class MyVehiclesScreenComponent extends ErrorHandler implements OnInit {

    public vehicles: ProjectVehicle[] = []

    constructor(public override router: Router, private userApi: UserApi, private usersInfoStorage: UserInfoStorage) {
        super(router)
    }

    ngOnInit(): void {
        this.userApi.getMyVehicles().subscribe({
            next: (data: ProjectVehicle[]) => {
                this.vehicles = data
            },

            error: super.errorHandler
        })
    }

    async goToEnjoyers(vehicleId: string) {
        this.usersInfoStorage.store(vehicleId)
        await this.router.navigate(["/users"])
    }
}
