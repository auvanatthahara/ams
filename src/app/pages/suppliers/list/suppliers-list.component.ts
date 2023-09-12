import { Component, OnInit } from "@angular/core";
import { SupplierResDto } from "../../../dto/supplier/supplier.res.dto";
import { SupplierService } from "../../../services/supplier.service";
import { ConfirmEventType, ConfirmationService, MessageService } from "primeng/api";

@Component({
    selector: 'suppliers-list',
    templateUrl: './suppliers-list.component.html'
})
export class SuppliersListComponent implements OnInit {

    suppliers! : SupplierResDto[];
    imgUrl!: string;
    visible : boolean = false;

    constructor(private supplier : SupplierService) { 

    }

    ngOnInit(): void {
        this.getAllSuppliers();
    }

    getAllSuppliers() {
        this.supplier.getAllSupplier().subscribe(result => {
            this.suppliers = result
        });
    }

    onDelete(id: number){
        console.log(id);
        this.supplier.deleteSuppliers(id).subscribe(result => {
            console.log(result.message);
        })
        this.visible = false;
    }

    showDialog() {
        this.visible = true;
    }

}