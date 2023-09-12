import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CheckoutDetailResDto } from "src/app/dto/checkout/checkout-detail.res.dto";
import { CheckoutService } from "src/app/services/checkout.service";

@Component({
    selector: 'checkin',
    templateUrl: './checkin-assets.component.html'
})
export class CheckinComponent implements OnInit, AfterViewChecked{

    details!: CheckoutDetailResDto[];

    checkinData: FormGroup = this.fb.group({
        checkoutDetailId: this.fb.array([new FormControl(null, Validators.required)])
    })

    constructor(private route: ActivatedRoute, 
        private checkoutService: CheckoutService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private cd: ChangeDetectorRef)
    {}
    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const checkoutCode = params['checkoutCode'];
            this.checkoutService.getDetails(checkoutCode).subscribe(result => {
                this.details = result;
            })
        })
    }

    get checkin(){
        return this.checkinData.get('checkoutDetailId') as FormArray;
    }

    onAdd(){
        this.checkin.push(this.fb.control(null));
    }

    onRemove(i: number) {
        this.checkin.removeAt(i);
    }

    onCreate(){
        this.checkoutService.updateCheckIn(this.checkinData.getRawValue()).subscribe(result => {
            console.log(result.message);
            console.log(result.ver);
        })
        this.router.navigateByUrl('/checkouts')
    }

}