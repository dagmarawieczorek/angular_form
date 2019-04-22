import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { User } from '../components/models/Users';
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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  addUser(user:User){
    return this.http.post<User>(this.usersUrl, user, httpOptions )
  }

  updateUser(user:User){
    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user, httpOptions )
  }
}
