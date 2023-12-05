import { Component } from '@angular/core';
import { ServiceProvided } from '../service.service';

@Component({
  selector: 'app-perfil-service',
  templateUrl: './perfil-service.component.html',
  styleUrls: ['./perfil-service.component.scss']
})
export class PerfilServiceComponent {

  constructor(public serviceProvided: ServiceProvided){}

  update(){
    this.serviceProvided.updateService(this.serviceProvided.selectedService).subscribe({
      next: (response)=> {
        this.serviceProvided.visible = true
        setTimeout(()=>{
          this.serviceProvided.visible = false
        },3000)
      }
    })
  }
}
