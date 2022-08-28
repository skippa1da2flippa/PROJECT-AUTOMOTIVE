import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehiclesNearMeScreenComponent} from "./vehicles-near-me-screen/vehicles-near-me-screen.component";

const routes: Routes = [
    {
        path: '',
        component: VehiclesNearMeScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VehiclesNearMeRoutingModule {}
