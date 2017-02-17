import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SliderModule} from 'primeng/primeng';
import {EventItem} from '../categories';

@Component({
  selector: 'app-checkbox-value',
  templateUrl: './checkbox-value.component.html',
  styleUrls: ['./checkbox-value.component.css'],
  providers: [SliderModule]
})
export class CheckboxValueComponent implements OnInit {

  @Input('max') max = 100;
  @Input('min') min = 0;
  @Input('step') step = 5;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  checked = false;
  vals: number[];

  constructor() {
  }

  ngOnInit() {
    this.vals = [this.min, this.max];
  }

  valuesChanged(e) {
    if (this.checked) {
      this.onChange.emit({eventItem: new EventItem().loadRange(e, true, this.vals)});
    }
  }

  toggleChanged(e) {
    this.onChange.emit({
      eventItem: new EventItem().loadRange(e, e.checked, this.vals)
    });
  }


}
