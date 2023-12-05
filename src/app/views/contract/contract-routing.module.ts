import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from 'path';
import { ContractComponent } from './contract.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import { PerfilContractComponent } from './perfil-contract/perfil-contract.component';
import { ContractResolver } from "./contract.resolver"
const routes: Routes = [
  {
    path: '',
    component: ContractComponent,
    resolve: { contracts: ContractResolver},
    children: [
      {
        path: '',
        component: PerfilContractComponent
      },
      {
        path:'new',
        component: NewContractComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
