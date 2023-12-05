import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formPayment'
})
export class FormPaymentPipe implements PipeTransform {

  transform(form: string): string {
    if(form == 'paper_Money'){
      return 'Dinheiro'
    }
    else if (form == 'pix_Money'){
      return 'Pix'
    }
    return '';
  }

}
