import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehicleControlScreenComponent} from "./vehicle-control-screen/vehicle-control-screen.component";

const routes: Routes = [
    {
        path: '',
        component: VehicleControlScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VehiclesControlRoutingModule {}
