import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    constructor(private http: HttpClient, private authService: AuthService,
        private toast: ToastrService, private router: Router,
        private messageService: MessageService) 
    { }

    private get token() {
        const profile = this.authService.getProfile();
        if (profile && profile.token) {
            return profile.token;
        }
        return null;
    }

    private get header() {
        return {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }
    }

    post<T>(url: string, body: any, withToken = true): Observable<T> {
        if (withToken) {
            return this.http.post<T>(url, body, this.header).pipe(response(this.messageService, this.router));
        } else {
            return this.http.post<T>(url, body).pipe(response(this.messageService, this.router));
        }
    }

    get<T>(url: string, withToken = true): Observable<T> {
        if (withToken) {
            return this.http.get<T>(url, this.header).pipe(response(this.messageService, this.router));
        } else {
            return this.http.get<T>(url).pipe(response(this.messageService, this.router));
        }
    }

    patch<T>(url: string, body: any, withToken = true): Observable<T> {
        if (withToken) {
            return this.http.patch<T>(url, body, this.header).pipe(response(this.messageService, this.router));
        } else {
            return this.http.patch<T>(url, body).pipe(response(this.messageService, this.router));
        }
    }

    delete<T>(url: string, body: any, withToken = true): Observable<T> {
        if (withToken) {
            return this.http.delete<T>(url, this.header).pipe(response(this.messageService, this.router));
        } else {
            return this.http.delete<T>(url).pipe(response(this.messageService, this.router));
        }
    }
}

function response<T>(messageService: MessageService, router: Router) {
    return tap<T>({
        next: (data) => {
            if (data && (data as any).message) {
                // toast.success((data as any).message);
                messageService.add({severity: 'success', summary:"Success", detail:(data as any).message});
            }
        },
        error: (err) => {
            if (err instanceof HttpErrorResponse) {
                if (err && err.error && err.error.message) {
                    // toast.error(err.error.message);
                    messageService.add({severity: 'error', summary:"Error", detail:err.error.message});
                }
            }
            if (err.status == 401 && err.error.message === "Token expired!") {
                localStorage.clear();
                router.navigateByUrl('/login');
            }
        }
    })
}