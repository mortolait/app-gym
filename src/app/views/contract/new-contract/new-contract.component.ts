import { Component } from '@angular/core';
import { ContractService } from '../contract.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showStateTrigger } from '../../../animations'
@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss'],
  animations:[showStateTrigger]
})
export class NewContractComponent {
  formGroup!: FormGroup;

  constructor(private contractService: ContractService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      installments: ['', Validators.required],
      code:['', Validators.required],
      active: [true, Validators.required]
    })

  }

  register(){
    this.contractService.registerContract(this.formGroup.value).subscribe(
      {
        next: (res)=>{
          this.contractService.contracts.push(res)
          this.contractService.visible = true
          setTimeout(()=>{
            this.contractService.visible = false
            this.formGroup.reset({ active: true })
          },3000)
        },
        error: (err)=>{
          console.error(err)
        } 
      }
    )
  }
}
