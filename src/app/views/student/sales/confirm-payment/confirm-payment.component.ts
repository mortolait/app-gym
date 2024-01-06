import { Component, Input } from '@angular/core';
import { StudentService } from '../../student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss']
})
export class ConfirmPaymentComponent {

  constructor(private studentService:StudentService, private activatedRoute: ActivatedRoute){}
  @Input()
  visible: Boolean = false
  isPaymentSend: Boolean = false
  paymentForm: string = 'paper_Money'

  changeVisible($event: any){
    this.visible = $event
  }
  closeModal(){
    this.visible = false
  }
  paymentSale() {
    console.log({ p: this.paymentForm})
    this.studentService.paySale(this.paymentForm).subscribe({
      next: (response: any) => {
        console.log({ response });
        this.isPaymentSend = true;
  
        if (response) {
          setTimeout(() => {
            this.visible = false;
            this.isPaymentSend = false;
            // const updatedSales = this.studentService.salesById.map(sale => {
            //   if (sale.id === response.updatedSale.id) {
            //     return {
            //       ...sale,
            //       valueOutstandingBalance: 0,
            //       statusPayment: 'PAID',
            //       total_received: sale.total_amount,
            //       outstandingBalance: 0
            //     };
            //   }
            //   return sale;
            // });
  
            // this.studentService.salesById = updatedSales;
            // console.log({ sales: this.studentService.salesById });
            const id = this.activatedRoute.snapshot.params?.['id'];
            this.studentService.getSalesById(id).subscribe({
              next: (response: any) => {
                const { sales } = response
                this.studentService.salesById = sales
              }
            })
          }, 3000);
        }
      }
    });
  }
  
}
