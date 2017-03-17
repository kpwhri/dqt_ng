import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {UserForm} from '../categories';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Input() authenticated: boolean;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  userFormSubmitted(event) {
    this.onChange.emit(event);
  }

}
