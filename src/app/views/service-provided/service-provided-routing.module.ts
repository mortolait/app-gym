import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceProvidedComponent } from './service-provided.component';
import { PerfilServiceComponent } from './perfil-service/perfil-service.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { ServiceResolver } from "./service.resolver"
const routes: Routes = [
  {
    path: "",
    component: ServiceProvidedComponent,
    resolve:{services: ServiceResolver},
    
    children:[
      {
        path:"",
        component: PerfilServiceComponent
      },
      {
        path:"new",
        component: NewServiceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProvidedRoutingModule { }
