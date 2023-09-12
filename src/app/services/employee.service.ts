import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeInsertReqDto } from "../dto/employee/employee-insert.req.dto";
import { EmployeeResDto } from "../dto/employee/employee-res.dto";
import { EmployeeUpdateReqDto } from "../dto/employee/employee-update.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {

    constructor(private base: BaseService){}

    getAllEmployees(): Observable<EmployeeResDto[]>{
        return this.base.get<EmployeeResDto[]>('http://localhost:8080/employees', true)
    }

    insertEmployees(data : EmployeeInsertReqDto) : Observable<InsertResDto> {
        return this.base.post<InsertResDto>('http://localhost:8080/employees', data, true)
    }

    updateEmployees(data : EmployeeUpdateReqDto) : Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>('http://localhost:8080/employees', data, true)
    }

}