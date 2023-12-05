import { Component } from '@angular/core';
import { ServiceProvided } from "./service.service"
import { cilCheckCircle, cilPlus, cilCircle } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from './serviceProvided';
@Component({
  selector: 'app-service-provided',
  templateUrl: './service-provided.component.html',
  styleUrls: ['./service-provided.component.scss']
})
export class ServiceProvidedComponent {
  icons = { cilCheckCircle, cilPlus, cilCircle };

  constructor(public serviceProvided: ServiceProvided, private activetedRoute:ActivatedRoute,private router:Router){}

  // services: Service[] = this.activetedRoute.snapshot.data['services']
  services: Service[] =[]

  ngOnInit(){ 
  
  }
  goNewService(){
    this.router.navigate(['services/new'])
  }

  goPerfil(id:string){
    this.router.navigate([`services`])
    this.serviceProvided.selectedService = this.serviceProvided.services.find((x) => x.id == id) as Service
  }
}
