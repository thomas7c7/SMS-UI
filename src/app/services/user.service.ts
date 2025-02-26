//This is where java controllers, apis, endpointare called
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' //'public'
})
export class UserService {

  api: string = 'http://localhost:8080/manager'; //request mapping url

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { } //requires this constructor to call api from java

  login(user: User): Observable<User>{ //observable is a stream of data           //post mapping url
    return this.http.post<User>(this.api.concat('/login'), user); //calling url from PostMapping "/login"
  }

  signUp(user: User): Observable<string> { //string because the java controller returns string as well
    return this.http.post<string>(this.api, user, {responseType: 'text' as 'json'}); //text as json because it returns string
  }
}
