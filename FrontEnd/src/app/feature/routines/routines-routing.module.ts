import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutinesScreenComponent} from "./routines-screen/routines-screen.component";

const routine_routes: Routes = [
    {
        path: '',
        component: RoutinesScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routine_routes)],
    exports: [RouterModule],
})
export class RoutinesRoutingModule {}
