import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {ProjectVehicle} from "../../../core/model/response-data/project-vehicle";
import {UserApi} from "../../../core/api/handlers/user-api";
import {environment} from "../../../../environments/environment";
import {ProjectVehicleApi} from "../../../core/api/handlers/project-vehicle-api";

@Component({
  selector: 'app-my-vehicles-screen',
  templateUrl: './my-vehicles-screen.component.html',
  styleUrls: ['./my-vehicles-screen.component.css']
})
export class MyVehiclesScreenComponent extends ErrorHandler implements OnInit {

    public vehicles: ProjectVehicle[] = []

    constructor(public override router: Router, private userApi: UserApi) {
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
        localStorage.setItem(environment.localStorageUsersData, "v/" + vehicleId)
        await this.router.navigate(["/users"])
    }
}
