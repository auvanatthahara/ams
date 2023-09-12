import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FileUpload } from "primeng/fileupload";
import { UserResDto } from "src/app/dto/user/user.res.dto";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'update',
    templateUrl: './users-update.component.html'
})
export class UsersUpdateComponent implements OnInit {

    profile: FormGroup = this.fb.group({
        userId: [null, Validators.required],
        userEmail: [null, Validators.required],
        profileName: [null, Validators.required],
        profileAddress: [null, Validators.required],
        fileName: [null, Validators.required],
        fileExt: [null, Validators.required]
    });

    constructor(private userService: UserService,
        private fb: NonNullableFormBuilder,
        private router: Router) { }

    ngOnInit(): void {
        const id = Number(localStorage.getItem('id'));
        this.profile.patchValue({
            userId: id
        })
        console.log(id);
    }

    onSubmit() {
        this.userService.updateProfile(this.profile.getRawValue()).subscribe(result => {
            console.log(result.message);
            console.log(result.ver);
            this.router.navigateByUrl("/users/profile")
        })
    }

    fileUpload(event: any, fileUpload: FileUpload) {
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

                this.profile.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })
                fileUpload.clear();

            })
        }
    }

}