import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from '../../../services/provider.service';
import { FileUpload } from 'primeng/fileupload';


@Component({
    selector: 'providers-create',
    templateUrl: './providers-create.component.html'
})
export class ProvidersCreateComponent {

    constructor(private provider: ProviderService, 
        private fb: NonNullableFormBuilder, 
        private router: Router) { }

    providerData: FormGroup = this.fb.group({
        providerName: ["", Validators.required],
        fileExt: ["", Validators.required],
        fileName: ["", Validators.required]
    });

    onClick(): void {
        if (this.providerData.valid) {
            this.provider.insertProviders(this.providerData.getRawValue()).subscribe(result => {
                console.log(result.id);
                console.log(result.message);
                this.router.navigateByUrl("/providers")
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

                this.providerData.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })
                fileUpload.clear();

            })
        }
    }

}