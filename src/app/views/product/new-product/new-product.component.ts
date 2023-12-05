import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from "../product.service"
import { cilCheckCircle,cilTrash} from '@coreui/icons';
import { formButtonTrigger, showStateTrigger } from '../../../animations'

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  animations:[showStateTrigger,formButtonTrigger]
})
export class NewProductComponent {
  formGroup!: FormGroup
  icons = { cilCheckCircle,cilTrash };

  constructor(private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      description: ['', [Validators.required]],
      selling_price: ['', [Validators.required]],
      purchase_price: ['', Validators.required],
      code: ['', Validators.required],
      active:[true],
      allows_sale_without_stock: [false],
      current_quantity: ['',Validators.required],
      minimum_quantity: ['',Validators.required]
    })
  }

  register() {

    this.productService.registerProduct(this.formGroup.value).subscribe({
      next: (response: any) => {
        this.productService.products.push(response.registeredProduct)
        this.productService.visible = true
        setTimeout(()=>{
          this.productService.visible = false
          this.formGroup.reset({ active: true,allows_sale_without_stock: false });
        },4000)
      }
    })
  }
}
