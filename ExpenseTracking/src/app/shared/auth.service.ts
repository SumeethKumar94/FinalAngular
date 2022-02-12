import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  public loginVerify(username:string,password:string):Observable<any>
{
  
  console.log(username);
  console.log("--------------");
  return  this.httpClient.get('https://localhost:44382/api/Users/Login?username='+username+'&password='+password);
  
}
  public logout()
{
  localStorage.removeItem("Username");
  localStorage.removeItem("RoleId");
}
}
