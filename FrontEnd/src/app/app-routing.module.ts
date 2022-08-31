import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'authentication',
        loadChildren: () =>
            import('./feature/authentication/authentication.module').then(
                (m) => m.AuthenticationModule
            ),
    },
    {
        path: 'connectionRequest',
        loadChildren: () =>
            import('./shared/pop-up/pop-up.module').then(
                (m) => m.PopUpModule
            ),
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('./feature/profile/profile.module').then(
                (m) => m.ProfileModule
            ),
    },
    {
        path: 'myVehicles',
        loadChildren: () =>
            import('./feature/my-vehicles/my-vehicles.module').then(
                (m) => m.MyVehiclesModule
            ),
    },
    {
        path: 'enjoyedVehicles',
        loadChildren: () =>
            import('./feature/enjoyed-vehicles/enjoyed-vehicles.module').then(
                (m) => m.EnjoyedVehiclesModule
            ),
    },
    {
        path: 'vehicleControl',
        loadChildren: () =>
            import('./shared/vehicle-control/vehicle-control.module').then(
                (m) => m.VehicleControlModule
            ),
    },
    {
        path: 'maps',
        loadChildren: () =>
            import('./feature/maps/maps.module').then(
                (m) => m.MapsModule
            ),
    },
    {
        path: 'notifications',
        loadChildren: () =>
            import('./feature/notifications/notifications.module').then(
                (m) => m.NotificationsModule
            ),
    },
    {
        path: 'routines',
        loadChildren: () =>
            import('./feature/routines/routines.module').then(
                (m) => m.RoutinesModule
            ),
    },
    {
        path: 'homepage',
        loadChildren: () =>
            import('./feature/homepage/homepage.module').then(
                (m) => m.HomepageModule
            ),
    },
    {
        path: 'vehiclesNearMe',
        loadChildren: () =>
            import('./feature/vehicles-near-me/vehicles-near-me.module').then(
                (m) => m.VehiclesNearMeModule
            ),
    },
    {
        path: '**',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
