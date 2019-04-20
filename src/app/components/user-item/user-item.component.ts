import { Component, OnInit, Input, } from '@angular/core';
import { Users } from '../models/Users'


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user:Users;
  technologies: Array<string>;
  moreInfoVisible: Boolean =false;

  constructor() { 
  }

  ngOnInit() {
    this.technologies=this.user.technologies
  }

  toggleMoreInfo(user){
    console.log(this.moreInfoVisible)
this.moreInfoVisible=!this.moreInfoVisible;
  }

}
