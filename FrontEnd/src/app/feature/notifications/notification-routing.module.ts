import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotificationsScreenComponent} from "./notifications-screen/notifications-screen.component";

const routes: Routes = [
    {
        path: '',
        component: NotificationsScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotificationsRoutingModule {}
