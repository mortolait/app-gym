import { Component, Input } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { debounceTime, filter, switchMap } from 'rxjs';
import { filterTrigger } from 'src/app/animations';
import { SaleService } from 'src/app/views/sale/sale.service';
import { ServiceService } from './service.service';
import { ServiceShared } from 'src/app/shared/service.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
  animations:[filterTrigger]
})
export class DefaultHeaderComponent extends HeaderComponent {
  valueSearched = new FormControl()
  isInputFocused = false
  modalWpp: Boolean = false
  @Input() sidebarId: string = "sidebar1";

  studentSearchead$ = this.valueSearched.valueChanges
    .pipe(
      debounceTime(300),
      filter((value: string) => value.length > 3),
      switchMap((value: string) => this.saleService.getStudentByPartName(value))
    )
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });

  constructor(private sharedService: ServiceShared, private classToggler: ClassToggleService,private serviceHeader: ServiceService, private router: Router,private saleService:SaleService) {
    super();
  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  InputFocused(){
    setTimeout(()=>{
      this.isInputFocused = !this.isInputFocused
    },1000)
  }

  isStudentPage(): boolean {
    const studentListPattern = /^\/student\/list$/;
    const studentIdPattern = /^\/student\/[a-z0-9\-]+$/;
    if((studentListPattern.test(this.router.url) || studentIdPattern.test(this.router.url) && !this.router.url.includes('new'))){
      return true;
    }else{
      return false;
    }
  }
  isStudentListPage():boolean{
    const studentListPattern = /^\/student\/list$/;
    if(studentListPattern.test(this.router.url)){
      return true;
    }else{
      
      return false;
    }
  }
  isStudentNewPage():boolean{
    const studentNewPattern = /^\/student\/new$/;
    if(studentNewPattern.test(this.router.url)){
      return true;
    }else{
      return false;
    }
  }

  goBack(): void {
    history.back();
  }


  toNewStudent(){
    this.router.navigate(['/student/new']);
  }
  newSale(){
    this.saleService.visible = true
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  goProfileStudent(id:string){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = "reload"
    this.router.navigate([`/student/${id}`])
  }
  showModalWhats(){
    // this.sharedService.verifySession().subscribe({
    //   next: (response:any)=>{
    //     this.serviceHeader.visible = 
    //   }
    // })
    this.serviceHeader.visible = false
    setTimeout(()=>{
      this.serviceHeader.visible = true
    },100)
  }
}
