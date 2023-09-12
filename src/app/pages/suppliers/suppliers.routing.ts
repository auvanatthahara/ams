import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { SuppliersCreateComponent } from "./create/suppliers-create.component";
import { SuppliersListComponent } from "./list/suppliers-list.component";
import { SuppliersUpdateComponent } from "./update/suppliers-update.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
    {
        path: '',
        component: SuppliersListComponent
    },
    {
        path: 'create',
        component: SuppliersCreateComponent,
    },
    {
        path: 'update/:supplierId',
        component: SuppliersUpdateComponent,
    },
]

@NgModule({
    declarations: [
        SuppliersListComponent,
        SuppliersCreateComponent,
        SuppliersUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ],
    exports: [
        RouterModule
    ]
})
export class SuppliersRouting {

}