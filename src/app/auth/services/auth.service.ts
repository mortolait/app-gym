import { Credations } from './../credations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';



import { environment } from '../../../environments/environment';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(credentions:Credations){
    return this.http.post<LoginResponse>(`${environment.URL_API}sessions`, credentions)
      .pipe(
        tap(response => {
          console.log({ response })
          localStorage.setItem("token", response["token"]);
        })
      )
  }

  logout(){
    localStorage.removeItem("token");
  }

  isLoggedIn(){
    return !!localStorage.getItem("token");
  }

  get token(){
    return localStorage.getItem("token") ?? '';
  }

}
