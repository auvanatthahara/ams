import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { ProvidersCreateComponent } from "./create/providers-create.component";
import { ProvidersListComponent } from "./list/providers-list.component";
import { ProvidersUpdateComponent } from "./update/providers-update.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
    {
        path: '',
        component: ProvidersListComponent
    },
    {
        path: 'create',
        component: ProvidersCreateComponent
    },
    {
        path: 'update/:providerId',
        component: ProvidersUpdateComponent
    }
]

@NgModule({
    declarations: [
        ProvidersListComponent,
        ProvidersCreateComponent,
        ProvidersUpdateComponent
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
export class ProvidersRouting {

}