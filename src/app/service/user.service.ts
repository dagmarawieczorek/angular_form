import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Users } from '../components/models/Users';
import { Observable } from 'rxjs'

const httpOptions= {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })

}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  usersUrl:string= 'http://localhost:3000/users';
  constructor(private http:HttpClient) {
  }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.usersUrl);
  }

  addUser(user:Users){
    return this.http.post<Users>(this.usersUrl, user, httpOptions )
  }
}
