import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonModule } from "primeng/button";


@Component({
    selector: 'app-button',
    template: `
        <p-button  type="{{classBtn}}" class="{{classBtn}} mr-2" [label]="label" [loading]="loading" [disabled]="disabled" styleClass="p-button-rounded p-button-warning"></p-button>
    `,
    standalone: true,
    imports: [ButtonModule]
})

export class ButtonComponent {
    @Input() loading = false;
    @Input() label = '';
    @Input() classBtn = '';
    @Input() disabled!: boolean;

}