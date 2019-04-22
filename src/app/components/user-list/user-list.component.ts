import { Component, OnInit } from '@angular/core';
import { User } from '../models/Users';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => { this.users = users });
  }

  addUser(user: User) {
    this.userService.addUser(user).subscribe(user => {
      this.users.push(user)
    })
  }

}
