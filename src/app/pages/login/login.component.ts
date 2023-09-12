import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { LoginService } from "../../services/login.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    loading = false;

    userData: FormGroup = this.fb.group({
        userEmail: ["", Validators.required],
        userPass: ["", Validators.required]
    });

    constructor( 
        private fb: NonNullableFormBuilder, 
        private loginService: LoginService,
        private route: Router) { }

    onLogin(): void {
        this.loading = true;
        if (this.userData.valid) {
            this.loginService.login(this.userData.getRawValue()).subscribe(result => {
                localStorage.setItem('data', JSON.stringify(result));
                localStorage.setItem('id', JSON.stringify(result.id));
                this.route.navigateByUrl('/dashboard');
                this.loading = false;
            });
        } else {
            console.log("Login Invalid");
        }
    }


}