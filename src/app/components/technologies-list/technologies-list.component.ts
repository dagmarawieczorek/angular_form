import { Component, OnInit, Input, EventEmitter, Output, Injectable} from '@angular/core';

@Component({
  selector: 'app-technologies-list',
  templateUrl: './technologies-list.component.html',
  styleUrls: ['./technologies-list.component.scss']
})

@Injectable({
  providedIn: 'root'
}) 

export class TechnologiesListComponent implements OnInit {
  @Input() technology:String;
  @Input() removable: Boolean;
  @Output() removeTechnologyItem: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  removeTechnology(event){
    event.preventDefault();
   this.removeTechnologyItem.emit(this.technology)
    
  }

}
