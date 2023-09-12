import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CheckinComponent } from "./checkin/checkin-assets.component";
import { CheckoutCreateComponent } from "./create/checkouts-assets.component";
import { CheckoutDetailsComponent } from "./details/checkouts-details-list.component";
import { CheckoutListComponent } from "./list/checkouts-list.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
    {
        path: "",
        component: CheckoutListComponent
    },
    {
        path: "create",
        component: CheckoutCreateComponent
    },
    {
        path: "details/:checkoutCode",
        component: CheckoutDetailsComponent
    },
    {
        path: "checkin/:checkoutCode",
        component: CheckinComponent
    }
]

@NgModule({
    declarations: [
        CheckoutListComponent,
        CheckoutCreateComponent,
        CheckoutDetailsComponent,
        CheckinComponent
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
export class CheckoutRouting {

}