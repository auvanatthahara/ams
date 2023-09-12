import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Roles } from "src/app/constant/roles";
import { LoginResDto } from "src/app/dto/login/login.res.dto";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

    imgurl! : string;
    private roleCode! : string;
    items: MenuItem[] | undefined;
    profileItem: MenuItem[] | undefined;

    constructor(private authService: AuthService){}

    ngOnInit(): void {
        const profile = this.authService.getProfile();
        if(profile){
            this.imgurl = `http://localhost:8080/files/${profile.photoId}`;
            this.roleCode = profile.roleCode;
        }
        this.itemMenu();
    }

    get isAdmin() : boolean {
        return this.roleCode === Roles.SUPER_ADMIN;
    }

    get isHR() : boolean {
        return this.roleCode === Roles.HR;
    }

    get isFinance() : boolean {
        return this.roleCode === Roles.FINANCE;
    }

    get isSupport() : boolean {
        return this.roleCode === Roles.SUPPORT;
    }

    logout() : void {
        localStorage.clear();
    }

    itemMenu() {
        this.items = [
            {
                label: 'AMS',
                icon: 'pi pi-database'
            },
            {
                label: 'Home',
                routerLink: '/dashboard'
            },
            {
                label: 'Checkout',
                routerLink: '/checkouts',
                visible: this.isHR
            },
            {
                label: 'Master Data',
                items: [
                    {
                        label: 'Assets',
                        routerLink: '/assets',
                        visible: this.isHR || this.isFinance || this.isSupport
                    },
                    {
                        label: 'Companies',
                        routerLink: '/companies',
                        visible: this.isAdmin
                    },
                    {
                        label: 'Employees',
                        routerLink: '/employees',
                        visible: this.isAdmin
                    },
                    {
                        label: 'Invoices',
                        routerLink: '/invoices',
                        visible: this.isFinance
                    },
                    {
                        label: 'Providers',
                        routerLink: '/providers',
                        visible: this.isAdmin
                    },
                    {
                        label: 'Suppliers',
                        routerLink: '/suppliers',
                        visible: this.isAdmin
                    },
                    {
                        label: 'Users',
                        routerLink: '/users',
                        visible: this.isAdmin
                    },

                ]
            }
        ]
        this.profileItem = [

            {
                label: 'Profile',
                routerLink: '/users/profile'
            },
            {
                label: 'Change Password',
                routerLink: '/users/change-pass'
            },
            {
                label: 'Logout',
                command: () => this.logout(),
                routerLink: '/login'
            }


        ]
    }

}