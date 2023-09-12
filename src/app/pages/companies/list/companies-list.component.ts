import { Component } from "@angular/core";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { CompanyService } from "../../../services/company.service";
import { Router } from "@angular/router";

@Component({
    selector: 'companies-list',
    templateUrl: './companies-list.component.html'
})
export class CompaniesListComponent {

    loading = false;
    companies!: CompanyResDto[];

    constructor(private company: CompanyService, private router: Router) { }

    ngOnInit(): void {
        this.getAllCompanies();
    }

    getAllCompanies() {
        this.company.getAllCompanies().subscribe(result => {
            this.companies = result
        });
    }

    navigate(){
        this.router.navigateByUrl("/companies/create")
    }

}