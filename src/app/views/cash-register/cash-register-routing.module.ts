import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegisterComponent } from './cash-register.component';
import { ResolverResolver } from "./resolver.resolver"
const routes: Routes = [
  {
    path:'',
    component: CashRegisterComponent,
    resolve: { cashRegisterss: ResolverResolver},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashRegisterRoutingModule { }
