import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileScreenComponent} from "./profile-screen/profile-screen.component";


const routes: Routes = [
    {
        path: '',
        component: ProfileScreenComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
