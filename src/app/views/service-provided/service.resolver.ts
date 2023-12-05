import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Service } from './serviceProvided';
import { ServiceProvided } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceResolver implements Resolve<Service[]> {
  constructor(private serviceProvided: ServiceProvided){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Service[]> {
    return this.serviceProvided.getAll()
  }
}
