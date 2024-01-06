import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterRoutingModule } from './cash-register-routing.module';
import { CashRegisterComponent } from './cash-register.component';
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
  SharedModule as SharedModuleC,
  PopoverModule 
} from '@coreui/angular-pro';

@NgModule({
  declarations: [
    CashRegisterComponent
  ],
  imports: [
    CommonModule,
    CashRegisterRoutingModule,
    SharedModule,
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
    SharedModuleC,
    PopoverModule
  ]
})
export class CashRegisterModule { }
