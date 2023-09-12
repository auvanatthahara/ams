
import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProviderResDto } from "../../../dto/provider/provider.res.dto";
import { InvoiceService } from "../../../services/invoice.service";
import { ProviderService } from "../../../services/provider.service";

@Component({
    selector: 'invoices-details-update',
    templateUrl: './invoices-details-update.component.html'
})
export class InvoicesDetailsUpdateComponent {

    providers!: ProviderResDto[];
    invoiceDetailId!: number;

    invoiceDetailUpdate: FormGroup = this.fb.group({
        invoiceDetailId: [0, Validators.required],
        itemName: ["", Validators.required],
        itemCode: ["", Validators.required],
    })

    constructor(private invoiceService: InvoiceService,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private providerService: ProviderService) {
    }

    ngOnInit(): void {
        this.providerService.getAllProviders().subscribe((providers) => {
            this.providers = providers;
        });
        this.route.params.subscribe(params => {
            this.invoiceDetailId = params['id'];
            this.invoiceDetailUpdate.patchValue({
                invoiceDetailId: this.invoiceDetailId
            })
        })
    }

    onUpdate(): void {
        if (this.invoiceDetailUpdate.valid) {
            this.invoiceService.updateDetails(this.invoiceDetailUpdate.getRawValue()).subscribe(data => {
                console.log(data.ver);
                console.log(data.message);
                this.router.navigateByUrl("/invoices/details")
            });
        } else {
            console.log("Not updated!");
        }
    }

}