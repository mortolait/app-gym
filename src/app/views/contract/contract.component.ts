import { Component } from '@angular/core';
import { ContractService } from './contract.service';
import { cilCheckCircle,cilTrash,cilPlus} from '@coreui/icons';
import { Contract } from './contract';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent {
  constructor(private router: Router, public contractService: ContractService){}

  icons = { cilCheckCircle,cilTrash,cilPlus };

  ngOnInit(){
    
  }
  getAll(){
    this.contractService.getAll().subscribe({
      next: (response:any) =>{
        this.contractService.contracts = response.contracts
        console.log(this.contractService.contracts)
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }
  goPerfil(id: string){
    this.contractService.contract = this.contractService.contracts.find((x:Contract)=> x.id == id)
    console.log(this.contractService.contract)
    this.router.navigate(['contracts'])
  }
  goNewContract(){
    this.router.navigate(['contracts/new'])
  }
}
