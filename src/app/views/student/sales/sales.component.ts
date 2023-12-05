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
  teste:boolean = true
  columns = [
    {
      label:'Codigo',
      key: 'code',
      _style: { width: '15%' }
    },
    {
      label:'Data da venda',
      key: 'create_at',
      _style: { width: '20%' }
    },
    {
      label:'Desconto',
      key: 'valueDiscount',
      _style: { width: '15%' }
    },
    {
      label:'Valor de venda',
      key: 'total_amount',
      _style: { width: '20%' }
    },
    {
      label:'Valor recebido',
      key: 'total_received',
      _style: { width: '20%' }
    },
    {
      label:'Valor a pagar',
      key: 'total_amount',
      _style: { width: '20%' }
    },
    {
      label:"Status",
      key: 'statusPayment',
    },
    {
      label:"",
      key: 'show',
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
    console.log("oi")
  }
}
