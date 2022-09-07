import { Component, OnInit } from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";
import {UserRoutineApi} from "../../../core/api/handlers/routine-api";
import {Routine} from "../../../core/model/response-data/routine-data";

@Component({
  selector: 'app-routine-creation-screen',
  templateUrl: './routine-creation-screen.component.html',
  styleUrls: ['./routine-creation-screen.component.css']
})
export class RoutineCreationScreenComponent extends ErrorHandler implements OnInit {

    constructor(public override router: Router, private routineApi: UserRoutineApi) {
      super(router)
    }

    ngOnInit(): void {
    }

    addRoutine(name: string, temperature: string, lightsColor: string, music: string, path: any) {
        this.routineApi.addRoutine({
            name,
            temperature: parseInt(temperature),
            lightsColor,
            music: [music],
            path
        }).subscribe({
            next: async () =>  {
                await this.router.navigate(["/routines"])
            },

            error: super.errorHandler
        })
    }
}
