import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { InvoiceDetailInsertReqDto } from "../../../dto/invoice-detail/invoice-detail-insert.req.dto";
import { ProviderResDto } from "../../../dto/provider/provider.res.dto";
import { SupplierResDto } from "../../../dto/supplier/supplier.res.dto";
import { InvoiceService } from "../../../services/invoice.service";
import { ProviderService } from "../../../services/provider.service";
import { SupplierService } from "../../../services/supplier.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'invoices-create',
    templateUrl: './invoices-create.component.html'
})
export class InvoicesCreateComponent implements OnInit, AfterViewChecked {

    suppliers!: SupplierResDto[];
    providers!: ProviderResDto[];
    detailData: InvoiceDetailInsertReqDto[] = [];
    invoiceData: FormGroup = this.fb.group({
        fileExt: ["", Validators.required],
        fileName: ["", Validators.required],
        supplierId: [null, Validators.required],
        invoiceDetails: this.fb.array(this.detailData)
    })

    constructor(private fb: NonNullableFormBuilder,
        private invoiceService: InvoiceService,
        private router: Router,
        private supplierService: SupplierService,
        private providerService: ProviderService,
        private cd: ChangeDetectorRef) {
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }
    ngOnInit(): void {
        this.supplierService.getAllSupplier().subscribe((suppliers) => {
            this.suppliers = suppliers;
        });
        this.providerService.getAllProviders().subscribe((providers) => {
            this.providers = providers;
        });
    }

    get detailDatas() {
        return this.invoiceData.get('invoiceDetails') as FormArray;
    }

    onAdd() {
        this.detailDatas.push(this.fb.group({
            itemName: ["", [Validators.required]],
            itemCode: ["", [Validators.required]],
            providerId: [null, [Validators.required]]
        }))
    }

    onRemove(i: number) {
        this.detailDatas.removeAt(i)
    }

    onClick(): void {
        if (this.invoiceData.valid) {
            this.invoiceService.insertInvoice(this.invoiceData.getRawValue()).subscribe(result => {
                console.log(result.id);
                console.log(result.message);
                this.router.navigateByUrl("/invoices")
            });
        } else {
            console.log("Invoice not created!");
        }
    }

    fileUpload(event: any,fileUpload : FileUpload) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf("."), file.name.length)

                this.invoiceData.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })
                fileUpload.clear();

            })
        }
    }
}