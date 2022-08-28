import { Component, OnInit } from '@angular/core';
import {HtmlErrorMessage} from "../../../core/model/errors/html-error";
import {ServerJoinedEmitter} from "../../../core/events/emitters/server-joined";
import {Router} from "@angular/router";
import {AuthenticationApi} from "../../../core/api/handlers/auth-api";
import {User} from "../../../core/model/response-data/user";
import {LogInData} from "../../../core/model/response-data/auth-data";

@Component({
  selector: 'app-sign-up-screen',
  templateUrl: './sign-up-screen.component.html',
  styleUrls: ['./sign-up-screen.component.css']
})
export class SignUpScreenComponent implements OnInit {
    public userMessage: HtmlErrorMessage = new HtmlErrorMessage();

    constructor(
        private authClient: AuthenticationApi,
        private router: Router,
        private serverJoined: ServerJoinedEmitter,
    ) {}

    ngOnInit(): void {}

    public signup(email: string, fullName: string, password: string, nickName?: string) {
        this.userMessage.error = false;
        let name = fullName.split(" ")[0]
        let surname = fullName.split(" ")[1]
        this.authClient.signUp(name, surname, email, password, nickName).subscribe({
            next: async (data: User) => {
                this.authClient
                    .logIn(email, password)
                    .subscribe(async (user: LogInData) => {
                        this.serverJoined.emit({ userId: user.userId });
                        await this.router.navigate(['/homepage']);
                    });
            },
            error: (error: any) => {
                this.userMessage.error = true;
                this.userMessage.errorMessage = error.error.errorMessage;
                console.log('An error occurred while signin up: ' + JSON.stringify(error));
            },
        });
    }

}
