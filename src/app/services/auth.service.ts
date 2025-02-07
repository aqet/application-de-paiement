import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "../models/auth.model";
import { catchError, delay, mapTo, Observable, of } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class AuthService{
        constructor(private http: HttpClient) { }

        findRegister(params: {}): Observable<boolean>{
            console.log(params);
            return this.http.post<boolean>('http://localhost:3000/api/auth/signup', params)
        }

        findLogin(params: {}): Observable<boolean>{
            console.log(params);
            return this.http.post<boolean>('http://localhost:3000/api/auth/login', params)
        }
}