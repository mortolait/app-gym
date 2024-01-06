import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent {
  constructor(public studentService:StudentService, private activatedRoute:ActivatedRoute){}
  idStudent!:string
  columns=[
    {
      label:'Descrição',
      key: 'description',
      _style: { width: '20%' }
    },
    {
      label:'Inicio',
      key: 'start_date',
      _style: { width: '20%' }
    },
    {
      label:'Fim',
      key: 'end_date',
      _style: { width: '20%' }
    },
    {
      label:'Valor',
      key: 'value',
      _style: { width: '20%' }
    },
    {
      label:'Status',
      key: 'status',
      _style: { width: '20%' }
    },
  ]

  ngOnInit(){
    this.idStudent = this.activatedRoute.snapshot.params?.['id'];
    this.studentService.getSalesById(this.idStudent).subscribe()
  }
  toggleDetails($event:any){

  }
  getBadge(status: string) {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'danger'
      case 'queue':
        return 'warning'
      default:
        return 'primary'
    }
  }
}
