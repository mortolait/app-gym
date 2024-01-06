import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss']
})
export class PaymentCardComponent {

  @Input()
  value!:number

  @Input()
  icon!:string

  @Input()
  form!:string
  
  @Input()
  color!:string

  @Input() 
  customStyleCard: any;

  @Input() 
  firstSpanStyle: any;
}
