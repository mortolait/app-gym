import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { PerfilProductComponent } from './perfil-product/perfil-product.component';

const routes: Routes = [
  {
    path:"",
    component: ProductComponent,
    children: [
      {
        path: '',
        component: PerfilProductComponent
      },
      {
        path: 'new-product',
        component: NewProductComponent
      }
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
