import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { CompanyService } from "../../../services/company.service";
import { EmployeeService } from "../../../services/employee.service";

@Component({
    selector: 'employees-update',
    templateUrl: './employees-update.component.html'
})
export class EmployeesUpdateComponent {

    employeeId!: number;
    companies!: CompanyResDto[];

    employeeUpdate: FormGroup = this.fb.group({
        companyId: ["", Validators.required],
        employeeId: [0, Validators.required],
        employeeName: ["", Validators.required],
        employeeCode: ["", Validators.required]
    })

    constructor(private employeeService: EmployeeService,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this.companyService.getAllCompanies().subscribe(result => {
            this.companies = result
        });
        this.route.params.subscribe(params => {
            this.employeeId = params['employeeId'];
            this.employeeUpdate.patchValue({
                employeeId: this.employeeId
            })
        })
    }

    onUpdate(): void {
        if (this.employeeUpdate.valid) {
            this.employeeService.updateEmployees(this.employeeUpdate.getRawValue()).subscribe(data => {
                console.log(data.ver);
                console.log(data.message);
                this
                this.router.navigateByUrl("/employees")
            });
        } else {
            console.log("Not updated!");
        }
    }

}