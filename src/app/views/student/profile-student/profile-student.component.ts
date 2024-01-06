import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import * as moment from 'moment';
import { Sale } from '../../sale/sale';
import { ServiceShared } from 'src/app/shared/service.service';
import { filterTrigger, formButtonTrigger } from 'src/app/animations';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss'],
  animations: [formButtonTrigger, filterTrigger]
})
export class ProfileStudentComponent {
  formGroup!: FormGroup;
  customStylesValidated = false;
  tabRelation: any;
  sales!: Sale[]
  position = 'top-end';
  visible = false;
  percentage = 0;
  formWpp: boolean = false;
  msgRes = '';
  contactsByClient = [];
  contactsByClientWpp = [];
  contactsByClientCall = [];
  contactsByClientEmail = [];
  formCall: Boolean = false;
  convertLead: Boolean = false;
  columns = [
    {
      key: 'full_name',
      _style: { width: '30%' },
      _props: { class: 'fw-bold' },
      label: 'Nome Completo'
    },
    {
      key: 'email',
      _style: { width: '30%' },
      _props: { class: 'fw-bold' },
      label: 'Email'
    },
    {
      key: 'phone',
      _style: { width: '20%' },
      _props: { class: 'fw-bold' },
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
  columnsContacts = [
    {
      key: 'createAt',
      _style: { width: '30%' },
      _props: { class: 'fw-bold' },
      label: 'Data'
    },
    {
      key: 'type',
      _style: { width: '30%' },
      _props: { class: 'fw-bold' },
      label: 'Tipo'
    },
    {
      key: 'subject',
      _style: { width: '30%' },
      _props: { class: 'fw-bold' },
      label: 'Assunto'
    },
    {
      key: 'content',
      _style: { width: '30%' },
      _props: { class: 'fw-bold' },
      label: 'Conteudo'
    },
  ]
  constructor(
    private formBuilder: FormBuilder,
    public studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: ServiceShared,

  ) { }

  idStudent!: string;

  ngOnInit(): void {

    this.studentService.profileSaleModal = false
    this.formGroup = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      dob: [''],
      sex: ['', [Validators.required]],
      address: [''],
      phone: ['', [Validators.required]],
      email: [''],
      emergencyContact: [''],
      medicalHistory: [''],
      medications: [''],
      exerciseRestrictions: [''],
      startDate: ['', [Validators.required]],
      interests: [''],
      goals: [''],
      referral: [''],
      type: [''],
      status: [''],
    });

    this.idStudent = this.activatedRoute.snapshot.params?.['id'];
    this.studentService.getStudentById(this.idStudent).subscribe({
      next: (res) => {
        const { student } = res as any;
        student.fullName = student.full_name
        student.medicalHistory = student.medical_history
        student.emergencyContact = student.emergency_contact
        student.exerciseRestrictions = student.exercise_restrictions
        student.startDate = moment.utc(new Date(student.start_date)).format('YYYY-MM-DD')
        student.paymentMethod = student.payment_method
        student.dob = moment.utc(new Date(student.date_of_birth)).format('YYYY-MM-DD')
        student.expirationDate = student.expiration_date
        student.type = student.type
        student.status = student.statusContract
        this.formGroup.patchValue(student);
      },
      error: (err) => {
        console.log('Error', err);
      }
    });
    this.getSales()
    this.getContacts(this.idStudent)

  }
  newSale() {
    this.router.navigate([`sale/${this.idStudent}`])
  }
  onSubmit() {
    this.studentService.updateStudent(this.idStudent, this.formGroup.value).subscribe({
      next: (res) => {
        this.msgRes = 'Aluno atualizado com sucesso!';
        this.toggleToast();
      },
      error: (err) => {
        if (err.status === 409) {
          this.msgRes = 'Email já cadastrado!';
        } else {
          this.msgRes = 'Erro ao atualizar aluno';
        }
        this.toggleToast();
      }
    });
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

  goBack() {
    history.back();
  }
  goRegister() {
    document.getElementById('menu_register')?.click();
  }
  capitalizeFirstLetter(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }
  getSales() {
    this.studentService.getSalesById(this.idStudent).subscribe({
      next: (response: any) => {
        const { sales } = response
        this.studentService.salesById = sales
      }
    })
  }
  sendMessageWpp(f: NgForm) {
    this.sharedService.sendMessageWpp({
      message: f.control.get('messageWpp')?.value,
      phone: `55${this.formGroup.get('phone')?.value}`,
      isGroup: false
    }).subscribe({
      next: response => {
        console.log({ response })
        this.studentService.registerNewContact({
          id_student: this.idStudent,
          content: f.control.get('messageWpp')?.value,
          type: 'whatsapp'
        }).subscribe({
          next: (response: any) => {
            this.getContacts(this.idStudent)
            this.sharedService.alertVisible = true
            this.sharedService.alertMessage = 'Mensagem enviada!'
            setTimeout(()=>{
          this.sharedService.alertVisible = false
          f.control.get('messageWpp')?.setValue('');
         },3000)
          }
        })
      },
      error: err => {
        console.log({ err })
        if (err.error.status == "Disconnected") {
          this.sharedService.text = 'Dispositivo não está conectado !<br /> Sincronize seu <span class="spanIntegration">Whatsapp</span>'
          this.sharedService.visible = false
          setTimeout(() => {
            this.sharedService.visible = true
          })
        }
      }
    });
  }
  registerCall(f: NgForm) {
    this.studentService.registerNewContact({
      id_student: this.idStudent,
      subject: f.control.get('subject')?.value,
      content: f.control.get('messageCall')?.value,
      type: 'call'
    }).subscribe({
      next: (response: any) => {
        console.log({ response })
        this.getContacts(this.idStudent)
        this.sharedService.alertVisible = true
        this.sharedService.alertMessage = 'Ligação registrada!'
         setTimeout(()=>{
          this.sharedService.alertVisible = false
          f.control.get('subject')?.setValue('');
          f.control.get('messageCall')?.setValue('');
         },3000)
      }
    })
  }
  getContacts(id: string) {
    this.studentService.getContactsById(id).subscribe({
      next: (response: any) => {
        console.log({ response })
        this.contactsByClient = response.contacts
        this.contactsByClientWpp = response.contacts.filter((x: any) => x.type == 'whatsapp')
        this.contactsByClientCall = response.contacts.filter((x: any) => x.type == 'call')
        this.contactsByClientEmail = response.contacts.filter((x: any) => x.type == 'email')
      }
    })
  }
  convert(){
    this.convertLead = !this.convertLead
  }
} 
