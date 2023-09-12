import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { ProviderInsertReqDto } from "../dto/provider/provider-insert.req.dto";
import { ProviderUpdateReqDto } from "../dto/provider/provider-update.req.dto";
import { ProviderResDto } from "../dto/provider/provider.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root',
})
export class ProviderService {

    constructor(private base: BaseService){}

    getAllProviders(): Observable<ProviderResDto[]>{
        return this.base.get<ProviderResDto[]>('http://localhost:8080/providers', true)
    }

    insertProviders(data : ProviderInsertReqDto) : Observable<InsertResDto> {
        return this.base.post<InsertResDto>('http://localhost:8080/providers', data, true)
    }

    updateProviders(data : ProviderUpdateReqDto) : Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>('http://localhost:8080/providers', data, true)
    }

}