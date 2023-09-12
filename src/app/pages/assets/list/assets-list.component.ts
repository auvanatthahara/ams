import { Component, OnInit } from "@angular/core";
import { AssetResDto } from "../../../dto/asset/asset.res.dto";
import { AssetService } from "../../../services/asset.service";

@Component({
    selector: "assets-list",
    templateUrl: "./assets-list.component.html"
})
export class AssetsListComponent implements OnInit {
    
    assets! : AssetResDto[];
    visible: boolean = false;
    
    constructor(private assetService: AssetService){}
    
    ngOnInit(): void {
        this.assetService.getAssets().subscribe(result => {
            this.assets = result
        })
    }

    showDialog() {
        this.visible = true;
    }

}