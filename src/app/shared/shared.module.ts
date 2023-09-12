import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonComponent } from "../components/button/button.component";
import { MenubarModule } from "primeng/menubar";
import { AccordionModule } from "primeng/accordion";
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { UrlPipe } from "../pipes/url.pipes";
import {ToastModule} from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from "primeng/calendar";

@NgModule({
    imports : [
       
        CommonModule,
        ButtonComponent,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        ConfirmDialogModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        FileUploadModule,
        UrlPipe,
        MenubarModule,
        AccordionModule,
        CardModule,
        RippleModule,
        OverlayPanelModule,
        MenuModule,
        ToastModule,
        RadioButtonModule,
        CalendarModule
    ],
    exports : [
       
        CommonModule,
        ButtonComponent,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        ConfirmDialogModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        FileUploadModule,
        UrlPipe,
        MenubarModule,
        AccordionModule,
        CardModule,
        RippleModule,
        OverlayPanelModule,
        MenuModule,
        ToastModule,
        RadioButtonModule,
        CalendarModule
    ]
})
export class SharedModule{

}