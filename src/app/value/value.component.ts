import {Component, OnInit, Input} from '@angular/core';
import {Value} from "../categories";

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  @Input('value') value: Value;
  private selected : boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
