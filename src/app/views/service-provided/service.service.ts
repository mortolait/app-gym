import { Injectable } from '@angular/core';
import { Service } from "./serviceProvided"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceProvided {
  visible!:boolean
  selectedService!:Service 
  
  services: Service[] = []

  constructor(private http: HttpClient) { }

  
  create(service: Service): Observable<Service>{
    return this.http.post<Service>(`${environment.URL_API}service`,service)
  }

  getAll(): Observable<Service[]>{
    return this.http.get<Service[]>(`${environment.URL_API}service`)
          .pipe(
            tap( response =>{
              this.services = response
              this.selectedService = this.services[0]
            })
          )
  }
  updateService(service: Service): Observable<Service>{
    return this.http.put<Service>(`${environment.URL_API}service`,service)
  }
}
