import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AssetInsertReqDto } from "../dto/asset/asset-insert.req.dto";
import { AssetUpdateReqDto } from "../dto/asset/asset-update.req.dto";
import { AssetResDto } from "../dto/asset/asset.res.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class AssetService {

    constructor(private base: BaseService) { }

    insertAsset(data: AssetInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>('http://localhost:8080/assets', data, true);
    }

    getAssets(): Observable<AssetResDto[]> {
        return this.base.get<AssetResDto[]>('http://localhost:8080/assets', true);
    }

    updateAssets(data : AssetUpdateReqDto) : Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>('http://localhost:8080/assets', data, true)
    }

    getAssetGeneral(): Observable<AssetResDto[]> {
        return this.base.get<AssetResDto[]>('http://localhost:8080/assets/generals', true);
    }

    getAssetsFiltered(assetCode1: string, assetCode2: string): Observable<AssetResDto[]> {
        return this.base.get<AssetResDto[]>(`http://localhost:8080/assets/codes/?assetCode1=${assetCode1}&assetCode2=${assetCode2}`, true);
    }

}