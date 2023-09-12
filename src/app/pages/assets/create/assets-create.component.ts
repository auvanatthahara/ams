import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { InvoiceDetailResDto } from "../../../dto/invoice-detail/invoice-detail.res.dto";
import { AssetService } from "../../../services/asset.service";
import { CompanyService } from "../../../services/company.service";
import { InvoiceService } from "../../../services/invoice.service";
import { AssetStatusResDto } from "src/app/dto/asset-status/asset-status.res.dto";
import { AssetTypeResDto } from "src/app/dto/asset-type/asset-type.res.dto";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: "assets-create",
    templateUrl: "./assets-create.component.html"
})
export class AssetsCreateComponent implements OnInit, AfterViewChecked {

    companies!: CompanyResDto[]
    invoiceDetails!: InvoiceDetailResDto[];
    statuses! : AssetStatusResDto[];
    types!: AssetTypeResDto[]
    invoiceCode!: string;

    assetData: FormGroup = this.fb.group({
        fileExt: ["", Validators.required],
        files: ["", Validators.required],
        invoiceDetailId: [0, Validators.required],
        assetTypeId: [0, Validators.required],
        assetStatusId: [0, Validators.required],
        companyId: [0, Validators.required],
    });

    constructor(private fb: NonNullableFormBuilder,
        private router: Router,
        private invoiceService: InvoiceService,
        private assetService: AssetService,
        private route: ActivatedRoute,
        private companyService: CompanyService,
        private cd: ChangeDetectorRef) 
    { }

    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    onClick(): void {
        if (this.assetData.valid) {
            this.assetService.insertAsset(this.assetData.getRawValue()).subscribe(result => {
                console.log(result.id);
                console.log(result.message);
                this.router.navigateByUrl("/assets")
            });
        } else {
            console.log("Invoice not created!");
        }
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.invoiceCode = params['invoiceCode'];
            this.invoiceService.getInvoiceDetails(this.invoiceCode).subscribe(result => {
                this.invoiceDetails = result;
            })
        })
        this.companyService.getAllCompanies().subscribe(result => {
            this.companies = result;
        })
        this.statuses = [
            {
                statusId: 1,
                assetStatus: 'READY-TO-DEPLOY'
            },
            {
                statusId: 2,
                assetStatus: 'BROKEN'
            },
            {
                statusId: 3,
                assetStatus: 'LOST/STOLEN'
            },
            {
                statusId: 4,
                assetStatus: 'REPAIR'
            },
            {
                statusId: 5,
                assetStatus: 'PENDING'
            },
        ]
        this.types = [
            {
                typeId: 1,
                assetType: 'GENERAL'
            },
            {
                typeId: 2,
                assetType: 'LICENSES'
            },
            {
                typeId: 3,
                assetType: 'COMPONENTS'
            },
            {
                typeId: 4,
                assetType: 'CONSUMABLES'
            }
            
        ]
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

                this.assetData.patchValue({
                    files: resultBase64,
                    fileExt: resultExtension
                })
                fileUpload.clear();

            })
        }
    }

}