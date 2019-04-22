import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { User, PreferableHour } from '../models/Users'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  @Output() addUser: EventEmitter<User> = new EventEmitter;

  name: string;
  email: string;
  dailyHours: number;
  startTime: string;
  endTime: string;
  any: boolean = false;
  private userTechnologies: Array<string> = [];
  startHour = new NgxMaterialTimepickerModule

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.validate()) {
      let preferableHour = new PreferableHour();
      let user = new User()

      user.name = this.name,
        user.email = this.email,
        user.dailyHours = this.dailyHours,
        user.technologies = this.userTechnologies,
        preferableHour.any = this.any,
        preferableHour.start = this.startTime,
        preferableHour.end = this.endTime,

        this.addUser.emit(user)
    }
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
      alert("DODAJ TECHNOLOGIE")
      return false;
    }

    if (!this.validateTimes()) {
      alert("NIE TE GODZINY")
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

}
