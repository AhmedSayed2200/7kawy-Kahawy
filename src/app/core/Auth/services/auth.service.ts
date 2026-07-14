import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient =inject(HttpClient)
  private readonly router=inject(Router)

  signUp(body:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl +"/users/signup",body)
  }

  signIn(body:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl +"/users/signin",body)
  }

  singOut():void{
    localStorage.removeItem("social token");
    localStorage.removeItem("user data");
      this.router.navigate(["/login"]);
  }
}
