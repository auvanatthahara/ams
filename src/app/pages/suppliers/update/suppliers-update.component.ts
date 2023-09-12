import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SupplierService } from "../../../services/supplier.service";

@Component({
    selector: 'suppliers-update',
    templateUrl: './suppliers-update.component.html'
})
export class SuppliersUpdateComponent {

    supplierId!: number;

    supplierUpdate: FormGroup = this.fb.group({
        supplierId: [0, Validators.required],
        supplierName: ["", Validators.required],
        fileExt: ["", Validators.required],
        fileName: ["", Validators.required]
    })

    constructor(private supplierService: SupplierService,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.supplierId = params['supplierId'];
            this.supplierUpdate.patchValue({
                supplierId: this.supplierId
            })
        })
    }

    onUpdate(): void {
        if (this.supplierUpdate.valid) {
            this.supplierService.updateSuppliers(this.supplierUpdate.getRawValue()).subscribe(data => {
                console.log(data.ver);
                console.log(data.message);
                this
                this.router.navigateByUrl("/suppliers")
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

                this.supplierUpdate.patchValue({
                    fileExt: resultExtension,
                    fileName: resultBase64
                })

                console.log(resultBase64)
                console.log(resultExtension)
            })
        }
    }

}