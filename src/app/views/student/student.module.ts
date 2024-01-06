
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusPaymentPipe } from '../../pipes/status-payment.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
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
  SharedModule as SharedModuleC
} from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NewStudentComponent } from './new-student/new-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SalesComponent } from './sales/sales.component';
import { ProfileSalesComponent } from './profile-sales/profile-sales.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ConvertLeadComponent } from './profile-student/convert-lead/convert-lead.component';
import { ConfirmPaymentComponent } from './sales/confirm-payment/confirm-payment.component';



@NgModule({
  declarations: [ StudentComponent,NewStudentComponent,ListStudentComponent,ProfileStudentComponent, SalesComponent,StatusPaymentPipe, ProfileSalesComponent, ContractsComponent, ConvertLeadComponent, ConfirmPaymentComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SmartTableModule,
    StudentRoutingModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    ProgressModule,
    GridModule,
    ListGroupModule,
    MultiSelectModule,
    SharedModule,
    DatePickerModule,
    DateRangePickerModule,
    TimePickerModule,
    CommonModule,
    ToastModule,
    SidebarModule,
    GridModule,
    CardModule,
    CollapseModule,
    TableModule,
    UtilitiesModule,
    BadgeModule,
    IconModule,
    ButtonModule,
    AlertModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AvatarModule,
    NavModule,
    TabsModule,
    ModalModule,
    SharedModuleC
  ],

  exports: [
    NewStudentComponent,StatusPaymentPipe
  ],
  providers: [
    provideNgxMask()
  ],
})
export class StudentModule {}
