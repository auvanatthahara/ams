import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { CompaniesCreateComponent } from "./create/companies-create.component";
import { CompaniesListComponent } from "./list/companies-list.component";
import { CompaniesUpdateComponent } from "./update/companies-update.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
    {
        path: "",
        component: CompaniesListComponent
    },
    {
        path: "create",
        component: CompaniesCreateComponent
    },
    {
        path: "update/:companyId",
        component: CompaniesUpdateComponent
    }
]

@NgModule({
    declarations: [
        CompaniesListComponent,
        CompaniesCreateComponent,
        CompaniesUpdateComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        RouterModule
    ]
})
export class CompaniesRouting {

}