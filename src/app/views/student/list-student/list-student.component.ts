import { Component, OnInit } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';



import { StudentService } from '../student.service';
import { Student } from '../student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  position = 'top-end';
  visible = false;
  percentage = 0;
  columns = [
    {
      key: 'full_name',
      _style: { width: '30%' },
      _props: {  class: 'fw-bold' },
      label: 'Nome Completo'
    },
    {
      key: 'email',
      _style: { width: '30%' },
      _props: {  class: 'fw-bold' },
      label: 'Email'
    },
    {
      key: 'phone',
      _style: { width: '20%' },
      _props: {  class: 'fw-bold' },
      label: 'Telefone'
    },

    {
      key: 'statusContract',
      _style: { width: '10%' },
      _props: { class: 'fw-bold' },
      label: 'Status'
    },
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false,
    },
  ];
  constructor(public service:StudentService,public iconSet: IconSetService, private router: Router) {

  }

  ngOnInit() {
    this.getStudents();
  }
  getItem(item: any) {
    return Object.keys(item);
  }
  details_visible = Object.create({});

  showInfo(event: any){
    console.log(event.item.id);
    this.details_visible[event.item.id] = !this.details_visible[event.item.id];
  }
  toggleDetails(item: any) {
    event?.stopPropagation();
    this.details_visible[item] = !this.details_visible[item];
  }
  getBadge(status: string) {
    switch (status) {
      case 'contract_active':
        return 'success'
      case 'contract_inactive':
        return 'danger'
      case 'contract_to_expire':
        return 'warning'
      default:
        return ''
    }
  }
  getStudents(){
    this.service.getAllstudents().subscribe(
      (res:any) => {
        const { students } = res;
        this.service.students = students;

        this.service.leads = this.service.students.filter((student:any) => student.type === 'lead');
        this.service.clients = this.service.students.filter((student:any) => student.type === 'client');
      }
    )
  }

  deleteStudent(entity:string,id:string){
    console.log(entity,id);
    this.service.deleteStudent(id).subscribe(
      (res:any) => {
        this.toggleToast();
        if(entity === 'clients'){
          this.service.clients = this.service.clients.filter((student:any) => student.id !== id);
        }
        else if(entity === 'leads'){
          this.service.leads = this.service.leads.filter((student:any) => student.id !== id);
        }
        else{
          this.service.students = this.service.students.filter((student:any) => student.id !== id);
        }
      }
    )
  }

  perfilStudent(id:string){
    console.log({ id })
    this.router.navigate(['/student',id])
  }
  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 100;
  }
}
