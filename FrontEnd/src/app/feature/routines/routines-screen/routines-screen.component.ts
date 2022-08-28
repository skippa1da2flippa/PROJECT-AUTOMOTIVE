import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserRoutineApi} from "../../../core/api/handlers/routine-api";
import {Routine} from "../../../core/model/response-data/routine-data";
import {ErrorHandler} from "../../../core/model/errors/error-handler";

@Component({
  selector: 'app-routines-screen',
  templateUrl: './routines-screen.component.html',
  styleUrls: ['./routines-screen.component.css']
})
export class RoutinesScreenComponent extends ErrorHandler implements OnInit {
    public routines: Routine[] = []

    constructor(
        public override router: Router,
        private userRoutine: UserRoutineApi
    ) {
        super(router)
    }

    ngOnInit() {
        this.userRoutine.getMyRoutines().subscribe({
              next: (data: Routine[]) => {
                  this.routines = data
              },
              error: super.errorHandler
        })
    }

    public addRoutineDiv() {
        //do something to add a div (for retrieving the up to be inserted routine data)
    }

    public deleteRoutine(name: string){
        this.userRoutine.deleteRoutine(name).subscribe({
            error: super.errorHandler,
        })
    }
}
