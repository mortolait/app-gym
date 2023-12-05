import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusStudentContract'
})
export class StatusStudentContractPipe implements PipeTransform {

  transform(value: string): string {
    if (value == 'contract_active') {
      return 'Contrato ativo'
    } else if (value == 'contract_inactive') {
      return 'Contrato inativo'
    }else if(value == 'contract_to_expire'){
      return 'Contrato para expirar'
    }
    else {
      return ''
    }
  }

}
