import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from '../student/student';
import { Sale, SalesReceipt } from "./sale"
import { debounceTime, filter, tap } from 'rxjs';
import { Product } from '../product/product';
import { Console } from 'console';
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  public visible = false;
  public studentSearched: Student[] = []
  public productSearched: Product[] = []
  public selectedStudentSale!: any
  public visibleAlert: Boolean = false
  public sale: Sale = {
    amount: 0,
    idClient: '',
    code: '',
    itens: [],
    totalDiscount: 0,
    received: [],
    totalReceived: 0,
    hasOutstandingBalance: false,
    valueOutstandingBalance: 0,
    datePaymentOutstandingBalance: new Date(),

  }
  processSale: any[] = [
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
  salesReceipt: SalesReceipt = {
    client: '',
    codeSale: '',
    dateSale: new Date(),
    itens: [],
    received: [],
    valueSale: '0',
    totalReceived: 0
  }
  constructor(private http: HttpClient) { }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  getStudentByPartName(partName: string) {
    return this.http.get(`${environment.URL_API}student/${partName}`)

  }
  getValueContractById(id: string) {
    return this.http.get(`${environment.URL_API}contract/${id}`)
  }
  getProductByPartName(value: string) {
    return this.http.get(`${environment.URL_API}product/${value}`)
      .pipe(
        tap(response => {
          this.productSearched = response as Product[]
        })
      )
  }
  resetSale() {
    this.sale = {
      amount: 0,
      idClient: '',
      code: '',
      itens: [],
      totalDiscount: 0,
      received: [],
      totalReceived: 0,
      hasOutstandingBalance: false,
      valueOutstandingBalance: 0,
      datePaymentOutstandingBalance: new Date()
    }
    this.salesReceipt = {
      client: '',
      codeSale: '',
      dateSale: new Date(),
      itens: [],
      received: [],
      valueSale: '0',
      totalReceived: 0
    }
  }
  postSale() {
    this.sale.code = String(new Date().getTime())
    return this.http.post(`${environment.URL_API}sale`, this.sale)
      .pipe(
        tap((response: any) => {
          console.log({ re: response })
          this.salesReceipt = {
            client: this.selectedStudentSale.full_name,
            codeSale: response.code,
            dateSale: new Date(),
            itens: this.sale.itens,
            received: this.sale.received,
            valueSale: String(this.sale.amount),
            totalReceived: this.sale.totalReceived
          }
        }
        ),
      )
  }
}
