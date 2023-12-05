import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from "./product"
import { Observable } from 'rxjs';
import { cilCheckCircle, cilPlus, cilCircle,cilXCircle } from '@coreui/icons';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  visible:Boolean = false
  products: Product[] = []
  selectedProduct!: Product
  color!: string
  message!: string
  iconAlert:any = {cilCheckCircle, cilXCircle}
  constructor(private http: HttpClient ) { }

  registerProduct(product: Product){
    return this.http.post(`${environment.URL_API}product`,product)
  }

  updateProduct(product: Product){
    const { id } = product
    return this.http.put(`${environment.URL_API}product/${id}`,product)
  }
  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.URL_API}products`)
  }

}
