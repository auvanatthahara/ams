
import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SupplierResDto } from "../../../dto/supplier/supplier.res.dto";
import { InvoiceService } from "../../../services/invoice.service";
import { SupplierService } from "../../../services/supplier.service";

@Component({
    selector: 'invoices-update',
    templateUrl: './invoices-update.component.html'
})
export class InvoicesUpdateComponent {

    suppliers!: SupplierResDto[];
    invoiceId!: number;

    invoiceUpdate: FormGroup = this.fb.group({
        invoiceId: [0, Validators.required],
        supplierId: ["", Validators.required],
        fileExt: ["", Validators.required],
        fileName: ["", Validators.required]
    })

    constructor(private invoiceService: InvoiceService,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private supplierService: SupplierService) {
    }

    ngOnInit(): void {
        this.supplierService.getAllSupplier().subscribe((suppliers) => {
            this.suppliers = suppliers;
        });
        this.route.params.subscribe(params => {
            this.invoiceId = params['invoiceId'];
            this.invoiceUpdate.patchValue({
                invoiceId: this.invoiceId
            })
        })
    }

    onUpdate(): void {
        if (this.invoiceUpdate.valid) {
            this.invoiceService.updateInvoices(this.invoiceUpdate.getRawValue()).subscribe(data => {
                console.log(data.ver);
                console.log(data.message);
                this.router.navigateByUrl("/invoices")
            });
        } else {
            console.log("Not updated!");
        }
    }

    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.target.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf("."), file.name.length)

                this.invoiceUpdate.patchValue({
                    fileExt: resultExtension,
                    fileName: resultBase64
                })

                console.log(resultBase64)
                console.log(resultExtension)
            })
        }
    }

}