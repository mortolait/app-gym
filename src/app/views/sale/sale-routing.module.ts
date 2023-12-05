import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleComponent } from "./sale.component"
import { NewSaleComponent } from './new-sale/new-sale.component';
import { ReceiptPaymentComponent } from './receipt-payment/receipt-payment.component';
import { PaymentVoucherComponent } from './payment-voucher/payment-voucher.component';
const routes: Routes = [
  {
    path: "",
    component: SaleComponent,

    children:[
      {
        path: "payment-voucher/:id",
        component: PaymentVoucherComponent
      },
      {
        path:":id",
        component: NewSaleComponent
      },
      {
        path: "receipt/payment/:id",
        component: ReceiptPaymentComponent
      },
     
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
