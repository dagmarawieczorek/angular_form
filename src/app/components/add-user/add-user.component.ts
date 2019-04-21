import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Output() addUser: EventEmitter<any> = new EventEmitter;

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
      let user = {
        name: this.name,
        email: this.email,
        dailyHours: this.dailyHours,
        startTime: this.startTime,
        endTime: this.endTime,
        technologies: this.userTechnologies,
        any: this.any,
      }
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
