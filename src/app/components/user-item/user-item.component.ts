import { Component, OnInit, Input, } from '@angular/core';
import { User } from '../models/Users'
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;

  moreInfoVisible: Boolean = false;
  editMode: Boolean = false;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  toggleMoreInfo() {
    this.moreInfoVisible = !this.moreInfoVisible;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  userUpdated() {
    this.toggleEditMode();
    this.refreshUserInfo();
  }

  refreshUserInfo() {
    this.userService.getUserById(this.user.id).subscribe(user => {
      this.user = user;
      this.showSnackBar('User was updated');
    }, (error => {
      this.showSnackBar('Something went wrong');
    }))
  }

  showSnackBar(text: string) {
    this.snackBar.open(text, 'OK', {
      duration: 3000
    });
  }


}
