import { Component, OnInit } from '@angular/core';
import {UserApi} from "../../../core/api/handlers/user-api";
import {ServerJoinedEmitter} from "../../../core/events/emitters/server-joined";
import {Router} from "@angular/router";
import {AuthenticationApi} from "../../../core/api/handlers/auth-api";
import {LogInData} from "../../../core/model/response-data/auth-data";
import {HtmlErrorMessage} from "../../../core/model/errors/html-error";

@Component({
  selector: 'app-log-in-screen',
  templateUrl: './log-in-screen.component.html',
  styleUrls: ['./log-in-screen.component.css']
})
export class LogInScreenComponent implements OnInit {
    public userMessage: HtmlErrorMessage = new HtmlErrorMessage();
    public email: string = ""
    public password: string = ""

    constructor(
        private authClient: AuthenticationApi,
        private router: Router,
        private userClient: UserApi,
        private serverJoinedEmitter: ServerJoinedEmitter,
    ) { }

    ngOnInit(): void {

    }


    public async logIn(email: string, password: string) {
        this.authClient.logIn(email, password).subscribe({
            next: (data: LogInData) => {
                this.serverJoinedEmitter.emit({ userId: data.userId });

                this.userClient.getMeh().subscribe(async (user) => {
                    await this.router.navigate(['/homepage']);
                });
            },
            error: (err: any) => {
                this.userMessage.error = true;
                if (err.error === 'Unauthorized') {
                    this.userMessage.errorMessage = 'Wrong credentials';
                } else this.userMessage.errorMessage = JSON.stringify(err.error.errorMessage);

                console.log('An error occurred while logging in: ' + JSON.stringify(err));
            },
        })
    }

}
