import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ButtonComponent } from "src/app/components/button/button.component";
import { ChangePassComponent } from "./change-pass/change-pass.component";
import { UsersCreateComponent } from "./create/users-create.component";
import { UsersListComponent } from "./list/users-list.component";
import { ProfileComponent } from "./profile/profile.component";
import { SharedModule } from "src/app/shared/shared.module";
import { UsersUpdateComponent } from "./update/users-update.component";


const routes: Routes = [
    {
        path: "",
        component: UsersListComponent
    },
    {
        path: "create",
        component: UsersCreateComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "update",
        component: UsersUpdateComponent
    },
    {
        path: "change-pass",
        component: ChangePassComponent
    }
]

@NgModule({
    declarations: [
        UsersCreateComponent, 
        UsersListComponent,
        ProfileComponent,
        ChangePassComponent,
        UsersUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        SharedModule
    ],
    exports: [
        RouterModule
    ]   
})
export class UserRouting {

}