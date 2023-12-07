
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ServiceShared } from '../shared/service.service'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private sharedService: ServiceShared) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {
      if(request.url.includes('3000')){
        const token = this.authService.token;
        const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
      request = request.clone({ headers });
      }else if (request.url.includes('21465')){
        const token = this.sharedService.getToken();
        const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
      request = request.clone({ headers });
      }
      
    }
    return next.handle(request);
  }
}

