import { Component, OnInit } from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";
import {UserApi} from "../../../core/api/handlers/user-api";
import {ProjectVehicle} from "../../../core/model/response-data/project-vehicle";

@Component({
  selector: 'app-enjoyed-vehicles-screen',
  templateUrl: './enjoyed-vehicles-screen.component.html',
  styleUrls: ['./enjoyed-vehicles-screen.component.css']
})
export class EnjoyedVehiclesScreenComponent extends ErrorHandler implements OnInit {

    public vehicles: ProjectVehicle[] = []

    constructor(public override router: Router, private userApi: UserApi) {
        super(router)
    }

    ngOnInit(): void {
        this.userApi.getEnjoyedVehicles().subscribe({
          next: (data: ProjectVehicle[]) => {
              this.vehicles = data
          },

          error: super.errorHandler
        })
    }

    public removeMeFromEnjoyers(vehicleId: string) {
        this.userApi.removeMehFromEnjoyers(vehicleId).subscribe({
            next: () => {
                this.vehicles = this.vehicles.filter(elem => elem.vehicleId !== vehicleId)
            },
            error: super.errorHandler
        })
    }

}
