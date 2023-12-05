import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
    })
  }
  login() {
   if(this.formGroup.valid){
    this.authService.login(this.formGroup.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
      },
    });
   }
   else{
      console.log("Formulário inválido");
   }
  }
}
