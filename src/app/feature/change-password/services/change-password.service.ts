import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  
  private readonly httpClient= inject(HttpClient);
    headers:object={
      headers: {
        authorization :`Bearer ${localStorage.getItem("social token")}` 
      }
    }
  changePassword(body:object):Observable<any>{
    return this.httpClient.patch(environment.baseUrl+"/users/change-password",body,this.headers)
  }
}
