import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AssetService } from "../../../services/asset.service";
import { AssetStatusResDto } from "src/app/dto/asset-status/asset-status.res.dto";

@Component({
    selector: "assets-update",
    templateUrl: "./assets-update.component.html"
})
export class AssetsUpdateComponent {

    assetId!: number;
    statuses! : AssetStatusResDto[];

    assetUpdate: FormGroup = this.fb.group({
        statusId: [0, Validators.required],
        assetId: [0, Validators.required]
    })

    constructor(private assetService: AssetService,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.assetId = params['assetId'];
            this.assetUpdate.patchValue({
                assetId: this.assetId
            })
            console.log(this.assetId);
        })
        this.statuses = [
            {
                statusId: 1,
                assetStatus: 'READY-TO-DEPLOY'
            },
            {
                statusId: 2,
                assetStatus: 'BROKEN'
            },
            {
                statusId: 3,
                assetStatus: 'LOST/STOLEN'
            },
            {
                statusId: 4,
                assetStatus: 'REPAIR'
            },
            {
                statusId: 5,
                assetStatus: 'PENDING'
            },
        ]
    }

    onUpdate(): void {
        if (this.assetUpdate.valid) {
            this.assetService.updateAssets(this.assetUpdate.getRawValue()).subscribe(data => {
                console.log(data.ver);
                console.log(data.message);
                this
                this.router.navigateByUrl("/assets")
            });
        } else {
            console.log("Not updated!");
        }
    }

}