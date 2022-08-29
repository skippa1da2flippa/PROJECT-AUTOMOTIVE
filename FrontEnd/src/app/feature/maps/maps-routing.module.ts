import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapsScreenComponent} from "./maps-screen/maps-screen.component";

const routes: Routes = [
    {
        path: '',
        component: MapsScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MapsRoutingModule {}
