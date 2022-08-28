import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpScreenComponent } from './sign-up-screen/sign-up-screen.component';
import { LogInScreenComponent } from './log-in-screen/log-in-screen.component';

const auth_routes: Routes = [
    {
        path: 'login',
        component: LogInScreenComponent,
    },
    {
        path: 'register',
        component: SignUpScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(auth_routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
