import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SupplierService } from "../../../services/supplier.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'suppliers-create',
    templateUrl: './suppliers-create.component.html'
})
export class SuppliersCreateComponent {

    constructor(private supplier: SupplierService, private fb: NonNullableFormBuilder, private router: Router) { }

    supplierData: FormGroup = this.fb.group({
        supplierName: ["", Validators.required],
        fileExt: ["", Validators.required],
        fileName: ["", Validators.required]
    });

    onClick(): void {
        if (this.supplierData.valid) {
            this.supplier.insertSupplier(this.supplierData.getRawValue()).subscribe(result => {
                console.log(result.id);
                console.log(result.message);
                this.router.navigateByUrl("/suppliers")
            });
        } else {
            console.log("Not created!");
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

                this.supplierData.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })
                fileUpload.clear();

            })
        }
    }

}