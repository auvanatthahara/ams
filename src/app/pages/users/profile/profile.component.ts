import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { UserResDto } from "src/app/dto/user/user.res.dto";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, AfterViewChecked{

    profile!: UserResDto;

    constructor(private userService: UserService,
        private cd: ChangeDetectorRef)
    {}

    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        const id = Number(localStorage.getItem('id'));
        console.log(id);
        this.userService.getProfile(id).subscribe(result => {
            this.profile = result;
        })
    }

}