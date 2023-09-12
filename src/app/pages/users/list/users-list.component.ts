import { Component, OnInit } from '@angular/core';
import { UserResDto } from '../../../dto/user/user.res.dto';
import { UserService } from '../../../services/user.service';


@Component({
    selector: "users-list",
    templateUrl: "./users-list.component.html",

})
export class UsersListComponent implements OnInit {

    users! : UserResDto[];

    constructor(private userService: UserService){

    }
    ngOnInit(): void {
        this.getData();
    }

    getData(){
        this.userService.getAll().subscribe(result => {
            this.users = result;
        });
    }

}