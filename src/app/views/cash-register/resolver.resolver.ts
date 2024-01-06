import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Service } from "./service.service"
@Injectable({
  providedIn: 'root'
})
export class ResolverResolver implements Resolve<any> {
  constructor( private service:Service ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getCash({date: new Date(),type: 'all'})
    
  }
}
