import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ServiceProvidedRoutingModule } from './service-provided-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewServiceComponent } from './new-service/new-service.component';
import { PerfilServiceComponent } from './perfil-service/perfil-service.component';
import { ServiceProvidedComponent } from './service-provided.component';


@NgModule({
  declarations: [ServiceProvidedComponent,NewServiceComponent,PerfilServiceComponent],
  imports: [
    CommonModule,
    ServiceProvidedRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ServiceProvidedModule { }
