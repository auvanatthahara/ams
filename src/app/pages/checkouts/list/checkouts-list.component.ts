import { Component, OnInit } from "@angular/core";
import { CheckoutResDto } from "../../../dto/checkout/checkout.res.dto";
import { CheckoutService } from "../../../services/checkout.service";

@Component({
    selector: 'checkout-list',
    templateUrl: './checkouts-list.component.html'
})
export class CheckoutListComponent implements OnInit {

    checkouts!: CheckoutResDto[]

    constructor(private checkoutService: CheckoutService){}
    
    ngOnInit(): void {
        this.checkoutService.getCheckouts().subscribe(checkouts => {
            this.checkouts = checkouts;
        })
    }


}