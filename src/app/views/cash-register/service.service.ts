import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CashRegister } from './cash-register';
import { tap } from 'rxjs';

interface filterCash{
  date: Date,
  type: 'all' | 'open' | 'close'
}
@Injectable({
  providedIn: 'root'
})
export class Service {
  cashRegisters: CashRegister[] = []
  constructor(private http: HttpClient) {}

  getCash(filter:filterCash){
    let params = new HttpParams();
    params = params.set('date', filter.date.toISOString())
    params = params.set('type',filter.type)
    
    return this.http.get(`${environment.URL_API}cash-register`, { params })
      .pipe(
        tap((res )=>{
          this.cashRegisters = res as any
          console.log(this.cashRegisters)
        })
      )
  }
  closeCashRegister(id: string){
   return this.http.post(`${environment.URL_API}cash-register/close`,{ id })
  }
  
}
