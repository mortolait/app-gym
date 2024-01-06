import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { FormsModule } from '@angular/forms';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  MultiSelectModule,
  DatePickerModule,
  DateRangePickerModule,
  TimePickerModule,
  SmartTableModule,
  AlertModule,
  BadgeModule,
  UtilitiesModule,
  TableModule,
  CollapseModule,
  ToastModule,
  ProgressModule,
  SidebarModule,
  AvatarModule,
  NavModule,
  TabsModule,
  ModalModule,
  SpinnerModule 
} from '@coreui/angular-pro';

import { IconModule } from '@coreui/icons-angular';

import { ModalComponent } from "../views/sale/modal/modal.component"
import { FormPaymentPipe } from "../pipes/form-payment.pipe"
import { TypeTransactionPipe } from "../pipes/type-transaction.pipe"
import { StatusContractPipe } from "../pipes/status-contract.pipe"
import { StatusStudentContractPipe } from '../pipes/status-student-contract.pipe';
import { FonePipe } from '../pipes/fone.pipe';
import { PaymentCardComponent } from './components/payment-card/payment-card.component';
import { ModalOpenCashRegisterComponent } from './components/modal-open-cash-register/modal-open-cash-register.component';

@NgModule({
  declarations: [
    ModalComponent,
    FormPaymentPipe,
    TypeTransactionPipe,
    StatusContractPipe,
    StatusStudentContractPipe,
    FonePipe,
    PaymentCardComponent,
    ModalOpenCashRegisterComponent
  ],
  imports: [
    CommonModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    MultiSelectModule,
    DatePickerModule,
    DateRangePickerModule,
    TimePickerModule,
    SmartTableModule,
    AlertModule,
    BadgeModule,
    UtilitiesModule,
    TableModule,
    CollapseModule,
    ToastModule,
    ProgressModule,
    SidebarModule,
    AvatarModule,
    NavModule,
    TabsModule,
    ReactiveFormsModule,
    IconModule,
    NgxCurrencyModule,
    ModalModule,
    FormsModule,
    SpinnerModule
  ],
  exports:[
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  MultiSelectModule,
  DatePickerModule,
  DateRangePickerModule,
  TimePickerModule,
  SmartTableModule,
  AlertModule,
  BadgeModule,
  UtilitiesModule,
  TableModule,
  CollapseModule,
  ToastModule,
  ProgressModule,
  SidebarModule,
  AvatarModule,
  NavModule,
  TabsModule,
  ReactiveFormsModule,
  IconModule,
  NgxCurrencyModule,
  ModalModule,
  ModalComponent,
  FormsModule,
  FormPaymentPipe,
  StatusContractPipe,
  StatusStudentContractPipe,
  FonePipe,
  SpinnerModule,
  PaymentCardComponent,
  ModalOpenCashRegisterComponent,
  TypeTransactionPipe,
  ]
})
export class SharedModule { }
