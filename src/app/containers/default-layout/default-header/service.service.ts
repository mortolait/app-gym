import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    visible:boolean = false

    constructor(private http: HttpClient) { }

   
}
