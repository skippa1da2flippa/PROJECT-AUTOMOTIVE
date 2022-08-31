import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PopUpScreenComponent} from "./pop-up-screen/pop-up-screen.component";

const routes: Routes = [
    {
        path: '',
        component: PopUpScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PopUpRoutingModule {}
