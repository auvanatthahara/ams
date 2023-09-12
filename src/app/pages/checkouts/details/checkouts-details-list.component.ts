import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CheckoutDetailResDto } from "../../../dto/checkout/checkout-detail.res.dto";
import { CheckoutService } from "../../../services/checkout.service";

@Component({
    selector: 'checkout-details',
    templateUrl: './checkouts-details-list.component.html'
})
export class CheckoutDetailsComponent implements OnInit {

    checkoutDetails!: CheckoutDetailResDto[];
    checkoutCode!: string;

    constructor(private route: ActivatedRoute,
        private checkoutService: CheckoutService) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.checkoutCode = params['checkoutCode'];
            this.checkoutService.getDetails(this.checkoutCode).subscribe(res => {
                this.checkoutDetails = res;
            })
        })
    }
}