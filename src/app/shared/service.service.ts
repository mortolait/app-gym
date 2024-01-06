import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { BodyRequestSchema } from './models';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceShared {
  alertColor:string = 'success'
  alertVisible:boolean = false
  isConnected!: boolean
  alertMessage:string = ''
  modalCashVisible: boolean = false
  public visible:boolean = false
  text:string = ''
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
    const type = 'data:image/png;base64,'
    const session = this.getNameSession()
    return this.http.post(`${environment.URL_WPP}/${session}/start-session`, {
      "webhook": '',
      "waitQrCode": true
    })
    .pipe(
      tap((response)=>{
        console.log({ response })
      }),
      map((response:any)=>{
        console.log({response})
        if(!response.qrcode.includes(type)){
          console.log({aqui: response})
            const newBase64 = `${type}${response.qrcode}`
            response.qrcode = newBase64
            return response
        }else{
          return response
        }
      })
    )
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

  disconnect(){
    const session = this.getNameSession()
    return this.http.post(`${environment.URL_WPP}/${session}/logout-session`,{
      session
    })
  }
  open(value:number){
    return this.http.post(`${environment.URL_API}cash-register`,{value})
  }
  createCashTransaction(data:any){
    return this.http.post(`${environment.URL_API}cash-register/transaction`,data)
  }
}
