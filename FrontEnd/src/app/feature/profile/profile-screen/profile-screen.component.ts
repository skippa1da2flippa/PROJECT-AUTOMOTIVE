import { Component, OnInit } from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";
import {AuthenticationApi} from "../../../core/api/handlers/auth-api";
import {JwtStorage} from "../../../core/api/jwt-auth/jwt-storage";
import {UserApi} from "../../../core/api/handlers/user-api";
import {User} from "../../../core/model/response-data/user";

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css']
})
export class ProfileScreenComponent extends ErrorHandler implements OnInit {

    public meh: User = new User()

    constructor(
        public override router: Router,
        private authApi: AuthenticationApi,
        private userApi: UserApi
    ) {
      super(router)
    }

    ngOnInit(): void {
        this.userApi.getMeh().subscribe({
            next: (data: User) => {
                this.meh = data
            },

            error: super.errorHandler
        })
    }

    public logOut() {
        this.authApi.logOut().subscribe({
            error: (err) => {
                console.log("logging out should not cause error, anyway it happened")
                JwtStorage.drop()
            }
        })
    }

    private updateEmail(email: string) {
        this.userApi.updateEmail(email).subscribe({
            next: (newEmail: string) => {
               this.meh.email = newEmail
            },

            error: super.errorHandler
        })
    }

    private updateNickname(nickname: string) {
        this.userApi.updateNickName(nickname).subscribe({
            next: (newNickName: string) => {
                this.meh.nickname = newNickName
            },

            error: super.errorHandler
        })
    }

    private updatePassword(password: string) {
        this.userApi.updatePassword(password).subscribe({
            next: () => {
            },
            error: super.errorHandler
        })
    }

    public updateAll(email: string = this.meh.email, nickName: string = this.meh.nickname, psw: string = "") {
        if (psw) this.updatePassword(psw)

        if (this.meh.email !== email) this.updateEmail(email)

        if (this.meh.nickname !== nickName) this.updateNickname(nickName)
    }
}
