import { Component, OnInit, Input, EventEmitter, Output, Injectable } from '@angular/core';

@Component({
  selector: 'app-technologies-item',
  templateUrl: './technologies-item.component.html',
  styleUrls: ['./technologies-item.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class TechnologiesItemComponent implements OnInit {
  @Input() technology: String;
  @Input() removable: Boolean;
  @Output() removeTechnologyItem: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  removeTechnology(event) {
    event.preventDefault();
    this.removeTechnologyItem.emit(this.technology)

  }

}
