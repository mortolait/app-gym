import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent } from './sale.component';
import { SharedModule } from "../../shared/shared.module"
import { FormsModule } from '@angular/forms';
import { ReceiptPaymentComponent } from './receipt-payment/receipt-payment.component';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { PaymentVoucherComponent } from './payment-voucher/payment-voucher.component';
@NgModule({
  declarations: [
    SaleComponent,
    ReceiptPaymentComponent,
    NewSaleComponent,
    PaymentVoucherComponent,
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class SaleModule { }
