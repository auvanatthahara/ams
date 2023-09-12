import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { Roles } from "src/app/constant/roles";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: "users-create",
    templateUrl: "./users-create.component.html"
})
export class UsersCreateComponent implements OnInit {

    userData: FormGroup = this.fb.group({
        roleId: [0, Validators.required],
        userEmail: ["", Validators.required],
        profileName: ["", Validators.required],
        fileExt: "",
        files: "",
        profileAddress: ["", Validators.required],
    })

    users = [{
        value: 0,
        role: ''
    }];

    constructor(private fb: NonNullableFormBuilder, private us: UserService, private router: Router) { }

    ngOnInit(): void {
        this.users = [{
            value: 1,
            role: 'Super Admin'
        },
        {
            value: 2,
            role: 'Human Resources'
        },
        {
            value: 3,
            role: 'Finance'
        },
        {
            value: 4,
            role: 'Support'
        }
        ]
    }

    onClick(): void {
        if (this.userData.valid) {
            this.us.insertUser(this.userData.getRawValue()).subscribe(result => {
                console.log(result.id);
                console.log(result.message);
                this.router.navigateByUrl("/users")
            });
        } else {
            console.log("Login Invalid");
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

                this.userData.patchValue({
                    files: resultBase64,
                    fileExt: resultExtension
                })
                fileUpload.clear();

            })
        }
    }

}