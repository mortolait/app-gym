import { Component } from '@angular/core';
import { SaleService } from '../sale.service';
import { StudentService } from '../../student/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-receipt-payment',
  templateUrl: './receipt-payment.component.html',
  styleUrls: ['./receipt-payment.component.scss']
})
export class ReceiptPaymentComponent {
  public idParams!: string
  public selectedStudent!: any
  public valueMoney!: number
  public visible: Boolean = false
  public date: Date = new Date()

  constructor(private router: Router, public saleService: SaleService, public studentService: StudentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idParams = this.activatedRoute.snapshot.params?.['id'];
    this.saleService.sale.idClient = this.idParams
    if (this.saleService.sale.itens.length == 0) {
      this.saleService.processSale[0].actived = true
      this.saleService.processSale[1].actived = false
      this.router.navigate([`sale/${this.idParams}`])
    }
    this.studentService.getStudentById(this.idParams).subscribe({
      next: (res: any) => {
        this.selectedStudent = res['student']
      }
    })
    this.valueMoney = this.saleService.sale.amount - this.saleService.sale.totalDiscount
    this.saleService.processSale[0].actived = false
    this.saleService.processSale[1].actived = true

  }
  backSale() {
    this.saleService.sale.received = []
    this.saleService.sale.totalReceived = 0
    this.saleService.processSale[0].actived = false
    this.saleService.processSale[1].actived = true
    history.back()
  }
  cancelSale() {
    this.saleService.sale.amount = 0
    this.saleService.sale.totalDiscount = 0
    this.saleService.sale.idClient = ""
    this.saleService.sale.itens = []
    this.router.navigate([`sale/${this.idParams}`])
  }
  removePayment(item: any) {
    this.saleService.sale.received.splice(this.saleService.sale.received.indexOf(item), 1)
    this.calcTotalReceived()

  }
  calcTotalReceived() {
    this.saleService.sale.totalReceived = this.saleService.sale.received.reduce((total, item: any) => {
      return total + parseFloat(item.value)
    }, 0)
    this.valueMoney = (this.saleService.sale.amount - this.saleService.sale.totalDiscount) - this.saleService.sale.totalReceived

  }
  addPaymentPaperMoney(f: NgForm) {
    const index = this.saleService.sale.received.findIndex(item => item.type === "paper_Money");

    if (index >= 0) {
      this.saleService.sale.received[index].value = f.value.paymentPaper + this.saleService.sale.received[index].value;
    } else {
      this.saleService.sale.received.push({
        type: "paper_Money",
        value: f.value.paymentPaper
      });
    }
    this.calcTotalReceived()
  }

  addPaymentPixMoney(f: NgForm) {
    const index = this.saleService.sale.received.findIndex(item => item.type === "pix_Money");
    if (index >= 0) {
      this.saleService.sale.received[index].value = f.value.paymentPix;
    } else {
      this.saleService.sale.received.push({
        type: "pix_Money",
        value: f.value.paymentPix
      });
    }
    this.calcTotalReceived()
  }
  closeModal() {
    this.visible = false
  }
  finishSale() {
    if ((this.saleService.sale.amount - this.saleService.sale.totalDiscount) - this.saleService.sale.totalReceived > 0) {
      this.visible = true
      return
    }
    this.saleService.postSale().subscribe({
      next: response => {
        if (response == null) {
          alert('Algo deu errado')
          return
        }
        this.router.navigate([`sale/payment-voucher/${this.idParams}`])
      }
    })
  }
  confirmOutstandingBalance() {
    this.saleService.sale.hasOutstandingBalance = true
    this.saleService.sale.valueOutstandingBalance = (this.saleService.sale.amount - this.saleService.sale.totalDiscount) - this.saleService.sale.totalReceived
    this.saleService.sale.datePaymentOutstandingBalance = this.date
    
    this.saleService.postSale().subscribe({
      next: response => {
        if (response == null) {
          alert('Algo deu errado')
          
          return
        }
        this.router.navigate([`sale/payment-voucher/${this.idParams}`])
      }
   })
  }

}
