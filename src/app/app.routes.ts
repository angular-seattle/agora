import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./auth/login.component";
import { AuthGuard } from "./auth/auth-guard.service";
import { DashboardComponent } from "./dashboard/dashboard.component";

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);