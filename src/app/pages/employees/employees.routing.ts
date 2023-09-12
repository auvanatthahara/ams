import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { EmployeesCreateComponent } from "./create/employees-create.component";
import { EmployeesListComponent } from "./list/employees-list.component";
import { EmployeesUpdateComponent } from "./update/employees-update.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
    {
        path: '',
        component: EmployeesListComponent
    },
    {
        path: 'create',
        component: EmployeesCreateComponent
    },
    {
        path: 'update/:employeeId',
        component: EmployeesUpdateComponent
    }
]

@NgModule({
    declarations: [
        EmployeesListComponent,
        EmployeesUpdateComponent,
        EmployeesCreateComponent
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
export class EmployeeRouting {

}