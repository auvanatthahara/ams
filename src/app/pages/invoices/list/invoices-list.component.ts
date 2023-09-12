
import { Component, OnInit } from "@angular/core";
import { InvoiceResDto } from "../../../dto/invoice/invoice.res.dto";
import { InvoiceService } from "../../../services/invoice.service";

@Component({
    selector: 'invoices-list',
    templateUrl: './invoices-list.component.html'
})
export class InvoicesListComponent implements OnInit {
    
    invoices! : InvoiceResDto[];
    
    constructor(private invoiceService: InvoiceService){}

    ngOnInit(): void {
        this.getInvoices();
    }
    
    getInvoices() {
        this.invoiceService.getInvoice().subscribe(result => {
            this.invoices = result
        });
    }

}