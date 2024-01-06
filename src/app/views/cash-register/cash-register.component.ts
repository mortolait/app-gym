import { Component } from '@angular/core';
import { ServiceShared } from 'src/app/shared/service.service';
import { Service } from './service.service'
import { CashRegister } from "./cash-register"
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.scss']
})
export class CashRegisterComponent {
  iconCard: string = 'cilDollar'
  titleCard: string = 'Dinheiro'
  color: string = 'light'
  value: number = 45
  infoCashDetails!: any
  dataFilter: Date = new Date()
  typeCash: 'all' | 'open' | 'close' = 'all'
  visibleListChash = false;
  cashRegisters: CashRegister[] = []
  visiblec:boolean = false
  columnsTransactionRegister = [
    {
      key: 'name',
      _style: { width: '10%' },
      _props: { class: 'fw-bold' },
      label: 'Nome ',
      filter: false,
      sorter: false,
    },
    {
      key: 'date_at',
      _style: { width: '10%' },
      _props: { class: 'fw-bold' },
      label: 'Abertura ',
      filter: false,
      sorter: false,
    },
    {
      key: 'paymentForm',
      _style: { width: '10%' },
      _props: { class: 'fw-bold' },
      label: 'Forma de pagamento ',
      filter: false,
      sorter: false,
    },
    {
      key: 'type',
      _style: { width: '10%' },
      _props: { class: 'fw-bold' },
      label: 'Tipo',
      filter: false,
      sorter: false,
    },
    {
      key: 'value',
      _style: { width: '10%' },
      _props: { class: 'fw-bold' },
      label: 'Valor',
      filter: false,
      sorter: false,
    },
  ]
  public visible = false;
  visibleOptions = false;
  selectedCashRegister!: any
  isCashRegisterClose: boolean = false
  isCreatedTransaction: boolean = false
  isBalanceGreaterThanWithdrawalAmount: boolean = false
  isValueIqualsZero:Boolean = false

  constructor(private service: ServiceShared, public serviceCash: Service) { }

  ngOnInit() {
    console.log(this.serviceCash.cashRegisters)
  }
  openModalCash() {
    this.service.modalCashVisible = true
  }
  getInformationAboutCash() {
    this.serviceCash.getCash({ date: this.dataFilter, type: this.typeCash }).subscribe({
      next: (response: any) => {
        this.infoCashDetails = response.cashRegisterInformations
        console.log({ i: this.infoCashDetails })
        this.cashRegisters = this.infoCashDetails.cashRegisterToday
        this.cashRegisters.forEach(x => {
          x.name = x.user.name
        })
        console.log({ cashRegisters: this.cashRegisters })
      }
    })
  }

  getInfoCashDate($event: any) {
    console.log({ date: $event, type: this.typeCash })
    this.dataFilter = $event
    this.serviceCash.getCash({ date: $event, type: this.typeCash }).subscribe({
      next: (response: any) => {
        this.infoCashDetails = response.cashRegisterInformations
      }
    })
  }
  getInfoCash() {
    console.log({ date: this.dataFilter, type: this.typeCash })
    this.serviceCash.getCash({ date: this.dataFilter, type: this.typeCash }).subscribe({
      next: (response: any) => {
        this.infoCashDetails = response.cashRegisterInformations
      }
    })
  }

  details_visible = Object.create({});

  showInfo(cash: any) {
    console.log({ cash })
    this.details_visible[cash.id] = !this.details_visible[cash.id];
  }
  toggleDetails($event: Event, item: any) {
    $event?.stopPropagation();
    this.details_visible[item] = !this.details_visible[item];
  }
  openListMenuCashRegister($event: any): void {
    $event.stopPropagation()
    this.visibleListChash = !this.visibleListChash;
  }
  closeCashRegister() {
    this.serviceCash.closeCashRegister(this.selectedCashRegister.id).subscribe({
      next: response => {
        console.log({ response })
        if (response) {
          this.isCashRegisterClose = true
          setTimeout(() => {
            this.visible = false
            this.isCashRegisterClose = false
            this.getInfoCash()
          }, 3500)
        }
      }
    })
  }
  closeCashRegisterModal($event: Event) {
    $event.stopPropagation()
    this.visible = !this.visible;
  }
  closeCashRegisterButton($event: Event, item: any) {
    $event.stopPropagation()
    console.log({ item })
    this.selectedCashRegister = item
    this.visible = !this.visible;
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  registerTransaction(f: NgForm) {
    const cashRegisterOpen = this.infoCashDetails.cashRegisters.find((x: any) => x.status == 'open')
    this.isBalanceGreaterThanWithdrawalAmount = cashRegisterOpen.final_balance < f.control.value.value
    this.isValueIqualsZero = f.control.value.value == 0

    if (cashRegisterOpen && !this.isBalanceGreaterThanWithdrawalAmount && !this.isValueIqualsZero) {
      this.service.createCashTransaction({
        paymentForm: 'paper_Money',
        type: 'withdrawals',
        value: f.control.value.value * -1,
        description: f.control.value.description,
        name: cashRegisterOpen?.user?.name,
        date_at: new Date(),
        cashRegister: cashRegisterOpen.id
      }).subscribe({
        next: response => {
          this.isCreatedTransaction = true
          setTimeout(()=>{
            this.visibleOptions = false
            this.isCreatedTransaction = false
          },3500)
        }
      })
    }

  }
  showModalOptions() {
    this.visibleOptions = true
  }
  closeModalTransactions() {
    this.visibleOptions = !this.visibleOptions
  }

  handleModalTransaction($event: any) {
    this.visibleOptions = $event;
  }
  handleValue($event:any){
    console.log($event)
    console.log("teste")
  }
}
