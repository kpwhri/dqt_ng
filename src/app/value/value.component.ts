import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Value, EventItem} from "../categories";

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  @Input('value') value: Value;
  private selected: boolean = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  valueChanged(e) {
    this.onChange.emit({eventItem: new EventItem().load(e, this.value.id, e.checked)});
  }


}
