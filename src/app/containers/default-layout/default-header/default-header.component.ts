import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { SaleService } from 'src/app/views/sale/sale.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar1";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });

  constructor(private classToggler: ClassToggleService, private router: Router,private saleService:SaleService) {
    super();
  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
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
      console.log('false')
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
}
