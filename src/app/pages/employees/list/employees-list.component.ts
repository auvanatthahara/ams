import { Component } from "@angular/core";
import { EmployeeResDto } from "../../../dto/employee/employee-res.dto";
import { EmployeeService } from "../../../services/employee.service";

@Component({
    selector: 'employees-list',
    templateUrl: './employees-list.component.html'
})
export class EmployeesListComponent {

    employees! : EmployeeResDto[];

    constructor(private employee : EmployeeService) { }

    ngOnInit(): void {
        this.getAllEmployees();
    }

    getAllEmployees() {
        this.employee.getAllEmployees().subscribe(result => {
            this.employees = result
        });
    }

}