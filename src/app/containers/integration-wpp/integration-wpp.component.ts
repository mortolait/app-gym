import { Component } from '@angular/core';
import { ServiceService } from '../default-layout/default-header/service.service'
import { ServiceShared } from "../../shared/service.service"
import { ChangeDetectorRef } from '@angular/core';
import { error } from 'console';

@Component({
  selector: 'app-integration-wpp',
  templateUrl: './integration-wpp.component.html',
  styleUrls: ['./integration-wpp.component.scss']
})
export class IntegrationWppComponent {
  qrcodeWpp: string = ''
  isConnected!: boolean
  loadingQr: boolean = false
  loadingLogout: boolean = false
  constructor(private cdRef: ChangeDetectorRef, public sharedService: ServiceShared) { }

  handleLiveDemoChange($event: any) {
    this.verifyConnection()
  }

  ngOnInit(): void {
    // this.service.visible = true
    this.getTokenWpp()
    this.verifyConnection()
    
  }

  getTokenWpp() {
    const hasToken = this.sharedService.hasToken()
    console.log({ hasToken })
    if (!hasToken) {
      this.sharedService.getTokenWpp().subscribe({
        next: (response: any) => {
          console.log({ token: response})
          localStorage.setItem('tokenwpp', response.token)
        }
      })
    }
  }
  onImageLoad(){
      console.log("imagem carregada")
  }
  showQr(){
    const qr = this.qrcodeWpp
    this.qrcodeWpp = ''
    this.qrcodeWpp = qr
  }
  getQrcode() {
    this.qrcodeWpp = ''
    this.loadingQr = true
    this.sharedService.getQrCode().subscribe({
      next: (response: any) => {
        this.loadingQr = false
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
      }
    })
  }
  closeModal(){
    this.sharedService.visible = false
  }
  disconnectWpp(){
    this.loadingLogout = true
    this.sharedService.disconnect().subscribe({
      next: (response:any)=>{
        this.loadingLogout = false
        this.isConnected = false
        
      },
      error: (error)=>{
        this.loadingLogout = false
        this.isConnected = false
      }
    })
  }
}
