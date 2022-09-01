import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersScreenComponent} from "./users-screen/users-screen.component";

const routes: Routes = [
    {
        path: '',
        component: UsersScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule {}
