import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { SharedModule } from '../../shared/shared.module';
import { NewContractComponent } from './new-contract/new-contract.component';
import { PerfilContractComponent } from './perfil-contract/perfil-contract.component'
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContractComponent,
    NewContractComponent,
    PerfilContractComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    SharedModule,
    IconModule,
    FormsModule
  ]
})
export class ContractModule { }
