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

  @Input('max') max: string;
  @Input('min') min: string;
  @Input('step') step: string;
  isDecimal = false;
  minAsInt: number;
  maxAsInt: number;
  stepAsInt: number;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  checked = false;
  vals: number[] = [];
  buttonVals: number[] = [];

  constructor() {
  }

  ngOnInit() {
    console.warn(this.step);
    if (this.step.indexOf('.') >= 0) {
      this.isDecimal = true;
      this.minAsInt = +this.min * 10;
      this.maxAsInt = +this.max * 10;
      this.stepAsInt = +this.step * 10;
    } else {
      this.minAsInt = +this.min;
      this.maxAsInt = +this.max;
      this.stepAsInt = +this.step;
    }
    this.vals = [+this.minAsInt, +this.maxAsInt];
    this.onValueUpdate(null);
  }

  onValueUpdate(e) {
    if (this.isDecimal) {
      this.buttonVals = [this.vals[0] / 10, this.vals[1] / 10];
    } else {
      this.buttonVals = [this.vals[0], this.vals[1]];
    }
  }

  valuesChanged(e) {
    this.onValueUpdate(null);
    if (this.checked) {
      this.onChange.emit({eventItem: new EventItem().loadRange(e, true, this.buttonVals)});
    }
  }

  toggleChanged(e) {
    this.onValueUpdate(null);
    this.onChange.emit({
      eventItem: new EventItem().loadRange(e, e.checked, this.buttonVals)
    });
  }


}
