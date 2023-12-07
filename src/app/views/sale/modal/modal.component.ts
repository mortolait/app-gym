import { Component } from '@angular/core';
import { SaleService } from "../sale.service"
import { Student } from '../../student/student';
import { Router } from '@angular/router';
import { filterTrigger } from 'src/app/animations';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, filter, switchMap } from 'rxjs';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations:[filterTrigger]
})
export class ModalComponent {
  valueSearched = new FormControl()
  isInputFocused:Boolean = false
  constructor(public saleService:SaleService, private router: Router){}

  studentSearchead$ = this.valueSearched.valueChanges
  .pipe(
    debounceTime(300),
    filter((value: string) => value.length >= 3),
    switchMap((value: string) => this.saleService.getStudentByPartName(value))
  )
  openSale(item:any){
    this.saleService.visible = false
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = "reload"
    this.router.navigate([`/sale/${item.id}`])

  }

  InputFocused(){
    setTimeout(()=>{
      this.isInputFocused = !this.isInputFocused
    },1000)
  }
}
