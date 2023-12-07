import { StudentService } from './student.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  formGroup!: FormGroup;
  customStylesValidated = false;
  constructor(private formBuilder: FormBuilder, private studentService: StudentService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      // Informações Pessoais
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      dob: [''],
      sex: ['', [Validators.required]],

      // Contato
      address: [''],
      phone: ['', [Validators.required]],
      email: [''],
      emergencyContact: ['',],

      // Saúde
      medicalHistory: [''],
      medications: [''],
      exerciseRestrictions: [''],

      // Detalhes de Associação
      startDate: ['', [Validators.required]],
      plan: ['', [Validators.required]],
      interests: [''],

      // Dados Financeiros
      paymentMethod: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      // Outras Informações
      goals: [''],
      referral: ['']
    });
  }

  onSubmit() {
    this.customStylesValidated = true;
    if (this.formGroup.valid) {
      this.studentService.registerStudent(this.formGroup.value).subscribe(
        (res) => {

        }
      );
    }
    else {
      console.log("Formulário inválido");
    }
  }

}
