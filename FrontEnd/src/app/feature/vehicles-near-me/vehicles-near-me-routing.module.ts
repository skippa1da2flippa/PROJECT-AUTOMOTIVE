import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehiclesNearMeScreenComponent} from "./vehicles-near-me-screen/vehicles-near-me-screen.component";
import {VehicleFoundScreenComponent} from "./vehicle-found-screen/vehicle-found-screen.component";

const routes: Routes = [
    {
        path: '',
        component: VehiclesNearMeScreenComponent,
    },
    {
        path: 'gotOne',
        component: VehicleFoundScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VehiclesNearMeRoutingModule {}
