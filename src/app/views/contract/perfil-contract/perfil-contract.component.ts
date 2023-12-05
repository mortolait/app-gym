import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-perfil-contract',
  templateUrl: './perfil-contract.component.html',
  styleUrls: ['./perfil-contract.component.scss']
})
export class PerfilContractComponent {
  formGroup!: FormGroup

  constructor(private formBuilder: FormBuilder, public contractService: ContractService){}

  ngOnInit(){
   
  }
  update(){
    this.contractService.updateContractById(this.contractService.contract).subscribe({
      next: (response)=>{
        this.contractService.visible = true
        setTimeout(()=>{
          this.contractService.visible = false
        },3000)
      },
      error: (err)=>{
        if(err.status == 409){
          console.log("teste")
        }
      }
    })
  }
}
