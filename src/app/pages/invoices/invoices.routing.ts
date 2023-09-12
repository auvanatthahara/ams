import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { InvoicesCreateComponent } from "./create/invoices-create.component";
import { InvoicesDetailsListComponent } from "./details-list/invoices-details-list.component";
import { InvoicesDetailsUpdateComponent } from "./details-update/invoices-details-update.component";
import { InvoicesListComponent } from "./list/invoices-list.component";
import { InvoicesUpdateComponent } from "./update/invoices-update.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
    {
        path: '',
        component: InvoicesListComponent
    },
    {
        path: 'create',
        component: InvoicesCreateComponent
    },
    {
        path: 'update/:invoiceId',
        component: InvoicesUpdateComponent
    },
    {
        path: 'details/:invoiceCode',
        component: InvoicesDetailsListComponent
    },
    {
        path: 'details-update/:id',
        component: InvoicesDetailsUpdateComponent
    }
]

@NgModule({
    declarations: [
        InvoicesListComponent,
        InvoicesCreateComponent,
        InvoicesUpdateComponent,
        InvoicesDetailsListComponent,
        InvoicesDetailsUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        RouterModule
    ]
})
export class InvoicesRouting {

}