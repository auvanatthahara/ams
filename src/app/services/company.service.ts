import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyInsertReqDto } from "../dto/company/company-insert.req.dto";
import { CompanyUpdateReqDto } from "../dto/company/company-update.req.dto";
import { CompanyResDto } from "../dto/company/company.res.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root',
})
export class CompanyService {

    constructor(private base: BaseService){}

    getAllCompanies(): Observable<CompanyResDto[]>{
        return this.base.get<CompanyResDto[]>('http://localhost:8080/companies', true)
    }

    insertCompanies(data : CompanyInsertReqDto) : Observable<InsertResDto> {
        return this.base.post<InsertResDto>('http://localhost:8080/companies', data, true)
    }

    updateCompanies(data : CompanyUpdateReqDto) : Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>('http://localhost:8080/companies', data, true)
    }

}