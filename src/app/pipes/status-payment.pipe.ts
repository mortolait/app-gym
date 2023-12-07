import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPayment'
})
export class StatusPaymentPipe implements PipeTransform {

  transform(value: string): string {
    if (value == 'PAID') {
      return 'Pago'
    }
    else if (value == 'PARTIALLY_PAID') {
      return 'Parcialmente pago'
    } else if (value == 'PENDING') {
      return 'Pendente'
    }else{
      return ''
    }
  }

}
