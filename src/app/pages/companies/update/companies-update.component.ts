import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyService } from "../../../services/company.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'companies-update',
    templateUrl: './companies-update.component.html'
})
export class CompaniesUpdateComponent implements OnInit {

    companyId!: number;

    companyUpdate: FormGroup = this.fb.group({
        companyId: [0, Validators.required],
        companyName: ["", Validators.required],
        fileExt: ["", Validators.required],
        fileName: ["", Validators.required]
    })

    constructor(private companyService: CompanyService,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.companyId = params['companyId'];
            this.companyUpdate.patchValue({
                companyId: this.companyId
            })
            console.log(this.companyId);
        })
    }

    onUpdate(): void {
        if (this.companyUpdate.valid) {
            this.companyService.updateCompanies(this.companyUpdate.getRawValue()).subscribe(data => {
                console.log(data.ver);
                console.log(data.message);
                this
                this.router.navigateByUrl("/companies")
            });
        } else {
            console.log("Not updated!");
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

                this.companyUpdate.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })
                fileUpload.clear();

            })
        }
    }

}