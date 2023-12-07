import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { BodyRequestSchema } from './models';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServiceShared {

  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem('tokenwpp')
  }
  hasToken(): boolean {
    const has = localStorage.getItem('tokenwpp')
    if (has) {
      return true
    } else {
      return false
    }
  }
  getTokenWpp() {
    const session = this.getNameSession()
    return this.http.post(`${environment.URL_WPP}/${session}/${environment.API_WPP_SECRET}/generate-token`, {
      session: session,
      secretkey: environment.API_WPP_SECRET
    })
  }
  getNameSession() {
    const token = localStorage.getItem('token')
    const data = jwtDecode(token ? token : '')
    return data.sub
  }
  getQrCode() {
    const session = this.getNameSession()
    return this.http.post(`${environment.URL_WPP}/${session}/start-session`, {
      "webhook": `${environment.URL_API}/wpp-connect/${session}`,
      "waitQrCode": true
    })
  }
  verifySession(){
    const session = this.getNameSession()
    return this.http.get(`${environment.URL_WPP}/${session}/check-connection-session`)
    .pipe(
      map((response:any) => ({
        status: response.status
      }))
    )
  }
  sendMessageWpp(date: any){
    const session = this.getNameSession()
    return this.http.post(`${environment.URL_WPP}/${session}/send-message`,date)
  }
}
