import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Student } from './student';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Sale } from '../sale/sale';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students: Student[] = [];
  clients: Student[] = [];
  leads: Student[] = [];
  profileStudent: Student = {} as Student;
  salesById!: Sale[]
  profileSaleModal: Boolean = false
  profileSale!: any
  itemsOfSale!: any
  paymentsOfSale: any = []
  contractsOfStudent: any = []
  qrcode!: string
  idSaleToPay!: String
  valueSaleToPay!: number

  constructor(private http: HttpClient) { }

  registerStudent(student: Student) {
    return this.http.post(`${environment.URL_API}students`, student);
  }
  getAllstudents() {
    return this.http.get(`${environment.URL_API}students`);
  }
  deleteStudent(id: string) {
    return this.http.delete(`${environment.URL_API}students/${id}`);
  }
  getStudentById(id: string) {
    return this.http.get(`${environment.URL_API}students/${id}`);
  }
  updateStudent(id: string, student: Student) {
    return this.http.put(`${environment.URL_API}students/${id}`, student);
  }
  checkmailAvailability(email: string) {
    return this.http.post(`${environment.URL_API}students/email`, { email: email })
  }
  convertLead(id: string) {
    return this.http.put(`${environment.URL_API}students/convert/${id}`, {});
  }
  getSalesById(id: string) {
    return this.http.get(`${environment.URL_API}sales/${id}`)
      .pipe(
        tap(
          (response)=>{
            const { sales } = response as any
            this.contractsOfStudent = this.buildArrayContractsBySale(sales)
          }
        )
      )
  }
  showProfileSale(item: any) {
    this.profileSale = item
    this.profileSaleModal = !this.profileSaleModal
    this.itemsOfSale = this.concatenateItems(this.profileSale)
    this.paymentsOfSale = this.concatenaPaymentForm(this.profileSale)
  }
  concatenaPaymentForm(data:any){
 
    let concatenatedItems: any = [];
    if(data.payments.length > 0){
      data.payments.forEach((p:any)=>{
        concatenatedItems.push({
          description: p.type,
          data: data.create_at,
          value: p.value
        })
      })
      
    }
    return concatenatedItems
  }
  concatenateItems(data: any) {
    let concatenatedItems: any = [];
    if (data.products && data.products.length > 0) {
      data.products.forEach((product: any) => {
        concatenatedItems.push({
          ...product,
          type: 'product',
          code: data.code,
          description: product.product.description,
          data: data.create_at,
          total_to_receive: product.value - product.valueDiscount
        });
      });
    }

    if (data.services && data.services.length > 0) {
      data.services.forEach((service: any) => {
        concatenatedItems.push({
          ...service,
          type: 'service',
          code: data.code,
          description: service.service.description,
          data: data.create_at,
          total_to_receive: service.value - service.valueDiscount

        });
      });
    }

    if (data.contracts && data.contracts.length > 0) {
      data.contracts.forEach((contract: any) => {
        concatenatedItems.push({
          ...contract,
          type: 'contract',
          code: data.code,
          description: contract.contract.description,
          data: data.create_at,
          total_to_receive: contract.value - contract.valueDiscount
        });
      });
    }

    return concatenatedItems;
  }
  getQrcode() {
    const url = `http://localhost:21465/api/NERDWHATS_AMERICA/start-session`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $2b$10$hRSS2JHMPV0mQfQF1v5W_u9Uuk10xrs7hMzGqSoxQCfLVsK_CJ4Ea'
    });

    const body = JSON.parse(JSON.stringify({
      webhook: '',
      waitQrCode: true
    }));

    return this.http.post(url, body, { headers: headers })
      .pipe(
        tap((response:any) => {
          this.qrcode = response.qrcode
        }),
      );
  }
  buildArrayContractsBySale(sales: any){
    let contractsByStudent:any = []
    if(sales.length > 0){
      sales.forEach((sale: any)=>{
        console.log({ sale })
        if(sale.contracts.length > 0){
          sale.contracts.forEach((c:any)=>{
            contractsByStudent.push({
              description: c.contract.description,
              start_date: c.startDate,
              end_date: c.endDate,
              value: c.value - c.valueDiscount,
              status: c.status
            })
          })
        }
      })
    }
    return contractsByStudent
  }
  registerNewContact(data:any){
    return this.http.post(`${environment.URL_API}student/new-contact`,data)
  }
  getContactsById(id: string){
    return this.http.get(`${environment.URL_API}student/contacts/${id}`)
  }
  paySale(paymentForm: string){
    return this.http.put(`${environment.URL_API}sale/${this.idSaleToPay}`,{value: this.valueSaleToPay, paymentForm })
  }
}
