import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyVehiclesScreenComponent} from "./my-vehicles-screen/my-vehicles-screen.component";


const routes: Routes = [
    {
        path: '',
        component: MyVehiclesScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyVehiclesRoutingModule {}
