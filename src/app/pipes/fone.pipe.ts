import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fone'
})
export class FonePipe implements PipeTransform {

  transform(phone: string): string {
    if (!phone) {
      return '';
    }
    
    // Formatação para números de telefone de 11 dígitos
    if (phone.length === 11) {
      return `(${phone.substr(0, 2)}) ${phone.substr(2, 5)}-${phone.substr(7, 4)}`;
    }

    // Retorne o número sem formatação se não tiver 11 dígitos
    return phone;
  }

}
