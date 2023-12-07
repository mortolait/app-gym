import { Component } from '@angular/core';
import { ContractService } from '../../contract/contract.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from '../sale.service';
import { Item, Process } from '../sale';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../student/student.service';
import { Product } from '../../product/product';
import { ServiceProvided } from '../../service-provided/service.service';
import { Service } from '../../service-provided/serviceProvided';
import { formButtonTrigger, showContentTabs } from 'src/app/animations';
import * as moment from 'moment';


interface discount {
  label: string,
  value: string
}

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
  animations: [showContentTabs, formButtonTrigger]
})
export class NewSaleComponent {
  processSale: Process[] = [
    {
      num: 1,
      name: "Nova venda",
      actived: true
    },
    {
      num: 2,
      name: "Recebimento",
      actived: false
    },
    {
      num: 3,
      name: "Resumo da venda",
      actived: false
    }
  ]
  discounts: discount[] = [
    {
      label: 'Nenhum',
      value: 'none'
    },
    {
      label: 'Personalizado',
      value: 'custom'
    }
  ]
  subTotal: number = 0
  totalSale: number = 0
  totalDiscounts: number = 0
  selectedStudent!: any
  formContract!: FormGroup
  formProduct!: FormGroup
  formService!: FormGroup
  idParams!: string
  selectedProduct!: Product
  active: Boolean = true
  constructor(private router: Router, public serviceProvided: ServiceProvided, public studentService: StudentService, public contractService: ContractService, private activatedRoute: ActivatedRoute, public saleService: SaleService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.getContracts()
    this.getServices()
    this.formContract = this.formBuilder.group({
      contract: ['', [Validators.required]],
      discounts: ['none', []],
      valueDiscounts: [0, []],
      obs: ['', []],
      startDate: [moment(new Date()).format('YYYY-MM-DD'), []],
      endDate: ['', []],
      type: ['contract', []]
    })
    this.formProduct = this.formBuilder.group({
      product: ['', [Validators.required]],
      qtd: [1, [Validators.required, Validators.min(1)]],
      discounts: ['none', []],
      valueDiscounts: [0, []],
      obs: ['', []],
      type: ['product', []]
    })

    this.formService = this.formBuilder.group({
      service: ['', [Validators.required]],
      qtd: [1, [Validators.required, Validators.min(1)]],
      discounts: ['none', []],
      valueDiscounts: [0, []],
      obs: ['', []],
      type: ['service', []]
    })
    this.idParams = this.activatedRoute.snapshot.params?.['id'];
    this.studentService.getStudentById(this.idParams).subscribe({
      next: (res: any) => {
        this.selectedStudent = res['student']
        this.saleService.selectedStudentSale = res['student']
       
      }
    })
    this.saleService.sale.idClient = this.idParams
  }
  getContracts() {
    this.contractService.getAll().subscribe({
      next: res => {
        
      }
    })

  }

  getServices() {
    this.serviceProvided.getAll().subscribe()
  }

  deleteSale(item: Item) {
    this.saleService.sale.itens.splice(this.saleService.sale.itens.indexOf(item), 1)
    this.calcValueSale()
  }
  calcValueSale() {
    this.saleService.sale.amount = this.saleService.sale.itens.reduce((total, item: any) => {
      return total + parseFloat(item.value)
    }, 0)

    this.saleService.sale.totalDiscount = this.saleService.sale.itens.reduce((total, item: any) => {
      return total + item.valueDiscount
    }, 0)
  }
  addContract() {
    const { contract, discounts, valueDiscounts, obs, startDate } = this.formContract.value

    this.saleService.getValueContractById(contract).subscribe({
      next: ((response: any) => {
        this.saleService.sale.itens.push({
          idEntity: contract,
          nameEntity: response['description'],
          type: 'contract',
          discount: discounts,
          valueDiscount: valueDiscounts,
          obs,
          value: response['amount'] as any,
          quantity: 1,
          start_date: moment(startDate).toDate(),
          end_date: moment(startDate).add(response.installments, "months").toDate()
        })
        this.calcValueSale()
        this.formContract.reset({ discounts: 'none', type: 'contract', valueDiscounts: 0,startDate:moment(new Date()).format('YYYY-MM-DD') })
      })

    })
  }

  addProduct() {
    const { qtd, discounts, valueDiscounts, obs } = this.formProduct.value
    this.saleService.sale.itens.push({
      idEntity: this.selectedProduct.id,
      nameEntity: this.selectedProduct.description,
      type: 'product',
      discount: discounts,
      valueDiscount: valueDiscounts,
      obs,
      value: this.selectedProduct.selling_price * qtd,
      quantity: qtd
    })
    this.calcValueSale()
    this.formProduct.reset({ qtd: 1, type: 'product', valueDiscounts: 0, discounts: "none" })
  }
  addServices() {
    const { service, qtd, discounts, valueDiscounts, obs } = this.formService.value
    const searchedService = this.serviceProvided.services.find(x => x.id == service) as Service
    this.saleService.sale.itens.push({
      idEntity: service,
      discount: discounts,
      nameEntity: searchedService.description,
      obs,
      quantity: qtd,
      type: 'service',
      value: searchedService.amount * qtd,
      valueDiscount: valueDiscounts
    })
    this.calcValueSale()
    this.formService.reset({ discounts: 'none', qtd: 1, type: 'service' })
  }

  selectProduct(item: Product) {
    this.selectedProduct = item
    this.formProduct.patchValue({ product: item.description })
    this.saleService.productSearched = []
  }
  searchProduct() {
    const value = this.formProduct.value['product']
    if (value.length > 2) {
      this.saleService.getProductByPartName(value).subscribe()
    }
    else {
      this.saleService.productSearched = []
    }
  }

  receivePayment() {
    this.router.navigate([`/sale/receipt/payment/${this.idParams}`])
  }
  cancelSale() {
    this.router.navigate([`student/${this.idParams}`])
  }
}
