import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageScreenComponent} from "./homepage-screen/homepage-screen.component";

const homepage_routes: Routes = [
    {
        path: '',
        component: HomepageScreenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(homepage_routes)],
    exports: [RouterModule],
})
export class HomePageRoutingModule {}
