import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { showStateTrigger } from 'src/app/animations';
@Component({
  selector: 'app-perfil-product',
  templateUrl: './perfil-product.component.html',
  styleUrls: ['./perfil-product.component.scss'],
  animations:[showStateTrigger]
})
export class PerfilProductComponent {
  formGroup!: FormGroup
  constructor(private formBuilder: FormBuilder, public productService: ProductService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      description: [this.productService?.selectedProduct?.description, [Validators.required]],
      selling_price: [this.productService?.selectedProduct?.selling_price, [Validators.required]],
      purchase_price: [this.productService?.selectedProduct?.purchase_price, Validators.required],
      code: [this.productService?.selectedProduct?.code, Validators.required],
      active:[this.productService?.selectedProduct?.active],
      allows_sale_without_stock: [this.productService?.selectedProduct?.allows_sale_without_stock],
      current_quantity: [this.productService?.selectedProduct?.current_quantity,Validators.required],
      minimum_quantity: [this.productService?.selectedProduct?.minimum_quantity,Validators.required]
    })

    setTimeout(()=>{
      this.formGroup.patchValue(this.productService.selectedProduct)
    },1000)
  }

  update() {
    this.productService.updateProduct(this.productService.selectedProduct).subscribe({
      next: response => {
        this.productService.visible = true
        this.productService.color = 'success'
        this.productService.message = "Produto salvo com sucesso"
        setTimeout(()=>{
          this.productService.visible = false
        },4000)
      },
      error: err => {
        console.log({ err })
        if(err.status == 409){
          this.productService.visible = true
          this.productService.color = 'danger'
          this.productService.message = "Código já esta sendo usado"
          setTimeout(()=>{
            this.productService.visible = false
          },4000)
        }
      }
    })
  }
}
