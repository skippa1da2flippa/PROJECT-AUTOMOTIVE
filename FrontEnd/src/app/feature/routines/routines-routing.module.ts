import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutinesScreenComponent} from "./routines-screen/routines-screen.component";
import {RoutineCreationScreenComponent} from "./routine-creation-screen/routine-creation-screen.component";

const routine_routes: Routes = [
    {
        path: '',
        component: RoutinesScreenComponent,
    },
    {
        path: 'creation',
        component: RoutineCreationScreenComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routine_routes)],
    exports: [RouterModule],
})
export class RoutinesRoutingModule {}
