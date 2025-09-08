import {Component, OnInit, Input, EventEmitter, Output, NgZone, ApplicationRef, ChangeDetectorRef} from '@angular/core';
import {Value, EventItem} from '../categories';

@Component({
    selector: 'app-value',
    templateUrl: './value.component.html',
    styleUrls: ['./value.component.css'],
    standalone: false
})
export class ValueComponent implements OnInit {
  @Input('value') value: Value;
  selected = false;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private applicationRef: ApplicationRef,
              private zone: NgZone) {
  }

  ngOnInit() {
  }

  valueChanged(e) {
    this.onChange.emit({eventItem: new EventItem().load(e, this.value.id, e.checked, this.value.name)});
  }

  uncheckValue() {
    this.zone.run(() => {this.selected = false; });
  }
}
