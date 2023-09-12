import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteResDto } from "../dto/delete.res.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { SupplierInsertReqDto } from "../dto/supplier/supplier-insert.req.dto";
import { SupplierUpdateReqDto } from "../dto/supplier/supplier-update.req.dto";
import { SupplierResDto } from "../dto/supplier/supplier.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class SupplierService {

    constructor(private base : BaseService){}

    getAllSupplier() : Observable<SupplierResDto[]>{
        return this.base.get<SupplierResDto[]>('http://localhost:8080/suppliers', true);
    }

    insertSupplier(supplier : SupplierInsertReqDto) : Observable<InsertResDto> {
        return this.base.post<InsertResDto>('http://localhost:8080/suppliers', supplier, true)
    }

    updateSuppliers(data : SupplierUpdateReqDto) : Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>('http://localhost:8080/suppliers', data, true)
    }

    deleteSuppliers(supplierId: number) : Observable<DeleteResDto> {
        return this.base.delete<DeleteResDto>(`http://localhost:8080/suppliers/?supplierId=${supplierId}`, true);
    }
}