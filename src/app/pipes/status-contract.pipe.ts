import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusContract'
})
export class StatusContractPipe implements PipeTransform {

  transform(value: string, ): string {
    if(value == 'active'){
      return 'Ativo'
    }else if (value == 'inactive'){
      return 'Inativo'
    }else if (value == 'queue'){
      return 'Na fila'
    }else{
      return '-'
    }

  }

}
