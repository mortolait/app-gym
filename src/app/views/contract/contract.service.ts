import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Contract, Contracts } from "./contract"
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contracts!: any
  contract!: Contract 
  visible:boolean = false
  color: string = ''
  message: string = ''
  constructor(private http: HttpClient) { }

  registerContract(contract:any){
    return this.http.post(`${environment.URL_API}contracts`,contract)
  }
  getAll(): Observable<Contract[]>{
    return this.http.get<Contract[]>(`${environment.URL_API}contracts`)
      .pipe(
        tap(
          response => {
            this.contracts = response
            this.contract = this.contracts[0]
          }   
        )
      )
  }
  updateContractById(contract: Contract): Observable<Contract>{
    return this.http.put<Contract>(`${environment.URL_API}contract`,contract)
  }
  getById(){}
}
