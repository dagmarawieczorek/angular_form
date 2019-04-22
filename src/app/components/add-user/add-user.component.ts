import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { User, PreferableHour } from '../models/Users'
import { UserService } from '../../service/user.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  @Input() title: string;
  @Input() editableUser: User;
  @Output() userUpdated: EventEmitter<User> = new EventEmitter;

  name: string;
  email: string;
  dailyHours: number;
  startTime: string;
  endTime: string;
  any: boolean = false;
  private userTechnologies: Array<string> = [];
  startHour = new NgxMaterialTimepickerModule

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }


  ngOnInit() {
    if (this.isEditable()) {
      this.name = this.editableUser.name;
      this.email = this.editableUser.email;
      this.dailyHours = this.editableUser.dailyHours;
      this.userTechnologies = this.editableUser.technologies;
      this.any = this.editableUser.preferableHours.any;
      this.startTime = this.editableUser.preferableHours.start;
      this.endTime = this.editableUser.preferableHours.end;
    }
  }

  onSubmit() {
    if (this.validate()) {
      let preferableHour = new PreferableHour();
      let user = new User()
      user.name = this.name;
      user.email = this.email;
      user.dailyHours = this.dailyHours;
      user.technologies = this.userTechnologies;
      preferableHour.any = this.any;
      preferableHour.start = this.startTime;
      preferableHour.end = this.endTime;
      user.preferableHours = preferableHour;
      if (this.isEditable()) {
        user.id = this.editableUser.id;
        this.updateUser(user);
      } else {
        this.addUser(user);
      }
    }
  }

  addUser(user: User) {
    this.userService.addUser(user).subscribe(user => {
      this.showSnackBar('User added');
      this.router.navigate([''])
    }, (error => {
      this.showSnackBar('Something went wrong');
    }))
  }


  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(() => {
      this.showSnackBar('User updated');
      this.userUpdated.emit();
    }, (error => {
      this.showSnackBar('Something went wrong');
    }))
  }

  onSpace(e) {
    const { value } = e.target
    if (!this.userTechnologies.includes(value)) {
      if (value.length > 2) {
        this.userTechnologies.push(value);
      }
    }
    e.target.value = ''
  }

  removeTechnologyItem(technology: any) {
    let arr = this.userTechnologies.filter(x => { return x !== technology })
    this.userTechnologies = arr;
  }

  validate() {
    if (this.userTechnologies.length === 0) {
      this.showSnackBar('You need to add technologies');
      return false;
    }

    if (!this.validateTimes()) {
      this.showSnackBar('Hour range must be the same as declared daily hours');
      return false;
    }

    return true;
  }

  validateTimes() {
    return this.any || (this.calculateDiffBetweenTimes(this.endTime, this.startTime) === this.convertHoursToMinutes(this.dailyHours));
  }

  convertTimeToMinutes(time: string) {
    let parsed = time.split(":");
    return (+parsed[0]) * 60 + (+parsed[1]);
  }

  convertHoursToMinutes(hours: number) {
    return hours * 60;
  }

  calculateDiffBetweenTimes(first: string, second: string) {
    return this.convertTimeToMinutes(first) - this.convertTimeToMinutes(second);
  }

  isEditable() {
    return this.editableUser != null;
  }

  showSnackBar(text: string) {
    this.snackBar.open(text, 'OK', {
      duration: 3000
    });
  }

}
