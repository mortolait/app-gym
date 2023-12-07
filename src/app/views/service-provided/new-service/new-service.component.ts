import { Component } from '@angular/core';
import { ServiceProvided } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showStateTrigger } from 'src/app/animations';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss'],
  animations: [showStateTrigger]
})
export class NewServiceComponent {

  constructor(private formBuilder: FormBuilder, public serviceProvided: ServiceProvided){}

  formGroup!: FormGroup

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      title: ['',[Validators.required]],
      code: ['',[Validators.required]],
      amount: ['',[Validators.required]],
      description: [''],
      active: [true,[Validators.required]]
    })
  }

  register(){
    this.serviceProvided.create(this.formGroup.value).subscribe({
      next: (response) => {
        this.serviceProvided.visible = true
        setTimeout(()=>{
          this.serviceProvided.visible = false
        },3000)
      }
    })
  }
}
