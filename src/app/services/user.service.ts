import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { UserInsertReqDto } from "../dto/user/user-insert.req.dto";
import { UserResDto } from "../dto/user/user.res.dto";
import { BaseService } from "./base.service";
import { UserUpdatePasswordReqDto } from "../dto/user/user-password-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { UserUpdateReqDto } from "../dto/user/user-update.req.dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private base : BaseService){}

    getAll() : Observable<UserResDto[]> {
        return this.base.get<UserResDto[]>('http://localhost:8080/users', true);
    }

    insertUser(data: UserInsertReqDto) : Observable<InsertResDto> {
        return this.base.post<InsertResDto>('http://localhost:8080/users', data, true);
    }

    changePass(data: UserUpdatePasswordReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>('http://localhost:8080/users', data, true);
    }

    getProfile(id: number): Observable<UserResDto>{
        return this.base.get<UserResDto>(`http://localhost:8080/users/profile/?id=${id}`, true);
    }
    
    updateProfile(data: UserUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>('http://localhost:8080/users/update', data, true);
    }
}