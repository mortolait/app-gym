import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { formButtonTrigger } from 'src/app/animations';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  animations: [formButtonTrigger]
})
export class SalesComponent {
  modalVisible:boolean = false

  columns = [
    {
      label:'Codigo',
      key: 'code',
      _style: { width: '15%' },
      filter: false,
      sorter: false,
    },
    {
      label:'Data da venda',
      key: 'create_at',
      _style: { width: '15%' },
      filter: false,
      sorter: false,
    },
    {
      label:'Desconto',
      key: 'valueDiscount',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      label:'Valor de venda',
      key: 'total_amount',
      _style: { width: '15%' },
      filter: false,
      sorter: false,
    },
    {
      label:'Valor recebido',
      key: 'total_received',
      _style: { width: '15%' },
      filter: false,
      sorter: false,
    },
    {
      label:'Valor a pagar',
      key: 'outstandingBalance',
      _style: { width: '15%' },
      filter: false,
      sorter: false,
    },
    {
      label:"Status",
      key: 'statusPayment',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      label:"",
      key: 'show',
      _style: { width: '15%' },
      filter: false,
      sorter: false,
    }
  ]

  constructor(public studentService:StudentService , private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    
  }
  getBadge(status: string) {
    switch (status) {
      case 'PAID':
        return 'success'
      case 'PENDING':
        return 'danger'
      case 'PARTIALLY_PAID':
        return 'warning'
      default:
        return 'primary'
    }
  }
  details_visible = Object.create({});

  toggleDetails(event: any) {
    this.details_visible[event.item.id] = !this.details_visible[event.item.id];
  }

  showSale(){
    
  }
  payAmountDue($event: Event, item:any){
    $event.stopPropagation()
    this.studentService.idSaleToPay = item.id
    this.studentService.valueSaleToPay = item.outstandingBalance
    this.modalVisible = !this.modalVisible
    // this.studentService.paySale(item.id,{value: item.outstandingBalance}).subscribe({
    //   next: response => {
    //     console.log({ response })
    //   }
    // })
  }
}
