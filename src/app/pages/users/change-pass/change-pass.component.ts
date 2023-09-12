import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'change-pass',
    templateUrl: './change-pass.component.html'
})
export class ChangePassComponent {

    disable: boolean = true;
    loading = false;

    passData: FormGroup = this.fb.group({
        oldPassword: ["", Validators.required],
        newPassword: ["", Validators.required],
        confirmPassword: ["", Validators.required]
    })

    constructor(private fb: NonNullableFormBuilder, 
        private userService: UserService,
        private router: Router)
    {}

    onSubmit(){
        this.loading = true;
        this.userService.changePass(this.passData.getRawValue()).subscribe(result => {
            console.log(result.message);
            console.log(result.ver);
            this.loading = false;
        })
        localStorage.clear()
        this.router.navigateByUrl('/login');
    }

    checkMatch(){
        if(this.passData.get('newPassword')?.value === this.passData.get('confirmPassword')?.value){
            this.disable = false;
        } else {
            this.disable = true;
        }
    }

}