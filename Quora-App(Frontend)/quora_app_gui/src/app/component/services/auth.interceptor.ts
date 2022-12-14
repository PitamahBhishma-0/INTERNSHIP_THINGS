import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {LoginserviceService} from "./loginservice.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login: LoginserviceService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;

    // add jwt token in http request
    const token = this.login.getToken();
    if (token != null) {
      authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      // authReq.headers.append('Authorization', `Bearer ${token}`)
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }
]
