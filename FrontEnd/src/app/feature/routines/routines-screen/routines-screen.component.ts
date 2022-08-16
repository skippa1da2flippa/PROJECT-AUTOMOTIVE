import { Component, OnInit } from '@angular/core';
import {HtmlErrorMessage} from "../../../core/model/errors/html-error";
import {Router} from "@angular/router";
import {UserRoutineApi} from "../../../core/api/handlers/routine-api";
import {Routine} from "../../../core/model/response-data/routine-data";

@Component({
  selector: 'app-routines-screen',
  templateUrl: './routines-screen.component.html',
  styleUrls: ['./routines-screen.component.css']
})
export class RoutinesScreenComponent implements OnInit {
    public userMessage: HtmlErrorMessage = new HtmlErrorMessage();
    public routines: Routine[] = []

    constructor(
        private router: Router,
        private userRoutine: UserRoutineApi
    ) { }

    ngOnInit() {
        this.userRoutine.getMyRoutines().subscribe({
              next: (data: Routine[]) => {
                  this.routines = data
              },
              error: (err: any) => {
                  this.userMessage.error = true;
                  this.userMessage.errorMessage = JSON.stringify(err.error.errorMessage);

                  console.log('An error occurred while retrieving routines in: ' + JSON.stringify(err));
              },
        })
    }

    public deleteRoutine(name: string){
        this.userRoutine.deleteRoutine(name).subscribe({
            error: (err: any) => {
                this.userMessage.error = true;
                this.userMessage.errorMessage = JSON.stringify(err.error.errorMessage);

                console.log('An error occurred while deleting a routine: ' + JSON.stringify(err));
            },
        })
    }

}
