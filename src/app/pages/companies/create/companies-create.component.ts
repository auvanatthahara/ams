import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CompanyService } from "../../../services/company.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'companies-create',
    templateUrl: './companies-create.component.html'
})
export class CompaniesCreateComponent {

    constructor(private company: CompanyService,
        private fb: NonNullableFormBuilder,
        private router: Router) { }

    companyData: FormGroup = this.fb.group({
        fileExt: ["", Validators.required],
        fileName: ["", Validators.required],
        companyName: ["", Validators.required]
    });

    onClick(): void {
        if (this.companyData.valid) {
            this.company.insertCompanies(this.companyData.getRawValue()).subscribe(result => {
                console.log(result.id);
                console.log(result.message);
                this.router.navigateByUrl("/companies")
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

                this.companyData.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })
                fileUpload.clear();

            })
        }
    }

}