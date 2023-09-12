import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {

}