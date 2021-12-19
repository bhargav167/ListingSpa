import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../Model/AuthUser';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  baseURL=environment.api_url;
  constructor(private _http:HttpClient) {  }

  Login(user:AuthUser){
    return this._http.post(this.baseURL+'Auth/AddAuthUser',user);
  }
}
