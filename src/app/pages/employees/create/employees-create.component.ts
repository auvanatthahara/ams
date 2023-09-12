import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { CompanyService } from "../../../services/company.service";
import { EmployeeService } from "../../../services/employee.service";

@Component({
    selector: 'employees-create',
    templateUrl: './employees-create.component.html'
})
export class EmployeesCreateComponent implements OnInit, AfterViewChecked{

        companies!: CompanyResDto[];

        employeeData: FormGroup = this.fb.group({
            employeeName: ["", Validators.required],
            companyId: [0, Validators.required],
            employeeCode: ["", Validators.required],
        });

    constructor(private employee: EmployeeService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private company: CompanyService,
        private cd: ChangeDetectorRef) { }

    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    onClick(): void {
        if (this.employeeData.valid) {
            this.employee.insertEmployees(this.employeeData.getRawValue()).subscribe(result => {
                console.log(result.id);
                console.log(result.message);
                this.router.navigateByUrl("/employees")
            });
        } else {
            console.log("Not created!");
        }
    }

    ngOnInit(): void {
        this.getAllCompanies();
    }

    getAllCompanies() {
        this.company.getAllCompanies().subscribe(result => {
            this.companies = result
        });
    }

}