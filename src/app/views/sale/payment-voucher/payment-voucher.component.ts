import { Component, ElementRef, ViewChild } from '@angular/core';
import { SaleService } from '../sale.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-voucher',
  templateUrl: './payment-voucher.component.html',
  styleUrls: ['./payment-voucher.component.scss']
})
export class PaymentVoucherComponent {
  contractSale!: any
  idParams!: string

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public saleService: SaleService) { }

  ngOnInit() {
    this.idParams = this.activatedRoute.snapshot.params?.['id'];
    this.saleService.processSale[0].actived = false
    this.saleService.processSale[1].actived = false
    this.saleService.processSale[2].actived = true
    this.contractSale = this.saleService.salesReceipt.itens.find(i => i.type == 'contract')
    
    setTimeout(()=>{
      this.saleService.visibleAlert = true
    },1000)
    setTimeout(()=>{
      this.saleService.visibleAlert = false
    },5000)
  }
  printReceipt() {
    let printContents = document.querySelector('.receipt_payment')?.innerHTML;

    let styles = `
    
      <style>
      body{
        font-style: italic;
        font-family: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
        display: flex;
        flex-direction: column;
      }
        .receipt_payment {
            font-style: italic;
        }
        .receipt_payment .header_receipt {
            
        }
        .receipt_payment div {
            width: 300px;
            display: flex;
            gap: 10px;
            margin-bottom: 1rem;
        }
      </style>
    `;

    if (printContents) {
      let printFrame = document.createElement('iframe');
      printFrame.style.position = 'absolute';
      printFrame.style.top = '-1000px';
      document.body.appendChild(printFrame);

      printFrame.contentDocument?.open();
      printFrame.contentDocument?.write(`<html><head><title>Print</title>${styles}</head><body>${printContents}</body></html>`);
      printFrame.contentDocument?.close();

      printFrame.contentWindow?.focus();
      printFrame.contentWindow?.print();

      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 100);
    }
  }
  goProfile() {
    this.router.navigate([`student/${this.idParams}`])
  }
  newSale() {
    this.saleService.resetSale()
    this.router.navigate([`sale/${this.idParams}`])
  }
  printContract() {
    console.log("teste")
  }
  toSign() {
    console.log("teste")
  }

  ngOnDestroy() {
    this.saleService.sale = {
      amount: 0,
      idClient: '',
      code: '',
      itens: [],
      totalDiscount: 0,
      received: [],
      totalReceived: 0,
      hasOutstandingBalance: false,
      valueOutstandingBalance: 0,
      datePaymentOutstandingBalance: new Date()
    }
    this.saleService.processSale[0].actived = true
    this.saleService.processSale[2].actived = false
  }
}
