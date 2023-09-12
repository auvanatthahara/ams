
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InvoiceDetailResDto } from "../../../dto/invoice-detail/invoice-detail.res.dto";
import { InvoiceService } from "../../../services/invoice.service";

@Component({
    selector: 'invoices-details-list',
    templateUrl: './invoices-details-list.component.html'
})
export class InvoicesDetailsListComponent implements OnInit {
    
    invoiceDetails! : InvoiceDetailResDto[];
    invoiceCode: string = '';

    constructor(private invoiceService: InvoiceService,
        private route: ActivatedRoute){}

    ngOnInit(): void {
        this.getDetails();
    }

    getDetails(){
        this.route.params.subscribe(params => {
            this.invoiceCode = params['invoiceCode'];
            console.log(this.invoiceCode);
            this.invoiceService.getInvoiceDetails(this.invoiceCode).subscribe(result => {
                this.invoiceDetails = result;
            })
        })
    }

}