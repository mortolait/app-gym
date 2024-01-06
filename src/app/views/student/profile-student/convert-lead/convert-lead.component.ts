import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-convert-lead',
  templateUrl: './convert-lead.component.html',
  styleUrls: ['./convert-lead.component.scss']
})
export class ConvertLeadComponent {
  isClient:boolean = false
  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService,private router: Router){}

  @Input()
  visible:boolean = false

  closeModal(){}

  changeVisible($event: Event){
    console.log({ $event })
  }
  convertToLead(){
    const idStudent = this.activatedRoute.snapshot.params?.['id'];
    console.log({ idStudent })
    this.studentService.profileStudent.type = 'client'
    console.log(this.studentService.profileStudent)
    this.studentService.convertLead(idStudent).subscribe(
      (res:any) => {
        this.isClient = true
        setTimeout(()=>{
          console.log({ res })
          this.visible = false
          this.isClient = false
          this.router.navigate([`/sale/${idStudent}`])
        },3000)
      }
    )
  }
}
