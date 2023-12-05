import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { cilCheckCircle, cilPlus, cilCircle,cilXCircle } from '@coreui/icons';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],

})
export class ProductComponent {
  icons = { cilCheckCircle, cilPlus, cilCircle,cilXCircle };
  color!: string
  message!: string
  indexProduct:number = -1
  constructor(public productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getProduct()
  }
  goNewProduct() {
    this.router.navigate(["products/new-product"])
  }
  getProduct() {
    this.productService.getAll().subscribe({
      next: (response: any) => {
        console.log({ response })
        this.productService.products = response.products
        this.productService.selectedProduct = this.productService.products[0]
      }
    })
  }
  goPerfil(id: string) {
    const product = this.productService.products.find((p) => p.id == id)
    if (product) {
      this.productService.selectedProduct = product
      this.router.navigate(["products"])
    }
  }

  returnClass(){
    if(this.productService.selectedProduct.active){
      return 'green'
    }else{
      return 'red'
    }
  }
}
