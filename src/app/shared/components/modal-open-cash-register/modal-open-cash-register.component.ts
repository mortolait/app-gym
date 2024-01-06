import { Component } from '@angular/core';
import { ServiceShared } from '../../service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-open-cash-register',
  templateUrl: './modal-open-cash-register.component.html',
  styleUrls: ['./modal-open-cash-register.component.scss']
})
export class ModalOpenCashRegisterComponent {
  isFormSended: boolean = false
  messageResponse: string = ''
  constructor(public serviceShared: ServiceShared){}

  handleChangeVisible(event:any){
    if(this.serviceShared.modalCashVisible == true){
      this.serviceShared.modalCashVisible = event
    }
  }

  cancel(){
    this.serviceShared.modalCashVisible = false
  }
  openCashRegister(f:NgForm){
    console.log({ f: f.control.get('value')?.value })
    this.serviceShared.open(f.control.get('value')?.value?f.control.get('value')?.value:0).subscribe({
      next: (response:any) =>{
        console.log({ response })
        if(response.cashRegistered == null){
          this.messageResponse = 'Já existe caixa aberto!'
        }else{
          this.messageResponse = 'Caixa aberto !'
        }

        this.isFormSended = true
        setTimeout(()=>{
          this.isFormSended = false
          this.serviceShared.modalCashVisible = false
        },3000)
      }
    })
  }
}
