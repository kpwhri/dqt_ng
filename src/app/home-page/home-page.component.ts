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
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();

  buttonClicked = false;

  constructor() { }

  ngOnInit() { }

  userFormSubmitted(event) {
    this.onChange.emit(event);
  }

  goToQueryTool(event) {
    console.log('button clicked');
    this.buttonClicked = true;
    this.onNavigate.emit(event);
  }

}
