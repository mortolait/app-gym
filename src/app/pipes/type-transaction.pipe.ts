import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeTransaction'
})
export class TypeTransactionPipe implements PipeTransform {

  transform(value: string): string {
    if(value == 'open_cashRegister'){
      return 'Abertura de caixa';
    }else if(value == 'sale'){
      return 'Venda'
    }else if(value == 'withdrawals'){
      return 'Retirada'
    }
    return '';
  }

}
