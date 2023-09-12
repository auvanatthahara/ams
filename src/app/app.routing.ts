import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from "./components/base/base.component";
import { BaseModule } from "./components/base/base.module";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { Roles } from "./constant/roles";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { UrlPipe } from "./pipes/url.pipes";
import { authValidation, authValidationNonLogin } from "./validation/auth.validation";
import { roleValidation } from "./validation/role.validation";
import { SharedModule } from "./shared/shared.module";

const routes: Routes = [
    {
        component: BaseComponent,
        path: 'users',
        loadChildren: () => import("./pages/users/user.module").then(u => u.UserModule),
        data: [Roles.SUPER_ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'assets',
        loadChildren: () => import("./pages/assets/asset.module").then(a => a.AssetModule),
        data: [Roles.HR, Roles.FINANCE, Roles.SUPPORT, Roles.SUPER_ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'companies',
        loadChildren: () => import("./pages/companies/companies.module").then(a => a.CompaniesModule),
        data: [Roles.SUPER_ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'employees',
        loadChildren: () => import("./pages/employees/employees.module").then(a => a.EmployeesModule),
        data: [Roles.SUPER_ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'providers',
        loadChildren: () => import("./pages/providers/providers.module").then(a => a.ProvidersModule),
        data: [Roles.SUPER_ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'checkouts',
        loadChildren: () => import("./pages/checkouts/checkouts.module").then(a => a.CheckoutsModule),
        data: [Roles.HR, Roles.SUPER_ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'suppliers',
        loadChildren: () => import("./pages/suppliers/suppliers.module").then(a => a.SuppliersModule),
        data: [Roles.SUPER_ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'invoices',
        loadChildren: () => import("./pages/invoices/invoices.module").then(a => a.InvoicesModule),
        data: [Roles.FINANCE, Roles.SUPER_ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'dashboard',
        children: [{
            path: '',
            component: DashboardComponent
        }],
        data: [Roles.SUPER_ADMIN, Roles.HR, Roles.FINANCE, Roles.SUPPORT],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        path: 'login',
        component: LoginComponent,
        canMatch: [authValidation]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: "full"
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    declarations: [
        DashboardComponent,
        LoginComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BaseModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        UrlPipe,
        SharedModule
    ],
    exports: [
        RouterModule,
        DashboardComponent
    ]
})
export class AppRouting {

}