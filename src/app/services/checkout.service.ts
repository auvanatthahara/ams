import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CheckoutDetailResDto } from "../dto/checkout/checkout-detail.res.dto";
import { CheckoutInsertReqDto } from "../dto/checkout/checkout-insert.req.dto";
import { CheckoutResDto } from "../dto/checkout/checkout.res.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { BaseService } from "./base.service";
import { CheckoutUpdateReqDto } from "../dto/checkout/checkout-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    constructor(private base: BaseService){}

    insertCheckout(data : CheckoutInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>('http://localhost:8080/checkouts', data, true);
    }

    getCheckouts(): Observable<CheckoutResDto[]> {
        return this.base.get<CheckoutResDto[]>('http://localhost:8080/checkouts', true);
    }

    getDetails(checkoutCode: string): Observable<CheckoutDetailResDto[]> {
        return this.base.get<CheckoutDetailResDto[]>(`http://localhost:8080/checkouts/details/?checkout_code=${checkoutCode}`, true)
    }

    updateCheckIn(data: CheckoutUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>('http://localhost:8080/checkouts', data, true);
    }

}