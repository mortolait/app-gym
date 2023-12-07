import { Component } from '@angular/core';
import { ServiceService } from '../default-layout/default-header/service.service'
import { ServiceShared } from "../../shared/service.service"
@Component({
  selector: 'app-integration-wpp',
  templateUrl: './integration-wpp.component.html',
  styleUrls: ['./integration-wpp.component.scss']
})
export class IntegrationWppComponent {
  qrcodeWpp!: string
  isConnected!: boolean

  constructor(public service: ServiceService, private sharedService: ServiceShared) { }

  handleLiveDemoChange($event: any) {
    this.verifyConnection()
  }

  ngOnInit(): void {
    // this.service.visible = true
    this.verifyConnection()
  }

  getTokenWpp() {
    const hasToken = this.sharedService.hasToken()
    if (!hasToken) {
      this.sharedService.getTokenWpp().subscribe({
        next: (response: any) => {
       
          localStorage.setItem('tokenwpp', response.token)
        }
      })
    }
  }

  getQrcode() {
    this.sharedService.getQrCode().subscribe({
      next: (response: any) => {
        this.qrcodeWpp = response.qrcode
      }
    })

   const intervalId = setInterval(()=>{
      this.sharedService.verifySession().subscribe({
        next: (response:any) => {
          if(response.status == true){
            this.qrcodeWpp = ''
            this.isConnected = true
            clearInterval(intervalId)
            return
          }
        }
      })
    },5000)
  }

  verifyConnection() {
    this.sharedService.verifySession().subscribe({
      next: (response: any) => {
        this.isConnected = response.status
        console.log({t: this.isConnected})
      }
    })
  }
  closeModal(){
    this.service.visible = false
  }
}
