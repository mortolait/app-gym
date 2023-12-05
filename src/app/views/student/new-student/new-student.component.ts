import { StudentService } from '../student.service';
import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {

  formGroup!: FormGroup;
  customStylesValidated = false;
  position = 'top-end';
  visible = false;
  percentage = 0;
  formNotSubmitted = true;
  id! : string;

  @Input() sidebarId: string = "sidebar1";

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private router: Router, private renderer: Renderer2,
    private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.verifyEmail('')
    
    this.formGroup = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      dob: [''],
      sex: [null],
      phone: ['', [Validators.required]],
      email: ['',[Validators.required]],
      emergencyContact: ['',],
      medicalHistory: [''],
      medications: [''],
      exerciseRestrictions: [''],
      plan: [''],
      interests: [''],
      goals: [''],
      referral: [''],
      how_arrived: [''],
      type: ['lead'], 
    });
    
  }

    verifyEmail(email: string) {
    return  this.studentService.checkmailAvailability(email).subscribe(
      next => {
        return next
      },
    )   
  }
  onSubmit() {
    this.customStylesValidated = true;
    if (this.formGroup.valid) {
      this.studentService.registerStudent(this.formGroup.value).subscribe(
        (res: any) => {
          const { studentRegister } = res
          this.id = studentRegister.id
          this.formNotSubmitted = false;
          this.toggleToast();
        },
        (err) => {
          console.log(err);
          if(err.status == '409'){
            alert('Email já está em uso')
          }
        }
      );
    }
    else {
      console.log("Formulário inválido");
    }
  }

  goBack() {
    history.back();
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

  ngAfterViewInit(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
  }
  backForm(){
    this.formNotSubmitted = true;
    this.customStylesValidated = false;
    this.formGroup.reset({type:'lead'});
   
  }   
  convert(){
    this.formGroup.value.type = 'client'
    this.studentService.updateStudent(this.id,this.formGroup.value).subscribe(
      (res:any) => {
        this.backForm()
        this.router.navigate([`/student/${this.id}`])
      }
    )
  }

}
