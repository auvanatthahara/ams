import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../../../services/provider.service';


@Component({
    selector: 'providers-update',
    templateUrl: './providers-update.component.html'
})
export class ProvidersUpdateComponent {

    providerId!: number;

    providerUpdate: FormGroup = this.fb.group({
        providerId: [0, Validators.required],
        providerName: ["", Validators.required],
        fileExt: ["", Validators.required],
        fileName: ["", Validators.required]
    })

    constructor(private providerService: ProviderService,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.providerId = params['providerId'];
            this.providerUpdate.patchValue({
                providerId: this.providerId
            })
        })
    }

    onUpdate(): void {
        if (this.providerUpdate.valid) {
            this.providerService.updateProviders(this.providerUpdate.getRawValue()).subscribe(data => {
                console.log(data.ver);
                console.log(data.message);
                this.router.navigateByUrl("/providers")
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

                this.providerUpdate.patchValue({
                    fileExt: resultExtension,
                    fileName: resultBase64
                })

                console.log(resultBase64)
                console.log(resultExtension)
            })
        }
    }

}