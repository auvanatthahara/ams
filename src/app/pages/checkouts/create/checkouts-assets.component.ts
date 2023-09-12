import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AssetResDto } from "../../../dto/asset/asset.res.dto";
import { EmployeeResDto } from "../../../dto/employee/employee-res.dto";
import { AssetService } from "../../../services/asset.service";
import { CheckoutService } from "../../../services/checkout.service";
import { EmployeeService } from "../../../services/employee.service";

@Component({
    selector: 'checkout-assets',
    templateUrl: './checkouts-assets.component.html'
})
export class CheckoutCreateComponent implements OnInit, AfterViewChecked {

    id!: number;

    assets!: AssetResDto[];

    assetGenerals!: AssetResDto[];
    employees!: EmployeeResDto[];
    borrower: Borrower = {
        id: 1,
        name: 'Asset General'
    };
    borrowers!: Borrower[];

    returnDates!: (string | null)[];

    checkoutData: FormGroup = this.fb.group({
        employeeId: null,
        assetGeneralId: null,
        place: null,
        assetId: this.fb.array([new FormControl(0, Validators.required)]),
        returnDate: this.fb.array([new FormControl(this.returnDates)]),
        returnDateTemp: this.fb.array([new FormControl(this.returnDates)])
    })

    constructor(private checkoutService: CheckoutService,
        private fb: NonNullableFormBuilder,
        private assetService: AssetService,
        private employeeService: EmployeeService,
        private router: Router,
        private cd: ChangeDetectorRef) {

    }
    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    get isGeneral(): boolean {
        return this.borrower.id == 1;
    }
    get isEmployee(): boolean {
        return this.borrower.id == 2;
    }
    get isPlace(): boolean {
        return this.borrower.id == 3;
    }

    setBorrower() {
        console.log(this.borrower);
        if (this.isGeneral) {
            this.assetService.getAssetGeneral().subscribe((asset) => {
                this.checkoutData.reset();
                this.assetGenerals = asset;
                console.log(asset);
            })
            this.assetService.getAssetsFiltered('LCS01', 'CMP01').subscribe((asset) => {
                this.assets = asset;
            })
        } else if (this.isEmployee) {
            this.employeeService.getAllEmployees().subscribe(result => {
                this.checkoutData.reset();
                this.employees = result;
            })
            this.assetService.getAssetsFiltered('GNR01', 'CNS01').subscribe((asset) => {
                this.assets = asset;
            })
        } else {
            this.assetService.getAssetsFiltered('GNR01', 'CNS01').subscribe((asset) => {
                this.checkoutData.reset();
                this.assets = asset;
            })
        }
    }

    ngOnInit(): void {
        this.borrowers = [
            {
                id: 1,
                name: 'Asset General'
            },
            {
                id: 2,
                name: 'Employee'
            },
            {
                id: 3,
                name: 'Place'
            }
        ]
    }

    get assetInput() {
        return this.checkoutData.get('assetId') as FormArray;
    }

    get returnDateInput() {
        return this.checkoutData.get('returnDate') as FormArray;
    }

    get returnDateTemp() {
        return this.checkoutData.get('returnDateTemp') as FormArray;
    }

    onAdd() {
        this.assetInput.push(this.fb.control(''));
        this.returnDateInput.push(this.fb.control(null));
        this.returnDateTemp.push(this.fb.control(null));
    }

    onRemove(i: number) {
        this.assetInput.removeAt(i);
        this.returnDateInput.removeAt(i);
    }

    onSubmit() {
        this.checkoutService.insertCheckout(this.checkoutData.getRawValue()).subscribe((result) => {
            console.log(result.id);
            console.log(result.message);
            this.router.navigateByUrl('/checkouts')
        })
    }

    convertDate(e: any, i: number) {
        this.returnDateInput.at(i).patchValue(convertUTCToLocalDate(e))
    }

}

interface Borrower {
    id: number;
    name: string;
}

const convertUTCToLocalDate = function (date: Date) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return newDate.toISOString().split('T')[0]
}