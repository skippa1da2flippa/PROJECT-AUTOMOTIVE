import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EnjoyedVehiclesScreenComponent} from "./enjoyed-vehicles-screen/enjoyed-vehicles-screen.component";


const routes: Routes = [
    {
        path: '',
        component: EnjoyedVehiclesScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EnjoyedVehiclesRoutingModule {}
