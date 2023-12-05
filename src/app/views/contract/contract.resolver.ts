import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Contract } from './contract';
import { ContractService } from './contract.service';

@Injectable({
  providedIn: 'root'
})
export class ContractResolver implements Resolve<Contract[]> {
  constructor( private contractService:ContractService ){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contract[]> {
    return this.contractService.getAll();
  }
}
