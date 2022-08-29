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
        path: 'vehicles-near-me',
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
