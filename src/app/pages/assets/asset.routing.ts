import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { AssetCodeListComponent } from "./create/assets-code-list.component";
import { AssetsCreateComponent } from "./create/assets-create.component";
import { AssetsListComponent } from "./list/assets-list.component";
import { AssetsUpdateComponent } from "./update/assets-update.component";
import { SharedModule } from "src/app/shared/shared.module";


const routes: Routes = [
    {
        path: '',
        component: AssetsListComponent
    },
    {
        path: 'create/:invoiceCode',
        component: AssetsCreateComponent
    },
    {
        path: 'update/:assetId',
        component: AssetsUpdateComponent
    },
    {
        path: 'codes',
        component: AssetCodeListComponent
    }
]

@NgModule({
    declarations: [
        AssetsCreateComponent,
        AssetsListComponent,
        AssetsUpdateComponent,
        AssetCodeListComponent
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
export class AssetRouting {

}