import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { InvoiceDetailUpdateReqDto } from "../dto/invoice-detail/invoice-detail-update.req.dto";
import { InvoiceDetailResDto } from "../dto/invoice-detail/invoice-detail.res.dto";
import { InvoiceInsertReqDto } from "../dto/invoice/invoice-insert.req.dto";
import { InvoiceUpdateReqDto } from "../dto/invoice/invoice-update.req.dto";
import { InvoiceResDto } from "../dto/invoice/invoice.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { BaseService } from "./base.service";


@Injectable({
    providedIn: 'root',
})
export class InvoiceService {

    constructor(private base : BaseService){}

    insertInvoice(data : InvoiceInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>('http://localhost:8080/invoices', data, true);
    }

    getInvoice() : Observable<InvoiceResDto[]> {
        return this.base.get<InvoiceResDto[]>('http://localhost:8080/invoices', true);
    }

    getInvoiceDetails(invoiceCode: string) : Observable<InvoiceDetailResDto[]> {
        return this.base.get<InvoiceDetailResDto[]>(`http://localhost:8080/invoices/details/?invoiceCode=${invoiceCode}`, true);
    }

    updateInvoices(data : InvoiceUpdateReqDto) : Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>('http://localhost:8080/invoices', data, true)
    }
    
    updateDetails(data : InvoiceDetailUpdateReqDto) : Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>('http://localhost:8080/invoices/details', data, true)
    }

}