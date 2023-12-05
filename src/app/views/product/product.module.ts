import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { PerfilProductComponent } from './perfil-product/perfil-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { IconModule } from '@coreui/icons-angular';

@NgModule({
  declarations: [
    ProductComponent,
    PerfilProductComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    IconModule
  ]
})
export class ProductModule { }
