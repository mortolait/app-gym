import { Component } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-profile-sales',
  templateUrl: './profile-sales.component.html',
  styleUrls: ['./profile-sales.component.scss']
})
export class ProfileSalesComponent {
  columns = [
    {
      label:'Descrição',
      key: 'description',
      _style: { width: '25%' }
    },
    {
      label:'Lançamento',
      key: 'data',
      _style: { width: '25%' }
    },
    {
      label:'Disconto',
      key: 'valueDiscount',
      _style: { width: '25%' }
    },
    {
      label:'Valor',
      key: 'total_to_receive',
      _style: { width: '25%' }
    }
  ]

  columnsReceivedPayment = [
    {
      label:'Descrição',
      key: 'description',
      _style: { width: '25%' }
    },
    {
      label:'Lançamento',
      key: 'data',
      _style: { width: '25%' }
    },
    {
      label:'Valor',
      key: 'value',
      _style: { width: '25%' }
    }
  ]
  constructor(public studentService:StudentService){}
  
  ngOnInit(){
   
  }
  // ngOnDestroy(){
  //   console.log("teste")
  // }
}
